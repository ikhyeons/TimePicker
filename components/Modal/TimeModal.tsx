import { Modal } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Calendar } from "react-native-calendars";
import Btn from "../btn/Btn";
import GestureRecongizer from "react-native-swipe-gestures";
import { useSelectedRequestStore } from "../../store/selectedRequestDataRequest";

const ModalBackground = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.1);
`;

const MainComponentWrap = styled.View`
  background-color: rgba(0, 0, 0, 0.1);
`;

const MainComponent = styled.View`
  padding: 5px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: rgb(255, 255, 255);
`;

const CTitle = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 5px;
  margin-bottom: 10px;
`;
const CalendarText = styled.Text``;

const SelectedNumText = styled.Text``;
const TimeModal = (props: {
  visible: boolean;
  setVisible: (state: boolean) => void;
  onDatePress: (state: boolean) => void;
}) => {
  const selectedDate = useSelectedRequestStore(
    (state) => state.selectedRequestData
  );
  const setOpenedDate = useSelectedRequestStore((state) => state.setOpenedDate);

  const cancelSelect = useSelectedRequestStore((state) => state.deleteDate);
  const resetSelect = useSelectedRequestStore(
    (state) => state.resetSelectedData
  );
  useEffect(() => {
    resetSelect();
  }, []);
  if (props.visible == false) return null;
  return (
    <GestureRecongizer
      onSwipeDown={() => {
        props.setVisible(false);
      }}
    >
      <Modal
        onRequestClose={() => {
          props.setVisible(false);
        }}
        visible={props.visible}
        animationType="slide"
        transparent={true}
      >
        <ModalBackground
          onPress={() => {
            props.setVisible(false);
          }}
        />

        <MainComponentWrap>
          <MainComponent>
            <CTitle>
              <CalendarText>일정을 요청할 날짜를 선택해 주세요 - </CalendarText>
              <SelectedNumText>
                {Object.keys(selectedDate).length}개 선택됨
              </SelectedNumText>
            </CTitle>
            <Calendar
              onDayLongPress={(day) => {
                cancelSelect(day.dateString);
                setOpenedDate(day.dateString);
                selectedDate[`${day.dateString}`] == undefined &&
                  props.onDatePress(true);
              }}
              onDayPress={(day) => {
                cancelSelect(day.dateString);
                setOpenedDate(day.dateString);
                selectedDate[`${day.dateString}`] == undefined &&
                  props.onDatePress(true);
              }}
              markedDates={selectedDate}
              style={{
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "lightgrey",
              }}
            />
            <Btn
              text="완료"
              size="xl"
              onPress={() => {
                props.setVisible(false);
              }}
            />
          </MainComponent>
        </MainComponentWrap>
      </Modal>
    </GestureRecongizer>
  );
};

export default TimeModal;
