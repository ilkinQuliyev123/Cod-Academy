import { highlight } from "@/lib/highlight";
import CopyButton from "./CopyButton";

export default function CodeBlock({ code, lang, caption, tone }: {
  code: string; lang: string; caption?: string; tone?: "bad" | "good";
}) {
  const ring = tone === "bad" ? "border-rose-500/50" : tone === "good" ? "border-emerald-500/50" : "border-line";
  return (
    <figure className={`group relative overflow-hidden rounded-lg border ${ring} bg-[#080b13]`}>
      <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
        <span lang="en" className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
          {tone === "bad" ? "✘ səhv" : tone === "good" ? "✔ düzgün" : lang}
        </span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-slate-200">
        <code dangerouslySetInnerHTML={{ __html: highlight(code, lang) }} />
      </pre>
      {caption && <figcaption className="border-t border-line px-3 py-1.5 text-xs text-slate-500">{caption}</figcaption>}
    </figure>
  );
}
