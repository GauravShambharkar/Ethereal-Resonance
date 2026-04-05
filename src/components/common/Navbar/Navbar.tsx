"use client";

import React, { useEffect, useState } from "react";
import { MetronomeUI } from "@/features/metronome/components/MetronomeUI";
import { Logo } from "./Logo";
import { OctaveControl } from "./OctaveControl";
import { ActionButtons } from "./ActionButtons";

const Navbar = ({ onExportClick }: { onExportClick: () => void }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <nav className="z-50 flex justify-between items-center px-12 py-6 bg-background/80 backdrop-blur-md border-b border-white/5">
      <Logo />

      <div className="hidden md:flex gap-10 items-center">
        {/* Metronome Control */}
        <MetronomeUI />

        {/* Octave Control */}
        <OctaveControl />
      </div>

      <ActionButtons onExportClick={onExportClick} />
    </nav>
  );
};

export default Navbar;
