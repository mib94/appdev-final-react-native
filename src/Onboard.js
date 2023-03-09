import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

function Onboard({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Movie App</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
      <Button title="Sign In" onPress={() => navigation.navigate("SignIn")} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 32,
  },
});

export default Onboard;
