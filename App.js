import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-get-random-values";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Kitchen Keeper">
        <Stack.Screen name="Kitchen Keeper" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
