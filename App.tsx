import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./navigator/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import Loading from "./components/loading/Loading";
import { useLoadStore } from "./store/loadStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const isLoading = useLoadStore((state) => state.isLoading);
  const setLoadingFalse = useLoadStore((state) => state.setLoadingFalse);

  useEffect(() => {
    setTimeout(() => {
      setLoadingFalse();
    }, 300);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
