import React from "react";
import styled from "styled-components/native";
import {
  BTN_lg,
  BTN_md,
  BTN_sm,
  BTN_xs,
  BTN_xl,
  BTN_xxs,
} from "../../style/size";

const BtnContainer = styled.View<{ size: TSize; isSelect: boolean }>`
  width: ${(prop) => {
    if (prop.size == "xl") return BTN_xl;
    else if (prop.size == "lg") return BTN_lg;
    else if (prop.size == "md") return BTN_md;
    else if (prop.size == "sm") return BTN_sm;
    else if (prop.size == "xs") return BTN_xs;
    else return BTN_xxs;
  }}px;
  margin: 5px;
  padding: 10px 5px;
  border-radius: 5px;
  background-color: white;
  justify-content: center;
  border-width: ${(prop) => (prop.isSelect ? 2 : 0)}px;
`;
const SBtn = styled.TouchableOpacity``;

const SBtnText = styled.Text`
  text-align: center;
`;
const SelectableBtn = (props: {
  text: string;
  size: TSize;
  isSelect: boolean;
  onPress?: () => void;
}) => {
  return (
    <BtnContainer isSelect={props.isSelect} size={props.size}>
      <SBtn onPress={props.onPress}>
        <SBtnText>{props.text}</SBtnText>
      </SBtn>
    </BtnContainer>
  );
};

export default SelectableBtn;
