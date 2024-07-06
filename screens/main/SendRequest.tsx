import React, { useState } from "react";

import styled from "styled-components/native";
import Btn from "../../components/btn/Btn";
import TextInput from "../../components/input/TextInput";
import { useNavigation } from "@react-navigation/native";
import { RootSNFC } from "../../types/Navigation";
import SelectableBtn from "../../components/btn/SelectableBtn";
import TimeInput from "../../components/input/TimeInput";
import { useRequestStore } from "../../store/requestStore";
import TimeModal from "../../components/Modal/TimeModal";

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
  const [modalOpen, setModalOpen] = useState(false);
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
      text: "날짜로 맞추기",
      type: "date",
    },
    {
      text: "요일로 맞추기",
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
          <Text>요청 형식을 선택해주세요</Text>
          <BtnContainer>
            {typeBtnList.map((data, i) => (
              <SelectableBtn
                isSelect={data.type == type}
                key={i}
                text={data.text}
                size="xs"
                onPress={() => {
                  setType(data.type);
                  setModalOpen(true);
                }}
              />
            ))}
          </BtnContainer>
        </InputContainer>
        {modalOpen ? <View style={{ height: 300 }} /> : null}
      </View>
      <TimeModal visible={modalOpen} setVisible={setModalOpen} />
    </Container>
  );
};

export default SendRequest;
