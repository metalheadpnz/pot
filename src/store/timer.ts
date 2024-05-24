import { create } from 'zustand';

type TimerType = {
  timer: number;
  decrementTimer: () => void;
  setTimer: (sec: number) => void;
  intervalId: number | null;
  setIntervalId: (id: number) => void;
};

export const useTimer = create<TimerType>((set) => ({
  timer: 0,
  intervalId: null,
  decrementTimer: () => {
    set((state) => ({
      timer: state.timer - 1,
    }));
  },
  setTimer: (sec) => {
    set({ timer: sec });
  },
  setIntervalId: (id) => {
    set({ intervalId: id });
  },
}));
