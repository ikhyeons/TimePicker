import { View, Text, ImageURISource } from "react-native";
import React from "react";
import styled from "styled-components/native";
import Status from "./Status";
import time from "../../utils/time";
import { extractState } from "../../utils/state";

const Card = styled.TouchableOpacity`
  flex-direction: row;
  height: 100px;
  background-color: #ffffff;
  align-items: center;
  padding: 5px;
`;
const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 5px;
`;

const MemberContainer = styled.View`
  padding: 4px;
  border-radius: 10px;
  flex-direction: row;

  align-items: center;
`;
const Member = styled.Text`
  font-size: 10px;
  color: white;
  background-color: #2800d8;
  padding: 4px;
  border-radius: 5px;
`;

const UnRes = styled.Text`
  font-size: 10px;
  margin-right: 3px;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.View`
  flex: 1;
`;

const Image = styled.Image`
  background-color: #ffffff;
  height: 70px;
  margin: 0 5px;
  width: 70px;
`;

const Title = styled.Text`
  margin-left: 3px;
  font-size: 18px;
`;

const ExpireContainer = styled.View`
  padding: 4px;
  border-radius: 10px;
  flex-direction: row;
`;

const Expire = styled.Text`
  font-size: 10px;
  color: white;
  background-color: purple;
  border-radius: 5px;
  padding: 4px;
`;
const ExpireWhite = styled.View`
  flex: 1;
`;

const Order = styled.Text`
  font-size: 12px;
  margin-bottom: 3px;
  margin-left: 3px;
`;

const LRequestCard = (props: { data: IRequest; navigator: any }) => {
  const memberNum = props.data.receiverList?.length;
  const responser: number[] = [];
  if (props.data.type == "DAY") {
    props.data.dayList.map((data) => {
      data.responseList.map((data2) => {
        responser.push(data2.member.memberId);
      });
    });
  } else {
    props.data.dateList.map((data) => {
      data.responseList.map((data2) => {
        responser.push(data2.member.memberId);
      });
    });
  }
  const responseNum = new Set(responser).size;

  return (
    <Card
      onPress={() => {
        props.navigator("RequestDetail", {
          params: { requestData: props.data },
        });
      }}
    >
      {/* {<Image
        borderRadius={35}
        resizeMode="contain"
        source={props.data.image as unknown as ImageURISource}
      />} */}
      <InnerContainer>
        <CardHeader>
          <Status status={extractState(props.data, "skantrkwl789")} />
          <MemberContainer>
            {memberNum - responseNum != 0 && (
              <UnRes>{` 미응답 ${memberNum - responseNum}명`}</UnRes>
            )}
            <Member>{`${responseNum} / ${memberNum}`}</Member>
          </MemberContainer>
        </CardHeader>

        <Title>{props.data.title}</Title>
        <ExpireContainer>
          <Expire>{`마감까지 : ${time.diffDay(props.data.deadline)}`}</Expire>
          <ExpireWhite />
        </ExpireContainer>
        <Order> {`${props.data.member.name} → 장민욱, 류창완 외 2명`}</Order>
      </InnerContainer>
    </Card>
  );
};

export default LRequestCard;
