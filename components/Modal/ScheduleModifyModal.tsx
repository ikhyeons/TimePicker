import React, { useState } from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import { FULL_HEIGHT, FULL_WIDTH, HALF_HEIGHT } from "../../style/size";
import Btn from "../btn/Btn";
import TextInput from "../input/TextInput";
import { useScheduleStore } from "../../store/scheduleStore";

const BtnContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  border-width: 1px;
  align-items: center;
`;
const MainComponentWrap = styled.View`
  background-color: rgb(255, 255, 255);
  height: ${(HALF_HEIGHT * 2) / 3}px;
  position: absolute;
  bottom: 0px;
  width: ${FULL_WIDTH}px;
`;

const Line = styled.View`
  width: 20px;
  height: 80%;
  border-right-width: 1px;
  border-color: lightgrey;
`;

const ScheduleModifyModal = (props: {
  visible: boolean;
  setVisible: (state: boolean) => void;
  refData: null | {
    date: string;
    description: string;
    id: number;
    time: string;
    title: string;
  };
}) => {
  const [title, setTitle] = useState(props.refData?.title);
  const [description, setDescription] = useState(props.refData?.description);
  const modifySchedule = useScheduleStore((state) => state.modifySchedule);
  const removeSchedule = useScheduleStore((state) => state.removeSchedule);

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
      swipeDirection="down"
      onSwipeComplete={() => props.setVisible(false)}
      backdropOpacity={0.1}
      style={{
        height: HALF_HEIGHT,
        width: FULL_WIDTH,
        margin: 0,
      }}
      useNativeDriver
      onSwipeStart={() => {}}
      hideModalContentWhileAnimating
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
    >
      <MainComponentWrap>
        <BtnContainer>
          <Btn
            text="삭제하기"
            size={"md"}
            onPress={() => {
              props.setVisible(false);
              removeSchedule(props.refData?.id!);
            }}
          />
          <Line />
          <Btn
            text="수정완료"
            size={"md"}
            onPress={() => {
              props.setVisible(false);
              modifySchedule(props.refData?.id!, title!, description!);
            }}
          />
        </BtnContainer>

        <TextInput
          fontSize={20}
          value={title!}
          placeholder="title"
          onChangeText={(e) => {
            setTitle(e);
          }}
        />
        <TextInput
          numOfLine={3}
          multiline
          value={description!}
          placeholder="description"
          onChangeText={(e) => {
            setDescription(e);
          }}
        />
      </MainComponentWrap>
    </Modal>
  );
};

export default ScheduleModifyModal;
