/* eslint-disable react/no-unstable-nested-components */ // //TODO: pending to check this warning
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatisticsScreen } from "../screens/StatisticsScreen";
import { TimerScreen } from "../screens/TimerScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GoalsScreen } from "../screens/GoalsScreen";
import { IconButtonSwitch } from "../components/IconButtonSwitch";
import { useTheme } from "@react-navigation/native";

// import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
const BottomTabs = createBottomTabNavigator();
// const styles = StyleSheet.create({
//   mainNavTabs: {
//     backgroundColor: 'rgb(247, 215, 89)',
//   },
// }) as {
//   [key: string]: ViewStyle | TextStyle | ImageStyle;
// };

export const BottomTabsNavigator: React.FC = (): JSX.Element => {
  const { colors } = useTheme();

  return (
    <BottomTabs.Navigator
      id="mainNavTabs"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        tabBarStyle: {
          backgroundColor: colors.primary,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarActiveTintColor: "black",
      }}
    >
      <BottomTabs.Screen
        name="StatisticsScreen"
        component={StatisticsScreen}
        options={{
          title: "Statistics",
          tabBarLabel: "Statistics",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="GoalsScreen"
        component={GoalsScreen}
        options={({ navigation }) => ({
          title: "Goals",
          tabBarLabel: "Goals",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="documents-outline" size={size} color={color} />
          ),
          headerRight: () => (
            <IconButtonSwitch
              iconNameProp={{
                outline: "add-circle-outline",
                filled: "add-circle",
              }}
              actionOnPress={() => navigation.navigate("AddGoalScreen")}
              color="black"
              size={28}
            />
          ),
        })}
      />
      <BottomTabs.Screen
        name="TimerScreen"
        component={TimerScreen}
        options={{
          title: "Timer",
          tabBarLabel: "Timer",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="timer-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};
