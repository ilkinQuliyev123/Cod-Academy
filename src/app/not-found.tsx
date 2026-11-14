import Link from "next/link";

export const metadata = { title: "Səhifə tapılmadı — Kod Akademiyası" };

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div className="max-w-md space-y-4">
        <p className="font-mono text-6xl font-black text-accent">404</p>
        <h1 className="text-2xl font-black text-white">Səhifə tapılmadı</h1>
        <p className="text-slate-400">Axtardığın dərs və ya səhifə mövcud deyil, yaxud köçürülüb.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 font-bold text-ink hover:brightness-110">Ana səhifə</Link>
          <Link href="/mesq" className="inline-flex min-h-11 items-center rounded-md border border-line px-5 text-slate-300 hover:text-white">Məşq meydançası</Link>
        </div>
      </div>
    </main>
  );
}
