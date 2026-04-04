"use client";

import React from "react";
import { usePianoStore } from "@/store/store";
import { PianoKeys } from "./PianoKeys";
import { usePianoKeys } from "../pianoKeys.hook";

const Piano = () => {
  const { keyCount: urlKeyCount } = usePianoKeys();
  const keyCount = parseInt(urlKeyCount?.totalKeys || "7");

  const getKeys = () => {
    // Standard pattern for white/black keys in one octave (7 white keys)
    const pattern = [
      { note: "C", hasBlackKey: true },
      { note: "D", hasBlackKey: true },
      { note: "E", hasBlackKey: false },
      { note: "F", hasBlackKey: true },
      { note: "G", hasBlackKey: true },
      { note: "A", hasBlackKey: true },
      { note: "B", hasBlackKey: false },
    ];

    if (keyCount === 7) return pattern;
    if (keyCount === 12) {
      // For 12 keys, we can show slightly more than an octave?
      // Or just a full octave including black keys as separate tokens?
      // Actually 12 white keys is almost 2 octaves.
      // Usually "12 keys" for a piano ui means 12 WHITE keys.
      // 12 white keys = one full octave (7) + half next (5).
      return [...pattern, ...pattern.slice(0, 5)];
    }
    if (keyCount === 24) {
      // 24 white keys = 3+ octaves.
      return [...pattern, ...pattern, ...pattern, ...pattern.slice(0, 3)];
    }
    return pattern;
  };

  const currentKeys = getKeys();

  return (
    <div className="grow flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="flex gap-1.5 p-6 bg-surface-container-low/30 rounded-lg ethereal-blur relative overflow-x-auto max-w-full">
        {/* Strike Glow Container */}
        <div className="absolute inset-x-0 top-0 h-full piano-strike-glow opacity-30 pointer-events-none"></div>

        {currentKeys.map((key, i) => (
          <PianoKeys
            key={`${key.note}-${i}`}
            note={key.note}
            hasBlackKey={key.hasBlackKey && i < currentKeys.length - 1} // No black key on very last white key usually?
            isActive={i === 2} // Keep a default visual active state
          />
        ))}
      </div>
    </div>
  );
};

export default Piano;
