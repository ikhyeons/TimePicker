import { create } from "zustand";

type minState = "notSelected" | "possible" | "impossible" | "ambiguous";
type timeState = { min: number; state: minState };

interface States {
  resTime: timeState[][];
  isSelecting: boolean;
}

interface Actions {
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

  isSelecting: false,

  p1: { hour: 0, min: 0 },
  p2: { hour: 0, min: 0 },

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
