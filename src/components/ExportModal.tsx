"use client";

import React from "react";

const ExportModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="bg-surface-container-high w-full max-w-md p-10 rounded-xl border border-outline-variant/20 shadow-2xl">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="font-headline text-xl font-light tracking-tight mb-1 text-on-surface">
              Export Fragment
            </h2>
            <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
              Select output fidelity
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-4 mb-12">
          {[
            {
              title: "High-Fidelity WAV",
              subtitle: "24-bit • 48kHz Lossless",
              icon: "graphic_eq",
            },
            {
              title: "MIDI Sequence",
              subtitle: "Standard MIDI Format 1",
              icon: "humidity_mid",
            },
          ].map((item) => (
            <button
              key={item.title}
              className="w-full flex items-center justify-between p-6 bg-surface-container-low hover:bg-surface-bright border border-outline-variant/10 rounded-lg group transition-all"
            >
              <div className="flex items-center gap-6">
                <span className="material-symbols-outlined text-primary text-2xl">
                  {item.icon}
                </span>
                <div className="text-left">
                  <p className="font-headline text-base font-normal tracking-wide text-on-surface">
                    {item.title}
                  </p>
                  <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                    {item.subtitle}
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity">
                chevron_right
              </span>
            </button>
          ))}
        </div>
        <p className="text-center font-label text-[10px] text-on-surface-variant/50 uppercase tracking-[0.2em]">
          Processing via Resonance Engine v2.1
        </p>
      </div>
    </div>
  );
};

export default ExportModal;
