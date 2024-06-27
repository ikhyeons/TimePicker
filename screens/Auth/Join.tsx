import React, { useState } from "react";
import styled from "styled-components/native";
import TextInput from "../../components/input/TextInput";
import { BTN_lg } from "../../style/size";
import Btn from "../../components/btn/Btn";
import { AFC } from "../../types/Navigation";

const View = styled.View``;
const Text = styled.Text``;
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Join: AFC<"Join"> = ({ navigation: navigate }) => {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwCheck, setPwCheck] = useState("");

  function goLogin() {
    navigate.navigate("Login");
  }

  function onChangeName(text: string) {
    setName(text);
  }
  function onChangeBirth(text: string) {
    setBirth(text);
  }
  function onChangeEmail(text: string) {
    setEmail(text);
  }
  function onChangePassword(text: string) {
    setPassword(text);
  }
  function onChangePwCheck(text: string) {
    setPwCheck(text);
  }

  function onSubmit() {
    console.log("submited");
  }

  return (
    <Container>
      <Text>회원가입</Text>
      <TextInput
        placeholder="이름"
        value={name}
        onChangeText={onChangeName}
        onSubmit={onSubmit}
      />
      <TextInput
        placeholder="생일"
        value={birth}
        onChangeText={onChangeBirth}
        onSubmit={onSubmit}
      />
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={onChangeEmail}
        onSubmit={onSubmit}
      />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={onChangePassword}
        onSubmit={onSubmit}
      />
      <TextInput
        placeholder="비밀번호 확인"
        value={pwCheck}
        onChangeText={onChangePwCheck}
        onSubmit={onSubmit}
      />
      <Btn text="가입완료!" onPress={goLogin} size="lg" />
    </Container>
  );
};

export default Join;
