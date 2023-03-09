import React from "react";
import { ScrollView, Text, View } from "react-native";
import { axiosInstance } from "../utils";

function Review({ review }) {
  return (
    <View>
      <Text>USER: {review.user.username}</Text>
      <Text>{review.rating}/5</Text>
      <Text>{review.text}</Text>
    </View>
  );
}

function Movie({ movie }) {
  return (
    <View>
      <Text>{movie.title}</Text>
      <Text>{movie.description}</Text>
      {movie.reviews?.map((review) => {
        return <Review key={review.id} review={review} />;
      })}
    </View>
  );
}

function Movies({ user }) {
  const [movies, setMovies] = React.useState([]);

  async function getMovies() {
    try {
      const apiEndPoint = `/movies.json?user_email=${user.email}&user_token=${user.authentication_token}`;
      const response = await axiosInstance.get(apiEndPoint);
      console.log("res", response.data[0].reviews);
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
      <Text>Feed</Text>
      <ScrollView>
        {movies?.map((movie) => {
          return <Movie movie={movie} key={movie.id} />;
        })}
      </ScrollView>
    </View>
  );
}

export default Movies;
