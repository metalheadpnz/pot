import { create } from 'zustand';

type AppStoreType = {
  currentLevel: number;
  setCurrentLevel: (lvl: number) => void;
};

export const useAppStore = create<AppStoreType>((set) => ({
  currentLevel: 2,

  setCurrentLevel: (lvl) => set({ currentLevel: lvl }),
}));
