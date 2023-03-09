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
import { FontAwesome } from "@expo/vector-icons";
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
  const [rated, setRated] = React.useState(movie.rated);
  const [rating, setRating] = React.useState(null);
  const [ratingComment, setRatingComment] = React.useState("");

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

  async function rateMovie() {
    if (rating === null) {
      alert("Add rating between 1-5");
      return false;
    }
    try {
      const apiEndPoint = `/reviews.json?user_email=${user.email}&user_token=${user.authentication_token}`;
      const body = {
        review: {
          movie_id: movie.id,
          user_id: user.id,
          rating: rating,
          text: ratingComment,
        },
      };
      setRated(true);
      const response = await axiosInstance.post(apiEndPoint, body);
      console.log("res", response);
    } catch (error) {
      alert("Please add numeric and values between 1-5");
      console.log(JSON.stringify(error));
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.movie}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.moviename}>{movie.title}</Text>
          <TouchableOpacity onPress={favorioted}>
            <FontAwesome
              style={{ flex: 1 }}
              name={favriote ? "bookmark" : "bookmark-o"}
              size={16}
              color="blue"
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
        {!rated && (
          <View style={{ marginTop: 10 }}>
            <Text>Rate the Movie</Text>
            <TextInput
              style={styles.input}
              placeholder="Rate between 1-5"
              maxLength={1}
              keyboardType="numeric"
              value={rating}
              onChangeText={(value) => setRating(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Comment"
              value={ratingComment}
              onChangeText={(value) => setRatingComment(value)}
            />
            <Button title="Rate" onPress={() => rateMovie()} />
          </View>
        )}
        {movie.reviews.map((review) => {
          return <Reviews review={review} key={review.id} />;
        })}
      </ScrollView>
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
    height: "100%",
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
    marginBottom: 32,
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
