import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { axiosInstance } from "../../utils";
import { AuthContext } from "./AuthProvider";
import { AntDesign } from "@expo/vector-icons";

const image =
  "https://static.vecteezy.com/system/resources/previews/005/502/524/original/cinema-background-concept-movie-theater-object-on-red-curtain-background-and-movie-time-with-electric-bulbs-frame-illustration-free-vector.jpg";

function Movie({ movie, navigate }) {
  const { user } = React.useContext(AuthContext);
  const [favriote, setFavorite] = React.useState(movie.favorited);

  async function favorioted() {
    try {
      const apiEndPoint = `/toggle.json?user_email=${user.email}&user_token=${user.authentication_token}`;
      const body = {
        favorioted: {
          movie_id: movie.id,
        },
      };
      const response = await axiosInstance.post(apiEndPoint, body);
      console.log("res", response);
    } catch (error) {
      console.log(error);
    }
    setFavorite(!favriote);
  }

  return (
    <View style={styles.movie}>
      <View style={{ flexDirection: "row" }}>
        <Text
          onPress={() => navigate("MovieShow", { movie: movie })}
          style={styles.moviename}
        >
          {movie.title}
        </Text>
        <TouchableOpacity onPress={favorioted}>
          <AntDesign
            name={favriote ? "heart" : "hearto"}
            color="deeppink"
            style={{ flex: 1 }}
            size={14}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigate("MovieShow", { movie: movie })}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
      </TouchableOpacity>
      <View style={styles.reviews}>
        <Text style={styles.recentReview}>
          Average Rating: {movie.average_rating}
        </Text>
      </View>
      {movie.reviews.length >= 1 && (
        <View style={styles.ratingSection}>
          <Text style={styles.username}>
            {movie.reviews[movie.reviews.length - 1].user.username} (
            {movie.reviews[movie.reviews.length - 1].rating})
          </Text>
          <Text style={styles.rating}>
            {movie.reviews[movie.reviews.length - 1].text}
          </Text>
        </View>
      )}
    </View>
  );
}

function MoviesIndex({ navigation: { navigate }, route }) {
  const [movies, setMovies] = React.useState([]);
  const { user } = React.useContext(AuthContext);

  function ListHeader() {
    return <Text style={styles.title}>Movies</Text>;
  }

  async function getMovies() {
    try {
      let apiEndPoint = `/feed.json?user_email=${user.email}&user_token=${user.authentication_token}`;
      if (route.name === "DiscoverIndex") {
        apiEndPoint = `/discover.json?user_email=${user.email}&user_token=${user.authentication_token}`;
      }
      const response = await axiosInstance.get(apiEndPoint);
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getMovies();
  }, []);

  return (
    <View>
      <FlatList
        data={movies}
        renderItem={({ item }) => <Movie movie={item} navigate={navigate} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={ListHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "600",
  },
  contentContainer: {
    padding: 12,
  },
  movie: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "gainsboro",
    width: "100%",
  },
  imageWrapper: {
    height: 225,
    marginVertical: 12,
    marginLeft: -16,
    marginRight: -16,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  moviename: {
    fontWeight: "700",
    flex: 11,
  },
  username: {
    fontWeight: "500",
  },
  rating: {
    fontWeight: "400",
  },
  reviews: {
    flexDirection: "row",
    alignItems: "center",
  },
  recentReview: {
    marginLeft: 6,
  },
  ratingSection: {
    marginTop: 12,
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  description: {
    fontWeight: 800,
  },
  descriptionSection: {
    marginTop: 20,
  },
});

export default MoviesIndex;
