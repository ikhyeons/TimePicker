import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { MainBTNFC } from "../../types/Navigation";
import styled from "styled-components/native";
import Timeline from "react-native-timeline-flatlist";
import Add from "../../components/add/Add";
import time from "../../utils/time";
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
import DatePicker from "react-native-date-picker";
import TextInput from "../../components/input/TextInput";
import Btn from "../../components/btn/Btn";
import { useScheduleStore } from "../../store/scheduleStore";

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
  width: ${FULL_WIDTH}px;
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

const CloseText = styled.Text`
  color: lightgrey;
  font-size: 14px;
`;

const MainComponentWrap = styled.View`
  position: absolute;
  bottom: 0;
  background-color: rgb(255, 255, 255);
  justify-content: end;
  align-items: end;
  width: ${HALF_WIDTH * 1.6}px;
  height: ${HALF_HEIGHT}px;
`;

const AddScheduleContainer = styled.View`
  background-color: lightblue;

  align-items: center;
  justify-content: center;
  flex: 1;
`;
const InputContainer = styled.View`
  margin-bottom: 10px;
  background-color: #6fd0f1;
  border-radius: 10px;
`;
const InputTimeBtn = styled.TouchableOpacity`
  background-color: white;
  border-color: #6fd0f1;
  border-width: 5px;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
`;
const InputTimeBtnText = styled.Text``;

const FirstRoute = () => {
  const scheduleList = useScheduleStore((state) => state.scheduleList);
  console.log(scheduleList);
  return (
    <View>
      <CurrentTime>
        <Text>{time.currentTime()}</Text>
      </CurrentTime>
      <TimeLineContianer>
        <Timeline
          data={scheduleList}
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
};
const SecondRoute = () => {
  const [isBottomOn, setIsBottomOn] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateNum, setSelectedDateNum] = useState("");
  const [isAddSchedultOn, setIsAddScheduleOn] = useState(false);
  const [isTimeInputOpen, setIsTimeInputOpen] = useState(false);
  const [scheduleTime, setScheduleTime] = useState("");
  const [scheduleTitle, setScheduleTitle] = useState("");
  const [scheduleDescription, setScheduleDescription] = useState("");

  const scheduleList = useScheduleStore((state) => state.scheduleList);
  const addSchedule = useScheduleStore((state) => state.addSchedule);
  return (
    <CalendarContainer>
      <CurrentTime>
        <Text>{time.currentTime()}</Text>
      </CurrentTime>
      <Calendar
        onDayLongPress={(day: { year: number; month: number; day: number }) => {
          setSelectedDate(`${day.year}년 ${day.month}월 ${day.day}일`);
          setSelectedDateNum(`${day.year}-${day.month}-${day.day}`);
          setIsBottomOn(true);
        }}
        onDayPress={(day: { year: number; month: number; day: number }) => {
          setSelectedDate(`${day.year}년 ${day.month}월 ${day.day}일`);
          setSelectedDateNum(`${day.year}-${day.month}-${day.day}`);
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
        onSwipeDown={() => {
          if (!isAddSchedultOn) setIsBottomOn(false);
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
            width: FULL_WIDTH,
            margin: 0,
          }}
          useNativeDriver
          hideModalContentWhileAnimating
          animationIn={"slideInUp"}
          animationOut={"slideOutDown"}
        >
          <BottomModalWrap>
            <ModalHeader>
              <ModalHeaderText>{selectedDate}</ModalHeaderText>
              <CloseText>↓아래로 밀어서 닫기↓</CloseText>
            </ModalHeader>
            <FlatList
              overScrollMode="never"
              style={{ padding: 10, flex: 1, paddingVertical: 0 }}
              data={scheduleList}
              renderItem={({ item, index }) => (
                <>
                  <Text style={{ fontSize: 16, fontWeight: 600 }}>
                    {item.time} &nbsp;
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      marginTop: -3,
                      marginLeft: 20,
                      marginBottom: 5,
                      color: "lightgrey",
                    }}
                  >
                    {item.description}
                  </Text>
                </>
              )}
            />
            <AddScheduleBtn
              onPress={() => {
                setIsAddScheduleOn(true);
              }}
            >
              <AddScheduleBtnText>일정 추가</AddScheduleBtnText>
            </AddScheduleBtn>
          </BottomModalWrap>
          <Modal
            onBackdropPress={() => {
              setIsAddScheduleOn(false);
            }}
            onBackButtonPress={() => {
              setIsAddScheduleOn(false);
            }}
            deviceHeight={FULL_HEIGHT}
            deviceWidth={FULL_WIDTH}
            isVisible={isAddSchedultOn}
            backdropOpacity={0.1}
            style={{
              height: FULL_HEIGHT,
              width: HALF_WIDTH * 1.6,
              margin: 0,
              marginLeft: FULL_WIDTH - HALF_WIDTH * 1.6,
            }}
            swipeDirection="right"
            onSwipeComplete={() => setIsAddScheduleOn(false)}
            useNativeDriver
            hideModalContentWhileAnimating
            animationIn={"slideInRight"}
            animationOut={"slideOutRight"}
          >
            <MainComponentWrap>
              <AddScheduleContainer>
                <InputTimeBtn
                  onPress={() => {
                    setIsTimeInputOpen(true);
                  }}
                >
                  <InputTimeBtnText>
                    {scheduleTime.length != 0
                      ? scheduleTime
                      : "시간을 입력해주세요"}
                  </InputTimeBtnText>
                </InputTimeBtn>

                <DatePicker
                  title={"시간을 골라 주세요"}
                  dividerColor="red"
                  modal
                  date={new Date()}
                  open={isTimeInputOpen}
                  mode="time"
                  onConfirm={(date) => {
                    setIsTimeInputOpen(false);
                    setScheduleTime(
                      `${date.getHours()}시 ${date.getMinutes()}분`
                    );
                  }}
                  onCancel={() => setIsTimeInputOpen(false)}
                />

                <InputContainer>
                  <TextInput
                    placeholder="제목을 입력하세요"
                    value={scheduleTitle}
                    onChangeText={setScheduleTitle}
                  />
                </InputContainer>
                <InputContainer>
                  <TextInput
                    placeholder="내용을 입력하세요"
                    multiline
                    numOfLine={4}
                    value={scheduleDescription}
                    onChangeText={setScheduleDescription}
                  />
                </InputContainer>
                <Btn
                  size="sm"
                  text="추가하기"
                  onPress={() => {
                    addSchedule(
                      scheduleTime,
                      selectedDateNum,
                      scheduleTitle,
                      scheduleDescription
                    );
                    setIsAddScheduleOn(false);
                  }}
                />
              </AddScheduleContainer>
            </MainComponentWrap>
          </Modal>
        </Modal>
      </GestureRecongizer>
    </CalendarContainer>
  );
};

const Schedule: MainBTNFC<"MySchedule"> = ({ navigation }) => {
  const [isBottomOn, setIsBottomOn] = useState(false);
  const fetchScheduleList = useScheduleStore((state) => state.fetch);
  const clear = useScheduleStore((state) => state.clear);

  useEffect(() => {
    fetchScheduleList();
  }, []);
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
