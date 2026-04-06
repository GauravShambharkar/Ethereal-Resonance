import React from "react";
import { usePianoStore } from "@/store/store";
import { DashboardCard } from "./DashboardCard";
import { useDashboardStore } from "../store/dashboard.store";
import SoundSelectionModal from "./SoundSelectionModal";

const DebouncedDashboardSlider = ({ value, onChange, label }: { value: number, onChange: (v: number) => void, label: string }) => {
  const [localValue, setLocalValue] = React.useState(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (localValue !== value) {
        console.log(`[Debounced UI] updating store for "${label}" to:`, localValue);
        onChange(localValue);
      }
    }, 380);
    return () => clearTimeout(handler);
  }, [localValue, onChange, value, label]);

  return (
    <div className="flex flex-col gap-4 w-full relative">
      <span className="font-label text-[10px] text-primary absolute right-0 top-[-26px]">
        {Math.round(localValue * 100)}%
      </span>
      <input 
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={localValue}
        onChange={(e) => setLocalValue(parseFloat(e.target.value))}
        className="w-full h-1 bg-surface-container-highest appearance-none cursor-pointer accent-primary rounded-full"
      />
    </div>
  );
};
const Dashboard = () => {
  const { bpm, oscillatorType, reverb, setReverb, delay, setDelay, instrument } = usePianoStore();
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
          label={instrument === "piano" ? "Acoustic Element" : "Current Synth"}
          value={instrument === "piano" ? "Grand Piano" : oscillatorType.replace("fatsawtooth22", "Nocturnal Echo")}
          icon={instrument === "piano" ? "piano" : "tune"}
          onClick={instrument === "piano" ? undefined : () => setIsSoundModalOpen(true)}
        />

        <SoundSelectionModal
          isOpen={isSoundModalOpen}
          onClose={() => setIsSoundModalOpen(false)}
        />

        {/* Reverb Card */}
        <DashboardCard label="Reverb Depth">
          <DebouncedDashboardSlider value={reverb} onChange={setReverb} label="Reverb Depth" />
        </DashboardCard>

        {/* Delay Card */}
        <DashboardCard label="Echo Decay">
          <DebouncedDashboardSlider value={delay} onChange={setDelay} label="Echo Decay" />
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
