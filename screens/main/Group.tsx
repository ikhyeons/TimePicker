import React, { useState } from "react";
import styled from "styled-components/native";
import Accordion from "react-native-collapsible";
import userGroup from "../../components/dummyData/userGroup";
import user from "../../components/dummyData/user";
import { FlatList } from "react-native";
const View = styled.View``;
const Text = styled.Text``;

const Container = styled.View`
  flex: 1;
  flex-direction: row;
`;
const Left = styled.View`
  flex: 1;
  background-color: #ffffff;
`;
const Right = styled.View`
  flex: 1;
  background-color: #ffffff;
`;
const Line = styled.View`
  border-right-width: 1px;
  border-right-color: lightgrey;
`;

const Header = styled.View`
  height: 50px;
  background-color: red;
  justify-content: center;
  align-items: center;
`;

const GroupBtn = styled.TouchableOpacity`
  background-color: grey;
`;
const Pressable = styled.Pressable``;
const Group = () => {
  const [memberGroup, setMemberGroup] = useState(userGroup);
  const [userList, setUserList] = useState(user);
  return (
    <Container>
      <Left>
        <Header>
          <Text>프렌드 리스트</Text>
        </Header>
        <FlatList
          data={userList}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </Left>
      <Line />
      <Right>
        <Header>
          <Text>그룹 리스트</Text>
        </Header>
        <FlatList
          data={memberGroup}
          keyExtractor={(data) => `${data.id}`}
          renderItem={({ item }) => (
            <GroupBtn
              onPress={() => {
                const newArr = [...memberGroup];
                newArr.map((newData) => {
                  if (newData.id == item.id) newData.isOpen = !newData.isOpen;
                });
                setMemberGroup(newArr);
              }}
            >
              <Text>
                {item.title}
                {item.isOpen ? "→" : "↓"}
              </Text>
              <Accordion collapsed={item.isOpen}>
                <Pressable>
                  {item.member.map((data: any, i2: number) => (
                    <Text key={i2}>-{data.name}</Text>
                  ))}
                </Pressable>
              </Accordion>
            </GroupBtn>
          )}
        />
      </Right>
    </Container>
  );
};

export default Group;
