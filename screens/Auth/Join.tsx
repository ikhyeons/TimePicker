import React, { useState } from "react";
import styled from "styled-components/native";
import TextInput from "../../components/input/TextInput";
import Btn from "../../components/btn/Btn";
import { AuthSNFC } from "../../types/Navigation";
import { useQuery } from "react-query";
import { joinMember } from "../../apis/memberApi";

const Text = styled.Text``;
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Join: AuthSNFC<"Join"> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwCheck, setPwCheck] = useState("");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["join"],
    queryFn: () => joinMember(email, password, name),
    enabled: false,
  });

  if (isLoading) return <Text>가입 시도 중!</Text>;
  if (error) return <Text>An error has occurred</Text>;

  function goLogin() {
    refetch();
    //if (!isLoading) navigation.navigate("Login");
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
      <Btn text="가입하기!" onPress={goLogin} size="lg" />
    </Container>
  );
};

export default Join;
