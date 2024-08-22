import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
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
import ScheduleModifyModal from "../../components/Modal/ScheduleModifyModal";
import ScheduleAddModal from "../../components/Modal/ScheduleAddModal";
import CurrentTime from "../../components/CurrentTime";

const AddSchedule = styled.TouchableOpacity`
  position: absolute;
  border-radius: 25px;
  width: 50px;
  height: 50px;
  bottom: 25px;
  right: 25px;
  justify-content: center;
  align-items: center;
  background-color: skyblue;
  elevation: 3;
`;

const AddScheduleText = styled.Text``;

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

const CalendarContainer = styled.View`
  flex: 1;
`;

const BottomModalWrap = styled.View`
  position: absolute;
  width: ${FULL_WIDTH}px;
  bottom: 0px;
  height: ${(HALF_HEIGHT * 4) / 5}px;
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
  height: ${(HALF_HEIGHT * 4) / 5}px;
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
  const today = `${new Date().getFullYear()}-${(
    new Date().getMonth() +
    1 +
    ""
  ).padStart(2, "0")}-${(new Date().getDate() + "").padStart(2, "0")}`;
  const scheduleList = useScheduleStore((state) =>
    state.scheduleList
      .filter((data) => {
        console.log(data.date);
        console.log(today);
        return data.date == today;
      })
      .sort((a, b) => {
        const ah = a.time.split(" ")[0].slice(0, -1);
        const am = a.time.split(" ")[1].slice(0, -1);

        const bh = b.time.split(" ")[0].slice(0, -1);
        const bm = b.time.split(" ")[1].slice(0, -1);

        if (ah == bh) {
          if (am > bm) return 1;
          else if (am == bm) return 0;
          else return -1;
        } else if (ah > bh) {
          return 1;
        } else return -1;
      })
  );
  const [isModal, setIsModal] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [refData, setRefData] = useState<ISchedule | null>(null);
  const clear = useScheduleStore((state) => state.clear);

  return (
    <View>
      <CurrentTime />
      <TimeLineContianer>
        <Timeline
          onEventPress={(e) => {
            console.log(e);
            setIsModal(true);
            setRefData(e);
          }}
          data={scheduleList}
          circleSize={11}
          circleColor="rgb(45,156,219)"
          innerCircle="dot"
          lineColor="rgb(45,156,219)"
          separator={true}
          timeStyle={{
            textAlign: "center",
            backgroundColor: "#ff9797",
            color: "white",
            padding: 5,
            minWidth: 70,
            borderRadius: 13,
          }}
          titleStyle={{ marginBottom: -10 }}
          descriptionStyle={{ color: "gray", width: "90%", marginLeft: 15 }}
          isUsingFlatlist={true}
        />
      </TimeLineContianer>
      {isModal && (
        <ScheduleModifyModal
          refData={refData}
          visible={isModal}
          setVisible={setIsModal}
        />
      )}

      <AddSchedule
        onPress={() => {
          setIsAddModal(true);
        }}
      >
        <AddScheduleText>+</AddScheduleText>
      </AddSchedule>

      {isAddModal && (
        <ScheduleAddModal visible={isAddModal} setVisible={setIsAddModal} />
      )}
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

  function getCalendarData(scheduleList: ISchedule[]) {
    const result: { [index: string]: { dots: { color: string }[] } } = {};
    scheduleList.map((data) => {
      if (data.date in result) {
        result[`${data.date}`].dots.push({ color: "black" });
      } else {
        result[`${data.date}`] = { dots: [] };
        result[`${data.date}`].dots.push({ color: "black" });
      }
    });
    return result;
  }

  return (
    <CalendarContainer>
      <CurrentTime />
      <Calendar
        onDayLongPress={(day: { year: number; month: number; day: number }) => {
          setSelectedDate(`${day.year}년 ${day.month}월 ${day.day}일`);
          setSelectedDateNum(
            `${day.year}-${(day.month + "").padStart(2, "0")}-${(
              day.day + ""
            ).padStart(2, "0")}`
          );
          setIsBottomOn(true);
        }}
        onDayPress={(day: { year: number; month: number; day: number }) => {
          setSelectedDate(`${day.year}년 ${day.month}월 ${day.day}일`);
          setSelectedDateNum(
            `${day.year}-${(day.month + "").padStart(2, "0")}-${(
              day.day + ""
            ).padStart(2, "0")}`
          );
          setIsBottomOn(true);
        }}
        markingType="multi-dot"
        markedDates={getCalendarData(scheduleList)}
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
              ItemSeparatorComponent={() => (
                <View
                  style={{ borderBottomWidth: 1, borderColor: "lightgrey" }}
                />
              )}
              ListFooterComponent={
                <View
                  style={{ borderBottomWidth: 1, borderColor: "lightgrey" }}
                />
              }
              style={{ padding: 10, flex: 1, paddingVertical: 0 }}
              data={scheduleList.filter((data) => data.date == selectedDateNum)}
              renderItem={({ item, index }) => (
                <TouchableOpacity>
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
                </TouchableOpacity>
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
