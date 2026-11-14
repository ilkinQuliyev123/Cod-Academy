"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Language } from "@/data/types";
import { useDone } from "@/lib/progress";

/** Mövzu siyahısı: 1-cidən sonuncuya, oxunanlar işarələnir */
export default function TopicList({ lang, ready }: { lang: Language; ready: string[] }) {
  const path = usePathname();
  const done = useDone();
  const count = lang.topics.filter((t) => done.has(`${lang.id}/${t.slug}`)).length;
  const pct = Math.round((count / lang.topics.length) * 100);

  return (
    <nav aria-label={`${lang.name} mövzuları`}>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-mono text-xs uppercase tracking-widest text-slate-400"><span lang="en">{lang.name}</span> · mövzular</h2>
        <span className="font-mono text-xs text-accent">{pct}%</span>
      </div>
      <div className="mb-4 h-1 rounded bg-line">
        <div className="h-full rounded bg-accent transition-all" style={{ width: `${pct}%` }} />
      </div>
      <ol className="space-y-0.5">
        {lang.topics.map((t, i) => {
          const href = `/${lang.track}/${lang.id}/${t.slug}`;
          const on = path === href;
          const ok = done.has(`${lang.id}/${t.slug}`);
          const soon = !ready.includes(t.slug);
          return (
            <li key={t.slug}>
              <Link
                href={href}
                className={`flex items-center gap-3 rounded-md px-2 py-2.5 md:py-1.5 text-sm transition-colors ${
                  on ? "bg-accent/15 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded font-mono text-[10px] ${
                    ok ? "bg-accent text-ink" : on ? "ring-1 ring-accent text-accent" : "bg-line text-slate-500"
                  }`}
                >
                  {ok ? "✓" : i + 1}
                </span>
                <span className={`flex-1 ${soon ? "opacity-60" : ""}`}>{t.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
