import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import Login from "../screens/Auth/Login";
import Join from "../screens/Auth/Join";

import SendRequest from "../screens/main/SendRequest";
import SendResponse from "../screens/main/SendResponse";
import { NavigationParam } from "../types/Navigation";
import { useUserStore } from "../store/userStore";
import RequestDetail from "../screens/main/RequestDetail";
import SelectTime from "../screens/main/SelectTime";
import { getItem } from "../localStorage/localStorage";

const StackMain = createNativeStackNavigator<NavigationParam.Root>();
const StackAuth = createNativeStackNavigator<NavigationParam.Auth>();
const RootNavigator = () => {
  const isLogin = useUserStore((state) => state.isLogin);
  const setLogin = useUserStore((state) => state.setLogin);
  const setToken = useUserStore((state) => state.setToken);

  useEffect(() => {
    getItem("token").then((token) => {
      if (token != "" && token != null) {
        setLogin();
        setToken(token);
      }
    });
  }, []);

  return isLogin ? (
    <StackMain.Navigator screenOptions={{ headerShown: false }}>
      <StackMain.Screen name="TabNav" component={TabNavigator} />
      <StackMain.Screen name="SendRequest" component={SendRequest} />
      <StackMain.Screen name="SendResponse" component={SendResponse} />
      <StackMain.Screen name="RequestDetail" component={RequestDetail} />
      <StackMain.Screen name="SelectTime" component={SelectTime} />
    </StackMain.Navigator>
  ) : (
    <StackAuth.Navigator>
      <StackAuth.Screen name="Login" component={Login} />
      <StackAuth.Screen name="Join" component={Join} />
    </StackAuth.Navigator>
  );
};

export default RootNavigator;
