import { create } from "zustand";

type minState =
  | "notSelected"
  | "possible"
  | "impossible"
  | "ambiguous"
  | "selected";
type timeState = { min: number; state: minState };

interface States {
  resTime: timeState[][];
  prev: timeState[][];
  isSelecting: boolean;
  p1: { hour: number; min: number };
  p2: { hour: number; min: number };
}

interface Actions {
  setP1: (p: { hour: number; min: number }) => void;
  setP2: (p: { hour: number; min: number }) => void;
  savePrev: () => void;
  loadPrev: () => void;
  setTimeState: (
    p1: { hour: number; min: number },
    p2: { hour: number; min: number },
    minState: minState
  ) => void;
  setIsTimeSelecting: (state: boolean) => void;
}

export const useResponseStore = create<States & Actions>((set) => ({
  resTime: new Array(24).fill(
    new Array(6)
      .fill(null)
      .map((data, i) => ({ min: 10 * i, state: "notSelected" }))
  ),
  prev: new Array(24).fill(
    new Array(6)
      .fill(null)
      .map((data, i) => ({ min: 10 * i, state: "notSelected" }))
  ),
  isSelecting: false,

  p1: { hour: 0, min: 0 },
  p2: { hour: 0, min: 0 },

  setP1: (p) => set((state) => ({ p1: p })),
  setP2: (p) => set((state) => ({ p2: p })),

  setTimeState: (p1, p2, minState) => {
    //시작과 끝을 받아서
    const { start, end } = getStart(p1, p2);
    //해당 각 위치의 사이 상태를 전달받은 상태로 변경한다
    return set((state) => {
      const copyResTime = [...state.resTime];
      console.log(start, end);
      const result = copyResTime.map((data, i) => {
        if (i > start.hour && i < end.hour) {
          console.log("on here");
          return new Array(6)
            .fill(null)
            .map((data, i) => ({ min: 10 * i, state: minState }));
        }
        if (i == start.hour && i == end.hour) {
          return data.map((data2, i2) => {
            if (start.min <= i2 * 10 && end.min >= i2 * 10)
              return { min: 10 * i2, state: minState };
            return data2;
          });
        }
        if (i == start.hour) {
          return data.map((data2, i2) => {
            if (start.min <= i2 * 10) return { min: 10 * i2, state: minState };
            return data2;
          });
        }
        if (i == end.hour) {
          return data.map((data2, i2) => {
            if (end.min >= i2 * 10) return { min: 10 * i2, state: minState };
            return data2;
          });
        }
        return data;
      });
      return {
        resTime: result,
      };
    });
  },
  setIsTimeSelecting: (state) => set(() => ({ isSelecting: state })),
  savePrev: () => set((state) => ({ prev: state.resTime })),
  loadPrev: () => set((state) => ({ resTime: state.prev })),
}));

//  ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ내부 함수ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function getStart(
  p1: { hour: number; min: number },
  p2: { hour: number; min: number }
) {
  let start;
  let end;
  if (p1.hour == p2.hour) {
    start = p1.min > p2.min ? p2 : p1;
    end = p1.min > p2.min ? p1 : p2;
  } else {
    start = p1.hour > p2.hour ? p2 : p1;
    end = p1.hour > p2.hour ? p1 : p2;
  }

  return { start, end };
}
