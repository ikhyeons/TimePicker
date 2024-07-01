import { create } from "zustand";

interface States {
  friendList: any[];
}

interface Actions {
  setFriendList: (data: any) => void;
}
export const useFriendStore = create<States & Actions>((set) => ({
  friendList: [],
  setFriendList: (data) => set((state) => ({ friendList: data })),
}));
