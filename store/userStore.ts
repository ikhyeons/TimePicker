import { create } from "zustand";

interface States {
  isLogin: boolean;
  token: null | string;
  userInfo: {
    name: string;
  };
}

interface Actions {
  setToken: (token: string) => void;
  setLogin: () => void;
}

export const useUserStore = create<States & Actions>((set) => ({
  isLogin: false,
  token: null,
  userInfo: { name: "성익현" },

  setToken: (token: string) => set((state) => ({ token })),
  setLogin: () => set((state) => ({ isLogin: true })),
  setlogout: () => set((state) => ({ isLogin: false })),
}));
