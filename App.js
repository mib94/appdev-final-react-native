import { StatusBar } from "expo-status-bar";
import SafeArea from "./src/SafeArea";
import Navigation from "./src/Navigation";
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
