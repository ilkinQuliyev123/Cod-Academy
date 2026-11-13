"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import type { TrackId } from "@/data/types";
import { TRACKS } from "@/data/languages";

const COLORS: Record<TrackId, string> = { frontend: "#38bdf8", backend: "#f43f5e" };
const CODE: Record<TrackId, string[]> = {
  frontend: ["<div>", "flex", "useState", ":hover", "<button/>", "grid", "fetch()", "props"],
  backend: ["SELECT *", "async Task", "@Controller", "def api()", "JOIN", "std::vector", "JWT", "200 OK"],
};

/** Bir tərəf: Blue Team (front) və ya Red Team (back) */
function Side({ id, hover, setHover, pick }: {
  id: TrackId; hover: TrackId | null; setHover: (t: TrackId | null) => void; pick: (t: TrackId) => void;
}) {
  const c = COLORS[id];
  const grow = hover === id ? 1.35 : hover ? 0.65 : 1;
  return (
    <motion.button
      onMouseEnter={() => setHover(id)}
      onMouseLeave={() => setHover(null)}
      onFocus={() => setHover(id)}
      onClick={() => pick(id)}
      animate={{ flexGrow: grow }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="relative flex-1 basis-0 overflow-hidden grid-bg outline-none cursor-pointer min-h-[50vh] md:min-h-0"
      style={{ background: `radial-gradient(circle at ${id === "frontend" ? "30%" : "70%"} 50%, ${c}22, #05070d 70%)` }}
    >
      {/* Uçan kod parçaları */}
      {CODE[id].map((w, i) => (
        <motion.span
          key={w}
          className="absolute font-mono text-xs md:text-sm opacity-30 select-none"
          style={{ color: c, left: `${8 + ((i * 37) % 80)}%` }}
          initial={{ y: "110vh" }}
          animate={{ y: "-10vh" }}
          transition={{ duration: 9 + (i % 4) * 2, repeat: Infinity, delay: i * 1.1, ease: "linear" }}
        >
          {w}
        </motion.span>
      ))}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 px-4">
        <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: c }}>
          {TRACKS[id].team}
        </span>
        <h2
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white"
          style={{ textShadow: `0 0 30px ${c}, 0 0 80px ${c}66` }}
        >
          {TRACKS[id].name.toUpperCase()}
        </h2>
        <p className="text-slate-400">{TRACKS[id].tagline}</p>
        <motion.span
          animate={{ opacity: hover === id ? 1 : 0.4 }}
          className="mt-4 rounded-full border px-6 py-2 font-mono text-sm"
          style={{ borderColor: c, color: c }}
        >
          [ seç → ]
        </motion.span>
      </div>
    </motion.button>
  );
}

/** Lift qapısı: söz ortadan iki yarıya bölünüb yanlara açılır */
export function Doors({ track, open, onDone }: { track: TrackId; open: boolean; onDone?: () => void }) {
  const c = COLORS[track];
  const word = (
    <div className="w-screen h-full flex flex-col items-center justify-center gap-3">
      <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: c }}>{TRACKS[track].team}</span>
      <h2 className="text-5xl md:text-8xl font-black text-white" style={{ textShadow: `0 0 30px ${c}` }}>
        {TRACKS[track].name.toUpperCase()}
      </h2>
    </div>
  );
  const door = "fixed top-0 h-full w-1/2 overflow-hidden z-50 grid-bg";
  const bg = { background: `linear-gradient(180deg, #0c111c, #05070d)` };
  const t = { delay: 0.25, duration: 1.1, ease: [0.7, 0, 0.2, 1] as const };
  return (
    <>
      <motion.div className={`${door} left-0`} style={bg} initial={{ x: open ? 0 : "-100%" }} animate={{ x: open ? "-100%" : 0 }} transition={open ? t : { duration: 0.7, ease: [0.7, 0, 0.2, 1] }} onAnimationComplete={onDone}>
        <div className="absolute left-0 top-0 h-full">{word}</div>
        <div className="absolute right-0 top-0 h-full w-[3px]" style={{ background: c, boxShadow: `0 0 20px ${c}` }} />
      </motion.div>
      <motion.div className={`${door} right-0`} style={bg} initial={{ x: open ? 0 : "100%" }} animate={{ x: open ? "100%" : 0 }} transition={open ? t : { duration: 0.7, ease: [0.7, 0, 0.2, 1] }}>
        <div className="absolute right-0 top-0 h-full">{word}</div>
        <div className="absolute left-0 top-0 h-full w-[3px]" style={{ background: c, boxShadow: `0 0 20px ${c}` }} />
      </motion.div>
      {/* Ortadakı skan xətti */}
      <motion.div
        className="fixed inset-x-0 z-[60] h-[2px]"
        style={{ background: c, boxShadow: `0 0 24px ${c}` }}
        initial={{ top: "0%", opacity: 1 }}
        animate={{ top: "100%", opacity: 0 }}
        transition={{ duration: 0.9, delay: open ? 0 : 0.7, ease: "easeInOut" }}
      />
    </>
  );
}

export default function Gate() {
  const router = useRouter();
  const [hover, setHover] = useState<TrackId | null>(null);
  const [picked, setPicked] = useState<TrackId | null>(null);

  const pick = (t: TrackId) => {
    router.prefetch(`/${t}`);
    sessionStorage.setItem("door", t);
    setPicked(t);
  };

  return (
    <MotionConfig reducedMotion="user">
    <main className="relative flex flex-col md:flex-row flex-1 min-h-screen overflow-hidden bg-ink">
      <div className="absolute top-6 inset-x-0 z-20 text-center pointer-events-none">
        <h1 className="font-mono text-sm tracking-[0.5em] text-slate-300">KOD AKADEMİYASI</h1>
        <p className="text-xs text-slate-500 mt-1">Tərəfini seç</p>
      </div>
      <Side id="frontend" hover={hover} setHover={setHover} pick={pick} />
      {/* VS ayırıcı */}
      <div className="relative z-20 flex items-center justify-center md:w-0">
        <div className="absolute md:inset-y-0 inset-x-0 md:inset-x-auto h-[2px] md:h-auto md:w-[2px] bg-gradient-to-b from-blue-team via-white to-red-team" />
        <span className="relative rounded-full bg-ink border border-line px-3 py-2 font-black text-sm text-white">VS</span>
      </div>
      <Side id="backend" hover={hover} setHover={setHover} pick={pick} />
      <AnimatePresence>
        {picked && (
          <Doors track={picked} open={false} onDone={() => setTimeout(() => router.push(`/${picked}`), 900)} />
        )}
      </AnimatePresence>
    </main>
    </MotionConfig>
  );
}
