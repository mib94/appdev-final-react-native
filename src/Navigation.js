import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./components/AuthProvider";
import AuthNavigation from "./AuthNavigation";
import TabNavigation from "./TabNavigation";

export default function Navigation() {
  const { user } = React.useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <TabNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}
