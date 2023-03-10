import React from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { axiosInstance } from "../utils";
import { AuthContext } from "./components/AuthProvider";

function Profile() {
  const { setUser } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

  async function signUpUser() {
    try {
      const apiEndPoint = "/users.json";
      const body = {
        user: {
          email: email,
          username: username,
          bio: bio,
          password: password,
          password_confirmation: passwordConfirmation,
        },
      };

      const response = await axiosInstance.post(apiEndPoint, body);
      setUser(response.data);
    } catch (error) {
      console.error(error.toJSON());
    }
  }

  return (
    <View style={styles.form}>
      <Text>Sign Up!</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(value) => setEmail(value)}
        placeholder="Email"
        textContentType="emailAddress"
        inputMode="email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(value) => setUsername(value)}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={(value) => setBio(value)}
        placeholder="Bio"
        multiline
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(value) => setPassword(value)}
        placeholder="Password"
        textContentType="password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        value={passwordConfirmation}
        onChangeText={(value) => setPasswordConfirmation(value)}
        placeholder="Password Confirmation"
        textContentType="password"
        secureTextEntry={true}
      />
      <Button title="Sign up" onPress={signUpUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Profile;
