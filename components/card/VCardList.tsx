import { FlatList } from "react-native";
import React from "react";
import styled from "styled-components/native";
import LRequestCard from "./LRequestCard";
import { FULL_WIDTH } from "../../style/size";
import HorizonLine from "../HorizonLine";

const View = styled.View`
  width: ${FULL_WIDTH}px;
`;

const FHView = styled.View`
  margin-bottom: 5px;
`;

const SepView = styled.View`
  width: ${FULL_WIDTH}px;
  margin-bottom: 10px;
`;

const VCardList = (props: { data: IRequest[] }) => {
  return (
    <View>
      <FlatList
        data={props.data}
        renderItem={({ item }) => <LRequestCard data={item} />}
        bounces
        keyExtractor={(item, index) => `${index}`}
        ItemSeparatorComponent={HorizonLine}
      />
    </View>
  );
};

export default VCardList;
