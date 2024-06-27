import React from "react";
import styled from "styled-components/native";
import { BTN_lg } from "../../style/size";

const BtnContainer = styled.View`
  width: ${BTN_lg}px;
  margin: 5px;
  padding: 10px 5px;
  border-radius: 5px;
  background-color: white;
`;

const SBtn = styled.TouchableOpacity``;

const SBtnText = styled.Text`
  text-align: center;
`;

const SocialLoginBtn = (props: { text: string }) => {
  return (
    <BtnContainer>
      <SBtn>
        <SBtnText>{props.text}</SBtnText>
      </SBtn>
    </BtnContainer>
  );
};

export default SocialLoginBtn;
