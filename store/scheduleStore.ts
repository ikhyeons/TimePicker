import { create } from "zustand";

import { getItem, setItem } from "../localStorage/localStorage";

interface States {
  scheduleList: {
    id: number;
    time: string;
    date: string;
    title: string;
    description: string;
  }[];
}

interface Actions {
  fetch: () => void;
  addSchedule: (
    time: string,
    date: string,
    title: string,
    description: string
  ) => void;
  clear: () => void;
  removeSchedule: () => void;
}

export const useScheduleStore = create<States & Actions>((set) => ({
  scheduleList: [],
  fetch: async () => {
    set({
      scheduleList: await getItem("schedule").then((res) => JSON.parse(res)),
    });
  },
  clear: () =>
    set(() => {
      setItem("schedule", "[]");
      return { scheduleList: [] };
    }),
  addSchedule: (
    time: string,
    date: string,
    title: string,
    description: string
  ) =>
    set((state) => {
      if (state.scheduleList.length == 0) {
        setItem(
          "schedule",
          JSON.stringify([
            ...state.scheduleList,
            {
              id: 1,
              time,
              date,
              title,
              description,
            },
          ])
        );
        return {
          scheduleList: [
            ...state.scheduleList,
            {
              id: 0,
              time,
              date,
              title,
              description,
            },
          ],
        };
      } else {
        setItem(
          "schedule",
          JSON.stringify([
            ...state.scheduleList,
            {
              id: state.scheduleList[state.scheduleList.length - 1].id + 1,
              time,
              date,
              title,
              description,
            },
          ])
        );
        return {
          scheduleList: [
            ...state.scheduleList,
            {
              id: state.scheduleList[state.scheduleList.length - 1].id + 1,
              time,
              date,
              title,
              description,
            },
          ],
        };
      }
    }),
  removeSchedule: () => set((state) => ({})),
}));
