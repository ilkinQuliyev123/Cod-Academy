export type TrackId = "frontend" | "backend";

/** Dərs daxilindəki məzmun blokları */
export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "code"; lang: string; code: string; caption?: string }
  | { t: "terms"; items: [word: string, meaning: string][] }
  | { t: "list"; items: string[] }
  | { t: "tip"; text: string }
  | { t: "warn"; text: string }
  | { t: "mistake"; wrong: string; right: string; why: string; lang: string }
  | { t: "qa"; items: [question: string, answer: string][] }
  /** Həyatdan bənzətmə */
  | { t: "analogy"; text: string }
  /** Özünü yoxla: variantlı sual */
  | { t: "quiz"; q: string; options: string[]; answer: number; why: string };

export type Level = "baslangic" | "orta" | "senior";

export interface Section {
  level: Level;
  title: string;
  blocks: Block[];
}

export interface Exercise {
  task: string;
  starter: string;
  /** AI agentə yoxlama üçün: düzgün həllin şərti */
  expect: string;
}

export interface Lesson {
  slug: string;
  title: string;
  intro: string;
  sections: Section[];
  exercise?: Exercise;
}

export interface Topic {
  slug: string;
  title: string;
}

export interface Language {
  id: string;
  name: string;
  short: string;
  track: TrackId;
  /** Monaco/redaktor dili */
  editor: string;
  /** Brauzerdə işə salına bilirmi */
  runnable: "web" | "js" | "ts" | "python" | "sql" | "none";
  desc: string;
  topics: Topic[];
}
