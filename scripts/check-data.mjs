// Karyera yolundakı mövzu slug-larının languages.ts-də olduğunu yoxlayır
import { CAREER } from "../src/data/career.ts";
import { LANGUAGES } from "../src/data/languages.ts";
let bad = 0;
for (const [track, stages] of Object.entries(CAREER))
  for (const s of stages)
    for (const step of s.steps) {
      const l = LANGUAGES.find((x) => x.id === step.lang && x.track === track);
      if (!l) { console.log("dil yoxdur:", track, step.lang); bad++; continue; }
      for (const t of step.topics) if (!l.topics.some((x) => x.slug === t)) { console.log("mövzu yoxdur:", step.lang, t); bad++; }
    }
console.log(bad ? `${bad} xəta` : "OK");

// Heç bir mərhələyə düşməyən mövzular (xəbərdarlıq)
for (const l of LANGUAGES) {
  const used = new Set(CAREER[l.track].flatMap((s) => s.steps.filter((x) => x.lang === l.id).flatMap((x) => x.topics)));
  const miss = l.topics.filter((t) => !used.has(t.slug)).map((t) => t.slug);
  if (miss.length) console.log("mərhələsiz:", l.id, miss.join(", "));
}
process.exitCode = bad ? 1 : 0;
