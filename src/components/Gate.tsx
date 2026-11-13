"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, MotionConfig, useAnimationControls } from "motion/react";
import type { TrackId } from "@/data/types";
import { TRACKS } from "@/data/languages";

const C: Record<TrackId, { main: string; dark: string; mark: string }> = {
  frontend: { main: "#38bdf8", dark: "#062a43", mark: "</>" },
  backend: { main: "#f43f5e", dark: "#43061a", mark: "{ }" },
};

/** Diaqonal bölgü: s = yuxarıdakı kəsişmə nöqtəsi (%) */
const clip = (side: TrackId, s: number, mobile: boolean) => {
  const b = s - 10; // aşağıda 10% maili
  if (mobile)
    return side === "frontend"
      ? `polygon(0% 0%, 100% 0%, 100% ${b}%, 0% ${s}%)`
      : `polygon(0% ${s}%, 100% ${b}%, 100% 100%, 0% 100%)`;
  return side === "frontend"
    ? `polygon(0% 0%, ${s}% 0%, ${b}% 100%, 0% 100%)`
    : `polygon(${s}% 0%, 100% 0%, 100% 100%, ${b}% 100%)`;
};

function useMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const q = matchMedia("(max-width: 767px)");
    const on = () => setM(q.matches);
    on();
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);
  return m;
}

const spring = { type: "spring", stiffness: 140, damping: 18, delay: 0.15 } as const;

function Side({ id, split, mobile, onHover, onPick }: {
  id: TrackId; split: number; mobile: boolean; onHover: (h: boolean) => void; onPick: () => void;
}) {
  const c = C[id];
  const left = id === "frontend";
  return (
    <motion.button
      aria-label={TRACKS[id].name}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      onClick={onPick}
      initial={mobile ? { y: left ? "-100%" : "100%" } : { x: left ? "-100%" : "100%" }}
      animate={{ x: 0, y: 0, clipPath: clip(id, split, mobile) }}
      transition={{ x: spring, y: spring, clipPath: { type: "spring", stiffness: 120, damping: 20 } }}
      className="absolute inset-0 cursor-pointer outline-none"
      style={{ background: `linear-gradient(${left ? 115 : 245}deg, ${c.dark} 0%, #05070d 75%)` }}
    >
      {/* Diaqonal zolaqlar */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: `repeating-linear-gradient(${left ? 60 : -60}deg, ${c.main} 0 2px, transparent 2px 22px)` }}
      />
      {/* Nəhəng simvol */}
      <span
        className={`absolute select-none font-mono font-black leading-none opacity-[0.08] ${mobile ? (left ? "right-4 top-6" : "left-4 bottom-6") : left ? "left-[4%] top-1/2 -translate-y-1/2" : "right-[4%] top-1/2 -translate-y-1/2"}`}
        style={{ color: c.main, fontSize: mobile ? "38vw" : "26vw" }}
      >
        {c.mark}
      </span>
      {/* Ad */}
      <motion.div
        initial={{ opacity: 0, x: left ? -120 : 120 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.75, type: "spring", stiffness: 200, damping: 16 }}
        className={`absolute flex flex-col ${mobile ? `inset-x-0 items-center ${left ? "top-[16%]" : "bottom-[16%]"}` : `top-1/2 -translate-y-1/2 ${left ? "left-[8%] items-start" : "right-[8%] items-end"}`}`}
      >
        <h2
          className="font-black italic leading-[0.85] tracking-tighter text-white"
          style={{ fontSize: mobile ? "16vw" : "8.5vw", textShadow: `0 0 40px ${c.main}, 0 0 100px ${c.main}88, 6px 6px 0 ${c.dark}` }}
        >
          {left ? <>FRONT<br />END</> : <>BACK<br />END</>}
        </h2>
        <span className="mt-4 h-1.5 w-24 -skew-x-12" style={{ background: c.main, boxShadow: `0 0 20px ${c.main}` }} />
        <p className="mt-3 text-sm text-slate-300 md:text-base">{TRACKS[id].tagline}</p>
      </motion.div>
    </motion.button>
  );
}

