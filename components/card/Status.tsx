import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

const SStatus = styled.Text`
  font-size: 15px;
  margin-bottom: 2px;
`;

const SMark = styled.Text<{ type: string }>`
  margin-right: 5px;
  color: ${(prop) => {
    switch (prop.type) {
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
`;

const Status = (props: { status: string }) => {
  return (
    <SStatus>
      <SMark type={props.status}>● </SMark>
      <Text>
        {props.status == "opened" && "열림"}
        {props.status == "expired" && "마감됨"}
        {props.status == "canceled" && "취소됨"}
        {props.status == "responsed" && "응답함"}
        {props.status == "allResponsed" && "전원 응답 완료"}
        {props.status == "neared" && "마감 임박"}
      </Text>
    </SStatus>
  );
};

export default Status;
