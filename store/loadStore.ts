import { create } from "zustand";

interface States {
  isLoading: boolean;
}

interface Actions {
  setLoadingTrue: () => void;
  setLoadingFalse: () => void;
}
export const useLoadStore = create<States & Actions>((set) => ({
  isLoading: true,
  setLoadingTrue: () => set((state) => ({ isLoading: true })),
  setLoadingFalse: () => set((state) => ({ isLoading: false })),
}));
