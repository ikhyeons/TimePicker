import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MainBTNFC } from "../../types/Navigation";
import { useUserStore } from "../../store/userStore";
const Schedule: MainBTNFC<"MySchedule"> = () => {
  const logout = useUserStore((state) => state.logout);
  return (
    <TouchableOpacity onPress={() => logout()}>
      <Text>로그아웃</Text>
    </TouchableOpacity>
  );
};

export default Schedule;
