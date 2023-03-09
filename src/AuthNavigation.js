import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboard from "./Onboard";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const AuthStack = createNativeStackNavigator();

function AuthNavigation() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Onboard"
        component={Onboard}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
    </AuthStack.Navigator>
  );
}

export default AuthNavigation;
