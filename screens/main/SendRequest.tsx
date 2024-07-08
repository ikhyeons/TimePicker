import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Btn from "../../components/btn/Btn";
import TextInput from "../../components/input/TextInput";
import { useNavigation } from "@react-navigation/native";
import { RootSNFC } from "../../types/Navigation";
import SelectableBtn from "../../components/btn/SelectableBtn";
import TimeInput from "../../components/input/TimeInput";
import { useRequestStore } from "../../store/requestStore";
import TimeModal from "../../components/Modal/TimeModal";
import ScheduleListModal from "../../components/Modal/ScheduleListModal";
import { BTN_xxs } from "../../style/size";

const View = styled.View``;
const Text = styled.Text``;

const Container = styled.ScrollView`
  flex: 1;
`;

const InputContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const DateInputContainer = styled.View`
  flex: 1;
  height: 50px;
  min-height: 50px;
`;
const BtnContainer = styled.View`
  flex-direction: row;
  padding: 0 10px;
`;

const DayContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DayBtn = styled.TouchableOpacity<{ isSelect: boolean }>`
  width: ${BTN_xxs}px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${(prop) => (prop.isSelect ? "black" : "lightgrey")};
  padding: 5px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const DayBtnText = styled.Text``;
const SendRequest = () => {
  const [bottomModalOpen, setBottomModalOpen] = useState(false);
  const [rightModalOpen, setRightModalOpen] = useState(false);
  const [sequence, setSequence] = useState<
    "type" | "title" | "desc" | "deadline" | "receiver"
  >("type");

  const [open, setOpen] = useState(false);
  const { deadline, description, receiver, title, type } = useRequestStore(
    (state) => state.sendRequestData
  );

  const setTitle = useRequestStore((state) => state.setSendRequestTitle);
  const setReceiver = useRequestStore((state) => state.setSendRequestReceiver);
  const setType = useRequestStore((state) => state.setSendRequestType);
  const setDescription = useRequestStore(
    (state) => state.setSendRequestDescription
  );
  const [isSelectDayOpen, setIsSelectDayOpen] = useState(false);

  const [selectedDay, setSelectedDay] = useState([
    { day: "일", isSelected: false },
    { day: "월", isSelected: false },
    { day: "화", isSelected: false },
    { day: "수", isSelected: false },
    { day: "목", isSelected: false },
    { day: "금", isSelected: false },
    { day: "토", isSelected: false },
  ]);
  const navigation = useNavigation<RootSNFC<"SendResponse">>();

  const typeBtnList: { text: string; type: reqType; onPress: () => void }[] = [
    {
      text: "날짜로 맞추기",
      type: "date",
      onPress: () => {
        setSelectedDay([
          { day: "일", isSelected: false },
          { day: "월", isSelected: false },
          { day: "화", isSelected: false },
          { day: "수", isSelected: false },
          { day: "목", isSelected: false },
          { day: "금", isSelected: false },
          { day: "토", isSelected: false },
        ]);
        setType("date");
        setIsSelectDayOpen(false);
        setBottomModalOpen(true);
      },
    },
    {
      text: "요일로 맞추기",
      type: "day",
      onPress: () => {
        if (type == "day") setType(null);
        else setType("day");
        setIsSelectDayOpen((prev) => !prev);
      },
    },
  ];

  useEffect(() => {
    setType(null);
  }, []);

  return (
    <Container
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View>
        <InputContainer>
          <Text>일정 제목을 입력해주세요</Text>
          <TextInput placeholder="제목" value={title} onChangeText={setTitle} />
        </InputContainer>
        <InputContainer>
          <Text>간단한 설명을 입력해주세요</Text>
          <TextInput
            multiline={true}
            placeholder="Describe"
            value={description}
            onChangeText={setDescription}
          />
        </InputContainer>

        <InputContainer>
          <Text>마감일을 등록해주세요</Text>
          <DateInputContainer>
            <Btn
              text={`${
                deadline
                  ? `${deadline.getFullYear()}년 ${
                      deadline.getMonth() + 1
                    }월 ${deadline.getDate()}일 ${deadline.getHours()}시 ${deadline.getMinutes()}분`
                  : "-"
              }`}
              size="lg"
              onPress={() => {
                setOpen(true);
              }}
            />
            {open && <TimeInput setIsOpen={setOpen} />}
          </DateInputContainer>
        </InputContainer>

        <InputContainer>
          <Text>수신자를 등록해주세요</Text>

          <TextInput
            placeholder="수신자"
            value={""}
            onChangeText={setReceiver}
          />
        </InputContainer>
        <InputContainer>
          <Text>요청 형식을 선택해주세요</Text>
          <BtnContainer>
            {typeBtnList.map((data, i) => (
              <SelectableBtn
                isSelect={data.type == type}
                key={i}
                text={data.text}
                size="xs"
                onPress={data.onPress}
              />
            ))}
          </BtnContainer>
          {isSelectDayOpen && (
            <DayContainer>
              {selectedDay.map((data, i) => (
                <SelectableBtn
                  size="xxs"
                  text={data.day}
                  key={i}
                  isSelect={data.isSelected}
                  onPress={() => {
                    setSelectedDay((prev) => {
                      let newArr = [...prev];
                      let result = newArr.map((data2, i) => {
                        if (data2.day == data.day)
                          return { ...data2, isSelected: !data.isSelected };
                        else return data2;
                      });
                      return result;
                    });
                  }}
                />
              ))}
            </DayContainer>
          )}
        </InputContainer>
        <InputContainer>
          <Btn
            text="완료"
            size="lg"
            onPress={() => {
              navigation.navigate("TabNav");
            }}
          />
        </InputContainer>
      </View>

      <TimeModal
        visible={bottomModalOpen}
        setVisible={setBottomModalOpen}
        onDatePress={setRightModalOpen}
      />
      <ScheduleListModal
        visible={rightModalOpen}
        setVisible={setRightModalOpen}
      />
    </Container>
  );
};

export default SendRequest;
