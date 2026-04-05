import React from "react";
import { ChevronDown, ChevronUp, RefreshCw } from "lucide-react";

interface LoopsSectionProps {
  isActive: boolean;
  toggle: () => void;
}

export const LoopsSection = ({ isActive, toggle }: LoopsSectionProps) => (
  <div>
    <div 
      className="w-full px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-surface-variant/10 transition-colors"
      onClick={toggle}
    >
      <div className="flex items-center gap-2 text-on-surface">
        <RefreshCw className="w-4 h-4 text-[#cd9f59]" />
        <span className="font-label text-xs uppercase tracking-widest">Loops</span>
      </div>
      {isActive ? (
        <ChevronUp className="w-4 h-4 text-on-surface-variant" />
      ) : (
        <ChevronDown className="w-4 h-4 text-on-surface-variant" />
      )}
    </div>

    {isActive && (
      <div className="p-4 pt-0 bg-surface-container-lowest/50 backdrop-blur-sm">
        <div className="bg-surface-container/50 border border-outline-variant/10 border-dashed rounded-lg p-6 flex items-center justify-center">
          <span className="text-[10px] text-on-surface-variant/60 font-label uppercase tracking-widest">
            Empty for now
          </span>
        </div>
      </div>
    )}
  </div>
);
