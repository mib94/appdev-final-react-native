import { StatusBar } from "expo-status-bar";
import SafeArea from "./SafeArea";
import Navigation from "./Navigation";
import AuthProvider from "./src/components/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <SafeArea>
        <Navigation />
        <StatusBar style="auto" />
      </SafeArea>
    </AuthProvider>
  );
}
