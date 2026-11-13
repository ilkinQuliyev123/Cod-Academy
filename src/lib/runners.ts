"use client";

/** Kodu brauzerdə, ayrıca Worker-də işə salır (səhifə donmasın, sonsuz dövr dayandırılsın). */

export type OutLine = { kind: "log" | "error" | "warn" | "info"; text: string };
export type SqlTable = { columns: string[]; values: unknown[][] };
export type RunResult = { lines: OutLine[]; tables?: SqlTable[]; ms: number };

const workerFrom = (src: string, type: WorkerType = "classic") =>
  new Worker(URL.createObjectURL(new Blob([src], { type: "text/javascript" })), { type });

const fmt = `const fmt = (v) => {
  if (typeof v === "string") return v;
  if (v instanceof Error) return v.name + ": " + v.message;
  if (typeof v === "function") return "ƒ " + (v.name || "anonim");
  if (v === null || typeof v !== "object") return String(v);
  try { return JSON.stringify(v, (k, x) => typeof x === "function" ? "ƒ " + (x.name || "anonim") : x === undefined ? "undefined" : x, 2) ?? String(v); }
  catch { return String(v); }
};`;

// ───────── JavaScript / TypeScript ─────────
const JS_WORKER = `${fmt}
const send = (kind, args) => postMessage({ kind, text: args.map(fmt).join(" ") });
for (const k of ["log", "info", "warn", "error"]) console[k] = (...a) => send(k === "info" ? "info" : k, a);
console.table = (d) => send("log", [d]);
self.onmessage = async (e) => {
  try {
    const AsyncFn = Object.getPrototypeOf(async function () {}).constructor;
    await new AsyncFn(e.data)();
  } catch (err) { send("error", [err]); }
  postMessage({ done: true });
};
self.onunhandledrejection = (e) => send("error", ["Tutulmamış Promise xətası: " + fmt(e.reason)]);`;

async function runJs(code: string, ts: boolean): Promise<OutLine[]> {
  if (ts) {
    const { transform } = await import("sucrase");
    code = transform(code, { transforms: ["typescript"] }).code;
  }
  return new Promise((resolve) => {
    const lines: OutLine[] = [];
    const w = workerFrom(JS_WORKER);
    let idle: ReturnType<typeof setTimeout>;
    const finish = (extra?: OutLine) => {
      clearTimeout(hard); clearTimeout(idle); w.terminate();
      resolve(extra ? [...lines, extra] : lines);
    };
    // 5 s limit: sonsuz dövr və ya çox uzun iş
    const hard = setTimeout(() => finish({ kind: "error", text: "⏱ Vaxt bitdi (5 s). Sonsuz dövr ola bilər?" }), 5000);
    w.onmessage = (e) => {
      if (e.data.done) idle = setTimeout(() => finish(), 400); // setTimeout-lu kodlar üçün qısa gözləmə
      else lines.push(e.data);
    };
    w.onerror = (e) => { e.preventDefault(); finish({ kind: "error", text: e.message }); };
    w.postMessage(code);
  });
}

// ───────── Python (Pyodide, öz serverimizdən) ─────────
const PY_WORKER = `
const base = ORIGIN + "/runtimes/pyodide/";
let py;
const ready = (async () => {
  const { loadPyodide } = await import(base + "pyodide.mjs");
  py = await loadPyodide({ indexURL: base });
  py.setStdin({ stdin: () => { throw new Error("input() məşq səhifəsində dəstəklənmir — dəyəri dəyişənə özün yaz."); } });
})();
self.onmessage = async (e) => {
  try { await ready; } catch (err) { postMessage({ kind: "error", text: "Python yüklənmədi: " + err }); postMessage({ done: true }); return; }
  py.setStdout({ batched: (t) => postMessage({ kind: "log", text: t }) });
  py.setStderr({ batched: (t) => postMessage({ kind: "error", text: t }) });
  try { await py.runPythonAsync(e.data); }
  catch (err) { postMessage({ kind: "error", text: String(err.message).split("\\n").filter(Boolean).slice(-3).join("\\n") }); }
  postMessage({ done: true });
};`;

