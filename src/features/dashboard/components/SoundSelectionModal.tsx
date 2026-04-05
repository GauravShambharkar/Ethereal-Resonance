"use client";

import React, { useEffect, useState } from "react";
import { usePianoStore } from "@/store/store";
import * as Tone from "tone";

const SoundSelectionModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { oscillatorType, setOscillatorType } = usePianoStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isOpen || !isMounted) return null;

  const coreSounds: { id: any; label: string; icon: string }[] = [
    { id: "sine", label: "Pure Sine", icon: "circles" },
    { id: "square", label: "Robust Square", icon: "square" },
    { id: "triangle", label: "Soft Triangle", icon: "change_history" },
    { id: "sawtooth", label: "Sharp Saw", icon: "line_axis" },
  ];

  const etherealSounds: { id: any; label: string; icon: string }[] = [
    { id: "fatsawtooth22", label: "Nocturnal Echo", icon: "waves" },
    { id: "pulse", label: "Pulse Wave", icon: "rebase_edit" },
    { id: "pwm", label: "Ghost Modulation", icon: "blur_on" },
  ];

  return (
    <div onClick={() => onClose()} className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      <div onClick={(e) => { e.stopPropagation(); }} className="glass-modal w-full max-w-2xl p-8 rounded-2xl flex flex-col gap-8">
        <header className="text-center">
          <h2 className="font-headline text-xl font-light tracking-[0.3em] text-tertiary mb-2 uppercase">
            Sonic Architecture
          </h2>
          <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
            Select the primary oscillator source
          </p>
          <div className="h-px w-12 bg-primary/40 mx-auto mt-4"></div>
        </header>

        <div className="space-y-8">
          <section>
            <label className="font-label text-[10px] uppercase tracking-[0.3em] text-primary/60 block mb-4">
              Harmonic Cores
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {coreSounds.map((sound) => (
                <button
                  key={sound.id}
                  onClick={() => {
                    setOscillatorType(sound.id);
                  }}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-500 group ${oscillatorType === sound.id
                    ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(170,202,234,0.15)]"
                    : "border-outline-variant/20 bg-surface-container-low hover:border-primary/40 hover:bg-surface-bright"
                    }`}
                >
                  <span className={`material-symbols-outlined text-2xl transition-all duration-500 ${oscillatorType === sound.id ? "text-primary scale-110" : "text-on-surface-variant group-hover:text-primary"
                    }`}>
                    {sound.icon}
                  </span>
                  <span className={`font-headline text-[10px] tracking-widest uppercase transition-colors ${oscillatorType === sound.id ? "text-primary" : "text-on-surface group-hover:text-tertiary"
                    }`}>
                    {sound.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="font-label text-[10px] uppercase tracking-[0.3em] text-primary/60 block mb-4">
              Ethereal Textures
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {etherealSounds.map((sound) => (
                <button
                  key={sound.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOscillatorType(sound.id);
                  }}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 group ${oscillatorType === sound.id
                    ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(170,202,234,0.15)]"
                    : "border-outline-variant/20 bg-surface-container-low hover:border-primary/40 hover:bg-surface-bright"
                    }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${oscillatorType === sound.id ? "bg-primary text-on-primary" : "bg-surface-container-highest text-on-surface-variant group-hover:bg-primary/20 group-hover:text-primary"
                    }`}>
                    <span className="material-symbols-outlined text-xl">
                      {sound.icon}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className={`font-headline text-[10px] block tracking-widest uppercase mb-0.5 transition-colors ${oscillatorType === sound.id ? "text-primary" : "text-on-surface group-hover:text-tertiary"
                      }`}>
                      {sound.label}
                    </span>
                    <span className="font-label text-[8px] text-on-surface-variant/60 block uppercase tracking-tighter">
                      Advanced Synthesis
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        <footer className="flex items-center justify-center mt-4">
          <button
            className="px-12 py-3 bg-surface-bright border border-primary/40 text-tertiary rounded-full font-headline text-[10px] uppercase tracking-[0.3em] transition-all hover:bg-primary hover:text-on-primary hover:shadow-[0_0_30px_rgba(170,202,234,0.3)]"
            onClick={onClose}
          >
            Apply Resonance
          </button>
        </footer>
      </div>
    </div>
  );
};

export default SoundSelectionModal;
