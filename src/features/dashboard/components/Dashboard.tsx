import React from "react";
import { usePianoStore } from "@/store/store";
import { useDashboardStore } from "../store/dashboard.store";
import SoundSelectionModal from "./SoundSelectionModal";

const Dashboard = () => {
  const { bpm, oscillatorType } = usePianoStore();
  const { isSoundModalOpen, setIsSoundModalOpen } = useDashboardStore();

  return (
    <div className="px-12 pb-6 z-10">
      <div className="grid grid-cols-4 gap-4">
        {/* Sound Selection Card */}
        <button 
          onClick={() => setIsSoundModalOpen(true)}
          className="bg-surface-container-low border border-outline-variant/10 p-4 rounded-lg group hover:border-primary/30 transition-all duration-500 text-left relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-3 relative z-10">
            Current Sound
          </span>
          <div className="flex justify-between items-center relative z-10">
            <span className="font-headline text-lg font-light text-on-surface group-hover:text-primary transition-colors capitalize">
              {oscillatorType.replace("fatsawtooth22", "Nocturnal Echo")}
            </span>
            <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              tune
            </span>
          </div>
        </button>

        <SoundSelectionModal 
          isOpen={isSoundModalOpen} 
          onClose={() => setIsSoundModalOpen(false)} 
        />

        {/* Reverb Card */}
        <div className="bg-surface-container-low border border-outline-variant/10 p-4 rounded-lg group">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
              Reverb Depth
            </span>
            <span className="font-label text-[10px] text-primary">82%</span>
          </div>
          <div className="h-1 w-full bg-surface-container-highest rounded-full">
            <div className="h-full w-[82%] bg-primary"></div>
          </div>
        </div>

        {/* Delay Card */}
        <div className="bg-surface-container-low border border-outline-variant/10 p-4 rounded-lg group">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
              Echo Decay
            </span>
            <span className="font-label text-[10px] text-primary">45%</span>
          </div>
          <div className="h-1 w-full bg-surface-container-highest rounded-full">
            <div className="h-full w-[45%] bg-primary"></div>
          </div>
        </div>

        {/* BPM Card */}
        <div className="bg-surface-container-low border border-outline-variant/10 p-4 rounded-lg flex flex-col justify-center items-center group relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="font-headline text-2xl font-extralight tracking-tighter text-on-surface relative z-10 transition-all group-hover:scale-110">
            {bpm}
          </span>
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mt-1 relative z-10">
            BPM
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
