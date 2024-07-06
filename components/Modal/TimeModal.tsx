import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";

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
}) => {
  const [selectedDate, setSelectedDate] = useState<MarkedDates>({});
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
          <CTitle>
            <CalendarText>일정을 요청할 날짜를 선택해 주세요 - </CalendarText>
            <SelectedNumText>n개 선택됨</SelectedNumText>
          </CTitle>
          <Calendar
            onDayPress={(day) => {
              setSelectedDate((prev) => {
                const newData = { ...prev };
                newData[`${day.dateString}`] = {
                  dotColor: "black",
                  marked: true,
                };
                return newData;
              });
            }}
            markedDates={selectedDate}
            style={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "lightgrey",
            }}
          />
        </MainComponent>
      </MainComponentWrap>
    </Modal>
  );
};

export default TimeModal;
