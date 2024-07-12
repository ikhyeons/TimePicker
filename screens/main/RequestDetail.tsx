import React, { useState } from "react";
import { Text } from "react-native-paper";
import styled from "styled-components/native";
import myRequest from "../../dummyData/myRequest";
import Add from "../../components/add/Add";
import DetailStateHeader from "../../components/header/DetailStateHeader";
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

const RequestDetail = () => {
  const [detail, setDetail] = useState<IRequest>(myRequest[0]);
  return (
    <Container>
      <Add />
      <DetailStateHeader data={detail} />

      <MainContainer>
        <TypeContainer>
          <Type>{detail.reqType}</Type>
        </TypeContainer>
        <TitleContainer>
          <Title>
            {detail.title} - {detail.order}
          </Title>
        </TitleContainer>
        <MemberContainer>
          <Text style={{ fontSize: 16 }}>to : </Text>
          {detail.member.map((data, i) => (
            <Member key={i}>{data.name}</Member>
          ))}
        </MemberContainer>
        <DescriptionContainer>
          <Description>{detail.description}</Description>
        </DescriptionContainer>

        <ResponseContainer>
          <Text>요청된 시간 : </Text>
          {detail.day?.map((data, i) => (
            <ReqCard key={i}>
              <Text>{data}</Text>
            </ReqCard>
          ))}
          {detail.date?.map((data, i) => (
            <ReqCard key={i}>
              <Text>{data}</Text>
            </ReqCard>
          ))}
        </ResponseContainer>
      </MainContainer>
    </Container>
  );
};

export default RequestDetail;
