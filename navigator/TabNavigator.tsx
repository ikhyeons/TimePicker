import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Schedule from "../screens/main/Schedule";
import Request from "../screens/main/Request";
import History from "../screens/main/History";
import Group from "../screens/main/Group";
import { NavigationParam } from "../types/Navigation";

import { View } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntdIcon from "react-native-vector-icons/AntDesign";
import FAIcon from "react-native-vector-icons/FontAwesome6";
import EntypeIcon from "react-native-vector-icons/Entypo";
import Setting from "../screens/main/Setting";

const Tab = createMaterialBottomTabNavigator<NavigationParam.Main>();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="MySchedule"
      activeColor="#ffffff"
      inactiveColor="#8e8e8e"
      activeIndicatorStyle={{ backgroundColor: "white" }}
      barStyle={{ backgroundColor: "#272727" }}
    >
      <Tab.Screen
        name="MySchedule"
        options={{
          title: "스케쥴",
          tabBarIcon: ({ focused }) => (
            <View>
              <EntypeIcon
                name="calendar"
                color={`${focused ? "black" : "#b7b7b7"}`}
                size={26}
              />
            </View>
          ),
        }}
        component={Schedule}
      />
      <Tab.Screen
        name="Request"
        options={{
          title: "요청관리",
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialIcons
                name="timetable"
                color={`${focused ? "black" : "#b7b7b7"}`}
                size={26}
              />
            </View>
          ),
        }}
        component={Request}
      />
      <Tab.Screen
        name="History"
        options={{
          title: "히스토리",
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialIcons
                name="history"
                color={`${focused ? "black" : "#b7b7b7"}`}
                size={26}
              />
            </View>
          ),
        }}
        component={History}
      />
      <Tab.Screen
        name="Group"
        options={{
          title: "그룹관리",
          tabBarIcon: ({ focused }) => (
            <View>
              <AntdIcon
                name="addusergroup"
                color={`${focused ? "black" : "#b7b7b7"}`}
                size={26}
              />
            </View>
          ),
        }}
        component={Group}
      />
      <Tab.Screen
        name="Setting"
        options={{
          title: "세팅",
          tabBarIcon: ({ focused }) => (
            <View>
              <FAIcon
                name="user-gear"
                color={`${focused ? "black" : "#b7b7b7"}`}
                size={26}
              />
            </View>
          ),
        }}
        component={Setting}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
