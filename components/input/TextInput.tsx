import React from "react";
import styled from "styled-components/native";
import { TEXT_INPUT_lg } from "../../style/size";
import { WHITE } from "../../style/color";

const SInputContainer = styled.Pressable`
  padding: 5px;
  background-color: ${WHITE};
  border-radius: 10px;
  width: ${TEXT_INPUT_lg}px;
  margin: 5px;
`;

const SInput = styled.TextInput``;

const TextInput = (props: {
  placeholder: string;
  value: string;

  onSubmit?: () => void;
  onChangeText?: (string: string) => void;
}) => {
  return (
    <SInputContainer>
      <SInput
        placeholder={props.placeholder}
        value={props.value}
        returnKeyType="next"
        onSubmitEditing={props.onSubmit}
        onChangeText={props.onChangeText}
      />
    </SInputContainer>
  );
};

export default TextInput;
