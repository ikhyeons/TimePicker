import React, { useState } from "react";
import styled from "styled-components/native";
import { MarkedDates } from "react-native-calendars/src/types";
import Modal from "react-native-modal";
import { FULL_HEIGHT, FULL_WIDTH, HALF_WIDTH } from "../../style/size";
import { FlatList, Text, View } from "react-native";
import HorizonLine from "../HorizonLine";
import { useSelectedRequestStore } from "../../store/selectedRequestDataRequest";
import { useScheduleStore } from "../../store/scheduleStore";

const MainComponentWrap = styled.View`
  background-color: rgb(255, 255, 255);
  flex: 1;
`;
const TitleContainer = styled.View`
  padding: 10px;
`;
const Title = styled.Text`
  font-size: 16px;
`;

const ScheduleCard = styled.TouchableOpacity`
  justify-content: center;
  padding: 5px;
`;
const ScheduleTime = styled.Text``;
const ScheduleTitle = styled.Text`
  font-size: 16px;
`;
const ScheduleDescription = styled.Text`
  margin: 5px 5px;
  color: grey;
`;

const SelectBtn = styled.TouchableOpacity`
  height: 50px;
  width: 100%;
  background-color: skyblue;
  justify-content: center;
  align-items: center;
`;
const ScheduleListModal = (props: {
  visible: boolean;
  setVisible: (state: boolean) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState<MarkedDates>({});
  const scheduleList = useScheduleStore((state) => state.scheduleList);

  const selectedRequestDate = useSelectedRequestStore(
    (state) => state.selectedRequestData
  );
  const addDate = useSelectedRequestStore((state) => state.addDate);
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
      useNativeDriver
      hideModalContentWhileAnimating
      animationIn={"slideInRight"}
      animationOut={"slideOutRight"}
    >
      <MainComponentWrap>
        <TitleContainer>
          <Title>7/11 일정 목록</Title>
        </TitleContainer>
        <FlatList
          data={scheduleList}
          overScrollMode="never"
          ListHeaderComponent={HorizonLine}
          ListFooterComponent={HorizonLine}
          ItemSeparatorComponent={HorizonLine}
          renderItem={({ item, index }) => (
            <ScheduleCard>
              <ScheduleTitle>{item.title}</ScheduleTitle>
              <ScheduleDescription>{item.description}</ScheduleDescription>
            </ScheduleCard>
          )}
        />
        <SelectBtn
          onPress={() => {
            addDate();
            props.setVisible(false);
          }}
        >
          <Text>이 날짜 선택{" >"}</Text>
        </SelectBtn>
      </MainComponentWrap>
    </Modal>
  );
};

export default ScheduleListModal;
