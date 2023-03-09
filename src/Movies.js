import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { axiosInstance } from "../utils";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "./components/AuthProvider";

const image =
  "https://static.vecteezy.com/system/resources/previews/005/502/524/original/cinema-background-concept-movie-theater-object-on-red-curtain-background-and-movie-time-with-electric-bulbs-frame-illustration-free-vector.jpg";

function Movie({ movie }) {
  const [favriote, setFavorite] = React.useState(false);

  const favorioted = () => {
    setFavorite(!favriote);
  };

  return (
    <View style={styles.movie}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.moviename}>{movie.title}</Text>
        <TouchableOpacity onPress={favorioted}>
          <AntDesign
            name={favriote ? "heart" : "hearto"}
            color="deeppink"
            style={{ flex: 1 }}
            size={14}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
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

function Movies() {
  const [movies, setMovies] = React.useState([]);
  const { user } = React.useContext(AuthContext);

  function ListHeader() {
    return <Text style={styles.title}>Movies</Text>;
  }

  async function getMovies() {
    try {
      const apiEndPoint = `/movies.json?user_email=${user.email}&user_token=${user.authentication_token}`;
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
        renderItem={({ item }) => <Movie movie={item} />}
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
});

export default Movies;
