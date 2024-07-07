import { Dimensions } from "react-native";

export const FULL_WIDTH = Dimensions.get("screen").width;
export const FULL_HEIGHT = Dimensions.get("screen").height;
export const HALF_WIDTH = FULL_WIDTH / 2;
export const HALF_HEIGHT = FULL_HEIGHT / 2;
export const TEXT_INPUT_lg = (FULL_WIDTH * 3) / 4;
export const TEXT_INPUT_md = FULL_WIDTH / 2;
export const TEXT_INPUT_sm = FULL_WIDTH / 3;

export const BTN_xl = FULL_WIDTH - 5;
export const BTN_lg = (FULL_WIDTH * 3) / 4;
export const BTN_md = (FULL_WIDTH * 3) / 8 - 5;
export const BTN_sm = FULL_WIDTH / 3 - 5;
export const BTN_xs = FULL_WIDTH / 4 - 5;
export default {};
