import { create } from "zustand";

interface States {
  selectedRequestData: selectedRequestData;
  openedDate: string | null;
}

interface Actions {
  addDate: () => void;
  deleteDate: (date: string) => void;
  setOpenedDate: (date: string) => void;
  resetSelectedData: () => void;
}

export const useSelectedRequestStore = create<States & Actions>((set) => ({
  selectedRequestData: {},
  openedDate: null,

  resetSelectedData: () => set(() => ({ selectedRequestData: {} })),
  setOpenedDate: (date: string) => set(() => ({ openedDate: date })),

  addDate: () =>
    set((state) => {
      let newData = { ...state.selectedRequestData };
      newData[`${state.openedDate}`] = {
        time: `${state.openedDate}`,
        selected: true,
        dotColor: "black",
      };
      return { selectedRequestData: newData };
    }),

  deleteDate: (date: string) =>
    set((state) => {
      let newData = { ...state.selectedRequestData };
      if (state.selectedRequestData[`${date}`]) {
        state.selectedRequestData[`${date}`].selected == true
          ? delete newData[`${date}`]
          : null;
      }
      return { selectedRequestData: newData };
    }),
}));
