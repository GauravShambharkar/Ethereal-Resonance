"use client";

import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { usePianoStore } from "@/store/store";

export const useMetronome = () => {
    const { bpm, isMetronomePlaying, setIsMetronomePlaying } = usePianoStore();
    const clickSynth = useRef<Tone.MembraneSynth | null>(null);

    useEffect(() => {
        clickSynth.current = new Tone.MembraneSynth({
            pitchDecay: 0.008,
            octaves: 2,
            envelope: {
                attack: 0.0006,
                decay: 0.5,
                sustain: 0,
            },
        }).toDestination();

        return () => {
            clickSynth.current?.dispose();
        };
    }, []);

    useEffect(() => {
        Tone.getTransport().bpm.value = bpm;
        Tone.getTransport().cancel();

        Tone.getTransport().scheduleRepeat((time) => {
            clickSynth.current?.triggerAttackRelease("C2", "16n", time);
        }, "4n");

        if (isMetronomePlaying) {
            Tone.start().then(() => {
                Tone.getTransport().start();
            });
        } else {
            Tone.getTransport().stop();
        }
    }, [isMetronomePlaying, bpm]);

    const toggleMetronome = async () => {
        if (!isMetronomePlaying) {
            await Tone.start();
        }
        setIsMetronomePlaying(!isMetronomePlaying);
    };

    return { bpm, isMetronomePlaying, toggleMetronome };
};
