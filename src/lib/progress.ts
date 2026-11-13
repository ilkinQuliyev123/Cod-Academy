"use client";

import { useSyncExternalStore } from "react";

/** localStorage-də saxlanan açar dəstləri: oxunmuş dərslər ("dil/movzu") və keçilmiş imtahanlar */
function store(key: string) {
  const listeners = new Set<() => void>();
  let cache: string | null = null;
  const read = () => (typeof window === "undefined" ? "[]" : (cache ??= localStorage.getItem(key) ?? "[]"));
  const write = (s: Set<string>) => {
    cache = JSON.stringify([...s]);
    localStorage.setItem(key, cache);
    listeners.forEach((l) => l());
  };
  return {
    use(): Set<string> {
      const raw = useSyncExternalStore((cb) => (listeners.add(cb), () => listeners.delete(cb)), read, () => "[]");
      return new Set<string>(JSON.parse(raw));
    },
    toggle(id: string) {
      const s = new Set<string>(JSON.parse(read()));
      if (!s.delete(id)) s.add(id);
      write(s);
    },
    add(id: string) {
      const s = new Set<string>(JSON.parse(read()));
      if (!s.has(id)) write(s.add(id));
    },
  };
}

const lessons = store("ka-progress");
const exams = store("ka-exams");

export const useDone = lessons.use;
export const toggleDone = lessons.toggle;
export const usePassed = exams.use;
export const markPassed = exams.add;
