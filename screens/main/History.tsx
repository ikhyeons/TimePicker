import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import Header from "../../components/header/Header";
import Add from "../../components/add/Add";

import VCardList from "../../components/card/VCardList";
import Navigation, { RootSNFC } from "../../types/Navigation";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "react-query";
import { getReceiveRequest, getSendRequest } from "../../apis/requestApi";
import { useUserStore } from "../../store/userStore";

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
    onSuccess: (data) => {},
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
    onSuccess: (data) => {},
  });

  const AllResponse = sendRequestList?.concat(receiveRequestList as IRequest[]);
  return (
    <Container>
      {/* <Header /> */}
      <Add />
      <MyContainer>
        <VCardList
          data={AllResponse as IRequest[]}
          navigator={navigation.navigate}
        />
      </MyContainer>
    </Container>
  );
};

export default History;
