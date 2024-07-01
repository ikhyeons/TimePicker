import { create } from "zustand";

interface States {
  groupList: any[];
}

interface Actions {
  setGroupList: (data: any) => void;
}
export const useGroupStore = create<States & Actions>((set) => ({
  groupList: [],
  setGroupList: (data) => set((state) => ({ groupList: data })),
}));
