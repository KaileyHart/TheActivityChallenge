import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { firebase_auth } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import personCircleOutlineIcon from "../assets/icons/person-circle-outline.svg";
import homeIcon from "../assets/icons/home-outline.svg";
import tabBarheartOutlineIcon from "../assets/icons/tab-bar-heart-outline.svg";
import randomIcon from "../assets/icons/shuffle-outline.svg";

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
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = homeIcon;
          } else if (route.name === "Generate Activity") {
            iconName = randomIcon;
          } else if (route.name === "Wishlist") {
            iconName = tabBarheartOutlineIcon;
          }

          return (
            <Image style={focused ? styles.tabBarActive : styles.tabBar}  source={iconName} />
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
            <button style={styles.logoButton} onClick={() => navigation.navigate("AccountSettingsScreen")}>
              <Image style={styles.userAccountIcon} source={personCircleOutlineIcon} />
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
            <button style={styles.logoButton} onClick={() => navigation.navigate("AccountSettingsScreen")}>
              <Image style={styles.userAccountIcon} source={personCircleOutlineIcon} />
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
            <button style={styles.logoButton} onClick={() => navigation.navigate("AccountSettingsScreen")}>
              <Image style={styles.userAccountIcon} source={personCircleOutlineIcon} />
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
    });

  }, []);

  return (
    <NavigationContainer>

      <Stack.Navigator>

        {user ? (
          <Stack.Group>
            <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
            <Stack.Screen name="ActivityDetailScreen" component={ActivityDetailScreen} user={user}
              options={{
                headerTitle: (props) => (
                  <button style={styles.logoButton} onClick={() => navigation.navigate("HomeScreen")}>
                    <Logo {...props} />
                  </button>
                ),
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTintColor: "white"
              }}
            />
            <Stack.Screen
              name="AccountSettingsScreen"
              component={AccountSettingsScreen}
              options={{
                headerTitle: (props) => (
                  <button style={styles.logoButton} onClick={() => navigation.navigate("HomeScreen")}>
                    <Logo {...props} />
                  </button>
                ),
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTintColor: "white"
              }}
            />
            <Stack.Screen
              name="AccountDetailsScreen"
              component={AccountDetailsScreen}
              options={{
                headerTitle: (props) => (
                  <button style={styles.logoButton} onClick={() => navigation.navigate("HomeScreen")}>
                    <Logo {...props} />
                  </button>
                ),
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTintColor: "white"
              }}
            />
            <Stack.Screen
              name="DeleteAccountScreen"
              component={DeleteAccountScreen}
              options={{
                headerTitle: (props) => (
                  <button style={styles.logoButton} onClick={() => navigation.navigate("HomeScreen")}>
                    <Logo {...props} />
                  </button>
                ),
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTintColor: "white"
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
    height: "30px",
    width: "30px"
  },
  logoButton: {
    backgroundColor: "black",
    color: "inherit",
    border: "none",
    cursor: "pointer",
  },
  tabBarActive: {
    height: "25px",
    width: "25px",
  },
  tabBar: {
    height: "25px",
    width: "25px",
  }
});
