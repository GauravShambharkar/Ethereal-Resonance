"use client";

import React, { useEffect, useState } from "react";
import { usePianoStore } from "@/store/store";

const ExportModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { exportSettings, setExportSettings } = usePianoStore();
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration issues for persisted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isOpen || !isMounted) return null;

  const { format, sampleRate, bitDepth } = exportSettings;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      {/* Export Modal */}
      <div className="glass-modal w-full max-w-xl p-6 rounded-xl flex flex-col gap-6">
        {/* Header */}
        <header className="text-center">
          <h2 className="font-headline text-lg font-light tracking-widest text-tertiary mb-1 uppercase">
            Finalize Composition
          </h2>
          <div className="h-px w-10 bg-primary/40 mx-auto"></div>
        </header>

        {/* Form Content */}
        <div className="space-y-6">
          {/* File Format Selection */}
          <section>
            <label className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant block mb-3">
              File Format
            </label>
            <div className="grid grid-cols-3 gap-4">
              {["midi", "wav", "mp3"].map((f) => (
                <div key={f} className="group cursor-pointer">
                  <input
                    type="radio"
                    id={f}
                    name="format"
                    className="hidden peer"
                    checked={format === f}
                    onChange={() => setExportSettings({ format: f })}
                  />
                  <label
                    htmlFor={f}
                    className="block p-3 border border-outline-variant/30 rounded-lg text-center transition-all duration-300 peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-surface-bright cursor-pointer"
                  >
                    <span className="font-headline font-light tracking-widest text-xs text-on-surface group-hover:text-tertiary uppercase">
                      {f}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Quality Options */}
          <section className="space-y-6">
            {/* Sample Rate Selection */}
            <div>
              <label className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant block mb-3">
                Sample Rate
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "sr-44", label: "44.1kHz" },
                  { id: "sr-48", label: "48kHz" },
                  { id: "sr-88", label: "88.2kHz" },
                  { id: "sr-96", label: "96kHz" },
                ].map((sr) => (
                  <div key={sr.id} className="group cursor-pointer">
                    <input
                      type="radio"
                      id={sr.id}
                      name="sample-rate"
                      className="hidden peer"
                      checked={sampleRate === sr.id}
                      onChange={() => setExportSettings({ sampleRate: sr.id })}
                    />
                    <label
                      htmlFor={sr.id}
                      className="block py-3 border border-outline-variant/30 rounded-lg text-center transition-all duration-300 peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-surface-bright cursor-pointer"
                    >
                      <span className="font-headline font-light tracking-widest text-[10px] text-on-surface group-hover:text-tertiary">
                        {sr.label}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Bit Depth Selection */}
            <div>
              <label className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant block mb-3">
                Bit Depth
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "bd-16", label: "16-bit" },
                  { id: "bd-24", label: "24-bit" },
                  { id: "bd-32", label: "32-bit float" },
                ].map((bd) => (
                  <div key={bd.id} className="group cursor-pointer">
                    <input
                      type="radio"
                      id={bd.id}
                      name="bit-depth"
                      className="hidden peer"
                      checked={bitDepth === bd.id}
                      onChange={() => setExportSettings({ bitDepth: bd.id })}
                    />
                    <label
                      htmlFor={bd.id}
                      className="block py-3 border border-outline-variant/30 rounded-lg text-center transition-all duration-300 peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-surface-bright cursor-pointer"
                    >
                      <span className="font-headline font-light tracking-widest text-[10px] text-on-surface group-hover:text-tertiary">
                        {bd.label}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Metadata Info */}
        <div className="bg-surface-container-low p-4 rounded-lg border-l-2 border-primary/20">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary/60 text-sm">
              info
            </span>
            <div>
              <p className="font-label text-[10px] text-on-surface-variant leading-relaxed">
                Your composition will be exported with high-fidelity spectral
                resonance settings enabled.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <footer className="flex items-center justify-between mt-4">
          <button
            onClick={onClose}
            className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-tertiary transition-colors"
          >
            Cancel
          </button>
          <button className="relative group" onClick={onClose}>
            <div className="absolute -inset-1 bg-primary/20 blur-xl group-hover:bg-primary/30 transition duration-1000"></div>
            <div className="relative px-8 py-3 bg-surface-bright border border-primary/40 text-tertiary rounded-full font-headline text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-primary hover:text-on-primary">
              Confirm Export
            </div>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ExportModal;
