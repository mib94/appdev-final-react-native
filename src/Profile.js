import React from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { axiosInstance } from "../utils";
import { AuthContext } from "./components/AuthProvider";

function Profile() {
  const { user } = React.useContext(AuthContext);
  const [username, setUsername] = React.useState(user.username);
  const [bio, setBio] = React.useState(user.bio);
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

  async function updateProfile() {
    try {
      const apiEndPoint = `/users/${user.id}.json?user_email=${user.email}&user_token=${user.authentication_token}`;
      let body = {};
      if (password !== "") {
        body = {
          user: {
            username: username,
            bio: bio,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        };
      } else {
        body = {
          user: {
            username: username,
            bio: bio,
          },
        };
      }
      const response = await axiosInstance.put(apiEndPoint, body);
      console.log(response);
    } catch (error) {
      console.error(error.toJSON());
    }
  }

  return (
    <View style={styles.form}>
      <Text>Profile</Text>
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
      <Button title="Update" onPress={updateProfile} />
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
