"use client";

import React from "react";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col items-center py-12 z-40 bg-surface-container-low/80 backdrop-blur-xl w-20 shadow-[40px_0_60px_-15px_rgba(170,202,234,0.04)]">
      <div className="mb-12 flex flex-col items-center">
        <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-on-surface-variant">
          Octave
        </span>
        <div className="h-px w-8 bg-primary/30 mt-2"></div>
      </div>

      <div className="flex flex-col gap-10 grow justify-center w-full">
        {[
          { label: "7 Keys", icon: "reorder", active: true },
          { label: "12 Keys", icon: "apps" },
          { label: "24 Keys", icon: "grid_view" },
          { label: "Layers", icon: "layers" },
        ].map((item) => (
          <button
            key={item.label}
            className={`group flex flex-col items-center justify-center transition-all duration-300 active:scale-95 ${
              item.active
                ? "text-primary relative after:absolute after:right-0 after:h-8 after:w-1 after:bg-primary after:shadow-[0_0_15px_#aacaea]"
                : "text-[#444444] hover:text-tertiary"
            }`}
          >
            <span className="material-symbols-outlined mb-1">{item.icon}</span>
            <span className="font-label text-[10px] uppercase tracking-widest">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
