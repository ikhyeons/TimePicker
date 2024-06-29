import { FlatList } from "react-native";
import React, { useState } from "react";
import RequestCard from "./RequestCard";
import styled from "styled-components/native";
import { useUserStore } from "../../store/userStore";

const View = styled.View`
  margin-bottom: 10px;
`;

const Text = styled.Text`
  margin-bottom: 10px;
`;

const HCardList = (props: { title: string; data: IRequest[] }) => {
  return (
    <View>
      <Text>{props.title}</Text>
      <FlatList
        data={props.data}
        renderItem={({ item }) => <RequestCard data={item} />}
        horizontal
        bounces
        keyExtractor={(item, index) => `${index}`}
        ListHeaderComponent={<View style={{ marginRight: 8 }}></View>}
        ItemSeparatorComponent={() => <View style={{ marginRight: 8 }}></View>}
      />
    </View>
  );
};

export default HCardList;
