import React, { useRef, useState } from "react";
import styled from "styled-components/native";

import Header from "../../components/header/Header";
import Add from "../../components/add/Add";
import { TabView, SceneMap } from "react-native-tab-view";
import VCardList from "../../components/card/VCardList";
import dummyMyRequest from "../../dummyData/myRequest";

import { MainBTNFC, RootSNFC } from "../../types/Navigation";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getReceiveRequest, getSendRequest } from "../../apis/requestApi";
import { useUserStore } from "../../store/userStore";

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

  const token = useUserStore((state) => state.token);

  const {
    data: sendRequestList,
    error: error1,
    isLoading: loading1,
    refetch: refetch1,
  } = useQuery<IRequest[]>(["request", "send"], {
    queryFn: () => {
      return getSendRequest(token as string);
    },
    onSuccess: (data) => {
      console.log("sendRequest : ", data);
    },
  });

  const {
    data: receiveRequestList,
    error: error2,
    isLoading: loading2,
    refetch: refetch2,
  } = useQuery<IRequest[]>(["request", "receive"], {
    queryFn: () => {
      return getReceiveRequest(token as string);
    },
    onSuccess: (data) => {
      console.log("receiveRequest : ", data);
    },
  });

  const navigation = useNavigation<RootSNFC<"TabNav">>();

  const FirstRoute = () => (
    <VCardList
      navigator={navigation.navigate}
      data={sendRequestList as IRequest[]}
    />
  );
  const SecondRoute = () => (
    <VCardList
      navigator={navigation.navigate}
      data={receiveRequestList as IRequest[]}
    />
  );
  const ThirdRoute = () => (
    <VCardList
      navigator={navigation.navigate}
      data={sendRequestList as IRequest[]}
    />
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
        {loading1 == false && loading2 == false ? (
          <TabView
            renderScene={renderScene}
            onIndexChange={setIndex}
            navigationState={{
              index,
              routes,
            }}
          />
        ) : null}
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
