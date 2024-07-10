import React, { useRef, useState } from "react";
import styled from "styled-components/native";

import Header from "../../components/header/Header";
import Add from "../../components/add/Add";
import { TabView, SceneMap } from "react-native-tab-view";
import VCardList from "../../components/card/VCardList";
import dummyMyRequest from "../../dummyData/myRequest";

import { MainBTNFC, RootSNFC } from "../../types/Navigation";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  position: relative;
  background-color: white;
  flex: 1;
`;
const MyContainer = styled.View`
  flex: 1;
`;

const AddRequest = styled.TouchableOpacity`
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

const AddRequestText = styled.Text``;

const Request: MainBTNFC<"Request"> = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "내 요청" },
    { key: "second", title: "받은 요청" },
    { key: "third", title: "결정된 일정" },
  ]);

  const [myRequestList, setMyRequestList] =
    useState<IRequest[]>(dummyMyRequest);

  const navigation = useNavigation<RootSNFC<"TabNav">>();

  const FirstRoute = () => (
    <VCardList navigator={navigation.navigate} data={myRequestList} />
  );
  const SecondRoute = () => (
    <VCardList navigator={navigation.navigate} data={myRequestList} />
  );
  const ThirdRoute = () => (
    <VCardList navigator={navigation.navigate} data={myRequestList} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <Container>
      {/* <Header /> */}
      <Add />
      <MyContainer>
        <TabView
          renderScene={renderScene}
          onIndexChange={setIndex}
          navigationState={{
            index,
            routes,
          }}
        />
      </MyContainer>
      <AddRequest
        onPress={() => {
          navigation.navigate("SendRequest");
        }}
      >
        <AddRequestText>+</AddRequestText>
      </AddRequest>
    </Container>
  );
};

export default Request;
