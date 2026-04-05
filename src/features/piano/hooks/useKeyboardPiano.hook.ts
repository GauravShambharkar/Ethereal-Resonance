"use client";

import { useEffect, useState } from 'react';
import { useKeySound } from './keySound.hook';

const KEYBOARD_MAP: Record<string, string> = {
    'c': 'C',
    'v': 'C#',
    'd': 'D',
    'r': 'D#',
    'e': 'E',
    'f': 'F',
    't': 'F#',
    'g': 'G',
    'y': 'G#',
    'a': 'A',
    'w': 'A#',
    'b': 'B'
};

export const useKeyboardPiano = (octave: number = 1) => {
    const { startNote, stopNote } = useKeySound();
    const [activeNotes, setActiveNotes] = useState<string[]>([]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.repeat) return;
            
            // Check if user is typing in an input field
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            const key = e.key.toLowerCase();
            const noteBase = KEYBOARD_MAP[key];
            
            if (noteBase) {
                const fullNote = `${noteBase}${octave}`;
                startNote(fullNote);
                setActiveNotes(prev => prev.includes(fullNote) ? prev : [...prev, fullNote]);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            const noteBase = KEYBOARD_MAP[key];
            
            if (noteBase) {
                const fullNote = `${noteBase}${octave}`;
                stopNote(fullNote);
                setActiveNotes(prev => prev.filter(n => n !== fullNote));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [startNote, stopNote, octave]);

    return { activeNotes };
};
