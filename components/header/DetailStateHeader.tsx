import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import time from "../../utils/time";

const Container = styled.View<{ status: IRequest["status"] }>`
  background-color: ${(prop) => {
    switch (prop.status) {
      case "opened":
        return "lightgreen";
      case "expired":
        return "purple";
      case "canceled":
        return "grey";
      case "responsed":
        return "blue";
      case "allResponsed":
        return "green";
      case "neared":
        return "gold";
    }
  }};
  padding: 10px;
  align-items: center;
  flex-direction: row;
  height: 50px;
`;

const DetailStateHeader = (props: { data: IRequest }) => {
  return (
    <Container status={props.data.status}>
      {props.data.status == "allResponsed" && <Text>응답 완료</Text>}
      {props.data.status == "canceled" && <Text>취소됨</Text>}
      {props.data.status == "expired" && <Text>마감됨</Text>}
      {props.data.status == "neared" && <Text>마감 임박</Text>}
      {props.data.status == "opened" && <Text>열림</Text>}
      {props.data.status == "responsed" && <Text>응답함</Text>}
      <Text>, 마감까지 : {time.diffDay(props.data.expireDate)}</Text>
    </Container>
  );
};

export default DetailStateHeader;
