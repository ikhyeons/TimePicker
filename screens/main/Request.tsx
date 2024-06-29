import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import HCardList from "../../components/card/HCardList";
import Header from "../../components/header/Header";
import Add from "../../components/add/Add";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import { TabView, SceneMap } from "react-native-tab-view";

import {
  dummyDecidedRequest,
  dummyGetRequest,
  dummyMyRequest,
} from "../../dummy";
import VCardList from "../../components/card/VCardList";

import { FULL_WIDTH } from "../../style/size";

const Container = styled.View`
  flex: 1;
`;
const MyContainer = styled.View`
  flex: 1;
`;

const BtnContainer = styled.View`
  width: ${FULL_WIDTH}px;
  flex-direction: row;
`;

const Btn = styled.TouchableOpacity<{ index: number; current: number }>`
  justify-content: center;
  align-items: center;
  background-color: ${(prop) =>
    prop.index == prop.current ? "gold" : "yellow"};
  flex: 1;
  height: 40px;
`;

const BtnText = styled.Text``;

const Request = () => {
  const [index, setIndex] = React.useState(0);

  const [myRequestList, setMyRequestList] =
    useState<IRequest[]>(dummyMyRequest);
  const [getRequestList, setGetRequestList] =
    useState<IRequest[]>(dummyGetRequest);
  const [decidedRequestList, setDecidedRequestList] =
    useState<IRequest[]>(dummyDecidedRequest);

  const FirstRoute = () => <VCardList data={myRequestList} />;
  const SecondRoute = () => <VCardList data={getRequestList} />;
  const ThirdRoute = () => <VCardList data={decidedRequestList} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <Container>
      <Header />
      <Add />
      <MyContainer>
        <TabView
          renderScene={renderScene}
          onIndexChange={setIndex}
          navigationState={{
            index: 2,
            routes: [
              { key: "first", title: "내 요청" },
              { key: "second", title: "받은 요청" },
              { key: "third", title: "결정된 일정" },
            ],
          }}
        />
      </MyContainer>
    </Container>
  );
};

export default Request;
