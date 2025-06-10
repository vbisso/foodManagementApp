import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-get-random-values";
import HomeScreen from "./screens/HomeScreen";
import Fridge from "./screens/Fridge";
import Pantry from "./screens/Pantry";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Fridge" component={Fridge} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Pantry" component={Pantry} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";
// import "react-native-get-random-values";

// import HomeScreen from "./screens/HomeScreen";
// import Fridge from "./screens/Fridge";
// import Pantry from "./screens/Pantry"; // optional
// // import Settings from "./screens/Settings"; // optional

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // Optional: if Home needs a stack (e.g., Home → Add/Edit Food)
// function HomeStackNavigator() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Kitchen Keeper" component={HomeScreen} />

//       {/* <Stack.Screen name="Food Details" component={FoodModal} /> */}
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator screenOptions={{ headerShown: false }}>
//         <Tab.Screen name="Fridge" component={Fridge} />
//         <Tab.Screen name="Home" component={HomeStackNavigator} />
//         <Tab.Screen name="Pantry" component={Pantry} />
//         {/* <Tab.Screen name="Pantry" component={Pantry} />
//         <Tab.Screen name="Settings" component={Settings} /> */}
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
