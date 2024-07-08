import React, { useState } from "react";
import { Text } from "react-native-paper";
import styled from "styled-components/native";
import myRequest from "../../dummyData/myRequest";
import getRequest from "../../dummyData/getRequest";
import decidedRequest from "../../dummyData/decidedRequest";
import Add from "../../components/add/Add";
const Container = styled.View`
  flex: 1;
`;
const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 20px;
`;

const TitleContainer = styled.View``;
const Title = styled.Text``;

const StatusContainer = styled.View``;
const Status = styled.Text``;

const DescriptionContainer = styled.View``;
const Description = styled.Text``;

const ExpireContainer = styled.View``;
const Expire = styled.Text``;

const OrderContainer = styled.View``;
const Order = styled.Text``;

const TypeContainer = styled.View``;
const Type = styled.Text``;

const MemberContainer = styled.View`
  flex-direction: row;
`;
const Member = styled.Text`
  background-color: purple;
  margin: 0 5px;
  border-radius: 15px;
  padding: 5px;
`;

const RequestDetail = () => {
  const [detail, setDetail] = useState<IRequest>(myRequest[0]);
  return (
    <Container>
      <Add />
      <MainContainer>
        <StatusContainer>
          <Status>{detail.status}</Status>
        </StatusContainer>
        <ExpireContainer>
          <Expire>{detail.expireDate}</Expire>
        </ExpireContainer>
        <OrderContainer>
          <Order>{detail.order}</Order>
        </OrderContainer>
        <TitleContainer>
          <Title>{detail.title}</Title>
        </TitleContainer>
        <DescriptionContainer>
          <Description>{detail.description}</Description>
        </DescriptionContainer>
        <TypeContainer>
          <Type>{detail.type}</Type>
        </TypeContainer>
        <MemberContainer>
          {detail.member.map((data, i) => (
            <Member key={i}>{data.name}</Member>
          ))}
        </MemberContainer>
      </MainContainer>
    </Container>
  );
};

export default RequestDetail;
