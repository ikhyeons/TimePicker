import { create } from "zustand";

interface States {
  isLogin: boolean;
  userInfo: {
    name: string;
  };
}

interface Actions {
  setLogin: () => void;
}

export const useUserStore = create<States & Actions>((set) => ({
  isLogin: false,
  userInfo: { name: "성익현" },

  setLogin: () => set((state) => ({ isLogin: true })),
  setlogout: () => set((state) => ({ isLogin: false })),
}));
