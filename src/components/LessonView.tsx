import type { Block, Lesson, Level } from "@/data/types";
import CodeBlock from "./CodeBlock";
import Quiz from "./Quiz";

const LEVEL: Record<Level, { label: string; cls: string }> = {
  baslangic: { label: "Başlanğıc", cls: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30" },
  orta: { label: "Orta", cls: "bg-amber-500/15 text-amber-300 ring-amber-500/30" },
  senior: { label: "Senior", cls: "bg-fuchsia-500/15 text-fuchsia-300 ring-fuchsia-500/30" },
};

function Callout({ icon, title, cls, children }: { icon: string; title: string; cls: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-lg border-l-4 p-4 ${cls}`}>
      <p className="mb-1 font-mono text-[11px] uppercase tracking-widest opacity-80">{icon} {title}</p>
      <div className="text-slate-200">{children}</div>
    </div>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case "p":
      return <p className="leading-relaxed text-slate-300">{b.text}</p>;
    case "h":
      return <h3 className="pt-2 text-lg font-bold text-white">{b.text}</h3>;
    case "code":
      return <CodeBlock code={b.code} lang={b.lang} caption={b.caption} />;
    case "analogy":
      return <Callout icon="💡" title="Həyatdan bənzətmə" cls="border-accent bg-accent/5">{b.text}</Callout>;
    case "tip":
      return <Callout icon="✦" title="Məsləhət" cls="border-emerald-500 bg-emerald-500/5">{b.text}</Callout>;
    case "warn":
      return <Callout icon="⚠" title="Diqqət" cls="border-amber-500 bg-amber-500/5">{b.text}</Callout>;
    case "list":
      return (
        <ul className="space-y-2">
          {b.items.map((x) => (
            <li key={x} className="flex gap-3 text-slate-300"><span className="text-accent">▸</span><span>{x}</span></li>
          ))}
        </ul>
      );
    case "terms":
      return (
        <div className="overflow-hidden rounded-lg border border-line">
          <p className="border-b border-line bg-panel px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-slate-400">📖 Söz lüğəti</p>
          <dl className="divide-y divide-line">
            {b.items.map(([w, m]) => (
              <div key={w} className="grid gap-1 px-4 py-2.5 sm:grid-cols-[minmax(8rem,auto)_1fr] sm:gap-4">
                <dt><code className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-sm text-accent">{w}</code></dt>
                <dd className="text-sm text-slate-300">{m}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case "mistake":
      return (
        <div className="space-y-2">
          <div className="grid gap-2 md:grid-cols-2">
            <CodeBlock code={b.wrong} lang={b.lang} tone="bad" />
            <CodeBlock code={b.right} lang={b.lang} tone="good" />
          </div>
          <p className="text-sm text-slate-400"><span className="text-rose-400">Niyə?</span> {b.why}</p>
        </div>
      );
    case "qa":
      return (
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-widest text-fuchsia-300">🎯 Müsahibə sualları</p>
          {b.items.map(([q, a]) => (
            <details key={q} className="group rounded-lg border border-line bg-panel px-4 py-3">
              <summary className="cursor-pointer list-none font-medium text-white">
                <span className="mr-2 text-accent group-open:rotate-90 inline-block transition">›</span>{q}
              </summary>
              <p className="mt-2 pl-5 text-sm text-slate-300">{a}</p>
            </details>
          ))}
        </div>
      );
    case "quiz":
      return <Quiz q={b.q} options={b.options} answer={b.answer} why={b.why} />;
  }
}

export default function LessonView({ lesson }: { lesson: Lesson }) {
  return (
    <div className="space-y-12">
      {lesson.sections.map((s, i) => (
        <section key={i} className="space-y-5">
          <div className="flex items-center gap-3">
            <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ring-1 ${LEVEL[s.level].cls}`}>
              {LEVEL[s.level].label}
            </span>
            <h2 className="text-2xl font-bold text-white">{s.title}</h2>
          </div>
          {s.blocks.map((b, j) => <BlockView key={j} b={b} />)}
        </section>
      ))}
    </div>
  );
}
