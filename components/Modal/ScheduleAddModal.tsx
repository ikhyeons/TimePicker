import React, { useState } from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import { FULL_HEIGHT, FULL_WIDTH, HALF_HEIGHT } from "../../style/size";
import { useScheduleStore } from "../../store/scheduleStore";
import TimeInput from "../input/TimeInput";
import DatePicker from "react-native-date-picker";
import { Alert, Button } from "react-native";
import TextInput from "../input/TextInput";
import Btn from "../btn/Btn";
import { currentTime } from "../../utils/time";

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

const ScheduleAddModal = (props: {
  visible: boolean;
  setVisible: (state: boolean) => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addSchedule = useScheduleStore((state) => state.addSchedule);
  const [time, setTime] = useState<Date>();
  const [timeInputOpen, setTimeInputOpen] = useState(false);

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
        <Button
          title={
            time
              ? `${
                  new Date().getMonth() + 1
                }월 ${new Date().getDate()}일 ${time.getHours()}시 ${time.getMinutes()}분`
              : "시간선택"
          }
          onPress={() => {
            setTimeInputOpen(true);
          }}
        />
        <DatePicker
          title={"시간을 골라 주세요"}
          modal
          date={new Date()}
          mode="time"
          open={timeInputOpen}
          onConfirm={(date) => {
            setTime(date);
            setTimeInputOpen(false);
          }}
          onCancel={() => {
            setTimeInputOpen(false);
          }}
        />
        <TextInput
          value={title}
          onChangeText={(e) => {
            setTitle(e);
          }}
          placeholder="제목"
        />
        <TextInput
          value={description}
          onChangeText={(e) => {
            setDescription(e);
          }}
          placeholder="내용"
        />
        <Btn
          size={"xl"}
          text="추가"
          onPress={() => {
            if (time?.getHours() && time.getMinutes()) {
              addSchedule(
                `${time?.getHours()}시 ${time?.getMinutes()}분`,
                `${new Date().getFullYear()}-${(
                  new Date().getMonth() +
                  1 +
                  ""
                ).padStart(2, "0")}-${(new Date().getDate() + "").padStart(
                  2,
                  "0"
                )}`,
                title,
                description
              );
            } else {
            }
          }}
        />
      </MainComponentWrap>
    </Modal>
  );
};

export default ScheduleAddModal;
