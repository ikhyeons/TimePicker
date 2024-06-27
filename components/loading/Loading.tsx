import React from "react";

import { Text } from "react-native-paper";
import styled from "styled-components/native";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Loading = () => {
  return (
    <View>
      <Text>로딩 중...</Text>
    </View>
  );
};

export default Loading;
