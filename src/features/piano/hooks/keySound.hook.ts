import * as Tone from "tone";
import { useEffect, useRef, useCallback } from "react";
import { usePianoStore } from "@/store/store";

export const useKeySound = () => {
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const reverbRef = useRef<Tone.Reverb | null>(null);
  const delayRef = useRef<Tone.FeedbackDelay | null>(null);
  const { adsr, oscillatorType, reverb, delay } = usePianoStore();

  useEffect(() => {
    // Effect chain setup
    reverbRef.current = new Tone.Reverb({
      decay: 6,
      wet: reverb,
    }).toDestination();

    delayRef.current = new Tone.FeedbackDelay({
      delayTime: "8n",
      feedback: 0.4,
      wet: delay,
    }).connect(reverbRef.current);

    // Map oscillator types to more complex synth engines
    const getSynthType = (type: string) => {
      if (type.includes("fat")) return Tone.FMSynth;
      if (type === "pwm") return Tone.AMSynth;
      if (type === "pulse") return Tone.MonoSynth;
      return Tone.Synth;
    }

    const synthType = getSynthType(oscillatorType);

    synthRef.current = new Tone.PolySynth(synthType as any, {
      oscillator: { type: oscillatorType } as any,
      envelope: {
        attack: adsr.attack,
        decay: adsr.decay,
        sustain: adsr.sustain,
        release: adsr.release,
      },
    } as any).connect(delayRef.current);

    return () => {
      synthRef.current?.dispose();
      reverbRef.current?.dispose();
      delayRef.current?.dispose();
    };
  }, [adsr, oscillatorType, reverb, delay]);

  const startNote = useCallback(async (note: string) => {
    // Ensure the audio context starts on user interaction
    if (Tone.getContext().state !== "running") {
      await Tone.start();
    }

    synthRef.current?.triggerAttack(note);
  }, []);

  const stopNote = useCallback(async (note: string) => {
      synthRef.current?.triggerRelease(note);
  }, []);

  return { startNote, stopNote };
};