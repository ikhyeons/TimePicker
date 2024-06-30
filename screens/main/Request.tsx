import React, { useRef, useState } from "react";
import styled from "styled-components/native";

import Header from "../../components/header/Header";
import Add from "../../components/add/Add";
import { TabView, SceneMap } from "react-native-tab-view";
import VCardList from "../../components/card/VCardList";
import dummyDecidedRequest from "../../components/dummyData/decidedRequest";
import dummyMyRequest from "../../components/dummyData/myRequest";
import dummyGetRequest from "../../components/dummyData/getRequest";

const Container = styled.View`
  flex: 1;
`;
const MyContainer = styled.View`
  flex: 1;
`;

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
