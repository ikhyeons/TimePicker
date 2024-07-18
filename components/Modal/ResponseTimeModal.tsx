import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { FULL_HEIGHT, FULL_WIDTH, HALF_WIDTH } from "../../style/size";
import styled from "styled-components/native";
import { FlatList, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { useResponseStore } from "../../store/responseStore";

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

const Minute = styled.Text<{ state: string }>`
  border-bottom-width: 1px;
  flex: 1;
  background-color: ${(prop) => {
    if (prop.state == "notSelected") return "white";
    else if (prop.state == "possible") return "lightgreen";
    else if (prop.state == "impossible") return "red";
    else return "yellow";
  }};
`;
const Event = styled.Text`
  flex: 0.6;
`;

const ResponseTimeModal = (props: {
  visible: boolean;
  setVisible: (state: boolean) => void;
}) => {
  const times = useResponseStore((state) => state.resTime);
  const setTimeState = useResponseStore((state) => state.setTimeState);
  const setIsTimeSelect = useResponseStore((state) => state.setIsTimeSelecting);
  const isTimeSelect = useResponseStore((state) => state.isSelecting);

  const [p1, setP1] = useState({ hour: 0, min: 0 });
  const [p2, setP2] = useState({ hour: 0, min: 0 });

  function pressTimeBox(hour: number, min: number) {
    if (!isTimeSelect) {
      setIsTimeSelect(true);
      setP1({ hour: hour, min: min });
    } else {
      setIsTimeSelect(false);
      setP2({ hour: hour, min: min });
    }
  }

  useEffect(() => {
    if (isTimeSelect == false) setTimeState(p1, p2, "ambiguous");
  }, [p1, p2]);

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
          data={times}
          ListHeaderComponent={<View style={{ borderBottomWidth: 1 }} />}
          ListFooterComponent={<View style={{ borderBottomWidth: 1 }} />}
          ItemSeparatorComponent={() => (
            <View style={{ borderBottomWidth: 1 }} />
          )}
          renderItem={({ item, index }) => (
            <TimeContainer>
              <HourContainer>
                <Hour>{index}시</Hour>
              </HourContainer>
              <Minutes>
                {item.map((data, i) => (
                  <Minute
                    onPress={() => pressTimeBox(index, 10 * i)}
                    state={data.state}
                    key={i}
                  />
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
