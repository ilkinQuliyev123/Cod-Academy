import Link from "next/link";
import { notFound } from "next/navigation";
import { isTrack, langsOf, TRACKS } from "@/data/languages";

export default async function TrackPage({ params }: PageProps<"/[track]">) {
  const { track } = await params;
  if (!isTrack(track)) notFound();
  const t = TRACKS[track];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 grid-bg">
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">Bölmə</p>
      <h1 className="mt-2 text-4xl md:text-6xl font-black glow">{t.name}</h1>
      <p className="mt-3 max-w-xl text-slate-400">
        {t.tagline}. Dili seç — hər mövzu başlanğıcdan senior səviyyəsinə qədər izah olunur.
      </p>

      <Link
        href={`/${track}/yol`}
        className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-accent/40 bg-accent/5 p-5 transition hover:bg-accent/10"
      >
        <span className="text-3xl">🧭</span>
        <span className="min-w-0 flex-1">
          <span className="block font-bold text-white">Karyera yolu: Junior → Middle → Senior</span>
          <span className="block text-sm text-slate-400">Nəyi hansı sıra ilə öyrənəcəyini, layihələri və mərhələ imtahanlarını gör.</span>
        </span>
        <span className="font-mono text-sm text-accent">Başla →</span>
      </Link>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {langsOf(track).map((l, i) => (
          <li key={l.id}>
            <Link
              href={`/${track}/${l.id}`}
              className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-xl border border-line bg-panel p-5 transition hover:-translate-y-0.5 hover:border-accent/60"
            >
              <span className="absolute right-4 top-4 font-mono text-xs text-slate-600">{String(i + 1).padStart(2, "0")}</span>
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent/10 font-mono text-sm font-black text-accent ring-1 ring-accent/30">
                {l.short}
              </span>
              <h2 className="text-lg font-bold text-white">{l.name}</h2>
              <p className="text-sm text-slate-400">{l.desc}</p>
              <span className="mt-auto font-mono text-xs text-slate-500 group-hover:text-accent">
                {l.topics.length} mövzu →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
