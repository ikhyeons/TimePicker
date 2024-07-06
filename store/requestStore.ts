import { create } from "zustand";

interface States {
  sendRequestData: {
    title: string;
    description: string;
    deadline: Date | null;
    receiver: string[];
    type: reqType;
  };
}

interface Actions {
  setSendRequestTitle: (title: string) => void;
  setSendRequestDescription: (desc: string) => void;
  setSendRequestDeadline: (date: Date) => void;
  setSendRequestReceiver: (receiver: any) => void;
  setSendRequestType: (type: reqType) => void;
}
export const useRequestStore = create<States & Actions>((set) => ({
  sendRequestData: {
    title: "",
    description: "",
    deadline: null,
    receiver: [],
    type: "date",
  },
  setSendRequestTitle: (title: string) =>
    set((state) => ({
      sendRequestData: { ...state.sendRequestData, title },
    })),
  setSendRequestDescription: (desc) =>
    set((state) => ({
      sendRequestData: { ...state.sendRequestData, description: desc },
    })),
  setSendRequestDeadline: (deadline) =>
    set((state) => ({
      sendRequestData: { ...state.sendRequestData, deadline },
    })),
  //수정
  setSendRequestReceiver: (receiver) =>
    set((state) => ({
      sendRequestData: { ...state.sendRequestData, receiver },
    })),
  //
  setSendRequestType: (type) =>
    set((state) => ({
      sendRequestData: { ...state.sendRequestData, type },
    })),
}));
