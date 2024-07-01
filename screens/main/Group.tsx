import React, { useState } from "react";
import styled from "styled-components/native";
import FriendList from "../../components/user/FriendList";
import GroupList from "../../components/user/GroupList";
import { DraxProvider } from "react-native-drax";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
`;

const Line = styled.View`
  border-right-width: 1px;
  border-right-color: lightgrey;
`;

const Group = () => {
  return (
    <DraxProvider>
      <Container>
        <FriendList />
        <Line />
        <GroupList />
      </Container>
    </DraxProvider>
  );
};

export default Group;
