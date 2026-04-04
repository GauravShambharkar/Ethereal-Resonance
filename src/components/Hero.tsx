"use client";

import React from "react";

const Hero = () => {
  return (
    <div className="px-12 pt-6 z-10 flex justify-between items-end">
      <div className="space-y-2">
        <h1 className="font-headline text-3xl font-extralight tracking-tighter text-on-surface opacity-90">
          Nocturnal Echo
        </h1>
        <p className="font-label text-[10px] uppercase tracking-[0.4em] text-on-surface-variant flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#aacaea]"></span>
          Live Input Active • 440Hz Standard
        </p>
      </div>
      <div className="text-right flex flex-col gap-1">
        <span className="font-label text-[10px] uppercase tracking-widest text-primary">
          Master Velocity
        </span>
        <div className="w-48 h-1 bg-surface-container-highest rounded-full overflow-hidden">
          <div
            className="w-[65%] h-full bg-primary shadow-[0_0_10px_#aacaea]"
            style={{ width: "65%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
