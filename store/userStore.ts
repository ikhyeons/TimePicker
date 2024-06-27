import { create } from "zustand";

interface States {
  isLogin: boolean;
}

interface Actions {
  login: () => void;
  logout: () => void;
}

export const useUserStore = create<States & Actions>((set) => ({
  isLogin: false,
  login: () => set(() => ({ isLogin: true })),
  logout: () => set(() => ({ isLogin: false })),
}));
