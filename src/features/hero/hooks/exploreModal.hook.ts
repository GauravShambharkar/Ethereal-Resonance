import React, { useState } from "react";
import { MAJOR_PROGRESSIONS, MINOR_PROGRESSIONS } from "../data/progressions";
import { useDraggable } from "@/hooks/useDraggable.hook";

export const useExploreModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<"notes" | "loops" | null>("notes");
  const [majorIndex, setMajorIndex] = useState(0);
  const [minorIndex, setMinorIndex] = useState(0);

  const draggableOptions = useDraggable();

  const handleRandomize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMajorIndex(Math.floor(Math.random() * MAJOR_PROGRESSIONS.length));
    setMinorIndex(Math.floor(Math.random() * MINOR_PROGRESSIONS.length));
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMajorIndex(0);
    setMinorIndex(0);
  };

  const toggleModal = () => setIsOpen((prev) => !prev);
  const toggleAccordion = (section: "notes" | "loops") =>
    setActiveAccordion((prev) => (prev === section ? null : section));

  return {
    isOpen,
    toggleModal,
    activeAccordion,
    toggleAccordion,
    majorIndex,
    minorIndex,
    MAJOR_PROGRESSIONS,
    MINOR_PROGRESSIONS,
    handleRandomize,
    handleReset,
    draggableOptions,
  };
};
