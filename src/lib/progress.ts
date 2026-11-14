"use client";

import { useSyncExternalStore } from "react";

const MAX_ITEMS = 1000;
const MAX_KEY_LENGTH = 200;

/** localStorage-dən gələn JSON-u təhlükəsiz Set-ə çevirir: korlanmış və ya səhv formatlı dəyər boş Set qaytarır */
function parseSet(raw: string): Set<string> {
  const out = new Set<string>();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return out;
    for (const item of parsed) {
      if (out.size >= MAX_ITEMS) break;
      if (typeof item === "string" && item.length <= MAX_KEY_LENGTH) out.add(item);
    }
  } catch {
    // korlanmış JSON: boş dəst
  }
  return out;
}

/** localStorage-də saxlanan açar dəstləri: oxunmuş dərslər ("dil/movzu") və keçilmiş imtahanlar */
function store(key: string) {
  const listeners = new Set<() => void>();
  let cache: string | null = null;
  const read = () => {
    if (typeof window === "undefined") return "[]";
    if (cache === null) {
      try {
        cache = localStorage.getItem(key) ?? "[]";
      } catch {
        // localStorage əlçatmazdır (məsələn, private rejim): boş qiymət
        return "[]";
      }
    }
    return cache;
  };
  const write = (s: Set<string>) => {
    cache = JSON.stringify([...s]);
    try {
      localStorage.setItem(key, cache);
    } catch {
      // yaddaş dolu və ya əlçatmazdır: səssiz keç, sessiya ərzində cache-də qalır
    }
    listeners.forEach((l) => l());
  };
  return {
    use(): Set<string> {
      const raw = useSyncExternalStore((cb) => (listeners.add(cb), () => listeners.delete(cb)), read, () => "[]");
      return parseSet(raw);
    },
    toggle(id: string) {
      const s = parseSet(read());
      if (!s.delete(id)) s.add(id);
      write(s);
    },
    add(id: string) {
      const s = parseSet(read());
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
