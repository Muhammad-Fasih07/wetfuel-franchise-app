import { create } from "zustand";

const MIN_VISIBLE_MS = 250;

interface LoadingStoreState {
  count: number;
  visibleUntil: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  isGlobalLoading: () => boolean;
}

export const useLoadingStore = create<LoadingStoreState>((set, get) => ({
  count: 0,
  visibleUntil: 0,

  start: () => {
    const nextCount = get().count + 1;
    set({
      count: nextCount,
      visibleUntil: Math.max(get().visibleUntil, Date.now() + MIN_VISIBLE_MS),
    });
  },

  stop: () => {
    const nextCount = Math.max(0, get().count - 1);
    set({ count: nextCount });
  },

  reset: () => set({ count: 0, visibleUntil: 0 }),

  isGlobalLoading: () => {
    const { count, visibleUntil } = get();
    return count > 0 || Date.now() < visibleUntil;
  },
}));

export function selectIsGlobalLoading(state: LoadingStoreState): boolean {
  return state.count > 0 || Date.now() < state.visibleUntil;
}
