import * as Tone from "tone";
import { useEffect, useRef, useCallback } from "react";
import { usePianoStore } from "@/store/store";

export const useKeySound = () => {
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const pianoRef = useRef<Tone.Sampler | null>(null);
  const reverbRef = useRef<Tone.Reverb | null>(null);
  const delayRef = useRef<Tone.FeedbackDelay | null>(null);
  const { adsr, oscillatorType, reverb, delay, instrument } = usePianoStore();

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

    // Piano sampler integration
    pianoRef.current = new Tone.Sampler({
      urls: {
        A0: "A0.mp3",
        C1: "C1.mp3",
        "D#1": "Ds1.mp3",
        "F#1": "Fs1.mp3",
        A1: "A1.mp3",
        C2: "C2.mp3",
        "D#2": "Ds2.mp3",
        "F#2": "Fs2.mp3",
        A2: "A2.mp3",
        C3: "C3.mp3",
        "D#3": "Ds3.mp3",
        "F#3": "Fs3.mp3",
        A3: "A3.mp3",
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
        C5: "C5.mp3",
        "D#5": "Ds5.mp3",
        "F#5": "Fs5.mp3",
        A5: "A5.mp3",
        C6: "C6.mp3",
        "D#6": "Ds6.mp3",
        "F#6": "Fs6.mp3",
        A6: "A6.mp3",
        C7: "C7.mp3",
        "D#7": "Ds7.mp3",
        "F#7": "Fs7.mp3",
        A7: "A7.mp3",
        C8: "C8.mp3"
      },
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).connect(delayRef.current);

    return () => {
      synthRef.current?.dispose();
      pianoRef.current?.dispose();
      reverbRef.current?.dispose();
      delayRef.current?.dispose();
    };
  }, [adsr, oscillatorType, reverb, delay]);

  const startNote = useCallback(async (note: string) => {
    // Ensure the audio context starts on user interaction
    if (Tone.getContext().state !== "running") {
      await Tone.start();
    }

    if (instrument === "piano") {
      pianoRef.current?.triggerAttack(note);
    } else {
      synthRef.current?.triggerAttack(note);
    }
  }, [instrument]);

  const stopNote = useCallback(async (note: string) => {
    if (instrument === "piano") {
      pianoRef.current?.triggerRelease(note);
    } else {
      synthRef.current?.triggerRelease(note);
    }
  }, [instrument]);

  return { startNote, stopNote };
};