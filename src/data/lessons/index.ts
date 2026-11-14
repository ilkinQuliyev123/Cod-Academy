import type { Lesson } from "../types";
import { javascript } from "./javascript";
import { html } from "./html";
import { python } from "./python";
import { css } from "./css";
import { sql } from "./sql";
import { csharp } from "./csharp";
import { typescript } from "./typescript";
import { react } from "./react";
import { tailwind } from "./tailwind";
import { nextjs } from "./nextjs";
import { mysql } from "./mysql";

const ALL: Record<string, Lesson[]> = { javascript, html, python, css, sql, csharp, typescript, react, tailwind, nextjs, mysql };

export const getLesson = (lang: string, slug: string) =>
  ALL[lang]?.find((l) => l.slug === slug);

export const hasLesson = (lang: string, slug: string) => !!getLesson(lang, slug);

/** AI agent üçün: dərsin düz mətni */
export function lessonText(l: Lesson): string {
  const out = [`# ${l.title}`, l.intro];
  for (const s of l.sections) {
    out.push(`## ${s.title}`);
    for (const b of s.blocks) {
      if (b.t === "p" || b.t === "tip" || b.t === "warn" || b.t === "analogy" || b.t === "h") out.push(b.text);
      else if (b.t === "code") out.push(b.code);
      else if (b.t === "terms") out.push(b.items.map(([w, m]) => `${w}: ${m}`).join("\n"));
      else if (b.t === "list") out.push(b.items.join("\n"));
      else if (b.t === "mistake") out.push(`Səhv: ${b.wrong}\nDüz: ${b.right}\n${b.why}`);
      else if (b.t === "qa") out.push(b.items.map(([q, a]) => `${q} ${a}`).join("\n"));
    }
  }
  return out.join("\n\n");
}
