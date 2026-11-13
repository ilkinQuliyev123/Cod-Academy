"use client";

import { useSyncExternalStore } from "react";

/** Oxunmuş dərslər brauzerdə (localStorage) saxlanır: "dil/movzu" açarları */
const KEY = "ka-progress";
const listeners = new Set<() => void>();
let cache: string | null = null;

const read = () => (typeof window === "undefined" ? "[]" : (cache ??= localStorage.getItem(KEY) ?? "[]"));

export function useDone(): Set<string> {
  const raw = useSyncExternalStore(
    (cb) => (listeners.add(cb), () => listeners.delete(cb)),
    read,
    () => "[]",
  );
  return new Set<string>(JSON.parse(raw));
}

export function toggleDone(id: string) {
  const s = new Set<string>(JSON.parse(read()));
  if (s.has(id)) s.delete(id);
  else s.add(id);
  cache = JSON.stringify([...s]);
  localStorage.setItem(KEY, cache);
  listeners.forEach((l) => l());
}
