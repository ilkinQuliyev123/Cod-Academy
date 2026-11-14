"use client";

import { useEffect } from "react";

/** Gözlənilməz icra xətası: istifadəçi xam xəta görmür, yenidən cəhd edə bilir (Next 16: `retry`). */
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error); // detal yalnız konsolda/loqda — istifadəçiyə göstərilmir
  }, [error]);

  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div className="max-w-md space-y-4">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Xəta</p>
        <h1 className="text-3xl font-black text-white">Nəsə səhv getdi</h1>
        <p className="text-slate-400">Narahat olma, sənin irəliləyişin itmir. Səhifəni yenidən yükləməyi yoxla.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => retry()} className="min-h-11 rounded-md bg-accent px-5 font-bold text-ink hover:brightness-110">
            Yenidən yoxla
          </button>
          <a href="/" className="inline-flex min-h-11 items-center rounded-md border border-line px-5 text-slate-300 hover:text-white">
            Ana səhifə
          </a>
        </div>
      </div>
    </main>
  );
}
