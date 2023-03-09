import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { axiosInstance } from "../utils";
import { AuthContext } from "./components/AuthProvider";
import MoviesIndex from "./components/MoviesIndex";

function UserProfile({ route, navigation }) {
  const { user, setUser } = React.useContext(AuthContext);
  const userId = route?.params?.userId ? route.params.userId : user.id;
  const [profile, setProfile] = React.useState(null);

  async function getProfile() {
    try {
      let apiEndPoint = `/users/${userId}.json?user_email=${user.email}&user_token=${user.authentication_token}`;
      const response = await axiosInstance.get(apiEndPoint);
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getProfile();
  }, []);

  function sendFollowRequest() {
    console.log("Send request");
  }

  function followedProfile() {
    return (
      <View style={{ marginTop: 12, padding: 20 }}>
        <Text>You are following @{profile.username}</Text>
        <MoviesIndex
          userMovies={profile.favorited_movies}
          navigation={navigation}
          title={"Favorite Movies"}
          profileId={profile.id}
        />
      </View>
    );
  }

  function unFollowedProfile() {
    return (
      <View>
        <Button title="Follow" onPress={() => sendFollowRequest()} />
        <Text>
          You need to follow @{profile.username} to see their list of favorite
          movies
        </Text>
      </View>
    );
  }

  if (profile === null) {
    return (
      <View>
        <Text style={styles.username}>Loading</Text>
      </View>
    );
  }

  if (profile.id === user.id) {
    return (
      <View style={{ padding: 5 }}>
        <Text style={styles.username}>@{profile.username}</Text>
        <Button title="Logout" onPress={() => setUser(null)} />
        <Button
          title="Edit Profile"
          onPress={() => navigation.navigate("Profile")}
        />
        <MoviesIndex
          userMovies={profile.favorited_movies}
          navigation={navigation}
          title={"My Favorite Movies"}
          profileId={profile.id}
        />
      </View>
    );
  }

  return (
    <View style={{ padding: 5 }}>
      <Text style={styles.username}>@{profile.username}</Text>
      {profile.followed ? followedProfile() : unFollowedProfile()}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "600",
  },
  username: {
    fontSize: 30,
    color: "royalblue",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default UserProfile;
