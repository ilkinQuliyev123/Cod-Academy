import { Suspense } from "react";
import Link from "next/link";
import Playground from "@/components/Playground";
import { LANGUAGES } from "@/data/languages";
import { getLesson } from "@/data/lessons";
import { STARTERS } from "@/data/starters";
import { getExam } from "@/data/career";

export const metadata = { title: "Məşq — Kod Akademiyası" };

async function Play({ searchParams }: { searchParams: PageProps<"/mesq">["searchParams"] }) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const exam = getExam(one(sp.imtahan) ?? "");
  const lang =
    LANGUAGES.find((l) => l.id === (exam?.stage.exam.lang ?? one(sp.dil))) ?? LANGUAGES.find((l) => l.id === "javascript")!;
  const topic = one(sp.movzu);
  const lesson = !exam && topic ? getLesson(lang.id, topic) : undefined;
  const tasks = lang.topics.filter((t) => getLesson(lang.id, t.slug)?.exercise);

  return (
    <Playground
      key={`${lang.id}/${lesson?.slug}/${exam?.stage.id}`}
      exam={exam ? { id: `${exam.track}-${exam.stage.id}`, title: exam.stage.title, track: exam.track } : undefined}
      langs={LANGUAGES.map(({ id, name, track, editor, runnable }) => ({ id, name, track, editor, runnable }))}
      langId={lang.id}
      topic={lesson?.slug}
      task={exam?.stage.exam.task ?? lesson?.exercise?.task}
      starter={exam?.stage.exam.starter ?? lesson?.exercise?.starter ?? STARTERS[lang.id] ?? ""}
      tasks={tasks}
    />
  );
}

export default function Mesq(props: PageProps<"/mesq">) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 items-center gap-3 border-b border-line px-4">
        <Link href="/" className="grid h-7 w-7 place-items-center rounded-md bg-blue-team font-mono text-xs font-black text-ink">{"</>"}</Link>
        <span className="font-mono text-xs tracking-[0.3em] text-slate-300">MƏŞQ MEYDANÇASI</span>
        <div className="flex-1" />
        <Link href="/frontend" className="text-sm text-slate-400 hover:text-blue-team">Front End</Link>
        <Link href="/backend" className="text-sm text-slate-400 hover:text-red-team">Back End</Link>
      </header>
      <Suspense fallback={<p className="p-8 font-mono text-sm text-slate-500">Yüklənir…</p>}>
        <Play searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
