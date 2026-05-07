import { create } from "zustand";

interface AuthModalState {
  isAuthOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isAuthOpen: false,
  openAuthModal: () => set({ isAuthOpen: true }),
  closeAuthModal: () => set({ isAuthOpen: false }),
}));
