import Link from "next/link";
import type { ReactNode } from "react";
import CodeBlock from "./CodeBlock";

/** AI cavabları üçün kiçik, təhlükəsiz markdown (innerHTML yox, yalnız daxili linklər) */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|\[([^\]]+)\]\((\/[^)\s]*)\)/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    out.push(text.slice(last, m.index));
    const k = m.index;
    if (m[1]) out.push(<code key={k} className="rounded bg-white/10 px-1 font-mono text-[0.9em] text-accent">{m[1].slice(1, -1)}</code>);
    else if (m[2]) out.push(<strong key={k} className="text-white">{m[2].slice(2, -2)}</strong>);
    else out.push(<Link key={k} href={m[4]} className="text-accent underline underline-offset-2">{m[3]}</Link>);
    last = k + m[0].length;
  }
  out.push(text.slice(last));
  return out;
}

export default function Markdown({ text }: { text: string }) {
  const parts = text.split(/```(\w*)\n([\s\S]*?)```/g);
  const nodes: ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    const lines = parts[i].split("\n");
    let list: string[] = [];
    const flush = (key: string) => {
      if (list.length) nodes.push(<ul key={key} className="ml-4 list-disc space-y-1">{list.map((l, j) => <li key={j}>{inline(l)}</li>)}</ul>);
      list = [];
    };
    lines.forEach((l, j) => {
      const key = `${i}-${j}`;
      const li = l.match(/^\s*(?:[-*]|\d+\.)\s+(.*)/);
      if (li) return void list.push(li[1]);
      flush(key + "l");
      const h = l.match(/^#{1,4}\s+(.*)/);
      if (h) nodes.push(<p key={key} className="font-bold text-white">{inline(h[1])}</p>);
      else if (l.trim()) nodes.push(<p key={key}>{inline(l)}</p>);
    });
    flush(`${i}-end`);
    if (parts[i + 2] !== undefined) nodes.push(<CodeBlock key={`c${i}`} code={parts[i + 2].trimEnd()} lang={parts[i + 1] || "code"} />);
  }
  return <div className="space-y-2 text-sm leading-relaxed text-slate-300">{nodes}</div>;
}
