import React from "react";
import { View } from "react-native";

import styled from "styled-components/native";

const Line = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
`;
const HorizonLine = () => {
  return <Line />;
};

export default HorizonLine;
