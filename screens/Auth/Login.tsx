import React, { useState, useEffect } from "react";
import { AuthSNFC } from "../../types/Navigation";
import styled from "styled-components/native";
import TextInput from "../../components/input/TextInput";
import Btn from "../../components/btn/Btn";
import SocialLoginBtn from "../../components/btn/SocialLoginBtn";
import Logo from "../../components/logo/Logo";
import { useQuery } from "react-query";
import { login } from "../../apis/memberApi";
import { useUserStore } from "../../store/userStore";
import { Text } from "react-native";

const SContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  transform: translateY(-20px);
`;
const SLogoContainer = styled.View`
  margin-bottom: 40px;
`;

const SBtnContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const SSocialBtnContainer = styled.View`
  margin-top: 10px;
`;

const Login: AuthSNFC<"Login"> = ({ navigation }) => {
  const [mid, setMid] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { data, error, isLoading, refetch, status } = useQuery({
    queryKey: ["login"],
    queryFn: () => login(mid, password),
    onSuccess: (data: any) => {},
    enabled: false,
  });

  function emailSubmit() {
    console.log("Email done, value : ", mid);
  }
  function passwordSubmit() {
    console.log("Password done, value : ", password);
  }
  function changeEmail(text: string) {
    setMid(text);
  }
  function changePassword(text: string) {
    setPassword(text);
  }

  function goJoin() {
    navigation.navigate("Join");
  }

  return (
    <SContainer>
      <SLogoContainer>
        <Logo />
      </SLogoContainer>
      <TextInput
        placeholder="E-mail"
        value={mid}
        onSubmit={emailSubmit}
        onChangeText={changeEmail}
      />

      <TextInput
        placeholder="password"
        value={password}
        onSubmit={passwordSubmit}
        onChangeText={changePassword}
      />

      <SBtnContainer>
        <Btn text="회원가입" onPress={goJoin} size="md" />
        <Btn text="로그인" onPress={refetch} size="md" />
      </SBtnContainer>

      <SSocialBtnContainer>
        <SocialLoginBtn text="구글 로그인" />
        {isLoading ? <Text>gd</Text> : null}
        <SocialLoginBtn text="카카오 로그인" />
      </SSocialBtnContainer>
    </SContainer>
  );
};

export default Login;
