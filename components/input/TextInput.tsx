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
  multiline?: boolean;
  numOfLine?: number;
  onSubmit?: () => void;
  onChangeText?: (string: string) => void;
}) => {
  return (
    <SInputContainer>
      <SInput
        autoCapitalize={"none"}
        multiline={props.multiline}
        placeholder={props.placeholder}
        value={props.value}
        returnKeyType="next"
        onSubmitEditing={props.onSubmit}
        onChangeText={props.onChangeText}
        numberOfLines={props.numOfLine}
      />
    </SInputContainer>
  );
};

export default TextInput;
