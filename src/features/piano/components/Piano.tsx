"use client";

import React from "react";
import { usePianoStore } from "@/store/store";
import { PianoKeys } from "./PianoKeys";
import { usePianoKeys } from "../pianoKeys.hook";

const Piano = () => {
  const { keyCount: urlKeyCount } = usePianoKeys();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const keyCount = parseInt(urlKeyCount?.totalKeys || "7");

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

  const currentKeys = getKeys();

  return (
    <div className="grow w-full flex items-center justify-center px-6 relative overflow-hidden">
      <div className="flex gap-1.5 p-6 rounded-lg ethereal-blur relative overflow-x-auto max-w-[90%]">
        {currentKeys.map((key, i) => (
          <PianoKeys
            key={`${key.note}-${i}`}
            note={key.note}
            blackKeyNote={key.blackKeyNote && i < currentKeys.length - 1 ? key.blackKeyNote : undefined}
            isActive={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Piano;
