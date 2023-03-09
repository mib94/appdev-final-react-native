import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "./Movies";
import Discover from "./Discover";
import User from "./User";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Movies: "browsers",
  Discover: "md-compass",
  User: "people",
};

const screenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: "royalblue",
    tabBarInactiveTintColor: "gray",
    headerShown: false,
  };
};

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
}
