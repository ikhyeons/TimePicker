import React from "react";
import styled from "styled-components/native";
import FriendList from "../../components/user/FriendList";
import GroupList from "../../components/user/GroupList";
import { DraxProvider } from "react-native-drax";
import Add from "../../components/add/Add";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: white;
`;

const Line = styled.View`
  border-right-width: 1px;
  border-right-color: lightgrey;
`;

const Group = () => {
  return (
    <DraxProvider>
      <Add />
      <Container>
        <FriendList />
        <Line />
        <GroupList />
      </Container>
    </DraxProvider>
  );
};

export default Group;
