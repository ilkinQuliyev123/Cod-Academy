#!/usr/bin/env node
// Sürətli smoke test (Node 20+, daxili fetch).
// İstifadə: node scripts/smoke.mjs https://SAYT-ADI.vercel.app
// Arqument yoxdursa: http://localhost:3000

const RAW_BASE = process.argv[2] || 'http://localhost:3000';
const KEY_ERROR = 'AI açarı qoşulmayıb';
const TIMEOUT_MS = 30_000;

if (typeof fetch !== 'function' || typeof AbortSignal.timeout !== 'function') {
  console.log('❌ Node 20+ tələb olunur (daxili fetch və AbortSignal.timeout).');
  process.exit(1);
}

let BASE;
try {
  BASE = new URL(RAW_BASE);
} catch {
  console.log(`❌ Yanlış ünvan: ${RAW_BASE}`);
  process.exit(1);
}

let failures = 0;

function pass(label, detail = '') {
  console.log(`✅ ${label}${detail ? ` — ${detail}` : ''}`);
}

function fail(label, detail = '') {
  failures++;
  console.log(`❌ ${label}${detail ? ` — ${detail}` : ''}`);
}

function warn(label, detail = '') {
  console.log(`⚠ ${label}${detail ? ` — ${detail}` : ''}`);
}

function check(ok, label, detail = '') {
  if (ok) pass(label, detail);
  else fail(label, detail);
}

function url(path) {
  return new URL(path, BASE).toString();
}

function timeout() {
  return AbortSignal.timeout(TIMEOUT_MS);
}

// Bir yoxlamanı işlədir; gözlənilməz istisna (timeout, şəbəkə) da ❌ kimi sayılır.
async function run(label, fn) {
  try {
    await fn();
  } catch (e) {
    const reason = e?.name === 'TimeoutError' ? 'timeout (30 s)' : (e?.message ?? String(e));
    fail(label, `istisna: ${reason}`);
  }
}

async function getResponse(path) {
  const res = await fetch(url(path), { signal: timeout() });
  const text = await res.text();
  return { res, text };
}

// ---------------------------------------------------------------------------
// 1) Səhifələr: 200 + "Kod Akademiyası" və ya <html
// ---------------------------------------------------------------------------
const PAGES = [
  '/',
  '/frontend',
  '/backend',
  '/frontend/html',
  '/frontend/html/giris',
  '/backend/nestjs/giris',
  '/backend/cpp/giris',
  '/backend/python/giris',
  '/frontend/yol',
  '/backend/yol',
  '/mesq',
];

console.log(`\nSayt: ${BASE.origin}\n`);
console.log('--- Səhifələr ---');
for (const path of PAGES) {
  await run(`GET ${path}`, async () => {
    const { res, text } = await getResponse(path);
    const hasContent = text.includes('Kod Akademiyası') || /<html/i.test(text);
    check(
      res.status === 200 && hasContent,
      `GET ${path}`,
      `status ${res.status}${hasContent ? '' : ', HTML/"Kod Akademiyası" tapılmadı'}`,
    );
  });
}

// ---------------------------------------------------------------------------
// 2) Olmayan səhifə → 404
// ---------------------------------------------------------------------------
console.log('\n--- 404 ---');
await run('404 səhifəsi', async () => {
  for (const yol of ['/yoxdur-bele-sehife', '/frontend/yoxdur', '/frontend/html/yoxdur']) {
    const { res, text } = await getResponse(yol);
    const ui = text.includes('Səhifə tapılmadı');
    if (res.status === 404 && ui) check(true, `GET ${yol} → 404`, 'status 404 + 404 səhifəsi');
    // PPR axınında status artıq 200 göndərilibsə, istifadəçi yenə də 404 səhifəsini görür (soft 404) — xəta deyil
    else if (ui) console.log(`⚠ GET ${yol} — 404 səhifəsi göstərilir, amma status ${res.status} (soft 404, axın rejimi)`);
    else check(false, `GET ${yol} → 404`, `status ${res.status}, 404 səhifəsi göstərilmir`);
  }
});

// ---------------------------------------------------------------------------
// 3) Təhlükəsizlik başlıqları (/)
// ---------------------------------------------------------------------------
console.log('\n--- Təhlükəsizlik başlıqları (/) ---');
await run('Təhlükəsizlik başlıqları', async () => {
  const { res } = await getResponse('/');
  const h = res.headers;
  check(!!h.get('content-security-policy'), 'content-security-policy mövcuddur');
  check(!!h.get('strict-transport-security'), 'strict-transport-security mövcuddur');
  check(
    (h.get('x-content-type-options') ?? '').trim().toLowerCase() === 'nosniff',
    'x-content-type-options = nosniff',
    h.get('x-content-type-options') ?? 'yoxdur',
  );
  check(
    (h.get('x-frame-options') ?? '').trim().toUpperCase() === 'DENY',
    'x-frame-options = DENY',
    h.get('x-frame-options') ?? 'yoxdur',
  );
  check(!h.has('x-powered-by'), 'x-powered-by yoxdur');
});

