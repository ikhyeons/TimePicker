import { create } from "zustand";

import { getItem, setItem } from "../localStorage/localStorage";

interface States {
  scheduleList: ISchedule[];
}

interface Actions {
  fetch: () => void;
  modifySchedule: (id: number, title: string, description: string) => void;
  addSchedule: (
    time: string,
    date: string,
    title: string,
    description: string
  ) => void;
  clear: () => void;
  removeSchedule: (id: number) => void;
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

  modifySchedule: (id: number, title: string, description: string) => {
    return set((state) => {
      const newSchedule = state.scheduleList.map((data) => {
        if (data.id == id) {
          return { ...data, title: title, description: description };
        }
        return data;
      });
      setItem("schedule", JSON.stringify(newSchedule));
      return { scheduleList: newSchedule };
    });
  },

  removeSchedule: (id) => {
    return set((state) => {
      const newSchedule = state.scheduleList.filter((data) => data.id != id);
      setItem("schedule", JSON.stringify(newSchedule));
      return { scheduleList: newSchedule };
    });
  },
}));
