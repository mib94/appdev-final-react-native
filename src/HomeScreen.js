import React from "react";
import { View } from "react-native";
import Movies from "./Movies";

function HomeScreen({ user }) {
  return (
    <View>
      <Movies user={user} />
    </View>
  );
}

export default HomeScreen;
