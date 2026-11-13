import { notFound } from "next/navigation";
import Roadmap from "@/components/Roadmap";
import { CAREER } from "@/data/career";
import { isTrack, langsOf, TRACKS } from "@/data/languages";

export const generateStaticParams = () => [{ track: "frontend" }, { track: "backend" }];
export const metadata = { title: "Karyera yolu — Kod Akademiyası" };

export default async function YolPage({ params }: PageProps<"/[track]/yol">) {
  const { track } = await params;
  if (!isTrack(track)) notFound();
  const names = Object.fromEntries(
    langsOf(track).map((l) => [l.id, { name: l.name, topics: Object.fromEntries(l.topics.map((t) => [t.slug, t.title])) }]),
  );

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12">
      <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">{TRACKS[track].name} · karyera yolu</p>
      <h1 className="mt-2 text-4xl md:text-6xl font-black glow">Sıfırdan Senior-a</h1>
      <p className="mt-4 max-w-2xl text-slate-400">
        Üç mərhələ: <b className="text-emerald-300">Junior</b> → <b className="text-amber-300">Middle</b> → <b className="text-fuchsia-300">Senior</b>.
        Hər mərhələdə dərsləri sıra ilə oxu, layihələri qur, sonda AI-nin yoxladığı imtahanı keç.
      </p>
      <Roadmap track={track} stages={CAREER[track]} names={names} />
    </main>
  );
}
