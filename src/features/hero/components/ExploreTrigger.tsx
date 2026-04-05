import React from "react";
import { Compass, ChevronDown } from "lucide-react";

interface ExploreTriggerProps {
  isOpen: boolean;
  toggleModal: () => void;
}

export const ExploreTrigger = ({ isOpen, toggleModal }: ExploreTriggerProps) => (
  <button 
    onClick={toggleModal}
    className="flex items-center gap-2 px-5 py-2.5 bg-surface-container border border-outline-variant/10 hover:border-primary/30 rounded-full transition-all text-on-surface hover:text-primary shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_24px_rgba(30,136,229,0.15)] group"
  >
    <Compass className="w-[14px] h-[14px] transition-transform group-hover:scale-110 text-primary" />
    <span className="font-label text-[10px] uppercase tracking-[0.2em] pt-[2px]">Explore</span>
    <ChevronDown className={`w-3 h-3 transition-transform duration-300 text-on-surface-variant ${isOpen ? "rotate-180" : ""}`} />
  </button>
);
