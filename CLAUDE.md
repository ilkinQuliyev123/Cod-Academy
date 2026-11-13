# Kod Akademiyası — qaydalar

Front-end və back-end öyrədən sayt. Next.js 16 (App Router) + TypeScript + Tailwind 4 + motion. Bütün UI və dərslər **Azərbaycanca**.
Next.js qaydaları üçün @AGENTS.md (bu versiya fərqlidir — şübhədə `node_modules/next/dist/docs/` oxu).

## İş qaydaları (Claude üçün)
- İstifadəçi ilə Azərbaycanca, qısa danış. Hər addımdan sonra aşağıdakı «Vəziyyət» bölməsini yenilə.
- **Token qənaəti:** faylı yalnız lazım olan hissəsini oxu; böyük faylı yenidən yazma — `Edit` et; eyni şeyi iki dəfə yoxlama; uzun izahat yazma.
- Hər dəyişiklikdən sonra: `npx tsc --noEmit` və `npm run build`. Xətasız olmadan «hazırdır» demə.
- Asılılıq əlavə etməzdən əvvəl düşün: brauzerin/Next-in özündə varsa, paket qoşma.
- API açarları yalnız `.env.local`-da / Vercel-də. Heç vaxt koda və ya söhbətə yazma.

## Dizayn sistemi
- Tünd «terminal / kiber» üslub. Fon `ink #05070d`, panel `panel #0c111c`, xətt `line #1c2536`.
- Front End = mavi `#38bdf8`, Back End = qırmızı `#f43f5e`. «Blue/Red Team» yazısı İŞLƏDİLMİR, giriş ekranında «VS» yazısı da YOXDUR (istifadəçi istəyi). Rəng `--accent` dəyişəni ilə gəlir (`[data-track]`), komponentlərdə `text-accent`, `bg-accent`, `border-accent` işlət — rəngi hardcode etmə.
- Kod rəngləri: açar söz `#c084fc`, string `#86efac`, ədəd `#fbbf24`, şərh `#64748b`, tip `#7dd3fc`.
- Şrift: Inter (mətn), JetBrains Mono (kod, etiketlər). Başlıqlar `font-black`, kiçik etiketlər mono + `tracking-widest uppercase`.
- Animasiya: `motion/react`, yumşaq spring; 1.2 s-dən uzun animasiya olmasın. `prefers-reduced-motion`-a hörmət et.
- Mobil birinci: hər səhifə 360 px-də yoxlanmalıdır.

## Təhlükəsizlik (dəyişmə, yalnız gücləndir)
- `next.config.ts`: CSP + HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP, `poweredByHeader: false`. CSP-də `unsafe-eval`/`wasm-unsafe-eval`/`blob:` məşq runner-ləri üçün LAZIMDIR — silsən JS/Python/SQL sınır. Dəyişəndən sonra 5 runner-i Playwright ilə yoxla.
- HTML önizləmə: `sandbox="allow-scripts"` — `allow-same-origin` ƏLAVƏ ETMƏ.
- `/api/agent`: Origin yoxlaması (başqa sayt → 403), body ≤ 40 KB, `lang/topic/exam` ağ siyahıdan, mesajlar tip yoxlamalı, IP limiti 15/dəq (Map ölçüsü məhdud), sistem promptunda prompt-injection qadağası. Açar yalnız serverdə.
- Markdown render: innerHTML YOX, yalnız daxili linklər.
- İmtahan nəticəsi localStorage-dadır (saxtalaşdırıla bilər) — sertifikat verilsə serverdə yoxlanmalıdır.

## Kod qaydaları
- Server Component default; `"use client"` yalnız interaktiv hissədə (animasiya, state, brauzer API).
- Komponent bir iş görür, 150 sətirdən uzun olmasın. Adlar ingiliscə (kod), mətnlər Azərbaycanca (UI).
- `any` qadağandır. Tiplər `src/data/types.ts`-də.
- Bütün marşrutlar `generateStaticParams` ilə statik qurulur.

## Məzmun quruluşu
- Dillər və mövzu siyahıları: `src/data/languages.ts` (`"slug|Başlıq"`).
- Dərslər: `src/data/lessons/<dil>.ts` → `index.ts`-də `ALL`-a əlavə et.
- **Hər dərsin qəlibi** (pedaqogika):
  1. `intro` — 1–2 cümlə: nədir, nəyə lazımdır.
  2. **Başlanğıc**: `analogy` (həyatdan bənzətmə) → sintaksis `code` → `terms` (hər sözün mənası) → `tip`.
  3. **Orta**: real nümunələr, kodun məntiqi, `mistake` (səhv ↔ düz + səbəb).
  4. **Senior**: daxildə necə işləyir, performans, best practice, `qa` (müsahibə sualları).
  5. **Özünü yoxla**: 1–3 `quiz`.
  6. `exercise` — məşq səhifəsi üçün tapşırıq + `expect` (AI yoxlaması üçün).
