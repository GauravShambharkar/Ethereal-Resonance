"use client";

import React from "react";
import { usePianoStore } from "@/store/store";

const Sidebar = () => {
  const { keyCount, setKeyCount } = usePianoStore();

  const options = [
    { label: "7 Keys", value: 7, icon: "reorder" },
    { label: "12 Keys", value: 12, icon: "apps" },
    { label: "24 Keys", value: 24, icon: "grid_view" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col items-center py-12 z-40 bg-surface-container-low/80 backdrop-blur-xl w-20 shadow-[40px_0_60px_-15px_rgba(170,202,234,0.04)]">
      <div className="mb-12 flex flex-col items-center">
        <span className="font-headline text-[10px] uppercase tracking-[0.3em] text-on-surface-variant">
          Octave
        </span>
        <div className="h-px w-8 bg-primary/30 mt-2"></div>
      </div>

      <div className="flex flex-col gap-8 grow justify-center w-full">
        {options.map((item) => (
          <button
            key={item.label}
            onClick={() => setKeyCount(item.value)}
            className={`group flex flex-col items-center justify-center transition-all duration-300 active:scale-95 ${
              keyCount === item.value
                ? "text-primary relative after:absolute after:right-0 after:h-8 after:w-1 after:bg-primary after:shadow-[0_0_15px_#aacaea]"
                : "text-on-surface-variant/40 hover:text-tertiary"
            }`}
          >
            <span className="material-symbols-outlined mb-1 text-[20px]">{item.icon}</span>
            <span className="font-label text-[10px] uppercase tracking-widest text-center px-2 opacity-80">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
