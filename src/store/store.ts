import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExportSettings {
  format: string;
  sampleRate: string;
  bitDepth: string;
}

interface PianoState {
  keyCount: number;
  setKeyCount: (count: number) => void;
  exportSettings: ExportSettings;
  setExportSettings: (settings: Partial<ExportSettings>) => void;
  bpm: number;
  setBpm: (bpm: number) => void;
  isMetronomePlaying: boolean;
  setIsMetronomePlaying: (playing: boolean) => void;
}

export const usePianoStore = create<PianoState>()(
  persist(
    (set) => ({
      keyCount: 12,
      setKeyCount: (count) => set({ keyCount: count }),
      exportSettings: {
        format: "wave",
        sampleRate: "sr-96",
        bitDepth: "bd-32",
      },
      setExportSettings: (settings) =>
        set((state) => ({
          exportSettings: { ...state.exportSettings, ...settings },
        })),
      bpm: 72,
      setBpm: (bpm) => set({ bpm }),
      isMetronomePlaying: false,
      setIsMetronomePlaying: (playing) => set({ isMetronomePlaying: playing }),
    }),
    {
      name: "ethereal-piano-storage",
    }
  )
);
