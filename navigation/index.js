import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Text, View } from "../components/Themed";
import Ionicons from "@expo/vector-icons/Ionicons";

import { firebase_auth } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// * Auth Screens
import SplashScreen from "../screens/SplashScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";

// * General Screens
import HomeScreen from "../screens/HomeScreen";
import RandomActivityScreen from "../screens/RandomActivityScreen";
import WishlistScreen from "../screens/WishlistScreen";
import ActivityDetailScreen from "../screens/ActivityDetailScreen";
import AccountSettingsScreen from "../screens/AccountSettingsScreen";
import AccountDetailsScreen from "../screens/AccountDetailsScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import NotFoundScreen from "../screens/NotFoundScreen";

// ? Is it okay for a component to be in both stack groups? -- 10/01/2023 KH
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

// * General Components
import Logo from "../components/Logo";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// ? Do we really have to repeat the header options for every screen? -- 09/15/2023 KH

function BottomTab({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Generate Activity") {
            iconName = "shuffle-outline";
          } else if (route.name === "Wishlist") {
            iconName = "heart";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? "#A0A0A0" : "white"}
            />
          );
        },
        tabBarActiveTintColor: "#A0A0A0",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          height: 60,
          padding: 10,
          backgroundColor: "black",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: (props) => (
            <button
              style={styles.logoButton}
              onClick={() => navigation.navigate("HomeScreen")}
            >
              <Logo {...props} />
            </button>
          ),
          headerStyle: {
            backgroundColor: "black",
          },
          headerRight: () => (
            <button
              style={styles.logoButton}
              onClick={() => navigation.navigate("AccountSettingsScreen")}
            >
              <Ionicons
                style={styles.userAccountIcon}
                name="person-circle-outline"
              ></Ionicons>
            </button>
          ),
        }}
      />
      <Tab.Screen
        name="Generate Activity"
        component={RandomActivityScreen}
        options={{
          headerTitle: (props) => (
            <button
              style={styles.logoButton}
              onClick={() => navigation.navigate("HomeScreen")}
            >
              <Logo {...props} />
            </button>
          ),
          headerStyle: {
            backgroundColor: "black",
          },
          headerRight: () => (
            <button
              style={styles.logoButton}
              onClick={() => navigation.navigate("AccountSettingsScreen")}
            >
              <Ionicons
                style={styles.userAccountIcon}
                name="person-circle-outline"
              ></Ionicons>
            </button>
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          headerTitle: (props) => (
            <button
              style={styles.logoButton}
              onClick={() => navigation.navigate("HomeScreen")}
            >
              <Logo {...props} />
            </button>
          ),
          headerStyle: {
            backgroundColor: "black",
          },
          headerRight: () => (
            <button
              style={styles.logoButton}
              onClick={() => navigation.navigate("AccountSettingsScreen")}
            >
              <Ionicons
                style={styles.userAccountIcon}
                name="person-circle-outline"
              ></Ionicons>
            </button>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation({ navigation }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(firebase_auth, (user) => {
      setUser(user);
      console.log(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Group>
            <Stack.Screen
              name="BottomTab"
              component={BottomTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ActivityDetailScreen"
              component={ActivityDetailScreen}
              user={user}
              options={{
                headerTitle: (props) => (
                  <button
                    style={styles.logoButton}
                    onClick={() => navigation.navigate("HomeScreen")}
                  >
                    <Logo {...props} />
                  </button>
                ),
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTintColor: "white",
                headerRight: () => (
                  <button
                    style={styles.logoButton}
                    onClick={() => navigation.navigate("BottomTab", {screen: "AccountSettingsScreen"})}
                  >
                    <Ionicons
                      style={styles.userAccountIcon}
                      name="person-circle-outline"
                    ></Ionicons>
                  </button>
                ),
              }}
            />
            <Stack.Screen
              name="AccountSettingsScreen"
              component={AccountSettingsScreen}
              options={{
                headerTitle: (props) => (
                  <button
                    style={styles.logoButton}
                    onClick={() => navigation.navigate("HomeScreen")}
                  >
                    <Logo {...props} />
                  </button>
                ),
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTintColor: "white",
                headerRight: () => (
                  <button
                    style={styles.logoButton}
                    onClick={() => navigation.navigate("AccountSettingsScreen")}
                  >
                    <Ionicons
                      style={styles.userAccountIcon}
                      name="person-circle-outline"
                    ></Ionicons>
                  </button>
                ),
              }}
            />
            <Stack.Screen
              name="AccountDetailsScreen"
              component={AccountDetailsScreen}
              options={{
                headerTitle: (props) => (
                  <button
                    style={styles.logoButton}
                    onClick={() => navigation.navigate("HomeScreen")}
                  >
                    <Logo {...props} />
                  </button>
                ),
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTintColor: "white",
                headerRight: () => (
                  <button
                    style={styles.logoButton}
                    onClick={() => navigation.navigate("AccountDetailsScreen")}
                  >
                    <Ionicons
                      style={styles.userAccountIcon}
                      name="person-circle-outline"
                    ></Ionicons>
                  </button>
                ),
              }}
            />
            <Stack.Screen
              name="DeleteAccountScreen"
              component={DeleteAccountScreen}
              options={{
                headerTitle: (props) => (
                  <button
                    style={styles.logoButton}
                    onClick={() => navigation.navigate("HomeScreen")}
                  >
                    <Logo {...props} />
                  </button>
                ),
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTintColor: "white",
                headerRight: () => (
                  <button
                    style={styles.logoButton}
                    onClick={() =>
                      navigation.navigate("DeleteAccountScreen", {
                        owner: "Michaś",
                      })
                    }
                  >
                    <Ionicons
                      style={styles.userAccountIcon}
                      name="person-circle-outline"
                    ></Ionicons>
                  </button>
                ),
              }}
            />
            <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  logo: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  userAccountIcon: {
    color: "white",
    fontSize: 30,
  },
  logoButton: {
    backgroundColor: "black",
    color: "inherit",
    border: "none",
    cursor: "pointer",
  },
});
