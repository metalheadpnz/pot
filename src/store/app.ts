import { create } from 'zustand';

type AppStoreType = {
  currentLevel: number;
  setCurrentLevel: (lvl: number) => void;
};

export const useAppStore1 = create<AppStoreType>((set) => ({
  currentLevel: 0,
  setCurrentLevel: (lvl) => set({ currentLevel: lvl }),
}));
