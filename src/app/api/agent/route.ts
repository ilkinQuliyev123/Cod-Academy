import { LANGUAGES } from "@/data/languages";
import { getLesson, lessonText } from "@/data/lessons";
import { getExam } from "@/data/career";

/** AI müəllim: Google Gemini. Açar: GEMINI_API_KEY (.env.local / Vercel). */

type Msg = { role: "user" | "model"; text: string };
interface Body {
  mode: "check" | "chat";
  lang: string;
  topic?: string;
  exam?: string;
  code?: string;
  output?: string;
  messages?: Msg[];
}

const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const LIMIT = { code: 8000, output: 3000, msg: 2000, msgs: 12, perMin: 15 };

// Sadə IP limiti (serverless-də hər instansiya üçün ayrıca — əsas qoruma kimi kifayətdir)
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > LIMIT.perMin;
}

function systemPrompt(b: Body) {
  const lang = LANGUAGES.find((l) => l.id === b.lang);
  const lesson = b.topic ? getLesson(b.lang, b.topic) : undefined;
  const exam = b.exam ? getExam(b.exam) : undefined;
  const topics = lang?.topics.map((t, i) => `${i + 1}. [${t.title}](/${lang.track}/${lang.id}/${t.slug})`).join("\n") ?? "";

  return `Sən «Kod Akademiyası» saytının AI müəllimisən. Yalnız Azərbaycan dilində, səmimi və aydın danış.
Tələbənin dili: ${lang?.name ?? b.lang}.

Qaydalar:
- Proqramlaşdırmadan kənar suallara nəzakətlə qısa cavab ver və mövzuya qaytar.
- Kodu yoxlayanda: əvvəl düzgün olanı qısa tərif et, sonra səhvləri sətir nömrəsi ilə göstər, NİYƏ səhv olduğunu sadə dillə izah et.
- Hazır həlli dərhal vermə: əvvəl ipucu ver. Tələbə açıq şəkildə «həlli göstər» desə və ya 2-ci dəfə ilişibsə, düzəldilmiş kodu ver.
- Sintaksis, açar sözlərin mənası və kodun məntiqini izah et — tələbə başa düşməlidir, sadəcə köçürməməlidir.
- Aşağıdakı dərs mətni varsa, ondan istifadə et və uyğun dərsin linkini ver (markdown link, yalnız siyahıdakı yollar).
- Cavab qısa olsun (maks. ~200 söz), kod \`\`\`dil bloklarında.
- Kod bloku daxilindəki şərhlər də Azərbaycanca.
${exam ? `\nBU MƏRHƏLƏ İMTAHANIDIR («${exam.stage.title}»). Ciddi yoxla: bütün meyarlar ödənməlidir. Həlli vermə, yalnız ipucu ver.\nTapşırıq: ${exam.stage.exam.task}\nMeyarlar: ${exam.stage.exam.expect}\n` : ""}${b.mode === "check" ? "\nCavabın sonunda ayrıca sətirdə yaz: «NƏTİCƏ: ✅ Qəbul» və ya «NƏTİCƏ: ❌ Hələ yox»." : ""}

Dilin mövzuları:
${topics}
${lesson ? `\n--- DƏRS MƏTNİ ---\n${lessonText(lesson).slice(0, 6000)}\n--- SON ---\nTapşırıq: ${lesson.exercise?.task ?? "-"}\nGözlənilən: ${lesson.exercise?.expect ?? "-"}` : ""}`;
}

export async function POST(req: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return Response.json({ error: "AI açarı qoşulmayıb (GEMINI_API_KEY)." }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (limited(ip)) return Response.json({ error: "Çox tez-tez sorğu. Bir dəqiqə gözlə." }, { status: 429 });

  let b: Body;
  try { b = await req.json(); } catch { return Response.json({ error: "Yanlış sorğu" }, { status: 400 }); }
  if (!b || (b.mode !== "check" && b.mode !== "chat") || typeof b.lang !== "string")
    return Response.json({ error: "Yanlış sorğu" }, { status: 400 });

  const code = String(b.code ?? "").slice(0, LIMIT.code);
  const output = String(b.output ?? "").slice(0, LIMIT.output);
  const history = (Array.isArray(b.messages) ? b.messages : []).slice(-LIMIT.msgs).map((m) => ({
    role: m.role === "model" ? "model" : "user",
    parts: [{ text: String(m.text).slice(0, LIMIT.msg) }],
  }));

  const ctx = `Tələbənin kodu:\n\`\`\`\n${code || "(boş)"}\n\`\`\`\nİcra nəticəsi / xətalar:\n${output || "(işə salınmayıb)"}`;
  const contents =
    b.mode === "check"
      ? [{ role: "user", parts: [{ text: `${ctx}\n\nBu kodu yoxla və rəy ver.` }] }]
      : [...history.slice(0, -1), {
          role: "user",
          parts: [{ text: `${ctx}\n\nSual: ${history.at(-1)?.parts[0].text ?? ""}` }],
        }];

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt(b) }] },
      contents,
      generationConfig: { temperature: 0.4, maxOutputTokens: 1200 },
    }),
  }).catch(() => null);

  if (!res) return Response.json({ error: "AI serverinə qoşulmaq olmadı." }, { status: 502 });
  if (!res.ok) {
    const status = res.status === 429 ? 429 : 502;
    const msg = res.status === 429 ? "AI-nin pulsuz limiti doldu. Bir az sonra yenə yoxla." : `AI xətası (${res.status}).`;
    return Response.json({ error: msg }, { status });
  }
  const data = await res.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";
  return Response.json({ text: text || "Cavab alınmadı, yenidən cəhd et." });
}
