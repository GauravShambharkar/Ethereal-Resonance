"use client";

import React from "react";
import { GripHorizontal } from "lucide-react";
import { useExploreModal } from "../hooks/exploreModal.hook";
import { ExploreTrigger } from "./ExploreTrigger";
import { MusicNotesSection } from "./MusicNotesSection";
import { LoopsSection } from "./LoopsSection";

const ExploreModal = () => {
  const {
    isOpen,
    toggleModal,
    activeAccordion,
    toggleAccordion,
    majorIndex,
    minorIndex,
    handleRandomize,
    handleReset,
    draggableOptions: { position, handlePointerDown, handlePointerMove, handlePointerUp }
  } = useExploreModal();

  return (
    <div className="relative z-50">
      <ExploreTrigger isOpen={isOpen} toggleModal={toggleModal} />

      {isOpen && (
        <div
          className="fixed top-54 right-16 w-80 bg-[#0d0d0d25] border border-outline-variant/20 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] overflow-hidden z-100 backdrop-blur-xl transition-[transform_opacity] duration-0"
          style={{ transform: `translate(${position.x}px, ${position.y}px)`, touchAction: 'none' }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 border-b border-outline-variant/10 bg-linear-to-r from-surface-container-low to-transparent cursor-move flex justify-between items-center select-none hover:bg-surface-container/40 transition-colors"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <span className="font-headline text-sm tracking-widest text-on-surface uppercase pointer-events-none">
              Exploration Hub
            </span>
            <GripHorizontal className="w-4 h-4 text-on-surface-variant/50 pointer-events-none" />
          </div>

          <div className="flex flex-col max-h-[400px] overflow-y-auto">
            <MusicNotesSection
              isActive={activeAccordion === "notes"}
              toggle={() => toggleAccordion("notes")}
              majorIndex={majorIndex}
              minorIndex={minorIndex}
              handleRandomize={handleRandomize}
              handleReset={handleReset}
            />

            <LoopsSection
              isActive={activeAccordion === "loops"}
              toggle={() => toggleAccordion("loops")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreModal;
