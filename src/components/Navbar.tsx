"use client";

import React from "react";

const Navbar = ({ onExportClick }: { onExportClick: () => void }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-12 py-8 bg-background">
      <div className="flex items-center gap-4">
        <span className="text-lg font-light tracking-tighter text-tertiary font-headline">
          Ethereal Resonance
        </span>
      </div>

      <div className="hidden md:flex gap-12 items-center">
        {["Composition", "Library", "Tuning"].map((item, i) => (
          <a
            key={item}
            href="#"
            className={`font-headline uppercase tracking-[0.2em] text-sm transition-colors duration-500 ${
              i === 0
                ? "text-tertiary border-b border-primary pb-1 hover:text-primary"
                : "text-on-secondary hover:text-primary"
            }`}
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-8">
        <div className="flex gap-4">
          <button className="text-on-secondary hover:text-primary transition-all duration-300">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="text-on-secondary hover:text-primary transition-all duration-300">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>
        <button
          onClick={onExportClick}
          className="bg-surface-bright border border-primary/20 px-6 py-2 rounded text-sm font-label uppercase tracking-widest text-primary hover:bg-primary hover:text-on-primary transition-all duration-500"
        >
          Export
        </button>
      </div>
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent"></div>
    </nav>
  );
};

export default Navbar;
