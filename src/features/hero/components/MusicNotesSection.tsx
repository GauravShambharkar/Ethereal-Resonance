import React from "react";
import { ChevronDown, ChevronUp, Dice5, RefreshCw, Music } from "lucide-react";
import { MAJOR_PROGRESSIONS, MINOR_PROGRESSIONS } from "../data/progressions";

interface MusicNotesSectionProps {
  isActive: boolean;
  toggle: () => void;
  majorIndex: number;
  minorIndex: number;
  handleRandomize: (e: React.MouseEvent) => void;
  handleReset: (e: React.MouseEvent) => void;
}

export const MusicNotesSection = ({
  isActive,
  toggle,
  majorIndex,
  minorIndex,
  handleRandomize,
  handleReset,
}: MusicNotesSectionProps) => {
  return (
    <div className="border-b border-outline-variant/10">
      <div 
        className="w-full px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-surface-variant/10 transition-colors"
        onClick={toggle}
      >
        <div className="flex items-center gap-2 text-on-surface">
          <Music className="w-4 h-4 text-primary" />
          <span className="font-label text-xs uppercase tracking-widest">Music Notes</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleRandomize} className="text-on-surface-variant hover:text-primary transition-colors" title="Randomize Chords">
            <Dice5 className="w-4 h-4" />
          </button>
          <button onClick={handleReset} className="text-on-surface-variant hover:text-primary transition-colors" title="Reset Chords">
            <RefreshCw className="w-4 h-4" />
          </button>
          {isActive ? (
            <ChevronUp className="w-4 h-4 text-on-surface-variant" />
          ) : (
            <ChevronDown className="w-4 h-4 text-on-surface-variant" />
          )}
        </div>
      </div>

      {isActive && (
        <div className="p-4 pt-0 bg-surface-container-lowest/50 backdrop-blur-sm">
          <p className="font-label text-[9px] text-on-surface-variant/80 mb-4 uppercase tracking-[0.2em]">
            4-Bar Chord Progressions
          </p>
          
          {/* Major Section */}
          <div className="mb-4">
            <h4 className="text-[10px] font-headline text-primary/80 mb-2 tracking-wider">MAJOR</h4>
            <div className="flex gap-2">
              {MAJOR_PROGRESSIONS[majorIndex].map((chord, idx) => (
                <div key={idx} className="flex-1 bg-surface-container-high/50 p-2 rounded border border-outline-variant/10 text-center shadow-inner flex flex-col gap-1 items-center justify-center">
                  <span className="text-[10px] text-on-surface font-medium whitespace-nowrap">{chord.name}</span>
                  <div className="flex gap-1 justify-center flex-wrap">
                     {chord.notes.map((n, i) => (
                        <span key={i} className="text-[7px] bg-surface-container-highest px-1 rounded text-on-surface-variant font-mono">{n}</span>
                     ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Minor Section */}
          <div>
            <h4 className="text-[10px] font-headline text-secondary/80 mb-2 tracking-wider">MINOR</h4>
            <div className="flex gap-2">
              {MINOR_PROGRESSIONS[minorIndex].map((chord, idx) => (
                <div key={idx} className="flex-1 bg-surface-container-high/50 p-2 rounded border border-outline-variant/10 text-center shadow-inner flex flex-col gap-1 items-center justify-center">
                  <span className="text-[10px] text-on-surface font-medium whitespace-nowrap">{chord.name}</span>
                  <div className="flex gap-1 justify-center flex-wrap">
                     {chord.notes.map((n, i) => (
                        <span key={i} className="text-[7px] bg-surface-container-highest px-1 rounded text-on-surface-variant font-mono">{n}</span>
                     ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
