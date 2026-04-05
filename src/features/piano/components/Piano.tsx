"use client";

import React from "react";
import { usePianoStore } from "@/store/store";
import { PianoKeys } from "./PianoKeys";
import { usePianoKeys } from "../hooks/pianoKeys.hook";

import { useKeyMapping } from "../hooks/useKeyMapping.hook";
import { useKeyboardPiano } from "../hooks/useKeyboardPiano.hook";

const Piano = () => {
  const { keyCount: urlKeyCount } = usePianoKeys();
  const { baseOctave } = usePianoStore();
  const [isMounted, ReactIsMounted] = React.useState(false);

  React.useEffect(() => {
    ReactIsMounted(true);
  }, []);

  const keyCountValue = parseInt(urlKeyCount?.totalKeys || "12");
  const { keys: currentKeys } = useKeyMapping(keyCountValue, baseOctave);
  const { activeNotes } = useKeyboardPiano(baseOctave);

  if (!isMounted) return null;

  return (
    <div className="grow w-full flex items-center justify-center px-6 overflow-hidden">
      <div className="flex gap-1.5 p-6 rounded-lg ethereal-blur overflow-x-auto max-w-[90%]">
        {currentKeys.map((key, i) => (
          <PianoKeys
            key={`${key.note}-${i}`}
            note={key.note}
            blackKeyNote={key.blackKeyNote && i < currentKeys.length - 1 ? key.blackKeyNote : undefined}
            isWhiteActive={activeNotes.includes(key.note)}
            isBlackActive={key.blackKeyNote ? activeNotes.includes(key.blackKeyNote) : false}
          />
        ))}
      </div>
    </div>
  );
};

export default Piano;
