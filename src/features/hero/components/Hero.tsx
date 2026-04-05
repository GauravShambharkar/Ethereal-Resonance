"use client";

import React from "react";
import { usePianoStore } from "@/store/store";

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
}) => (
  <div className="flex flex-col gap-1 items-end min-w-[60px]">
    <span className="font-label text-[8px] uppercase tracking-widest text-on-surface-variant">
      {label}
    </span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-16 h-[2px] bg-surface-container-highest appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
    />
    <span className="font-label text-[8px] text-primary/60">{value.toFixed(2)}</span>
  </div>
);

const Hero = () => {
  const { adsr, setAdsr } = usePianoStore();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="px-12 pt-6 z-10 flex justify-between items-end">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-extralight tracking-tighter text-on-surface opacity-90">
          Piano
        </h1>
        <p className="font-label text-[10px] uppercase tracking-[0.4em] text-on-surface-variant flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#aacaea]"></span>
          Live Input Active • 440Hz Standard
        </p>
      </div>

      <div className="flex items-end gap-8">
        <div className="flex gap-4 border-r border-outline-variant/10 pr-8">
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

        <div className="text-right flex flex-col gap-1">
          <span className="font-label text-[10px] uppercase tracking-widest text-primary">
            Master Velocity
          </span>
          <div className="w-48 h-1 bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="w-[65%] h-full bg-primary shadow-[0_0_10px_#aacaea]"
              style={{ width: "65%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
