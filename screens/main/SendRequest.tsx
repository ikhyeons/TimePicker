import React, { useState } from "react";

import styled from "styled-components/native";
import Btn from "../../components/btn/Btn";
import TextInput from "../../components/input/TextInput";
import { useNavigation } from "@react-navigation/native";
import { RootSNFC } from "../../types/Navigation";
import SelectableBtn from "../../components/btn/SelectableBtn";
import TimeInput from "../../components/input/TimeInput";

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
  const [selectedType, setSelectedType] = useState(0);
  const [title, setTitle] = useState("");
  const [describe, setDescribe] = useState("");
  const [deadline, setDeadline] = useState<{
    year: number;
    month: number;
    day: number;
  }>({ year: 0, month: 0, day: 0 });
  const [receiver, setReceiver] = useState("");
  const navigation = useNavigation<RootSNFC<"SendResponse">>();
  const typeBtnList = [
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
            value={describe}
            onChangeText={setDescribe}
          />
        </InputContainer>

        <InputContainer>
          <Text>마감일을 등록해주세요</Text>
          <NumInputContainer>
            <TimeInput />
          </NumInputContainer>
        </InputContainer>

        <InputContainer>
          <Text>수신자를 등록해주세요</Text>
          <TextInput
            placeholder="수신자"
            value={receiver}
            onChangeText={setReceiver}
          />
        </InputContainer>
        <InputContainer>
          <Text>어떤 형식의 일정입니까</Text>
          <BtnContainer>
            {typeBtnList.map((data, i) => (
              <SelectableBtn
                isSelect={i == selectedType}
                key={i}
                text={data.text}
                size="xs"
                onPress={() => {
                  setSelectedType(i);
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
