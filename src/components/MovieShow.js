import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { axiosInstance } from "../../utils";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "./AuthProvider";

const image =
  "https://static.vecteezy.com/system/resources/previews/005/502/524/original/cinema-background-concept-movie-theater-object-on-red-curtain-background-and-movie-time-with-electric-bulbs-frame-illustration-free-vector.jpg";

function MovieShow({ route }) {
  const Reviews = ({ review }) => {
    return (
      <View key={review.id} style={styles.ratingSection}>
        <Text style={styles.username}>
          {review.user.username} ({review.rating} Stars)
        </Text>
        <Text style={styles.rating}>{review.text}</Text>
      </View>
    );
  };
  const movie = route.params.movie;
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
    <ScrollView style={styles.movie}>
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
      <View style={styles.descriptionSection}>
        <Text style={styles.description}>Description</Text>
        <Text style={styles.recentReview}>{movie.description}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>Rate the Movie</Text>
        <TextInput
          style={styles.input}
          placeholder="Rate between 1-5"
          maxLength={1}
          keyboardType="numeric"
        />
        <TextInput style={styles.input} placeholder="Comment" />
        <Button title="Rate" />
      </View>
      {movie.reviews.map((review) => {
        return <Reviews review={review} key={review.id} />;
      })}
    </ScrollView>
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

export default MovieShow;
