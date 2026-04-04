"use client";

import React from "react";

const PianoKey = ({
  note,
  hasBlackKey = false,
  isActive = false,
}: {
  note: string;
  hasBlackKey?: boolean;
  isActive?: boolean;
}) => {
  return (
    <div className="relative group">
      <div
        className={`piano-key-white w-16 h-80 rounded-b-lg cursor-pointer transition-all duration-300 hover:brightness-110 active:brightness-90 active:scale-[0.98] relative flex flex-col justify-end items-center pb-6 border-t border-white/10 ${
          isActive ? "shadow-[0_0_40px_rgba(170,202,234,0.15)]" : ""
        }`}
      >
        {isActive && (
          <div className="absolute inset-0 bg-primary/20 rounded-b-lg"></div>
        )}
        <span
          className={`font-label text-[10px] tracking-widest uppercase font-bold z-10 ${
            isActive ? "text-on-secondary" : "text-on-secondary/50"
          }`}
        >
          {note}
        </span>
      </div>
      {hasBlackKey && (
        <div className="absolute top-0 right-0 translate-x-1/2 piano-key-black w-8 h-48 rounded-b-lg z-10 cursor-pointer border-t border-white/5 active:brightness-125"></div>
      )}
    </div>
  );
};

const Piano = () => {
  const keys = [
    { note: "C", hasBlackKey: true },
    { note: "D", hasBlackKey: true },
    { note: "E", isActive: true },
    { note: "F", hasBlackKey: true },
    { note: "G", hasBlackKey: true },
    { note: "A", hasBlackKey: true },
    { note: "B" },
  ];

  return (
    <div className="grow flex items-center justify-center px-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="flex gap-1.5 p-6 bg-surface-container-low/30 rounded-lg ethereal-blur relative">
        {/* Strike Glow Container */}
        <div className="absolute inset-x-0 top-0 h-full piano-strike-glow opacity-30 pointer-events-none"></div>

        {keys.map((key) => (
          <PianoKey
            key={key.note}
            note={key.note}
            hasBlackKey={key.hasBlackKey}
            isActive={key.isActive}
          />
        ))}
      </div>
    </div>
  );
};

export default Piano;
