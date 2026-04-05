"use client";

import React from "react";
import { usePianoStore } from "@/store/store";
import { PianoKeys } from "./PianoKeys";
import { usePianoKeys } from "../hooks/pianoKeys.hook";

import { useKeyMapping } from "../hooks/useKeyMapping.hook";

const Piano = () => {
  const { keyCount: urlKeyCount } = usePianoKeys();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const keyCountValue = parseInt(urlKeyCount?.totalKeys || "12");
  const { keys: currentKeys } = useKeyMapping(keyCountValue);

  if (!isMounted) return null;

  return (
    <div className="grow w-full flex items-center justify-center px-6 overflow-hidden">
      <div className="flex gap-1.5 p-6 rounded-lg ethereal-blur overflow-x-auto max-w-[90%]">
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
