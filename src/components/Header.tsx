"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { TrackId } from "@/data/types";
import { langsOf, TRACKS } from "@/data/languages";

export default function Header({ track }: { track: TrackId }) {
  const path = usePathname();
  const other: TrackId = track === "frontend" ? "backend" : "frontend";
  const active = path.split("/")[2];

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 h-14">
        <Link href="/" className="flex items-center gap-2 shrink-0" title="Tərəf seçiminə qayıt">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-accent font-mono text-xs font-black text-ink">{"</>"}</span>
          <span className="hidden sm:block font-mono text-xs tracking-[0.3em] text-slate-300">KOD AKADEMİYASI</span>
        </Link>
        <Link
          href={`/${track}`}
          className="shrink-0 rounded border border-accent/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent"
        >
          {TRACKS[track].name}
        </Link>
        <div className="flex-1" />
        <Link href={`/${track}/yol`} className={`shrink-0 text-sm ${active === "yol" ? "text-accent" : "text-slate-400 hover:text-white"}`}>
          Karyera yolu
        </Link>
        <Link href="/mesq" className="shrink-0 text-sm text-slate-400 hover:text-white">
          Məşq
        </Link>
        <Link href={`/${other}`} className="shrink-0 text-sm text-slate-400 hover:text-white">
          {TRACKS[other].name} →
        </Link>
      </div>
      {/* Dil seçimi */}
      <nav className="mx-auto max-w-7xl px-4 overflow-x-auto [scrollbar-width:none]">
        <ul className="flex gap-1 pb-2">
          {langsOf(track).map((l) => {
            const on = l.id === active;
            return (
              <li key={l.id}>
                <Link
                  href={`/${track}/${l.id}`}
                  className={`block whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors ${
                    on ? "bg-accent/15 text-accent ring-1 ring-accent/40" : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {l.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
