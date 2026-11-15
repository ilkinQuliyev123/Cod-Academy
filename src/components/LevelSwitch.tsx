"use client";

import { useEffect, useState, type ReactNode } from "react";
import { toggleDone, useDone } from "@/lib/progress";

type Show = "baslangic" | "orta" | "senior";
const TABS: { id: Show; label: string; on: string }[] = [
  { id: "baslangic", label: "Başlanğıc", on: "bg-emerald-500/20 text-emerald-300 ring-emerald-500/50" },
  { id: "orta", label: "Orta", on: "bg-amber-500/20 text-amber-300 ring-amber-500/50" },
  { id: "senior", label: "Senior", on: "bg-fuchsia-500/20 text-fuchsia-300 ring-fuchsia-500/50" },
];

/** Səviyyə seçimi: yalnız seçilən səviyyənin bölmələri görünür (CSS ilə gizlədilir). */
export default function LevelSwitch({ id, children }: { id: string; children: ReactNode }) {
  const [show, setShow] = useState<Show>("baslangic");
  const done = useDone();

  // Əvvəl link #hash, yoxsa son seçilən səviyyə (dərslər arasında yadda qalır)
  useEffect(() => {
    const ok = (v: unknown): v is Show => v === "senior" || v === "orta" || v === "baslangic";
    const h = window.location.hash.slice(1);
    let saved: string | null = null;
    try { saved = localStorage.getItem("seviye"); } catch {}
    const v = ok(h) ? h : ok(saved) ? saved : null;
    if (v) setShow(v);
  }, []);

  function pick(id: Show) {
    setShow(id);
    try { localStorage.setItem("seviye", id); } catch {}
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <div>
      <div role="tablist" aria-label="Səviyyə" className="flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={show === t.id}
            onClick={() => pick(t.id)}
            className={`min-h-11 flex-1 rounded-lg px-3 text-sm font-bold ring-1 transition sm:flex-none sm:px-6 ${show === t.id ? t.on : "text-slate-400 ring-line hover:text-white"}`}
          >
            {done.has(`${id}#${t.id}`) && <span aria-hidden>✓ </span>}{t.label}
          </button>
        ))}
      </div>
      <div data-show={show} className="mt-6 level-root">{children}</div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => toggleDone(`${id}#${show}`)}
          className={`min-h-11 rounded-lg px-4 text-sm font-bold transition ${done.has(`${id}#${show}`) ? "bg-accent text-ink" : "border border-accent/50 text-accent hover:bg-accent/10"}`}
        >
          {done.has(`${id}#${show}`) ? "✓ Bu səviyyə oxundu" : "Bu səviyyəni oxudum"}
        </button>
      </div>
    </div>
  );
}
