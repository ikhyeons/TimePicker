import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { useUserStore } from "../../store/userStore";

const SHeader = styled.View`
  align-items: center;
  justify-content: center;
  height: 50px;
`;

const Header = () => {
  const logout = useUserStore((state) => state.logout);

  return (
    <SHeader>
      <TouchableOpacity onPress={() => logout()}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </SHeader>
  );
};

export default Header;
