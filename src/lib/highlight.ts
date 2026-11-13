/** Yüngül kod rəngləyici (asılılıqsız). Token sinifləri globals.css-də: tok-k/s/n/c/t */
const KW = new Set(
  ("const let var function return if else for while do switch case break continue new class extends import export from default async await try catch finally throw typeof instanceof in of this null undefined true false " +
   "def elif lambda pass None True False and or not is with as yield raise except print " +
   "public private protected static void int string bool double float char using namespace struct interface enum override virtual readonly var " +
   "include std cout cin endl auto template typename delete " +
   "SELECT FROM WHERE INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE JOIN LEFT RIGHT INNER ON GROUP BY ORDER HAVING LIMIT AS AND OR NOT NULL PRIMARY KEY FOREIGN REFERENCES INDEX DISTINCT COUNT SUM AVG MIN MAX").split(" "),
);
const RE =
  /(\/\/.*|#(?!include).*|--.*|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|(<\/?[a-zA-Z][\w-]*|\/?>)|([A-Za-z_$][\w$]*)/g;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function highlight(code: string, lang: string): string {
  const isPy = lang === "python";
  let out = "";
  let last = 0;
  const wrap = (cls: string, m: string) => `<span class="${cls}">${esc(m)}</span>`;
  for (const x of code.matchAll(RE)) {
    const [m, c, s, n, tag, w] = x;
    out += esc(code.slice(last, x.index));
    last = x.index + m.length;
    // # yalnız Python-da, -- yalnız SQL-də şərhdir
    if (c && !((m.startsWith("#") && !isPy) || (m.startsWith("--") && lang !== "sql"))) out += wrap("tok-c", m);
    else if (s) out += wrap("tok-s", m);
    else if (n) out += wrap("tok-n", m);
    else if (tag) out += wrap("tok-t", m);
    else if (w && KW.has(w)) out += wrap("tok-k", m);
    else out += esc(m);
  }
  return out + esc(code.slice(last));
}
