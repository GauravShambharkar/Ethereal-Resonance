import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as Tone from "tone";

interface ExportSettings {
  format: string;
  sampleRate: string;
  bitDepth: string;
}

interface AdsrSettings {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
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
  adsr: AdsrSettings;
  setAdsr: (adsr: Partial<AdsrSettings>) => void;
  oscillatorType: Tone.ToneOscillatorType;
  setOscillatorType: (type: Tone.ToneOscillatorType) => void;
  reverb: number;
  setReverb: (reverb: number) => void;
  delay: number;
  setDelay: (delay: number) => void;
  baseOctave: number;
  setBaseOctave: (octave: number) => void;
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
      adsr: {
        attack: 0.05,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
      },
      setAdsr: (adsr) =>
        set((state) => ({
          adsr: { ...state.adsr, ...adsr },
        })),
      oscillatorType: "fatsawtooth22" as Tone.ToneOscillatorType,
      setOscillatorType: (type) => set({ oscillatorType: type }),
      reverb: 0.5,
      setReverb: (reverb) => set({ reverb }),
      delay: 0.3,
      setDelay: (delay) => set({ delay }),
      baseOctave: 2,
      setBaseOctave: (octave) => set({ baseOctave: octave }),
    }),
    {
      name: "ethereal-piano-storage",
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);
