"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "./Editor";
import AgentPanel from "./AgentPanel";
import { run, type RunResult } from "@/lib/runners";
import type { Language } from "@/data/types";

export interface PlayProps {
  langs: Pick<Language, "id" | "name" | "track" | "editor" | "runnable">[];
  langId: string;
  topic?: string;
  task?: string;
  starter: string;
  tasks: { slug: string; title: string }[];
  exam?: { id: string; title: string; track: string };
}

const CSS_DEMO = `<h1>Başlıq</h1><p>Paraqraf mətni. <a href="#">Link</a></p><button>Düymə</button><div class="kart">Kart</div>`;

const toText = (r: RunResult | null) =>
  !r ? "" : [
    ...r.lines.map((l) => `[${l.kind}] ${l.text}`),
    ...(r.tables ?? []).map((t) => [t.columns.join(" | "), ...t.values.slice(0, 20).map((v) => v.join(" | "))].join("\n")),
  ].join("\n");

export default function Playground({ langs, langId, topic, task, starter, tasks, exam }: PlayProps) {
  const router = useRouter();
  const lang = langs.find((l) => l.id === langId)!;
  const code = useRef(starter);
  const [result, setResult] = useState<RunResult | null>(null);
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState("");
  const [running, setRunning] = useState(false);
  const [check, setCheck] = useState(0);

  const go = (dil: string, movzu?: string) =>
    router.replace(`/mesq?dil=${dil}${movzu ? `&movzu=${movzu}` : ""}`, { scroll: false });

  async function onRun() {
    if (lang.runnable === "none") return setCheck((c) => c + 1); // işə salmaq olmur → AI yoxlasın
    if (lang.runnable === "web") {
      return setPreview(lang.editor === "css" ? `<style>body{font-family:sans-serif}${code.current}</style>${CSS_DEMO}` : code.current);
    }
    setRunning(true);
    setStatus("İşləyir…");
    const r = await run(lang.runnable, code.current, setStatus);
    setResult(r);
    setStatus(`${r.ms} ms`);
    setRunning(false);
  }

  const output = lang.runnable === "web" ? `(önizləmə göstərildi)` : toText(result);

  return (
    <div data-track={lang.track} className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 p-4 lg:h-[calc(100vh-3.5rem)]">
      {/* İdarə paneli */}
      <div className="flex flex-wrap items-center gap-2">
        {exam ? (
          <span className="rounded-md border border-accent/50 bg-accent/10 px-3 py-2 font-mono text-xs uppercase tracking-widest text-accent">
            🎓 İmtahan · {exam.title} · {lang.name}
          </span>
        ) : (<>
        <select value={langId} onChange={(e) => go(e.target.value)} className="min-h-11 md:min-h-0 rounded-md border border-line bg-panel px-3 py-2 text-sm">
          <optgroup label="Front End">{langs.filter((l) => l.track === "frontend").map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}</optgroup>
          <optgroup label="Back End">{langs.filter((l) => l.track === "backend").map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}</optgroup>
        </select>
        <select value={topic ?? ""} onChange={(e) => go(langId, e.target.value || undefined)} className="min-h-11 md:min-h-0 max-w-[16rem] rounded-md border border-line bg-panel px-3 py-2 text-sm">
          <option value="">Sərbəst məşq</option>
          {tasks.map((t) => <option key={t.slug} value={t.slug}>Tapşırıq: {t.title}</option>)}
        </select>
        </>)}
        <div className="flex-1" />
        <span className="font-mono text-xs text-slate-500">{status}</span>
        {lang.runnable !== "none" && (
          <button onClick={onRun} disabled={running} className="min-h-11 md:min-h-0 rounded-md border border-accent/60 px-4 py-2 text-sm font-bold text-accent hover:bg-accent/10 disabled:opacity-50" title="Ctrl+Enter">
            ▶ İşə sal
          </button>
        )}
        <button onClick={() => setCheck((c) => c + 1)} className="min-h-11 md:min-h-0 rounded-md bg-accent px-4 py-2 text-sm font-bold text-ink hover:brightness-110">
          ✦ AI yoxla
        </button>
      </div>

      {task && (
        <p className="rounded-lg border border-accent/30 bg-accent/5 px-4 py-2.5 text-sm text-slate-200">
          <span className="mr-2 font-mono text-[11px] uppercase tracking-widest text-accent">{exam ? "İmtahan tapşırığı" : "Tapşırıq"}</span>{task}
        </p>
      )}

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="flex min-h-0 min-w-0 flex-col gap-4">
          <div className="min-h-[320px] min-w-0 flex-1 overflow-hidden rounded-xl border border-line">
            <Editor value={starter} editor={lang.editor} resetKey={`${langId}/${topic}`} onChange={(v) => (code.current = v)} onRun={onRun} />
          </div>
          {/* Nəticə */}
          <div className="h-56 shrink-0 overflow-auto rounded-xl border border-line bg-[#080b13]">
            <p className="sticky top-0 border-b border-line bg-[#080b13] px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-slate-500">
              {lang.runnable === "web" ? "Önizləmə" : "Konsol"}
            </p>
            {lang.runnable === "web" ? (
              <iframe title="Önizləmə" sandbox="allow-scripts" srcDoc={preview} className="h-[calc(100%-2rem)] w-full bg-white" />
            ) : lang.runnable === "none" ? (
              <p className="p-4 text-sm text-slate-500">{lang.name} brauzerdə işə salınmır. Kodunu yaz və <b className="text-slate-300">AI yoxla</b> — AI onu yoxlayıb izah edəcək.</p>
            ) : (
              <div className="space-y-1 p-4 font-mono text-[13px]">
                {!result && <p className="text-slate-600">▶ İşə sal (Ctrl+Enter)</p>}
                {result?.lines.map((l, i) => (
                  <pre key={i} className={`whitespace-pre-wrap ${l.kind === "error" ? "text-rose-400" : l.kind === "warn" ? "text-amber-300" : l.kind === "info" ? "text-sky-300" : "text-slate-200"}`}>{l.text}</pre>
                ))}
                {result?.tables?.map((t, i) => (
                  <table key={i} className="my-2 border-collapse text-xs">
                    <thead><tr>{t.columns.map((c) => <th key={c} className="border border-line bg-panel px-2 py-1 text-left text-accent">{c}</th>)}</tr></thead>
                    <tbody>{t.values.map((row, j) => <tr key={j}>{row.map((v, k) => <td key={k} className="border border-line px-2 py-1">{String(v)}</td>)}</tr>)}</tbody>
                  </table>
                ))}
                {result && !result.lines.length && !result.tables?.length && <p className="text-slate-600">(çıxış yoxdur)</p>}
              </div>
            )}
          </div>
        </div>
        <AgentPanel lang={langId} topic={topic} exam={exam?.id} checkSignal={check} getContext={() => ({ code: code.current, output })} />
      </div>
    </div>
  );
}
