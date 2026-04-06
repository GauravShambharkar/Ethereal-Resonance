"use client";

import React from "react";
import { usePianoStore } from "@/store/store";
import ExploreModal from "./ExploreModal";

const AdsrSlider = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
}) => {
  const [localValue, setLocalValue] = React.useState(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (localValue !== value) {
        console.log(`[Debounced UI] updating store for "${label}" to:`, localValue);
        onChange(localValue);
      }
    }, 380);
    return () => clearTimeout(handler);
  }, [localValue, onChange, value, label]);

  return (
    <div className="flex flex-col gap-1 items-end min-w-[60px]">
      <span className="font-label text-[8px] uppercase tracking-widest text-on-surface-variant">
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={localValue}
        onChange={(e) => setLocalValue(parseFloat(e.target.value))}
        className="w-16 h-[2px] bg-surface-container-highest appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
      />
      <span className="font-label text-[8px] text-primary/60">{localValue.toFixed(2)}</span>
    </div>
  );
};

const Hero = () => {
  const { adsr, setAdsr, lfo, setLfo, instrument, setInstrument } = usePianoStore();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="px-12 pt-6 flex justify-between items-end">
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <button 
             onClick={() => setInstrument("piano")}
             className={`font-headline text-3xl font-extralight tracking-tighter transition-all ${instrument === "piano" ? "text-on-surface opacity-90" : "text-on-surface-variant opacity-40 hover:opacity-70"}`}
          >
             Piano
          </button>
          <span className="text-on-surface-variant/20 tracking-widest font-thin text-3xl">/</span>
          <button 
             onClick={() => setInstrument("synth")}
             className={`font-headline text-3xl font-extralight tracking-tighter transition-all ${instrument === "synth" ? "text-on-surface opacity-90" : "text-on-surface-variant opacity-40 hover:opacity-70"}`}
          >
             Synthz
          </button>
        </div>
        <p className="font-label text-[10px] uppercase tracking-[0.4em] text-on-surface-variant flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#aacaea]"></span>
          Live Input Active • 440Hz Standard
        </p>
      </div>

      <div className="flex items-end gap-8">
        <div className="flex flex-row items-center gap-6 border-r border-outline-variant/10 pr-8">
          <ExploreModal />
          <div className="flex gap-4 items-end">
          <AdsrSlider
            label="Attack"
            value={adsr.attack}
            min={0.01}
            max={2}
            step={0.01}
            onChange={(v) => setAdsr({ attack: v })}
          />
          <AdsrSlider
            label="Decay"
            value={adsr.decay}
            min={0.01}
            max={2}
            step={0.01}
            onChange={(v) => setAdsr({ decay: v })}
          />
          <AdsrSlider
            label="Sustain"
            value={adsr.sustain}
            min={0.01}
            max={1}
            step={0.01}
            onChange={(v) => setAdsr({ sustain: v })}
          />
          <AdsrSlider
            label="Release"
            value={adsr.release}
            min={0.01}
            max={5}
            step={0.01}
            onChange={(v) => setAdsr({ release: v })}
          />
          </div>
        </div>

        <div className="flex gap-4">
          <AdsrSlider
            label="LFO Rate"
            value={lfo.frequency}
            min={0.1}
            max={20}
            step={0.1}
            onChange={(v) => setLfo({ frequency: v })}
          />
          <AdsrSlider
            label="LFO Depth"
            value={lfo.depth}
            min={0}
            max={1}
            step={0.01}
            onChange={(v) => setLfo({ depth: v })}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
