"use client";

import { useEffect, useState, type ReactNode } from "react";

type Show = "baslangic" | "orta" | "senior";
const TABS: { id: Show; label: string; on: string }[] = [
  { id: "baslangic", label: "Başlanğıc", on: "bg-emerald-500/20 text-emerald-300 ring-emerald-500/50" },
  { id: "orta", label: "Orta", on: "bg-amber-500/20 text-amber-300 ring-amber-500/50" },
  { id: "senior", label: "Senior", on: "bg-fuchsia-500/20 text-fuchsia-300 ring-fuchsia-500/50" },
];

/** Səviyyə seçimi: yalnız seçilən səviyyənin bölmələri görünür (CSS ilə gizlədilir). */
export default function LevelSwitch({ children }: { children: ReactNode }) {
  const [show, setShow] = useState<Show>("baslangic");

  // Link #senior / #orta ilə gələndə həmin səviyyə açılsın
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (h === "senior" || h === "orta" || h === "baslangic") setShow(h);
  }, []);

  function pick(id: Show) {
    setShow(id);
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
            {t.label}
          </button>
        ))}
      </div>
      <div data-show={show} className="mt-6 level-root">{children}</div>
    </div>
  );
}
