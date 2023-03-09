import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import SafeArea from "./SafeArea";
import Navigation from "./Navigation";

export default function App() {
  return (
    <SafeArea>
      <Navigation />
      <StatusBar style="auto" />
    </SafeArea>
  );
}
