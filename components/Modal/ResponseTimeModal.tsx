import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { FULL_HEIGHT, FULL_WIDTH, HALF_WIDTH } from "../../style/size";
import styled from "styled-components/native";
import { FlatList, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { useResponseStore } from "../../store/responseStore";
import Btn from "../btn/Btn";

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
    else if (prop.state == "selected") return "lightgrey";
    else return "yellow";
  }};
`;
const Event = styled.Text`
  flex: 0.6;
`;

const StateSelect = styled.View`
  width: 320px;
  height: 100px;
  background-color: white;
  align-items: center;
  justify-content: space-around;
  padding: 0 5px;
  border-radius: 15px;
`;

const StateButton = styled.TouchableOpacity`
  width: 70px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: lightgrey;
`;

const StateButtonText = styled.Text`
  text-align: center;
`;
const StateBtnContainer = styled.View`
  flex-direction: row;
`;
const ResponseTimeModal = (props: {
  visible: boolean;
  setVisible: (state: boolean) => void;
}) => {
  const times = useResponseStore((state) => state.resTime);
  const setTimeState = useResponseStore((state) => state.setTimeState);
  const setIsTimeSelect = useResponseStore((state) => state.setIsTimeSelecting);
  const isTimeSelect = useResponseStore((state) => state.isSelecting);
  const [isSelectStateOpen, setIsSelectStateOpen] = useState(false);
  const p1 = useResponseStore((state) => state.p1);
  const setP1 = useResponseStore((state) => state.setP1);
  const setP2 = useResponseStore((state) => state.setP2);
  const p2 = useResponseStore((state) => state.p2);
  const savePrev = useResponseStore((state) => state.savePrev);
  const loadPrev = useResponseStore((state) => state.loadPrev);
  StateBtnContainer;
  const [isFirst, setIsFirst] = useState(true);
  function pressTimeBox(hour: number, min: number) {
    if (!isTimeSelect) {
      savePrev();
      setIsTimeSelect(true);
      setP1({ hour: hour, min: min });
    } else {
      setIsTimeSelect(false);
      setP2({ hour: hour, min: min });
    }
  }

  useEffect(() => {
    setIsFirst(false);
    if (isTimeSelect == false) {
      !isFirst && setTimeState(p1, p2, "selected");
      !isFirst && setIsSelectStateOpen(true);
    }
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

      <Modal
        onBackdropPress={() => {
          loadPrev();
          setIsSelectStateOpen(false);
        }}
        onBackButtonPress={() => {
          loadPrev();
          setIsSelectStateOpen(false);
        }}
        deviceHeight={FULL_HEIGHT}
        deviceWidth={FULL_WIDTH}
        isVisible={isSelectStateOpen}
        backdropOpacity={0.1}
        useNativeDriver
        hideModalContentWhileAnimating
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        style={{
          height: FULL_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StateSelect>
          <Text>
            {p1.hour}시 {p1.min == 0 ? "" : `${p1.min}분`} ~{" "}
            {p2.min == 50 ? p2.hour + 1 : p2.hour}시{" "}
            {p2.min == 50 ? "" : `${p2.min + 10}분`}
          </Text>
          <StateBtnContainer>
            <StateButton
              onPress={() => {
                setIsSelectStateOpen(false);
                setTimeState(p1, p2, "possible");
              }}
            >
              <StateButtonText>가능!</StateButtonText>
            </StateButton>
            <StateButton
              onPress={() => {
                setIsSelectStateOpen(false);
                setTimeState(p1, p2, "impossible");
              }}
            >
              <StateButtonText>불가능!</StateButtonText>
            </StateButton>
            <StateButton
              onPress={() => {
                setIsSelectStateOpen(false);
                setTimeState(p1, p2, "ambiguous");
              }}
            >
              <StateButtonText>모름!</StateButtonText>
            </StateButton>
            <StateButton
              onPress={() => {
                setIsSelectStateOpen(false);
                setTimeState(p1, p2, "notSelected");
              }}
            >
              <StateButtonText>선택해제!</StateButtonText>
            </StateButton>
          </StateBtnContainer>
        </StateSelect>
      </Modal>
    </Modal>
  );
};

export default ResponseTimeModal;
