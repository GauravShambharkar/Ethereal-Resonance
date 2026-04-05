import React from "react";
import { usePianoStore } from "@/store/store";
import { DashboardCard } from "./DashboardCard";
import { useDashboardStore } from "../store/dashboard.store";
import SoundSelectionModal from "./SoundSelectionModal";

const Dashboard = () => {
  const { bpm, oscillatorType, reverb, setReverb, delay, setDelay } = usePianoStore();
  const { isSoundModalOpen, setIsSoundModalOpen } = useDashboardStore();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="px-12 pb-6">
      <div className="grid grid-cols-4 gap-4">
        {/* Sound Selection Card */}
        <DashboardCard
          label="Current Sound"
          value={oscillatorType.replace("fatsawtooth22", "Nocturnal Echo")}
          icon="tune"
          onClick={() => setIsSoundModalOpen(true)}
        />

        <SoundSelectionModal
          isOpen={isSoundModalOpen}
          onClose={() => setIsSoundModalOpen(false)}
        />

        {/* Reverb Card */}
        <DashboardCard label="Reverb Depth">
          <div className="flex flex-col gap-4 w-full relative">
            <span className="font-label text-[10px] text-primary absolute right-0 top-[-26px]">
              {Math.round(reverb * 100)}%
            </span>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={reverb}
              onChange={(e) => setReverb(parseFloat(e.target.value))}
              className="w-full h-1 bg-surface-container-highest appearance-none cursor-pointer accent-primary rounded-full"
            />
          </div>
        </DashboardCard>

        {/* Delay Card */}
        <DashboardCard label="Echo Decay">
          <div className="flex flex-col gap-4 w-full relative">
            <span className="font-label text-[10px] text-primary absolute right-0 top-[-26px]">
              {Math.round(delay * 100)}%
            </span>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={delay}
              onChange={(e) => setDelay(parseFloat(e.target.value))}
              className="w-full h-1 bg-surface-container-highest appearance-none cursor-pointer accent-primary rounded-full"
            />
          </div>
        </DashboardCard>

        {/* BPM Card */}
        <DashboardCard
          label="BPM"
          className="flex flex-col justify-center items-center h-full"
        >
          <span className="font-headline text-2xl font-extralight tracking-tighter text-on-surface transition-all group-hover:scale-110">
            {bpm}
          </span>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;
