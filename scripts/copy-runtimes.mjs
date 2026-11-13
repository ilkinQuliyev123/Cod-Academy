// Pyodide və sql.js fayllarını public/runtimes-ə köçürür (CDN-siz, öz serverimizdən).
import { cpSync, mkdirSync } from "node:fs";

const copy = (from, to, files) => {
  mkdirSync(to, { recursive: true });
  for (const f of files) cpSync(`${from}/${f}`, `${to}/${f}`);
};
copy("node_modules/pyodide", "public/runtimes/pyodide",
  ["pyodide.mjs", "pyodide.asm.mjs", "pyodide.asm.wasm", "python_stdlib.zip", "pyodide-lock.json"]);
copy("node_modules/sql.js/dist", "public/runtimes/sql", ["sql-wasm.js", "sql-wasm.wasm"]);
console.log("runtimes köçürüldü");
