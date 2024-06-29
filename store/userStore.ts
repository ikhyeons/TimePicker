import { create } from "zustand";

interface States {
  isLogin: boolean;
  userInfo: {
    name: string;
  };
}

interface Actions {
  login: () => void;
  logout: () => void;
}

export const useUserStore = create<States & Actions>((set) => ({
  isLogin: false,
  userInfo: { name: "성익현" },
  login: () => set(() => ({ isLogin: true })),
  logout: () => set(() => ({ isLogin: false })),
}));
