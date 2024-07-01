import React, { useState } from "react";
import styled from "styled-components/native";

import user from "../../components/dummyData/user";

import { FlatList } from "react-native";
import { useFriendStore } from "../../store/friendStore";
import { useGroupStore } from "../../store/groupStore";
import { DraxList, DraxView } from "react-native-drax";
const View = styled.View``;
const Text = styled.Text``;

const Header = styled.View`
  flex-direction: row;
  height: 50px;
  background-color: red;
  justify-content: center;
  align-items: center;
`;

const Left = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const FriendList = () => {
  const [userList, setUserList] = useState(user);

  const friendData = useFriendStore((state) => state.friendList);
  const setFriendData = useFriendStore((state) => state.setFriendList);
  const groupData = useGroupStore((state) => state.groupList);
  const setGroupData = useGroupStore((state) => state.setGroupList);

  return (
    <Left>
      <Header>
        <Text>프렌드 리스트</Text>
        <View>
          <Text>+</Text>
        </View>
      </Header>
      <DraxList
        keyExtractor={(item) => `${item.id}`}
        data={userList}
        renderItemContent={({ item }) => (
          <DraxView
            key={item.id}
            longPressDelay={300}
            onDragStart={() => {
              console.log("start");
            }}
            dragPayload={item.id}
            renderContent={() => (
              <View>
                <Text>{item.name}</Text>
              </View>
            )}
          />
        )}
      />
    </Left>
  );
};

export default FriendList;
