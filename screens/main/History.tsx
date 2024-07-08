import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import Header from "../../components/header/Header";
import Add from "../../components/add/Add";

import dummyDecidedRequest from "../../dummyData/decidedRequest";
import dummyMyRequest from "../../dummyData/myRequest";
import dummyGetRequest from "../../dummyData/getRequest";

import VCardList from "../../components/card/VCardList";
import Navigation, { RootSNFC } from "../../types/Navigation";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation<RootSNFC<"TabNav">>();
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
        <VCardList data={myRequestList} navigator={navigation.navigate} />
      </MyContainer>
    </Container>
  );
};

export default History;
