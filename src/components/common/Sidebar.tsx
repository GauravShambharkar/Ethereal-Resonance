"use client";

import React from "react";
import { usePianoStore } from "@/store/store";
import { usePianoKeys } from "@/features/piano/pianoKeys.hook";

const Sidebar = () => {
  const { setKeyCount: setStoreKeyCount } = usePianoStore();
  const { keyCount, setKeyCount } = usePianoKeys();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const options = [
    { label: "12 Keys", value: "12", icon: "apps" },
    { label: "24 Keys", value: "24", icon: "grid_view" },
  ];

  const handleKeySelect = (value: string) => {
    setKeyCount({ totalKeys: value });
    setStoreKeyCount(parseInt(value));
  };

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col items-center py-12 z-40 bg-surface-container-low/80 backdrop-blur-xl w-20 shadow-[40px_0_60px_-15px_rgba(170,202,234,0.04)]">

      <div className="flex flex-col gap-8 grow justify-center w-full">
        {options.map((item) => (
          <button
            key={item.label}
            onClick={() => handleKeySelect(item.value)}
            className={`group flex flex-col items-center justify-center transition-all duration-300 active:scale-95 ${keyCount.totalKeys === item.value
              ? "text-primary relative after:absolute after:right-0 after:h-8 after:w-1 after:bg-primary after:shadow-[0_0_15px_#aacaea]"
              : "text-on-surface-variant/40 hover:text-tertiary"
              }`}
          >
            <span className="material-symbols-outlined mb-1 text-[20px]">
              {item.icon}
            </span>
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
