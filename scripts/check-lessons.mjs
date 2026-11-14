import { pathToFileURL } from "node:url";
import { readFileSync, readdirSync } from "node:fs";
const dir = process.argv[2] ?? process.cwd(); // işlət: node --experimental-strip-types scripts/check-lessons.mjs
const lessonsDir = `${dir}/src/data/lessons`;
const lessonFiles = readdirSync(lessonsDir);
const { LANGUAGES } = await import(pathToFileURL(dir + "/src/data/languages.ts").href);
let done = 0, total = 0;
for (const l of LANGUAGES) {
  // <id>.ts və ya <id>-*.ts (məs. nestjs-b.ts, cpp-a.ts) fayllarının slug-ları birləşdirilir
  const files = lessonFiles.filter((n) => n === `${l.id}.ts` || (n.startsWith(`${l.id}-`) && n.endsWith(".ts")));
  const have = new Set(files.flatMap((n) => [...readFileSync(`${lessonsDir}/${n}`, "utf8").matchAll(/^ {4}slug: "([^"]+)"/gm)].map((m) => m[1])));
  const miss = l.topics.filter((t) => !have.has(t.slug)).map((t) => t.slug);
  const extra = [...have].filter((s) => !l.topics.some((t) => t.slug === s));
  total += l.topics.length; done += l.topics.length - miss.length;
  console.log(`${l.id} ${l.topics.length - miss.length}/${l.topics.length}` + (miss.length ? " — qalır: " + miss.join(", ") : "") + (extra.length ? " — ARTIQ: " + extra.join(",") : ""));
}
console.log(`CƏMİ ${done}/${total}`);
