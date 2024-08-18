import React, { useState } from "react";
import { Text } from "react-native-paper";
import styled from "styled-components/native";
import Add from "../../components/add/Add";
import DetailStateHeader from "../../components/header/DetailStateHeader";
import ResponseTimeModal from "../../components/Modal/ResponseTimeModal";
import { NavigationParam, RootSNFC } from "../../types/Navigation";
import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
const Container = styled.View`
  flex: 1;
`;
const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 20px;
`;

const TypeContainer = styled.View``;
const Type = styled.Text``;

const TitleContainer = styled.View``;
const Title = styled.Text`
  font-size: 22px;
`;

const DescriptionContainer = styled.View``;
const Description = styled.Text`
  font-size: 16px;
  padding: 5px;
  color: #3b3b3b;
  margin-left: 10px;
`;

const OrderContainer = styled.View``;
const Order = styled.Text``;

const MemberContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Member = styled.Text`
  background-color: purple;
  margin: 0 3px;
  color: white;
  border-radius: 15px;
  padding: 2px;
`;

const ResponseContainer = styled.View``;

const ReqCard = styled.TouchableOpacity`
  width: max-content;
  border-radius: 10px;
  margin: 2px 0;
  padding: 10px;
  background-color: lightgrey;
  border-width: 1px;
  border-color: grey;
`;

const RequestDetail: RootSNFC<"RequestDetail"> = () => {
  const {
    params: {
      params: { requestData: data },
    },
  } =
    useRoute<
      NativeStackScreenProps<NavigationParam.Root, "RequestDetail">["route"]
    >();
  const [rightModalOpen, setRightModalOpen] = useState(false);

  return (
    <Container>
      <Add />
      <DetailStateHeader data={data} />

      <MainContainer>
        <TypeContainer>
          <Type>{data.reqType}</Type>
        </TypeContainer>
        <TitleContainer>
          <Title>
            {data.title} - {data.member.name}
          </Title>
        </TitleContainer>
        <MemberContainer>
          <Text style={{ fontSize: 16 }}>to : </Text>
          {data.receiverList.map((data, i) => (
            <Member key={i}>{data.member.name}</Member>
          ))}
        </MemberContainer>
        <DescriptionContainer>
          <Description>{data.description}</Description>
        </DescriptionContainer>

        <ResponseContainer>
          <Text>요청된 시간 : </Text>
          {data.type == "DAY" &&
            data.dayList?.map((data, i) => (
              <ReqCard
                onPress={() => {
                  setRightModalOpen(true);
                }}
                key={i}
              >
                <Text>{data.day}</Text>
              </ReqCard>
            ))}
          {data.type == "DATE" &&
            data.dateList?.map((data, i) => (
              <ReqCard
                onPress={() => {
                  setRightModalOpen(true);
                }}
                key={i}
              >
                <Text>{data.date}</Text>
              </ReqCard>
            ))}
        </ResponseContainer>
      </MainContainer>
      <ResponseTimeModal
        setVisible={setRightModalOpen}
        visible={rightModalOpen}
      />
    </Container>
  );
};

export default RequestDetail;
