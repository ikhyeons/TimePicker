import React, { useState } from "react";
import styled from "styled-components/native";
import user from "../../dummyData/user";
import { useFriendStore } from "../../store/friendStore";
import { useGroupStore } from "../../store/groupStore";
import { DraxList } from "react-native-drax";
const View = styled.View`
  height: 40px;
  justify-content: center;
  padding-left: 10px;
`;

const Text = styled.Text`
  color: black;
`;

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
        bounces
        itemStyles={{
          hoverDragReleasedStyle: [{ opacity: 0 }],
          style: [{ backgroundColor: "white" }],
          dragReleasedStyle: [],
          hoverDraggingStyle: [
            { borderRadius: 5, borderWidth: 2, borderColor: "black" },
          ],
          draggingWithoutReceiverStyle: [{ opacity: 0 }],
          draggingWithReceiverStyle: [{ opacity: 0 }],
          hoverDraggingWithoutReceiverStyle: [
            { backgroundColor: "lightyellow" },
          ],
          hoverDraggingWithReceiverStyle: [{ backgroundColor: "lightyellow" }],
        }}
        renderItemContent={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </Left>
  );
};

export default FriendList;
