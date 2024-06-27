import React from "react";
import styled from "styled-components/native";
import { BTN_lg, BTN_md, BTN_sm } from "../../style/size";

const BtnContainer = styled.View<{ size: TSize }>`
  width: ${(prop) => {
    if (prop.size == "lg") return BTN_lg;
    else if (prop.size == "md") return BTN_md;
    else return BTN_sm;
  }}px;
  margin: 5px;
  padding: 10px 5px;
  border-radius: 5px;
  background-color: white;
`;
const SBtn = styled.TouchableOpacity``;

const SBtnText = styled.Text`
  text-align: center;
`;
const Btn = (props: { text: string; size: TSize; onPress?: () => void }) => {
  return (
    <BtnContainer size={props.size}>
      <SBtn onPress={props.onPress}>
        <SBtnText>{props.text}</SBtnText>
      </SBtn>
    </BtnContainer>
  );
};

export default Btn;
