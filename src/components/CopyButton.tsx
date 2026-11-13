"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text).then(() => { setOk(true); setTimeout(() => setOk(false), 1200); })}
      className="font-mono text-[10px] text-slate-500 hover:text-accent"
    >
      {ok ? "kopyalandı ✓" : "kopyala"}
    </button>
  );
}
