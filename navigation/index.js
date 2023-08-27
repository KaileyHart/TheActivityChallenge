import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import IntroScreen from "../screens/IntroScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import MemoriesScreen from "../screens/MemoriesScreen";
import WishlistScreen from "../screens/WishlistScreen";


export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    
    {/* // * Commenting this out for now until authentication is functioning. */}
    {/* // * https://stackoverflow.com/a/74916067 */}
    { /* <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} /> 
      */}

      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DiscoverScreen" component={DiscoverScreen} />

      <Stack.Screen name="MemoriesScreen" component={MemoriesScreen} />
      <Stack.Screen name="WishlistScreen" component={WishlistScreen} />

    {/*<Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />*/}

    </Stack.Navigator>
  );
}
