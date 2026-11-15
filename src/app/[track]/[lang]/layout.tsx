import { notFound } from "next/navigation";
import TopicList from "@/components/TopicList";
import { getLang, LANGUAGES } from "@/data/languages";
import { hasLesson } from "@/data/lessons";

export const generateStaticParams = () => LANGUAGES.map((l) => ({ track: l.track, lang: l.id }));

export default async function LangLayout({ children, params }: LayoutProps<"/[track]/[lang]">) {
  const { track, lang: id } = await params;
  const lang = getLang(track, id);
  if (!lang) notFound();
  const ready = lang.topics.filter((t) => hasLesson(lang.id, t.slug)).map((t) => t.slug);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 lg:flex-row">
      <aside className="lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)] lg:w-72 lg:shrink-0 lg:overflow-y-auto">
        <details className="lg:hidden rounded-lg border border-line bg-panel p-3" >
          <summary className="flex min-h-11 cursor-pointer items-center text-sm text-slate-300">Mövzu siyahısı</summary>
          <div className="mt-3"><TopicList lang={lang} ready={ready} /></div>
        </details>
        <div className="hidden lg:block"><TopicList lang={lang} ready={ready} /></div>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
