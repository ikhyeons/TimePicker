import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";

const SCurrentTime = styled.View`
  padding: 10px;
  background-color: #ececec;
  border-bottom-width: 1px;
  border-color: lightgrey;
`;

const CurrentTime = () => {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const Timer = setInterval(() => {
      let time = new Date();
      setClock(
        time.getMonth() +
          1 +
          "월 " +
          time.getDate() +
          "일 " +
          time.getHours() +
          "시 " +
          time.getMinutes() +
          "분 - " +
          time.getSeconds() +
          "초"
      );
    }, 1000);

    return () => {
      clearInterval(Timer);
    };
  }, []);

  return (
    <SCurrentTime>
      <Text>{clock}</Text>
    </SCurrentTime>
  );
};

export default CurrentTime;
