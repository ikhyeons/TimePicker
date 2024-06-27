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
import EntypeIcon from "react-native-vector-icons/Entypo";

const Tab = createMaterialBottomTabNavigator<NavigationParam.Main>();
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MySchedule"
        options={{
          title: "스케쥴",
          tabBarIcon: ({ color }) => (
            <View>
              <EntypeIcon name="calendar" color={color} size={26} />
            </View>
          ),
        }}
        component={Schedule}
      />
      <Tab.Screen
        name="Request"
        options={{
          title: "요청관리",
          tabBarIcon: ({ color }) => (
            <View>
              <MaterialIcons name="timetable" color={color} size={26} />
            </View>
          ),
        }}
        component={Request}
      />
      <Tab.Screen
        name="History"
        options={{
          title: "히스토리",
          tabBarIcon: ({ color }) => (
            <View>
              <MaterialIcons name="history" color={color} size={26} />
            </View>
          ),
        }}
        component={History}
      />
      <Tab.Screen
        name="Group"
        options={{
          title: "그룹관리",
          tabBarIcon: ({ color }) => (
            <View>
              <AntdIcon name="addusergroup" color={color} size={26} />
            </View>
          ),
        }}
        component={Group}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
