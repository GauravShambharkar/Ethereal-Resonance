"use client";

export const useKeyMapping = (keyCount: number) => {
    const getKeys = () => {
        const notes = ["C", "D", "E", "F", "G", "A", "B"];
        const blackKeyNotes = ["C#", "D#", "", "F#", "G#", "A#", ""];

        const keys = [];
        for (let i = 0; i < keyCount; i++) {
            const noteIndex = i % 7;
            const octave = Math.floor(i / 7) + 1;
            keys.push({
                note: `${notes[noteIndex]}${octave}`,
                blackKeyNote: blackKeyNotes[noteIndex] ? `${blackKeyNotes[noteIndex]}${octave}` : undefined
            });
        }
        return keys;
    };

    return { keys: getKeys() };
};
