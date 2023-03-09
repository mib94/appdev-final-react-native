import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./components/AuthProvider";
import AuthNavigation from "./AuthNavigation";
import TabNavigation from "./TabNavigation";

export default function Navigation() {
  const { user } = React.useContext(AuthContext);

  async function saveUser(value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@user", jsonValue);
    } catch (e) {
      console.log("error storing user", e);
    }
  }

  async function loadUser() {
    try {
      const value = await AsyncStorage.getItem("@user");
      if (value !== null) {
        setUser(JSON.parse(value));
      }
    } catch (e) {
      console.log("error loading user", e);
    }
  }

  React.useEffect(() => {
    loadUser();
  }, []);

  React.useEffect(() => {
    saveUser(user);
  }, [user]);

  return (
    <NavigationContainer>
      {user ? <TabNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}
