"use client";

import React from "react";
import { usePianoStore } from "@/store/store";

export const OctaveControl = () => {
  const { baseOctave, setBaseOctave } = usePianoStore();

  return (
    <div className="flex items-center gap-3 px-4 py-0.5 bg-surface-container-low/40 rounded-full border border-white/5 group transition-all hover:border-primary/20">
      <span className="font-headline text-[10px] text-on-surface-variant/60 uppercase tracking-widest pointer-events-none">
        Octave Pitch
      </span>
      <div className="h-4 w-px bg-white/10 mx-1"></div>
      <div className="flex items-center gap-1.5 ">
        {[1, 2, 3, 4].map((oct) => (
          <button
            key={oct}
            onClick={() => setBaseOctave(oct)}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold font-headline transition-all duration-300 active:scale-75 ${baseOctave === oct
                ? "bg-primary/10 text-primary shadow-[0_0_15px_rgba(170,202,234,0.1)] border border-primary/20"
                : "text-on-surface-variant/40 hover:text-primary hover:bg-white/5 border border-transparent cursor-pointer"
              }`}
          >
            {oct}
          </button>
        ))}
      </div>
    </div>
  );
};
