import React, { ComponentType, useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { MainBTNFC } from "../../types/Navigation";
import styled from "styled-components/native";
import Timeline from "react-native-timeline-flatlist";
import Add from "../../components/add/Add";
import time from "../../utils/time";
import { dummySchedule } from "../../dummyData/schedule";
import { SceneMap, TabView } from "react-native-tab-view";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import GestureRecongizer from "react-native-swipe-gestures";

import {
  FULL_HEIGHT,
  FULL_WIDTH,
  HALF_HEIGHT,
  HALF_WIDTH,
} from "../../style/size";

const View = styled.View`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const TimeLineContianer = styled.View`
  justify-content: center;

  flex: 1;
  padding: 5px;
`;

const CurrentTime = styled.View`
  padding: 10px;
  background-color: grey;
`;
const CalendarContainer = styled.View`
  flex: 1;
`;

const BottomModalWrap = styled.View`
  position: absolute;
  width: ${(HALF_WIDTH * 8) / 5 - 10}px;
  bottom: 0px;
  height: ${HALF_HEIGHT}px;
  background-color: white;
  justify-content: space-between;
`;

const ModalHeader = styled.View`
  padding-top: 5px;
  padding-bottom: 5px;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: lightgrey;
`;
const ModalHeaderText = styled.Text`
  font-size: 16px;
`;
const AddScheduleBtn = styled.TouchableOpacity`
  padding: 10px;
  justify-content: center;
  align-items: center;
  background: lightblue;
`;
const AddScheduleBtnText = styled.Text``;

const FirstRoute = () => (
  <View>
    <CurrentTime>
      <Text>{time.currentTime()}</Text>
    </CurrentTime>
    <TimeLineContianer>
      <Timeline
        data={dummySchedule}
        circleSize={11}
        circleColor="rgb(45,156,219)"
        innerCircle="dot"
        lineColor="rgb(45,156,219)"
        timeStyle={{
          textAlign: "center",
          backgroundColor: "#ff9797",
          color: "white",
          padding: 5,
          borderRadius: 13,
        }}
        titleStyle={{ marginBottom: -10 }}
        descriptionStyle={{ color: "gray", width: "90%", marginLeft: 15 }}
        isUsingFlatlist={true}
      />
    </TimeLineContianer>
  </View>
);
const SecondRoute = () => {
  const [isBottomOn, setIsBottomOn] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  return (
    <CalendarContainer>
      <CurrentTime>
        <Text>{time.currentTime()}</Text>
      </CurrentTime>
      <Calendar
        onDayLongPress={(day) => {
          setSelectedDate(`${day.year}년 ${day.month}월 ${day.day}일`);
          setIsBottomOn(true);
        }}
        onDayPress={(day) => {
          setSelectedDate(`${day.year}년 ${day.month}월 ${day.day}일`);
          setIsBottomOn(true);
        }}
        markingType="multi-dot"
        markedDates={{
          "2024-07-13": {
            dots: [{ color: "black" }, { color: "green" }],
          },
        }}
        style={{
          marginTop: isBottomOn ? 0 : 60,
          borderBottomWidth: 1,
          borderColor: "lightgrey",
        }}
      />
      <GestureRecongizer
        onSwipeRight={() => {
          setIsBottomOn(false);
        }}
      >
        <Modal
          onBackdropPress={() => {
            setIsBottomOn(false);
          }}
          onBackButtonPress={() => {
            setIsBottomOn(false);
          }}
          deviceHeight={FULL_HEIGHT}
          deviceWidth={FULL_WIDTH}
          isVisible={isBottomOn}
          backdropOpacity={0.1}
          style={{
            height: FULL_HEIGHT,
            width: (HALF_WIDTH * 8) / 5 - 10,
            margin: 0,
            marginLeft: FULL_WIDTH - (HALF_WIDTH * 8) / 5 + 10,
          }}
          useNativeDriver
          hideModalContentWhileAnimating
          animationIn={"slideInRight"}
          animationOut={"slideOutRight"}
        >
          <BottomModalWrap>
            <ModalHeader>
              <ModalHeaderText>{selectedDate}</ModalHeaderText>
            </ModalHeader>
            <FlatList
              overScrollMode="never"
              style={{ padding: 10, flex: 1, paddingVertical: 0 }}
              data={[
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                17, 18,
              ]}
              renderItem={() => <Text>09:30 국군 도수 체조</Text>}
            />
            <AddScheduleBtn
              onPress={() => {
                setIsBottomOn(false);
              }}
            >
              <AddScheduleBtnText>일정 추가</AddScheduleBtnText>
            </AddScheduleBtn>
          </BottomModalWrap>
        </Modal>
      </GestureRecongizer>
    </CalendarContainer>
  );
};

const Schedule: MainBTNFC<"MySchedule"> = ({ navigation }) => {
  const [isBottomOn, setIsBottomOn] = useState(false);
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "first", title: "오늘 일정" },
    { key: "second", title: "달력" },
  ]);

  useEffect(() => {
    setIndex(0);
  }, []);
  return (
    <Container>
      {/* <Header /> */}
      <Add />
      <TabView
        onLayout={() => {
          setIndex(0);
        }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        navigationState={{
          index,
          routes,
        }}
      />
    </Container>
  );
};

export default Schedule;
