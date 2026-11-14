import type { NextConfig } from "next";

/**
 * Təhlükəsizlik başlıqları.
 * CSP qeydi (yalnız /mesq): məşq səhifəsi istifadəçi kodunu Worker-də icra edir (AsyncFunction → 'unsafe-eval'),
 * Pyodide/sql.js WebAssembly işlədir ('wasm-unsafe-eval'), Worker-lər blob: URL-dən yaranır.
 * Next.js statik səhifələrdə inline skript yazır → 'unsafe-inline' (nonce statik qurulma ilə uyğun deyil).
 * HTML önizləməsi sandbox iframe-dədir (allow-same-origin YOXDUR) — sayt ilə əlaqəsi kəsilib.
 */
const isProd = process.env.NODE_ENV === "production";

/** CSP qurur. `runner=true` yalnız /mesq üçündür (eval/wasm/blob lazımdır); qalan səhifələrdə yoxdur. */
const buildCsp = (runner: boolean) => [
  "default-src 'self'",
  // Dev rejimində (HMR/source map) eval lazımdır; production-da yalnız məşq səhifəsində
  `script-src 'self' 'unsafe-inline'${runner || !isProd ? " 'unsafe-eval' 'wasm-unsafe-eval' blob:" : ""}`,
  `worker-src 'self'${runner || !isProd ? " blob:" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "media-src 'self' data: blob:",
  `frame-src ${runner || !isProd ? "'self' blob: data:" : "'none'"}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    const csp = (runner: boolean) => ({ key: "Content-Security-Policy", value: buildCsp(runner) });
    return [
      // /mesq istisna: istifadəçi kodu Worker-də icra olunur (eval/wasm/blob)
      { source: "/mesq", headers: [csp(true), ...securityHeaders] },
      { source: "/:path((?!mesq$).*)", headers: [csp(false), ...securityHeaders] },
      { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
    ];
  },
};

export default nextConfig;
