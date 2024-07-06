import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import { FULL_HEIGHT, FULL_WIDTH } from "../../style/size";

const ModalBackground = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.1);
`;

const MainComponentWrap = styled.View`
  background-color: rgba(0, 0, 0, 0.1);
`;

const MainComponent = styled.View`
  height: 720px;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: rgba(0, 0, 0, 0.9);
`;

const TimeModal = (props: {
  visible: boolean;
  setVisible: (state: boolean) => void;
}) => {
  if (props.visible == false) return null;

  return (
    <Modal visible={props.visible} animationType="slide" transparent={true}>
      <ModalBackground
        onPress={() => {
          props.setVisible(false);
        }}
      />

      <MainComponentWrap>
        <MainComponent>
          <Text>Modal</Text>
        </MainComponent>
      </MainComponentWrap>
    </Modal>
  );
};

export default TimeModal;
