import React from "react";
import styled from "styled-components/native";
import { View, Text } from "react-native";
import Add from "../../components/add/Add";
import Btn from "../../components/btn/Btn";
import { useUserStore } from "../../store/userStore";
const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Line = styled.View`
  border-right-width: 1px;
  border-right-color: lightgrey;
`;

const Setting = () => {
  const logout = useUserStore((state) => state.setLogout);
  return (
    <Container>
      <Add />
      <Btn
        text="로그아웃"
        size={"lg"}
        onPress={() => {
          logout();
        }}
      />
    </Container>
  );
};

export default Setting;
