import React, { useState } from "react";

import styled from "styled-components/native";
import Btn from "../../components/btn/Btn";
import TextInput from "../../components/input/TextInput";
import { useNavigation } from "@react-navigation/native";
import { RootSNFC } from "../../types/Navigation";
import SelectableBtn from "../../components/btn/SelectableBtn";
import TimeInput from "../../components/input/TimeInput";
import { useRequestStore } from "../../store/requestStore";

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

const NumInputContainer = styled.View`
  flex: 1;
`;
const BtnContainer = styled.View`
  flex-direction: row;
  padding: 0 10px;
`;

const SendRequest = () => {
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

  const navigation = useNavigation<RootSNFC<"SendResponse">>();

  const typeBtnList: { text: string; type: reqType }[] = [
    {
      text: "시간 맞추기",
      type: "time",
    },
    {
      text: "날짜 맞추기",
      type: "date",
    },
    {
      text: "요일 맞추기",
      type: "day",
    },
  ];

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
            numOfLine={3}
            multiline={true}
            placeholder="Describe"
            value={description}
            onChangeText={setDescription}
          />
        </InputContainer>

        <InputContainer>
          <Text>마감일을 등록해주세요</Text>
          <NumInputContainer>
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
          </NumInputContainer>
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
          <Text>어떤 형식의 일정입니까</Text>
          <BtnContainer>
            {typeBtnList.map((data, i) => (
              <SelectableBtn
                isSelect={data.type == type}
                key={i}
                text={data.text}
                size="xs"
                onPress={() => {
                  setType(data.type);
                }}
              />
            ))}
          </BtnContainer>
        </InputContainer>
        <InputContainer>
          <Btn
            text="시간 선택하기"
            size="lg"
            onPress={() => {
              navigation.navigate("SelectTime");
            }}
          />
        </InputContainer>
      </View>
    </Container>
  );
};

export default SendRequest;
