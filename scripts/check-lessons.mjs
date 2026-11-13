import { pathToFileURL } from "node:url";
import { readFileSync, existsSync } from "node:fs";
const dir = process.argv[2] ?? process.cwd(); // işlət: node --experimental-strip-types scripts/check-lessons.mjs
const { LANGUAGES } = await import(pathToFileURL(dir + "/src/data/languages.ts").href);
let done = 0, total = 0;
for (const l of LANGUAGES) {
  const f = `${dir}/src/data/lessons/${l.id}.ts`;
  const have = new Set(existsSync(f) ? [...readFileSync(f, "utf8").matchAll(/^ {4}slug: "([^"]+)"/gm)].map((m) => m[1]) : []);
  const miss = l.topics.filter((t) => !have.has(t.slug)).map((t) => t.slug);
  const extra = [...have].filter((s) => !l.topics.some((t) => t.slug === s));
  total += l.topics.length; done += l.topics.length - miss.length;
  console.log(`${l.id} ${l.topics.length - miss.length}/${l.topics.length}` + (miss.length ? " — qalır: " + miss.join(", ") : "") + (extra.length ? " — ARTIQ: " + extra.join(",") : ""));
}
console.log(`CƏMİ ${done}/${total}`);
