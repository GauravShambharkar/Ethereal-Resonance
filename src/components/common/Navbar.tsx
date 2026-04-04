"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePianoStore } from "@/store/store";
import { Timer, Settings2, Sliders, Play, Square, Plus, Minus } from "lucide-react";
import * as Tone from "tone";

const Navbar = ({ onExportClick }: { onExportClick: () => void }) => {
  const { bpm, isMetronomePlaying, setIsMetronomePlaying, setBpm } =
    usePianoStore();
  const [isMounted, setIsMounted] = useState(false);
  const clickSynth = useRef<Tone.MembraneSynth | null>(null);

  useEffect(() => {
    setIsMounted(true);
    clickSynth.current = new Tone.MembraneSynth({
      pitchDecay: 0.008,
      octaves: 2,
      envelope: {
        attack: 0.0006,
        decay: 0.5,
        sustain: 0,
      },
    }).toDestination();

    return () => {
      clickSynth.current?.dispose();
    };
  }, []);

  useEffect(() => {
    Tone.getTransport().bpm.value = bpm;

    // Clear existing schedule
    Tone.getTransport().cancel();

    // Schedule beat
    Tone.getTransport().scheduleRepeat((time) => {
      clickSynth.current?.triggerAttackRelease("C2", "16n", time);
    }, "4n");

    if (isMetronomePlaying) {
      Tone.start().then(() => {
        Tone.getTransport().start();
      });
    } else {
      Tone.getTransport().stop();
    }
  }, [isMetronomePlaying, bpm]);

  const toggleMetronome = async () => {
    if (!isMetronomePlaying) {
      await Tone.start();
    }
    setIsMetronomePlaying(!isMetronomePlaying);
  };

  if (!isMounted) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-12 py-6 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-4">
        <span className="text-base font-light tracking-widest text-tertiary font-headline opacity-80 decoration-primary/40 underline-offset-8 transition-all hover:underline cursor-default">
          Ethereal Resonance
        </span>
      </div>

      <div className="hidden md:flex gap-10 items-center">
        {/* Metronome Control */}
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

      </div>

      <div className="flex items-center gap-6">
        <div className="flex gap-4">
          <button className="text-on-surface-variant/40 hover:text-primary transition-all duration-300">
            <Settings2 size={18} />
          </button>
          <button className="text-on-surface-variant/40 hover:text-primary transition-all duration-300">
            <Sliders size={18} />
          </button>
        </div>
        <button
          onClick={onExportClick}
          className="bg-surface-bright/50 border border-primary/20 px-5 py-1.5 rounded text-[10px] font-label uppercase tracking-widest text-primary/80 hover:bg-primary hover:text-on-primary shadow-[0_0_20px_rgba(170,202,234,0.05)] transition-all duration-500"
        >
          Export
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
