import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./navigator/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import Loading from "./components/loading/Loading";
import { useLoadStore } from "./store/loadStore";
export default function App() {
  const isLoading = useLoadStore((state) => state.isLoading);
  const setLoadingFalse = useLoadStore((state) => state.setLoadingFalse);

  useEffect(() => {
    setTimeout(() => {
      setLoadingFalse();
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
