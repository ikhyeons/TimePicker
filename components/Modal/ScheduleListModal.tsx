import React, { useState } from "react";
import styled from "styled-components/native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import Modal from "react-native-modal";
import Btn from "../btn/Btn";
import { FULL_HEIGHT, FULL_WIDTH, HALF_WIDTH } from "../../style/size";

const MainComponentWrap = styled.View`
  background-color: rgb(255, 255, 255);
  flex: 1;
`;

const ScheduleListModal = (props: {
  visible: boolean;
  setVisible: (state: boolean) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState<MarkedDates>({});
  if (props.visible == false) return null;
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
      <MainComponentWrap></MainComponentWrap>
    </Modal>
  );
};

export default ScheduleListModal;
