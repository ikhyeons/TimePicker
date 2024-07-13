import { View, Text } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { FULL_HEIGHT, FULL_WIDTH, HALF_WIDTH } from "../../style/size";
import styled from "styled-components/native";

const MainComponentWrap = styled.View`
  background-color: rgb(255, 255, 255);

  flex: 1;
`;

const ResponseTimeModal = (props: {
  visible: boolean;
  setVisible: (state: boolean) => void;
}) => {
  return (
    <Modal
      onBackdropPress={() => {
        props.setVisible(false);
      }}
      onBackButtonPress={() => {
        props.setVisible(false);
      }}
      deviceHeight={FULL_HEIGHT}
      deviceWidth={FULL_WIDTH}
      isVisible={props.visible}
      swipeDirection="right"
      onSwipeComplete={() => props.setVisible(false)}
      backdropOpacity={0.1}
      style={{
        height: FULL_HEIGHT,
        width: (HALF_WIDTH * 8) / 5,
        margin: 0,
        marginLeft: FULL_WIDTH - (HALF_WIDTH * 8) / 5,
      }}
      hideModalContentWhileAnimating
      animationIn={"slideInRight"}
      animationOut={"slideOutRight"}
    >
      <MainComponentWrap>
        <Text>gd</Text>
      </MainComponentWrap>
    </Modal>
  );
};

export default ResponseTimeModal;