- Tapşırığın `starter`-i `<` ilə başlayırsa (CSS/DOM tapşırıqları), `/mesq` onu avtomatik HTML önizləmə rejimində açır.
- Dil sadə, cümlələr qısa. Termin ilk dəfə gələndə ingilis əsli mötərizədə.

## Vəziyyət (son yeniləmə: 13.11.2026, commit «Giriş ekranı…», zip v4)
- [x] Mərhələ 1: skelet; giriş ekranı — diaqonal bölünmüş döyüş afişası (mavi FRONT END / qırmızı BACK END), toqquşma + silkələnmə + işıq, klikdə bölmə rəngində lift qapısı (`Gate.tsx`, `DoorIntro.tsx`); header, mövzu siyahısı, dərs səhifəsi, irəliləyiş (localStorage, `src/lib/progress.ts`).
- [x] Mərhələ 3: məşq səhifəsi `/mesq` — CodeMirror 6; Worker-də icra (`src/lib/runners.ts`): JS, TS (sucrase), Python (Pyodide), SQL (sql.js + nümunə baza: telebeler, kurslar, qeydiyyat); HTML/CSS iframe önizləmə. Runtime-lar `public/runtimes`-ə `scripts/copy-runtimes.mjs` ilə köçürülür (postinstall/prebuild, gitignore-da).
- [x] Mərhələ 4: AI agent `/api/agent` — **Google Gemini** (istifadəçinin pullu açarı yoxdur, Claude API yox). REST, SDK yox. `GEMINI_API_KEY`, `GEMINI_MODEL` (default `gemini-3.8-flash`, sənəddən yoxlanmayıb). Sistem promptuna dərs mətni + mövzu linkləri gedir. IP limiti 15/dəq. Açarla hələ SINANMAYIB.
- [x] Karyera yolu `/[track]/yol` (`src/data/career.ts`): Junior/Middle/Senior, addımlar, layihələr, imtahan (`/mesq?imtahan=backend-junior`; AI «NƏTİCƏ: ✅» → `markPassed`). Yoxlama: `node --experimental-strip-types scripts/check-data.mjs`.

## QALAN İŞLƏR (sıra ilə)
1. **Dərslər (əsas iş).** 234 mövzudan 71-i hazırdır: BÜTÜN JUNIOR TAM; `javascript` TAM (22/22). Növbəti: typescript (hamısı), react, tailwind, css middle/senior, html senior, nextjs; sonra back middle/senior. Karyera sırası ilə yaz:
   - Sonra Middle, sonra Senior (`career.ts`-dəki `steps` sırası).
   - Hər dil üçün `src/data/lessons/<dil>.ts` yarat, `index.ts`-də `ALL`-a əlavə et. Qəlib yuxarıda («Məzmun quruluşu»). Hər dərsə `exercise` əlavə et.
   - Bir partiyada 3–5 dərs yaz → build → istifadəçiyə göstər → davam. Token qənaəti: mövcud dərsi nümunə kimi bir dəfə oxu.
2. **AI testi:** istifadəçi `.env.local`-a `GEMINI_API_KEY` qoyub yoxlayacaq. Model adı işləməsə `GEMINI_MODEL` dəyişdir.
3. **Deploy (Vercel):** GitHub hesabı Claude-a QOŞULMAYIB (push mümkün deyil). İstifadəçi https://claude.ai/connect-github qoşmalı + repo yaratmalıdır; sonra push → Vercel-də import, `GEMINI_API_KEY` env.
4. **İstəyə bağlı (istifadəçi təsdiqi lazım):** qeydiyyat/giriş + verilənlər bazası (C# ASP.NET API və ya Supabase), admin panel (kodsuz dərs əlavə), dərs səhifələrində kiçik AI çat pəncərəsi.

## İstifadəçi haqqında qeydlər
- Böyük işləri təsdiqsiz görmə — əvvəl soruş, tövsiyə ver.
- **DƏRSLƏR ÜÇÜN İCAZƏ VAR: «bitirənə qədər davam elə, möhkəm yaz»** — partiyalar arasında soruşma, bütün 234 dərsi bitirənə qədər yaz (hər partiyadan sonra build + commit + bu faylı yenilə; zip-i bir neçə partiyada bir göndər). Hər dərsin senior hissəsində mövzuya aid TƏHLÜKƏSİZLİK məqamı olsun (XSS, injection, CSRF, sirlər və s.).
- Nəticəni zip kimi istəyir: HƏMİŞƏ EYNİ ad: `rm -f kod-akademiyasi.zip && git archive --format=zip -o kod-akademiyasi.zip HEAD` → SendUserFile (versiya nömrəsi YOX — istifadəçi istəyi). Kompüterinə birbaşa çıxış yoxdur.
- Commit müəllifi: `-c user.name="ilkinQuliyev123" -c user.email="noreply@users.noreply.github.com"`.
- Yoxlama serveri: `npx next start -p 3100` (köhnəsini əvvəl `pkill -f "next-server|next start"`), Playwright ilə ekran şəkli.
