"use client";

import { toggleDone, useDone } from "@/lib/progress";

export default function DoneButton({ id }: { id: string }) {
  const done = useDone().has(id);
  return (
    <button
      onClick={() => toggleDone(id)}
      className={`min-h-11 rounded-lg px-4 py-2 text-sm font-bold transition ${done ? "bg-accent text-ink" : "border border-accent/50 text-accent hover:bg-accent/10"}`}
    >
      {done ? "✓ Dərs bitdi" : "Dərsi bitirdim"}
    </button>
  );
}