let pyWorker: Worker | null = null;
function runPython(code: string, onStatus?: (s: string) => void): Promise<OutLine[]> {
  if (!pyWorker) {
    onStatus?.("Python yüklənir (ilk dəfə ~5 s)…");
    pyWorker = workerFrom(`const ORIGIN = ${JSON.stringify(location.origin)};` + PY_WORKER, "module");
  }
  const w = pyWorker;
  return new Promise((resolve) => {
    const lines: OutLine[] = [];
    const hard = setTimeout(() => {
      w.terminate(); pyWorker = null; // donmuş worker-i at, növbəti dəfə yenisi
      resolve([...lines, { kind: "error", text: "⏱ Vaxt bitdi (20 s). Sonsuz dövr ola bilər?" }]);
    }, 20000);
    w.onmessage = (e) => {
      if (e.data.done) { clearTimeout(hard); resolve(lines); }
      else lines.push(e.data);
    };
    w.postMessage(code);
  });
}

// ───────── SQL (sql.js / SQLite) ─────────
export const SAMPLE_DB = `CREATE TABLE telebeler (id INTEGER PRIMARY KEY, ad TEXT, soyad TEXT, yas INTEGER, seher TEXT);
INSERT INTO telebeler VALUES (1,'Aysel','Məmmədova',20,'Bakı'),(2,'Murad','Əliyev',22,'Gəncə'),(3,'Nərmin','Həsənova',19,'Bakı'),(4,'Tural','Quliyev',24,'Sumqayıt'),(5,'Leyla','Kərimova',21,'Gəncə');
CREATE TABLE kurslar (id INTEGER PRIMARY KEY, ad TEXT, saat INTEGER);
INSERT INTO kurslar VALUES (1,'HTML',20),(2,'JavaScript',60),(3,'C#',80),(4,'SQL',30);
CREATE TABLE qeydiyyat (telebe_id INTEGER REFERENCES telebeler(id), kurs_id INTEGER REFERENCES kurslar(id), bal INTEGER);
INSERT INTO qeydiyyat VALUES (1,1,95),(1,2,88),(2,3,72),(3,2,91),(3,4,85),(4,3,60),(5,1,78),(5,4,99);`;

const SQL_WORKER = `
importScripts(ORIGIN + "/runtimes/sql/sql-wasm.js");
const SQL = initSqlJs({ locateFile: (f) => ORIGIN + "/runtimes/sql/" + f });
self.onmessage = async (e) => {
  try {
    const db = new (await SQL).Database();
    db.run(${JSON.stringify(SAMPLE_DB)});
    const res = db.exec(e.data);
    const changed = db.getRowsModified();
    postMessage({ tables: res, info: res.length ? "" : "✔ Sorğu icra olundu. Dəyişən sətir: " + changed });
    db.close();
  } catch (err) { postMessage({ error: String(err.message || err) }); }
};`;

function runSql(code: string): Promise<{ lines: OutLine[]; tables: SqlTable[] }> {
  return new Promise((resolve) => {
    const w = workerFrom(`const ORIGIN = ${JSON.stringify(location.origin)};` + SQL_WORKER);
    const hard = setTimeout(() => { w.terminate(); resolve({ lines: [{ kind: "error", text: "⏱ Vaxt bitdi" }], tables: [] }); }, 10000);
    w.onmessage = (e) => {
      clearTimeout(hard); w.terminate();
      const d = e.data;
      if (d.error) resolve({ lines: [{ kind: "error", text: d.error }], tables: [] });
      else resolve({ lines: d.info ? [{ kind: "info", text: d.info }] : [], tables: d.tables });
    };
    w.postMessage(code);
  });
}

export async function run(kind: string, code: string, onStatus?: (s: string) => void): Promise<RunResult> {
  const t0 = performance.now();
  let lines: OutLine[] = [];
  let tables: SqlTable[] | undefined;
  if (kind === "js" || kind === "ts") lines = await runJs(code, kind === "ts");
  else if (kind === "python") lines = await runPython(code, onStatus);
  else if (kind === "sql") ({ lines, tables } = await runSql(code));
  return { lines, tables, ms: Math.round(performance.now() - t0) };
}
