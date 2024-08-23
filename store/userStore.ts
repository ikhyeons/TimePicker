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
  setLogout: () => void;
}

export const useUserStore = create<States & Actions>((set) => ({
  isLogin: false,
  token: null,
  userInfo: { name: "성익현" },

  setToken: (token: string) => set((state) => ({ token })),
  setLogin: () => set((state) => ({ isLogin: true })),
  setLogout: () => set((state) => ({ isLogin: false })),
}));
