"use client";

import React from "react";

const Navbar = ({ onExportClick }: { onExportClick: () => void }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-12 py-6 bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <span className="text-base font-light tracking-widest text-tertiary font-headline opacity-80">
          Ethereal Resonance
        </span>
      </div>

      <div className="hidden md:flex gap-10 items-center">
        {["Composition", "Library", "Tuning"].map((item, i) => (
          <a
            key={item}
            href="#"
            className={`font-headline uppercase tracking-[0.2em] text-[10px] transition-all duration-500 ${
              i === 0
                ? "text-primary border-b border-primary/40 pb-1"
                : "text-on-surface-variant/40 hover:text-primary"
            }`}
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex gap-4">
          <button className="text-on-surface-variant/40 hover:text-primary transition-all duration-300">
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>
          <button className="text-on-surface-variant/40 hover:text-primary transition-all duration-300">
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
        <button
          onClick={onExportClick}
          className="bg-surface-bright/50 border border-primary/20 px-5 py-1.5 rounded text-[10px] font-label uppercase tracking-widest text-primary/80 hover:bg-primary hover:text-on-primary transition-all duration-500"
        >
          Export
        </button>
      </div>
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent"></div>
    </nav>
  );
};

export default Navbar;
