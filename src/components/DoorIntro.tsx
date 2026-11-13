"use client";

import { useState } from "react";
import { Doors } from "./Gate";
import type { TrackId } from "@/data/types";

/** Giriş ekranından gələndə qapılar səhifənin üstündə açılır */
export default function DoorIntro() {
  const [track, setTrack] = useState<TrackId | null>(() => {
    if (typeof window === "undefined") return null;
    const t = sessionStorage.getItem("door");
    sessionStorage.removeItem("door");
    return t === "frontend" || t === "backend" ? t : null;
  });
  if (!track) return null;
  return <Doors track={track} open onDone={() => setTrack(null)} />;
}
