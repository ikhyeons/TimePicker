import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Schedule from "../screens/main/Schedule";
import Request from "../screens/main/Request";
import History from "../screens/main/History";
import Group from "../screens/main/Group";
import { NavigationParam } from "../types/Navigation";

const Tab = createMaterialBottomTabNavigator<NavigationParam.Main>();
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MySchedule" component={Schedule} />
      <Tab.Screen name="Request" component={Request} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Group" component={Group} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
