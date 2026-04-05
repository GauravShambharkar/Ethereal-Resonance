"use client";

import React from "react";
import { Timer, Play, Square, Plus, Minus } from "lucide-react";
import { useMetronome } from "../hooks/useMetronome";
import { usePianoStore } from "@/store/store";

export const MetronomeUI = () => {
    const { isMetronomePlaying, toggleMetronome } = useMetronome();
    const { bpm, setBpm } = usePianoStore();

    return (
        <div className="flex items-center gap-3 px-4 py-1.5 bg-surface-container-low/40 rounded-full border border-white/5 group transition-all hover:border-primary/20">
            <button
                onClick={toggleMetronome}
                className={`transition-all duration-500 ${isMetronomePlaying ? "text-primary animate-pulse" : "text-on-surface-variant/40"
                    }`}
            >
                {isMetronomePlaying ? (
                    <Square size={16} fill="currentColor" />
                ) : (
                    <Play size={16} fill="currentColor" />
                )}
            </button>
            <div className="h-4 w-px bg-white/10 mx-1"></div>
            <div className="flex items-center gap-3">
                <span className="font-headline text-[10px] text-on-surface-variant/60 uppercase tracking-widest pointer-events-none">
                    BPM
                </span>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => setBpm(Math.max(40, bpm - 1))}
                        className="text-on-surface-variant/40 hover:text-primary transition-all duration-300 active:scale-75 cursor-pointer"
                        aria-label="Decrease BPM"
                    >
                        <Minus size={12} />
                    </button>
                    <input
                        type="number"
                        value={bpm}
                        onChange={(e) => setBpm(Number(e.target.value))}
                        className="bg-transparent border-none text-[10px] font-headline outline-none text-tertiary w-8 focus:ring-0 p-0 text-center selection:bg-primary/30 font-semibold"
                        min="40"
                        max="240"
                    />
                    <button
                        onClick={() => setBpm(Math.min(240, bpm + 1))}
                        className="text-on-surface-variant/40 hover:text-primary transition-all duration-300 active:scale-75 cursor-pointer"
                        aria-label="Increase BPM"
                    >
                        <Plus size={12} />
                    </button>
                </div>
            </div>
            <Timer
                size={14}
                className={`transition-all duration-700 ${isMetronomePlaying ? "text-primary rotate-45" : "text-on-surface-variant/20"
                    }`}
            />
        </div>
    );
};
