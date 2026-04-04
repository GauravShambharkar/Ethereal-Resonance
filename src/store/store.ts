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
}

export const usePianoStore = create<PianoState>()(
  persist(
    (set) => ({
      keyCount: 7,
      setKeyCount: (count) => set({ keyCount: count }),
      exportSettings: {
        format: "midi",
        sampleRate: "sr-96",
        bitDepth: "bd-32",
      },
      setExportSettings: (settings) =>
        set((state) => ({
          exportSettings: { ...state.exportSettings, ...settings },
        })),
    }),
    {
      name: "ethereal-piano-storage",
    }
  )
);
