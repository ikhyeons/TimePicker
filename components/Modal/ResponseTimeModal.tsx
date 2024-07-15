import React, { useState } from "react";
import Modal from "react-native-modal";
import { FULL_HEIGHT, FULL_WIDTH, HALF_WIDTH } from "../../style/size";
import styled from "styled-components/native";
import { FlatList, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

const MainComponentWrap = styled.View`
  background-color: rgb(255, 255, 255);
  flex: 1;
`;

const Header = styled.View``;
const HeaderText = styled.Text`
  padding: 5px;
  font-size: 20px;
`;

const TimeContainer = styled.View`
  height: 100px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HourContainer = styled.View`
  align-items: center;
  justify-content: center;
  border-right-width: 1px;
  height: 100px;
  flex: 0.2;
  background-color: lightyellow;
`;

const Button = styled.TouchableOpacity`
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: lightblue;
`;
const Hour = styled.Text`
  text-align: center;
`;
const Minutes = styled.View`
  height: 100px;
  border-right-width: 1px;
  flex: 0.2;
`;
const Minute = styled.Text`
  flex: 1;
`;
const Event = styled.Text`
  flex: 0.6;
`;

const ResponseTimeModal = (props: {
  visible: boolean;
  setVisible: (state: boolean) => void;
}) => {
  const hour = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  return (
    <Modal
      onBackdropPress={() => {
        props.setVisible(false);
      }}
      onBackButtonPress={() => {
        props.setVisible(false);
      }}
      deviceHeight={FULL_HEIGHT}
      deviceWidth={FULL_WIDTH}
      isVisible={props.visible}
      backdropOpacity={0.1}
      style={{
        height: FULL_HEIGHT,
        width: HALF_WIDTH * 1.6,
        margin: 0,
        marginLeft: FULL_WIDTH - HALF_WIDTH * 1.6,
      }}
      useNativeDriver
      hideModalContentWhileAnimating
      animationIn={"slideInRight"}
      animationOut={"slideOutRight"}
    >
      <MainComponentWrap>
        <Header>
          <HeaderText>시간 입력하기</HeaderText>
        </Header>

        <FlatList
          bounces={false}
          bouncesZoom={false}
          overScrollMode="never"
          data={hour}
          ListHeaderComponent={<View style={{ borderBottomWidth: 1 }} />}
          ListFooterComponent={<View style={{ borderBottomWidth: 1 }} />}
          ItemSeparatorComponent={() => (
            <View style={{ borderBottomWidth: 1 }} />
          )}
          renderItem={({ item }) => (
            <TimeContainer>
              <HourContainer>
                <Hour>{item}시</Hour>
              </HourContainer>
              <Minutes>
                {new Array(6).fill(1).map((data, i) => (
                  <Minute key={i} style={{ borderBottomWidth: 1 }}></Minute>
                ))}
              </Minutes>

              <Event></Event>
            </TimeContainer>
          )}
        />
        <Button
          onPress={() => {
            props.setVisible(false);
          }}
        >
          <Text>결정!</Text>
        </Button>
      </MainComponentWrap>
    </Modal>
  );
};

export default ResponseTimeModal;