/** Lift qapısı: bölmənin rəngində iki qanad ortadan aralanır */
export function Doors({ track, open, onDone }: { track: TrackId; open: boolean; onDone?: () => void }) {
  const c = C[track];
  const word = (
    <div className="flex h-full w-screen items-center justify-center">
      <h2 className="font-black italic tracking-tighter text-white" style={{ fontSize: "min(14vw, 9rem)", textShadow: `0 0 40px ${c.main}` }}>
        {TRACKS[track].name.toUpperCase()}
      </h2>
    </div>
  );
  const ease = [0.7, 0, 0.2, 1] as const;
  const t = open ? { delay: 0.25, duration: 1.1, ease } : { duration: 0.6, ease };
  return (
    <>
      {(["left", "right"] as const).map((side) => (
        <motion.div
          key={side}
          className={`fixed top-0 z-50 h-full w-1/2 overflow-hidden ${side === "left" ? "left-0" : "right-0"}`}
          style={{ background: `linear-gradient(180deg, ${c.dark}, #05070d)` }}
          initial={{ x: open ? 0 : side === "left" ? "-100%" : "100%" }}
          animate={{ x: open ? (side === "left" ? "-100%" : "100%") : 0 }}
          transition={t}
          onAnimationComplete={side === "left" ? onDone : undefined}
        >
          <div className={`absolute top-0 h-full ${side === "left" ? "left-0" : "right-0"}`}>{word}</div>
          <div className={`absolute top-0 h-full w-[3px] ${side === "left" ? "right-0" : "left-0"}`} style={{ background: c.main, boxShadow: `0 0 24px ${c.main}` }} />
        </motion.div>
      ))}
    </>
  );
}

export default function Gate() {
  const router = useRouter();
  const mobile = useMobile();
  const shake = useAnimationControls();
  const [hover, setHover] = useState<TrackId | null>(null);
  const [picked, setPicked] = useState<TrackId | null>(null);
  const split = hover === "frontend" ? 64 : hover === "backend" ? 46 : 55;

  // Toqquşma anı: ekran silkələnir
  useEffect(() => {
    const id = setTimeout(() => shake.start({ x: [0, -14, 12, -8, 5, 0], y: [0, 6, -5, 3, 0], transition: { duration: 0.45 } }), 650);
    return () => clearTimeout(id);
  }, [shake]);

  const pick = (t: TrackId) => {
    router.prefetch(`/${t}`);
    sessionStorage.setItem("door", t);
    setPicked(t);
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.main animate={shake} className="relative h-dvh w-full overflow-hidden bg-ink">
        <Side id="frontend" split={split} mobile={mobile} onHover={(h) => setHover(h ? "frontend" : null)} onPick={() => pick("frontend")} />
        <Side id="backend" split={split} mobile={mobile} onHover={(h) => setHover(h ? "backend" : null)} onPick={() => pick("backend")} />

        {/* Toqquşma işığı */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.85, 0] }}
          transition={{ duration: 0.9, times: [0, 0.68, 0.72, 1] }}
        />

        <motion.h1
          className="pointer-events-none absolute inset-x-0 top-5 z-30 text-center font-mono text-xs tracking-[0.5em] text-white/80 md:text-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          KOD AKADEMİYASI
        </motion.h1>
        <motion.p
          className="pointer-events-none absolute inset-x-0 bottom-6 z-30 text-center font-mono text-[11px] uppercase tracking-[0.4em] text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.4, 1] }}
          transition={{ delay: 1.4, duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          Tərəfini seç
        </motion.p>

        <AnimatePresence>
          {picked && <Doors track={picked} open={false} onDone={() => setTimeout(() => router.push(`/${picked}`), 700)} />}
        </AnimatePresence>
      </motion.main>
    </MotionConfig>
  );
}
