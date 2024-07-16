import { create } from "zustand";

type minState = "notSelected" | "possible" | "impossible" | "ambiguous";
type timeState = { min: number; state: minState };
interface States {
  resTime: timeState[][];
}

interface Actions {}

export const useResponseStore = create<States & Actions>((set) => ({
  resTime: new Array(24).fill(
    new Array(6)
      .fill(null)
      .map((data, i) => ({ min: 10 * i, state: "notSelected" }))
  ),
}));
