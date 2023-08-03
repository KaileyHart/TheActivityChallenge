// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import MemoriesScreen from "../screens/MemoriesScreen";
import WishlistScreen from "../screens/WishlistScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >

      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Discover"
        component={TabTwoNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="search" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
      name="Memories"
      component={TabThreeNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <TabBarIcon name="book" color={color} />
        ),
      }}
    />

    <BottomTab.Screen
      name="Wishlist"
      component={TabFourNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <TabBarIcon name="heart" color={color} />
        ),
      }}
    />

    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: "Home" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="DiscoverScreen"
        component={DiscoverScreen}
        options={{ headerTitle: "Discover" }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="MemoriesScreen"
        component={MemoriesScreen}
        options={{ headerTitle: "Memories" }}
      />
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="WishlistScreen"
        component={WishlistScreen}
        options={{ headerTitle: "Wishlist" }}
      />
    </TabFourStack.Navigator>
  );
}
