import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./navigator/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import Loading from "./components/loading/Loading";
export default function App() {
  const [isLoadingEnd, setIsLoadingEnd] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoadingEnd(true);
    }, 1000);
  }, []);

  if (!isLoadingEnd) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
