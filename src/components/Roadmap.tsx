"use client";

import Link from "next/link";
import type { Stage } from "@/data/career";
import type { TrackId } from "@/data/types";
import { useDone, usePassed } from "@/lib/progress";

const BADGE = {
  junior: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/40",
  middle: "bg-amber-500/15 text-amber-300 ring-amber-500/40",
  senior: "bg-fuchsia-500/15 text-fuchsia-300 ring-fuchsia-500/40",
};

export default function Roadmap({ track, stages, names }: {
  track: TrackId;
  stages: Stage[];
  /** dil → { ad, mövzu slug → başlıq } */
  names: Record<string, { name: string; topics: Record<string, string> }>;
}) {
  const done = useDone();
  const passed = usePassed();

  return (
    <ol className="relative mt-12 space-y-10 border-l border-line pl-6 md:pl-10">
      {stages.map((s, i) => {
        const ids = s.steps.filter((x) => !x.optional).flatMap((x) => x.topics.map((t) => `${x.lang}/${t}`));
        const pct = Math.round((ids.filter((id) => done.has(id)).length / ids.length) * 100);
        const exam = `${track}-${s.id}`;
        const ok = passed.has(exam);
        const prev = stages[i - 1];
        const locked = prev && !passed.has(`${track}-${prev.id}`);

        return (
          <li key={s.id} className="relative">
            <span className={`absolute -left-[33px] md:-left-[49px] top-1 grid h-4 w-4 place-items-center rounded-full ring-4 ring-ink ${ok ? "bg-accent" : "bg-line"}`} />
            <article className={`rounded-2xl border bg-panel p-5 md:p-7 ${ok ? "border-accent/50" : "border-line"} ${locked ? "opacity-70" : ""}`}>
              <header className="flex flex-wrap items-center gap-3">
                <span lang="en" className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest ring-1 ${BADGE[s.id]}`}>
                  {i + 1}. {s.id}
                </span>
                <h2 className="text-2xl font-black text-white">{s.title}</h2>
                {ok && <span className="ml-auto font-mono text-xs text-accent">✓ İmtahan keçildi</span>}
              </header>
              <p className="mt-2 text-slate-300">{s.goal}</p>
              {locked && (
                <p className="mt-3 text-sm text-amber-300/90">🔒 Tövsiyə: əvvəlcə «{prev.title}» imtahanını keç.</p>
              )}

              <div className="mt-4 flex items-center gap-3">
                <div className="h-1.5 flex-1 rounded bg-line"><div className="h-full rounded bg-accent transition-all" style={{ width: `${pct}%` }} /></div>
                <span className="font-mono text-xs text-slate-400">{pct}% dərs</span>
              </div>

              <ul className="mt-4 flex flex-wrap gap-2">
                {s.skills.map((k) => <li key={k} className="rounded-md border border-line px-2.5 py-1 text-xs text-slate-300">{k}</li>)}
              </ul>

              {/* Addımlar */}
              <h3 className="mt-6 font-mono text-xs uppercase tracking-widest text-slate-400">Öyrənmə addımları</h3>
              <div className="mt-3 space-y-2">
                {s.steps.map((st, j) => {
                  const n = names[st.lang];
                  const c = st.topics.filter((t) => done.has(`${st.lang}/${t}`)).length;
                  return (
                    <details key={j} className="group rounded-lg border border-line bg-ink/40">
                      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3">
                        <span className="text-accent transition group-open:rotate-90">›</span>
                        <span className="font-semibold text-white">{n.name}</span>
                        {st.optional && <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-400">seçimli</span>}
                        <span className="ml-auto font-mono text-xs text-slate-500">{c}/{st.topics.length}</span>
                      </summary>
                      <ol className="grid gap-1 px-4 pb-3 sm:grid-cols-2">
                        {st.topics.map((t) => {
                          const d = done.has(`${st.lang}/${t}`);
                          return (
                            <li key={t}>
                              <Link href={`/${track}/${st.lang}/${t}`} className="flex items-center gap-2 rounded px-2 py-2.5 md:py-1 text-sm text-slate-300 hover:bg-white/5 hover:text-white">
                                <span className={d ? "text-accent" : "text-slate-600"}>{d ? "✓" : "○"}</span>
                                {n.topics[t]}
                              </Link>
                            </li>
                          );
                        })}
                      </ol>
                    </details>
                  );
                })}
              </div>

              {/* Layihələr */}
              <h3 className="mt-6 font-mono text-xs uppercase tracking-widest text-slate-400">Portfolio layihələri</h3>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {s.projects.map((p) => (
                  <div key={p.title} className="rounded-lg border border-line bg-ink/40 p-4">
                    <p className="font-semibold text-white">🛠 {p.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{p.desc}</p>
                  </div>
                ))}
              </div>

              {/* İmtahan */}
              <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-accent/40 bg-accent/5 p-4">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-accent">🎓 Mərhələ imtahanı · {names[s.exam.lang].name}</p>
                  <p className="mt-1 text-sm text-slate-200">{s.exam.task}</p>
                </div>
                <Link href={`/mesq?imtahan=${exam}`} className="inline-flex min-h-11 items-center rounded-lg bg-accent px-4 py-2 text-sm font-bold text-ink hover:brightness-110">
                  {ok ? "Yenidən həll et" : "İmtahana gir →"}
                </Link>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
