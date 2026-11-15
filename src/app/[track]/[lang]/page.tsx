import Link from "next/link";
import { notFound } from "next/navigation";
import { getLang } from "@/data/languages";

export default async function LangPage({ params }: PageProps<"/[track]/[lang]">) {
  const { track, lang: id } = await params;
  const lang = getLang(track, id);
  if (!lang) notFound();
  const first = lang.topics[0];

  return (
    <article className="max-w-3xl">
      <span className="grid h-14 w-14 place-items-center rounded-xl bg-accent/10 font-mono text-lg font-black text-accent ring-1 ring-accent/30">
        {lang.short}
      </span>
      <h1 className="mt-4 text-4xl font-black glow">{lang.name}</h1>
      <p className="mt-3 text-lg text-slate-300">{lang.desc}</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          ["Başlanğıc", "Nədir, sintaksis, hər sözün mənası", "baslangic"],
          ["Orta", "Real nümunələr, məntiq, tipik səhvlər", "orta"],
          ["Senior", "Daxili işləmə, performans, müsahibə", "senior"],
        ].map(([h, p, id]) => (
          <Link key={h} href={`/${track}/${lang.id}/${first.slug}#${id}`} className="block rounded-lg border border-line bg-panel p-4 transition hover:border-accent/60 hover:bg-white/5">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">{h} →</h3>
            <p className="mt-1 text-sm text-slate-400">{p}</p>
          </Link>
        ))}
      </div>
      <Link
        href={`/${track}/${lang.id}/${first.slug}`}
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-bold text-ink transition hover:brightness-110"
      >
        1-ci mövzudan başla: {first.title} →
      </Link>
    </article>
  );
}
