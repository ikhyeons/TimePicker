import React from "react";
import { Text } from "react-native";
import { MainBTNFC } from "../../types/Navigation";
import { useUserStore } from "../../store/userStore";
import styled from "styled-components/native";
import Timeline from "react-native-timeline-flatlist";
import Header from "../../components/header/Header";
import Add from "../../components/add/Add";
import time from "../../utils/time";

const Container = styled.View`
  flex: 1;
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
const Schedule: MainBTNFC<"MySchedule"> = () => {
  const ScheduleData = [
    {
      time: "09:00",
      title: "아침 일과",
      description: "아침 일과 국군도수체조",
    },
    {
      time: "09:30",
      title: "백엔드 서버 점검",
      description:
        "docker 사용 시 container 위치 및 경로 확인하기 외부 패키지 사용 확인하기",
    },
    {
      time: "10:30",
      title: "Time-Picker 정상 구동 확인",
      description: "외부에서 들어오는 Api들이 정상 동작하는 지 확인해야 함.",
    },
  ];

  return (
    <Container>
      <Header />
      <Add />
      <CurrentTime>
        <Text>{time.currentTime()}</Text>
      </CurrentTime>
      <TimeLineContianer>
        <Timeline
          data={ScheduleData}
          circleSize={20}
          circleColor="rgb(45,156,219)"
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
    </Container>
  );
};

export default Schedule;
