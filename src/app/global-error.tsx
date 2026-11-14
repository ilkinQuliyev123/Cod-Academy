"use client";

/** Kök layout-da xəta olanda: öz <html>/<body> render edir, qlobal CSS yoxdur → daxili üslub. */
export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="az">
      <body style={{ margin: 0, minHeight: "100dvh", display: "grid", placeItems: "center", background: "#05070d", color: "#e5e7eb", fontFamily: "system-ui, sans-serif", textAlign: "center", padding: 24 }}>
        <div style={{ maxWidth: 420 }}>
          <h1 style={{ fontSize: 28, margin: "0 0 12px" }}>Nəsə səhv getdi</h1>
          <p style={{ color: "#94a3b8", margin: "0 0 20px" }}>Səhifəni yenidən yükləməyi yoxla.</p>
          <button onClick={() => retry()} style={{ minHeight: 44, padding: "0 20px", border: 0, borderRadius: 6, background: "#38bdf8", color: "#05070d", fontWeight: 700, cursor: "pointer" }}>
            Yenidən yoxla
          </button>
        </div>
      </body>
    </html>
  );
}
