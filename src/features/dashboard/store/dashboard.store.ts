import { create } from "zustand";

interface DashboardState {
  isSoundModalOpen: boolean;
  setIsSoundModalOpen: (isOpen: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  isSoundModalOpen: false,
  setIsSoundModalOpen: (isOpen) => set({ isSoundModalOpen: isOpen }),
}));
