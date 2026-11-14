"use client";

import { useEffect, useRef, useState } from "react";
import Markdown from "./Markdown";
import { markPassed } from "@/lib/progress";

type Msg = { role: "user" | "model"; text: string };

export default function AgentPanel({ lang, topic, exam, getContext, checkSignal }: {
  lang: string;
  topic?: string;
  /** İmtahan id-si: AI «✅ Qəbul» desə, keçilmiş sayılır */
  exam?: string;
  /** Kod və icra nəticəsi */
  getContext: () => { code: string; output: string };
  /** Hər artanda avtomatik yoxlama başlayır */
  checkSignal: number;
}) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => { box.current?.scrollTo({ top: box.current.scrollHeight, behavior: "smooth" }); }, [msgs, busy]);

  async function ask(mode: "check" | "chat", question?: string) {
    if (busy) return;
    const history: Msg[] = question ? [...msgs, { role: "user", text: question }] : [...msgs, { role: "user", text: "🔍 Kodumu yoxla" }];
    setMsgs(history);
    setBusy(true);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, lang, topic, exam, ...getContext(), messages: history }),
      });
      const d = await res.json();
      const passed = exam && mode === "check" && /NƏTİCƏ:\s*✅[^\n]*\s*$/.test(d.text ?? "");
      if (passed) markPassed(exam);
      setMsgs([...history, { role: "model", text: (d.text ?? `⚠ ${d.error ?? "Xəta baş verdi"}`) + (passed ? "\n\n🎉 **Təbriklər! Mərhələ imtahanını keçdin.** Karyera yolunda növbəti mərhələ açıldı." : "") }]);
    } catch {
      setMsgs([...history, { role: "model", text: "⚠ İnternet bağlantısını yoxla." }]);
    } finally {
      setBusy(false);
    }
  }

  // «AI yoxla» düyməsi
  const first = useRef(checkSignal);
  useEffect(() => {
    if (checkSignal !== first.current) ask("check");
    // eslint-disable-next-line react-hooks/exhaustive-deps -- yalnız siqnal dəyişəndə
  }, [checkSignal]);

  return (
    <section className="flex min-h-[24rem] min-w-0 flex-1 flex-col rounded-xl border border-line bg-panel lg:min-h-0">
      <header className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative h-2 w-2 rounded-full bg-accent" />
        </span>
        <h2 className="font-mono text-xs uppercase tracking-widest text-slate-300">AI müəllim</h2>
        {msgs.length > 0 && (
          <button onClick={() => setMsgs([])} className="ml-auto text-xs text-slate-500 hover:text-white">təmizlə</button>
        )}
      </header>

      <div ref={box} className="min-h-[200px] flex-1 space-y-4 overflow-y-auto p-4">
        {msgs.length === 0 && (
          <div className="text-sm text-slate-500">
            <p>Kodunu yaz və <b className="text-slate-300">AI yoxla</b> düyməsini bas — səhvlərini Azərbaycanca izah edəcəm.</p>
            <p className="mt-2">Və ya sual ver: «for dövrü necə işləyir?», «bu xəta nə deməkdir?»</p>
          </div>
        )}
        {msgs.map((m, i) =>
          m.role === "user" ? (
            <p key={i} className="ml-auto w-fit max-w-[85%] rounded-lg rounded-br-sm bg-accent/15 px-3 py-2 text-sm text-white">{m.text}</p>
          ) : (
            <div key={i} className="max-w-full"><Markdown text={m.text} /></div>
          ),
        )}
        {busy && <p className="font-mono text-xs text-accent animate-pulse">AI düşünür…</p>}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); const q = input.trim(); if (q) { setInput(""); ask("chat", q); } }}
        className="flex gap-2 border-t border-line p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Sualını yaz…"
          maxLength={2000}
          className="min-w-0 flex-1 rounded-md border border-line bg-ink px-3 py-2 text-sm outline-none focus:border-accent/60"
        />
        <button disabled={busy || !input.trim()} className="rounded-md bg-accent px-4 text-sm font-bold text-ink disabled:opacity-40">
          Göndər
        </button>
      </form>
    </section>
  );
}
