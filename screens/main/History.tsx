import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import Header from "../../components/header/Header";
import Add from "../../components/add/Add";

import dummyDecidedRequest from "../../components/dummyData/decidedRequest";
import dummyMyRequest from "../../components/dummyData/myRequest";
import dummyGetRequest from "../../components/dummyData/getRequest";

import VCardList from "../../components/card/VCardList";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;
const MyContainer = styled.View`
  flex: 1;
`;

const BtnText = styled.Text``;

const History = () => {
  const [index, setIndex] = React.useState(0);

  const [myRequestList, setMyRequestList] =
    useState<IRequest[]>(dummyMyRequest);
  const [getRequestList, setGetRequestList] =
    useState<IRequest[]>(dummyGetRequest);
  const [decidedRequestList, setDecidedRequestList] =
    useState<IRequest[]>(dummyDecidedRequest);

  return (
    <Container>
      {/* <Header /> */}
      <Add />
      <MyContainer>
        <VCardList data={myRequestList} />
      </MyContainer>
    </Container>
  );
};

export default History;
