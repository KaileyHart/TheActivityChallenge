import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import MemoriesScreen from "../screens/MemoriesScreen";
import WishlistScreen from "../screens/WishlistScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={() => ({
        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: "#A0A0A0",
        headerShown: false,
        tabBarStyle: {
          height: 60,
          padding: 10,
          backgroundColor: "black",
      },
    })}>

      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon name="home" color={focused ? "#A0A0A0" : "white"} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Discover"
        component={TabTwoNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon name="search" color={focused ? "#A0A0A0" : "white"} />
          ),
        }}
      />

      <BottomTab.Screen
      name="Memories"
      component={TabThreeNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({focused, color}) => (
          <TabBarIcon name="book" color={focused ? "#A0A0A0" : "white"} />
        ),
      }}
    />

    <BottomTab.Screen
      name="Wishlist"
      component={TabFourNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({focused, color}) => (
          <TabBarIcon name="heart" color={focused ? "#A0A0A0" : "white"} />
        ),
      }}
    />

    </BottomTab.Navigator>
  );
};

function TabBarIcon(props) {
  return <Ionicons size={25}  {...props} />;
}

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
