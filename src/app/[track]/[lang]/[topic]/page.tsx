import Link from "next/link";
import { notFound } from "next/navigation";
import { getLang, LANGUAGES } from "@/data/languages";
import { getLesson } from "@/data/lessons";
import LessonView from "@/components/LessonView";
import DoneButton from "@/components/DoneButton";

export const generateStaticParams = () =>
  LANGUAGES.flatMap((l) => l.topics.map((t) => ({ track: l.track, lang: l.id, topic: t.slug })));

export async function generateMetadata({ params }: PageProps<"/[track]/[lang]/[topic]">) {
  const { track, lang: id, topic } = await params;
  const lang = getLang(track, id);
  const t = lang?.topics.find((x) => x.slug === topic);
  return { title: t ? `${t.title} — ${lang!.name} | Kod Akademiyası` : "Kod Akademiyası" };
}

export default async function TopicPage({ params }: PageProps<"/[track]/[lang]/[topic]">) {
  const { track, lang: id, topic } = await params;
  const lang = getLang(track, id);
  const idx = lang?.topics.findIndex((t) => t.slug === topic) ?? -1;
  if (!lang || idx < 0) notFound();

  const t = lang.topics[idx];
  const prev = lang.topics[idx - 1];
  const next = lang.topics[idx + 1];
  const lesson = getLesson(lang.id, t.slug);
  const base = `/${track}/${lang.id}`;

  return (
    <article className="max-w-3xl">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        <span lang="en">{lang.name}</span> · Mövzu {idx + 1}/{lang.topics.length}
      </p>
      <h1 className="mt-2 text-3xl md:text-4xl font-black text-white">{t.title}</h1>

      {lesson ? (
        <>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">{lesson.intro}</p>
          <div className="mt-10"><LessonView lesson={lesson} id={`${lang.id}/${t.slug}`} /></div>
          {lesson.exercise && (
            <div className="mt-12 rounded-xl border border-accent/40 bg-accent/5 p-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent">⌨ Tapşırıq · bütün səviyyələr üçün ümumi</p>
              <p className="mt-2 text-slate-200">{lesson.exercise.task}</p>
              <Link
                href={`/mesq?dil=${lang.id}&movzu=${t.slug}`}
                className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-accent px-4 py-2 text-sm font-bold text-ink hover:brightness-110"
              >
                Məşq et — AI yoxlasın →
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="mt-8 rounded-xl border border-dashed border-line p-8 text-center">
          <p className="text-2xl">🛠</p>
          <p className="mt-2 text-slate-300">Bu dərs hazırlanır.</p>
          <p className="text-sm text-slate-500">Hələlik sualını AI müəllimə verə bilərsən.</p>
        </div>
      )}

      <footer className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        {prev ? <Link href={`${base}/${prev.slug}`} className="inline-flex min-h-11 items-center text-sm text-slate-400 hover:text-white">← {prev.title}</Link> : <span />}
        {lesson && <DoneButton id={`${lang.id}/${t.slug}`} />}
        {next ? <Link href={`${base}/${next.slug}`} className="inline-flex min-h-11 items-center text-sm text-slate-400 hover:text-white">{next.title} →</Link> : <span />}
      </footer>
    </article>
  );
}
