"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { TrackId } from "@/data/types";
import { langsOf, TRACKS } from "@/data/languages";

export default function Header({ track }: { track: TrackId }) {
  const path = usePathname();
  const other: TrackId = track === "frontend" ? "backend" : "frontend";
  const active = path.split("/")[2];
  // Mobil menyu: hansı səhifədə açıldığını saxlayırıq — səhifə dəyişəndə avtomatik bağlanır
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === path;
  const links = [
    { href: `/${track}/yol`, label: "Karyera yolu", on: active === "yol" },
    { href: "/mesq", label: "Məşq", on: false },
    { href: `/${other}`, label: `${TRACKS[other].name} →`, on: false },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0 relative after:absolute after:-inset-y-3 after:inset-x-0 after:content-['']" title="Tərəf seçiminə qayıt">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-accent font-mono text-xs font-black text-ink">{"</>"}</span>
          <span className="hidden sm:block font-mono text-xs tracking-[0.3em] text-slate-300">KOD AKADEMİYASI</span>
        </Link>
        <Link
          href={`/${track}`}
          className="shrink-0 relative after:absolute after:-inset-y-3 after:inset-x-0 after:content-[''] rounded border border-accent/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent"
        >
          {TRACKS[track].name}
        </Link>
        <div className="flex-1" />
        <nav aria-label="Əsas" className="hidden items-center gap-4 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`shrink-0 py-2 text-sm ${l.on ? "text-accent" : "text-slate-400 hover:text-white"}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          aria-label="Menyu"
          aria-expanded={open}
          aria-controls="mobil-menyu"
          onClick={() => setOpenAt(open ? null : path)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-md text-xl text-slate-300 hover:bg-white/5 md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <nav id="mobil-menyu" aria-label="Mobil menyu" className="border-t border-line bg-ink/95 px-4 py-2 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`flex min-h-11 items-center text-base ${l.on ? "text-accent" : "text-slate-300"}`}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
      {/* Dil seçimi */}
      <nav aria-label="Dillər" className="mx-auto max-w-7xl overflow-x-auto px-4 [scrollbar-width:none] [mask-image:linear-gradient(to_right,#000_calc(100%-28px),transparent)] md:[mask-image:none]">
        <ul className="flex gap-1 pb-2">
          {langsOf(track).map((l) => {
            const on = l.id === active;
            return (
              <li key={l.id}>
                <Link
                  href={`/${track}/${l.id}`}
                  className={`block whitespace-nowrap rounded-md px-3 py-2.5 text-sm md:py-1.5 transition-colors ${
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
