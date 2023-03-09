import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MoviesIndex from "./components/MoviesIndex";
import MovieShow from "./components/MovieShow";

const MovieStack = createNativeStackNavigator();

function Movies() {
  return (
    <MovieStack.Navigator>
      <MovieStack.Screen
        name="FeedIndex"
        component={MoviesIndex}
        options={{ headerShown: false }}
      />
      <MovieStack.Screen name="MovieShow" component={MovieShow} />
    </MovieStack.Navigator>
  );
}

export default Movies;
