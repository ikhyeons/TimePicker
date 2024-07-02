import React, { useState } from "react";
import styled from "styled-components/native";
import userGroup from "../dummyData/userGroup";
import { DraxList } from "react-native-drax";

const Header = styled.View`
  flex-direction: row;
  height: 50px;
  background-color: red;
  justify-content: center;
  align-items: center;
`;

const GroupBtn = styled.TouchableOpacity`
  justify-content: center;
  padding: 5px;
`;
const Pressable = styled.Pressable``;

const View = styled.View`
  height: 30px;
  justify-content: center;
  padding: 5px;
`;

const Text = styled.Text`
  height: 30px;
  justify-content: center;
  padding: 5px;
`;

const MemberView = styled.View`
  height: 30px;
  justify-content: center;
  padding: 5px;
  flex: 1;
`;

const MemberText = styled.Text`
  height: 30px;
  justify-content: center;
  padding: 5px;
  padding-left: 30px;
`;

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
      {memberGroup && (
        <DraxList
          itemStyles={{
            dragReleasedStyle: [],
            receivingStyle: [{ backgroundColor: "lightgrey" }],
          }}
          itemsDraggable={false}
          data={memberGroup}
          keyExtractor={(data) => `${data.id}`}
          renderItemContent={({ item }) => (
            <GroupBtn
              onPress={() => {
                const newArr = [...memberGroup];
                newArr.map((newData) => {
                  if (newData.id == item.id) newData.isOpen = !newData.isOpen;
                });
                setMemberGroup(newArr);
              }}
            >
              <View>
                <Text>
                  {item.title}
                  {item.isOpen ? "↓" : "→"}
                </Text>
              </View>

              <Pressable
                onPress={() => {
                  item.isOpen = !item.isOpen;
                }}
              >
                {item.isOpen ? (
                  <Pressable>
                    {item.member.map((data: any, i2: number) => (
                      <MemberText key={i2}>{data.name}</MemberText>
                    ))}
                  </Pressable>
                ) : null}
              </Pressable>
            </GroupBtn>
          )}
        />
      )}
    </Right>
  );
};

export default GroupList;
