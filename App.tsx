import React from "react";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./navigator/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
