import * as Tone from "tone";
import { useEffect, useRef, useCallback } from "react";
import { usePianoStore } from "@/store/store";

export const useKeySound = () => {
  // Use a ref to store the synth instance across renders
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const { adsr, oscillatorType } = usePianoStore();

  useEffect(() => {
    // Initialize a polysynth with dynamic settings
    synthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: oscillatorType } as any,
      envelope: {
        attack: adsr.attack,
        decay: adsr.decay,
        sustain: adsr.sustain,
        release: adsr.release,
      },
    } as any).toDestination();

    return () => {
      synthRef.current?.dispose();
    };
  }, [adsr, oscillatorType]);

  const playNote = useCallback(async (note: string) => {
    // Ensure the audio context starts on user interaction
    if (Tone.getContext().state !== "running") {
      await Tone.start();
    }

    // Trigger the note slightly for a professional responsive feel
    synthRef.current?.triggerAttackRelease(note, "8n");
  }, []);

  return { playNote };
};