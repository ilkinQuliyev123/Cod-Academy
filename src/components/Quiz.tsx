"use client";

import { useState } from "react";

export default function Quiz({ q, options, answer, why }: { q: string; options: string[]; answer: number; why: string }) {
  const [pick, setPick] = useState<number | null>(null);
  const done = pick !== null;
  return (
    <div className="rounded-lg border border-line bg-panel p-4">
      <p className="font-medium text-white">❓ {q}</p>
      <div className="mt-3 grid gap-2">
        {options.map((o, i) => {
          const state = !done ? "border-line hover:border-accent/60" : i === answer ? "border-emerald-500 bg-emerald-500/10" : i === pick ? "border-rose-500 bg-rose-500/10" : "border-line opacity-50";
          return (
            <button key={i} disabled={done} onClick={() => setPick(i)} className={`min-h-11 rounded-md border px-3 py-2 text-left font-mono text-sm transition ${state}`}>
              {o}
            </button>
          );
        })}
      </div>
      {done && (
        <p className={`mt-3 text-sm ${pick === answer ? "text-emerald-400" : "text-rose-400"}`}>
          {pick === answer ? "Düzdür! " : "Səhvdir. "}
          <span className="text-slate-300">{why}</span>
        </p>
      )}
    </div>
  );
}
