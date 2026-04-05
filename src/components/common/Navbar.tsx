"use client";

import React, { useEffect, useState } from "react";
import { Settings2, Sliders } from "lucide-react";
import { MetronomeUI } from "@/features/metronome/components/MetronomeUI";

const Navbar = ({ onExportClick }: { onExportClick: () => void }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <nav className="z-50 flex justify-between items-center px-12 py-6 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-4">
        <span className="text-base font-light tracking-widest text-tertiary font-headline opacity-80 decoration-primary/40 underline-offset-8 transition-all hover:underline cursor-default">
          Ethereal Resonance
        </span>
      </div>

      <div className="hidden md:flex gap-10 items-center">
        {/* Metronome Control */}
        <MetronomeUI />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex gap-4">
          <button className="text-on-surface-variant/40 hover:text-primary transition-all duration-300">
            <Settings2 size={18} />
          </button>
          <button className="text-on-surface-variant/40 hover:text-primary transition-all duration-300">
            <Sliders size={18} />
          </button>
        </div>
        <button
          onClick={onExportClick}
          className="bg-surface-bright/50 border border-primary/20 px-5 py-1.5 rounded text-[10px] font-label uppercase tracking-widest text-primary/80 hover:bg-primary hover:text-on-primary shadow-[0_0_20px_rgba(170,202,234,0.05)] transition-all duration-500"
        >
          Export
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
