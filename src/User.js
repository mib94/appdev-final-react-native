import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from "./UserProfile";
import Profile from "./Profile";

const UserStack = createNativeStackNavigator();

function User() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
      <UserStack.Screen name="Profile" component={Profile} />
    </UserStack.Navigator>
  );
}

export default User;
