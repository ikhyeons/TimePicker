import React, { useState } from "react";
import { AFC } from "../../types/Navigation";
import styled from "styled-components/native";
import TextInput from "../../components/input/TextInput";
import Btn from "../../components/btn/Btn";
import SocialLoginBtn from "../../components/btn/SocialLoginBtn";
import Logo from "../../components/logo/Logo";
import { useUserStore } from "../../store/userStore";

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

const Login: AFC<"Login"> = ({ navigation: navigate }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = useUserStore((state) => state.login);

  function emailSubmit() {
    console.log("Email done, value : ", email);
  }
  function passwordSubmit() {
    console.log("Password done, value : ", password);
  }
  function changeEmail(text: string) {
    setEmail(text);
    console.log(text);
  }
  function changePassword(text: string) {
    setPassword(text);
    console.log(text);
  }

  function goJoin() {
    navigate.navigate("Join");
  }

  return (
    <SContainer>
      <SLogoContainer>
        <Logo />
      </SLogoContainer>
      <TextInput
        placeholder="E-mail"
        value={email}
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
        <Btn text="로그인" onPress={login} size="md" />
      </SBtnContainer>

      <SSocialBtnContainer>
        <SocialLoginBtn text="구글 로그인" />
      </SSocialBtnContainer>
    </SContainer>
  );
};

export default Login;