// ---------------------------------------------------------------------------
// 4) CSP: / üçün unsafe-eval yox; /mesq üçün unsafe-eval və wasm-unsafe-eval var
// ---------------------------------------------------------------------------
console.log('\n--- CSP ---');
// CSP tokenlərini bölürük ki, "wasm-unsafe-eval" "unsafe-eval" kimi uyğunlaşmasın.
function cspTokens(csp) {
  return csp.split(/[\s;]+/).filter(Boolean);
}

await run('CSP /', async () => {
  const { res } = await getResponse('/');
  const csp = res.headers.get('content-security-policy') ?? '';
  const tokens = cspTokens(csp);
  check(
    csp !== '' && !tokens.includes("'unsafe-eval'"),
    'CSP (/): unsafe-eval yoxdur',
    csp === '' ? 'CSP başlığı yoxdur' : '',
  );
});

await run('CSP /mesq', async () => {
  const { res } = await getResponse('/mesq');
  const csp = res.headers.get('content-security-policy') ?? '';
  const tokens = cspTokens(csp);
  const hasUnsafeEval = tokens.includes("'unsafe-eval'");
  const hasWasmUnsafeEval = tokens.includes("'wasm-unsafe-eval'");
  check(
    hasUnsafeEval && hasWasmUnsafeEval,
    'CSP (/mesq): unsafe-eval və wasm-unsafe-eval var',
    csp === ''
      ? 'CSP başlığı yoxdur'
      : `unsafe-eval: ${hasUnsafeEval ? 'var' : 'yoxdur'}, wasm-unsafe-eval: ${hasWasmUnsafeEval ? 'var' : 'yoxdur'}`,
  );
});

// ---------------------------------------------------------------------------
// 5) Runtime faylları → 200
// ---------------------------------------------------------------------------
console.log('\n--- Runtime faylları ---');
const RUNTIMES = ['/runtimes/pyodide/pyodide.asm.wasm', '/runtimes/sql/sql-wasm.wasm'];
for (const path of RUNTIMES) {
  await run(`GET ${path}`, async () => {
    const res = await fetch(url(path), { signal: timeout() });
    await res.arrayBuffer(); // gövdəni oxuyub bağlayırıq
    check(res.status === 200, `GET ${path}`, `status ${res.status}`);
  });
}

// ---------------------------------------------------------------------------
// 6) API: xarici origin → 403
// ---------------------------------------------------------------------------
console.log('\n--- API ---');
await run('POST /api/agent (xarici origin)', async () => {
  const res = await fetch(url('/api/agent'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://evil.example' },
    body: '{}',
    signal: timeout(),
  });
  await res.text();
  check(res.status === 403, 'POST /api/agent (Origin: evil.example) → 403', `status ${res.status}`);
});

// ---------------------------------------------------------------------------
// 7) API: öz origin ilə → 200 və text; 503/429 → ⚠, 3 s sonra 1 təkrar
// ---------------------------------------------------------------------------
const AGENT_BODY = {
  mode: 'chat',
  lang: 'javascript',
  messages: [{ role: 'user', text: 'let nədir? bir cümlə' }],
};

function askAgent() {
  return fetch(url('/api/agent'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: BASE.origin },
    body: JSON.stringify(AGENT_BODY),
    signal: AbortSignal.timeout(70_000), // Gemini yavaş ola bilər (server özü ≤ 50 s)
  });
}

await run('POST /api/agent (öz origin)', async () => {
  const label = 'POST /api/agent (öz origin)';
  let res;
  let body = {};

  for (let attempt = 1; attempt <= 2; attempt++) {
    res = await askAgent();
    body = await res.json().catch(() => ({}));

    const transient = res.status === 503 || res.status === 429 || res.status === 502;
    if (!transient || attempt === 2) break;

    warn(`${label} → ${res.status}, 3 s sonra təkrar yoxlanılır`);
    await new Promise((r) => setTimeout(r, 3000));
  }

  if (body?.error === KEY_ERROR) {
    fail(label, `${KEY_ERROR} (GEMINI_API_KEY unudulub?)`);
    return;
  }

  if (res.status === 200) {
    check(
      typeof body?.text === 'string' && body.text.length > 0,
      label,
      typeof body?.text === 'string' ? `status 200, text uzunluğu ${body.text.length}` : 'cavabda text sahəsi yoxdur',
    );
    return;
  }

  if (res.status === 503 || res.status === 429 || res.status === 502) {
    warn(`${label} → ${res.status} (müvəqqəti yüklənmə ola bilər)`, body?.error ?? '');
    return;
  }

  fail(label, `status ${res.status}${body?.error ? `, ${body.error}` : ''}`);
});

// ---------------------------------------------------------------------------
// Xülasə
// ---------------------------------------------------------------------------
console.log('');
if (failures > 0) {
  console.log(`❌ ${failures} yoxlama uğursuz oldu.`);
  process.exit(1);
}
console.log('✅ Bütün yoxlamalar keçdi (⚠ xəbərdarlıqlar ola bilər).');
