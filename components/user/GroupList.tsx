import React, { useState } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import userGroup from "../dummyData/userGroup";
import Accordion from "react-native-collapsible";
import { DraxView } from "react-native-drax";

const Header = styled.View`
  flex-direction: row;
  height: 50px;
  background-color: red;
  justify-content: center;
  align-items: center;
`;

const GroupBtn = styled.TouchableOpacity`
  background-color: grey;
`;
const Pressable = styled.Pressable``;

const View = styled.View``;
const Text = styled.Text``;

const Right = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const GroupList = () => {
  const [memberGroup, setMemberGroup] = useState(userGroup);

  return (
    <Right>
      <Header>
        <Text>그룹 리스트</Text>
        <View>
          <Text>+</Text>
        </View>
      </Header>
      <FlatList
        data={memberGroup}
        keyExtractor={(data) => `${data.id}`}
        renderItem={({ item }) => (
          <DraxView
            onReceiveDragEnter={({ dragged: { payload } }) => {
              console.log(`hello ${payload}`);
            }}
            onReceiveDragExit={({ dragged: { payload } }) => {
              console.log(`goodbye ${payload}`);
            }}
            onReceiveDragDrop={({ dragged: { payload } }) => {
              console.log(`received ${payload}`);
            }}
            renderContent={() => (
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
                  {item.isOpen ? "↓" : "→"}
                </Text>

                <Accordion collapsed={!item.isOpen}>
                  <Pressable>
                    {item.member.map((data: any, i2: number) => (
                      <Text key={i2}>-{data.name}</Text>
                    ))}
                  </Pressable>
                </Accordion>
              </GroupBtn>
            )}
          />
        )}
      />
    </Right>
  );
};

export default GroupList;
