import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import time from "../../utils/time";
import { extractState } from "../../utils/state";

const Container = styled.View<{ status: string }>`
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
  const state = extractState(props.data, "skantrkwl789");
  return (
    <Container status={state}>
      {state == "expired" ? <Text>{props.data.deadline} 에 </Text> : null}
      {state == "allResponsed" && <Text>응답 완료</Text>}
      {state == "canceled" && <Text>취소됨</Text>}
      {state == "expired" && <Text>마감됨</Text>}
      {state == "neared" && <Text>마감 임박</Text>}
      {state == "opened" && <Text>열림</Text>}
      {state == "responsed" && <Text>응답함</Text>}
      {state == "expired" ? null : (
        <Text>, 마감까지 : {time.diffDay(props.data.deadline)}</Text>
      )}
    </Container>
  );
};

export default DetailStateHeader;
