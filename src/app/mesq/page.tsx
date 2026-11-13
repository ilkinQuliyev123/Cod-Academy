import Link from "next/link";

export default function Mesq() {
  return (
    <main className="grid flex-1 place-items-center p-8 text-center grid-bg">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-blue-team">Mərhələ 3</p>
        <h1 className="mt-2 text-4xl font-black">Məşq səhifəsi hazırlanır</h1>
        <p className="mt-3 text-slate-400">Burada kod yazacaq, işə salacaq və AI müəllimə yoxlatdıracaqsan.</p>
        <Link href="/" className="mt-6 inline-block text-sm text-slate-300 underline">← Ana səhifə</Link>
      </div>
    </main>
  );
}
