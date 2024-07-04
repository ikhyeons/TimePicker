import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { MainBTNFC } from "../../types/Navigation";
import styled from "styled-components/native";
import Timeline from "react-native-timeline-flatlist";
import Header from "../../components/header/Header";
import Add from "../../components/add/Add";
import time from "../../utils/time";
import { dummySchedule } from "../../components/dummyData/schedule";
import { SceneMap, TabView } from "react-native-tab-view";

const View = styled.View`
  flex: 1;
`;

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
const FirstRoute = () => (
  <View>
    <CurrentTime>
      <Text>{time.currentTime()}</Text>
    </CurrentTime>
    <TimeLineContianer>
      <Timeline
        data={dummySchedule}
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
  </View>
);
const SecondRoute = () => <View />;

const Schedule: MainBTNFC<"MySchedule"> = () => {
  const renderScene = SceneMap({
    second: SecondRoute,
    first: FirstRoute,
  });

  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  useEffect(() => {
    setIndex(0);
  }, []);
  return (
    <Container>
      <Header />
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
