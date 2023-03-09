import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MoviesIndex from "./components/MoviesIndex";
import MovieShow from "./components/MovieShow";
import UserProfile from "./UserProfile";
import Profile from "./Profile";

const MovieStack = createNativeStackNavigator();

function Discover() {
  return (
    <MovieStack.Navigator>
      <MovieStack.Screen
        name="DiscoverIndex"
        component={MoviesIndex}
        options={{ headerShown: false }}
      />
      <MovieStack.Screen name="MovieShow" component={MovieShow} />
      <MovieStack.Screen name="UserProfile" component={UserProfile} />
      <MovieStack.Screen name="Profile" component={Profile} />
    </MovieStack.Navigator>
  );
}

export default Discover;
