import React from "react";
import { Settings2, Sliders } from "lucide-react";

export const ActionButtons = ({
  onExportClick,
}: {
  onExportClick: () => void;
}) => {
  return (
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
  );
};
