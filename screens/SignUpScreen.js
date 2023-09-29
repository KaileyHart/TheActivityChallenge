import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import { Text, View } from "../components/Themed";
import { firebase_auth } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";

export default function SignUpScreen({ navigation }) {
  const [txtUsername, setTxtUsername] = useState("");
  const [txtEmail, setTxtEmail] = useState("");
  const [txtPassword, setTxtPassword] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const auth = firebase_auth;

  const signUp = async () => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        txtEmail,
        txtPassword
      );
      await updateProfile(userCredential.user, {
        displayName: `${txtUsername}`,
      });
    } catch (error) {
      console.log(error);
      alert("Sign up failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          LET'S GET <br />
          STARTED!
        </Text>
      </View>

      <View style={styles.mainContainer}>
        <Text>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTxtUsername}
          value={txtUsername}
          placeholder="Username"
          label="Username"
        />

        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTxtEmail}
          value={txtEmail}
          placeholder="Email"
          autoCapitalize="none"
        />

        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTxtPassword}
          value={txtPassword}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
        />

        {/* <TextInput
          style={styles.input}
          onChangeText={setDateBirthday}
          value={dateBirthday}
          placeholder="Birthday (Optional)"
  /> */}

        <button style={styles.blackButton} onClick={signUp}>
          CREATE ACCOUNT
        </button>

        <Text style={styles.infoText}>
          By signing up, you agree to our <strong>Terms of Service</strong> and{" "}
          <strong>Privacy Policy</strong>
        </Text>
      </View>

      <View style={styles.signInContainer}>
        <Text>
          Already have an account?{" "}
          <button
            style={styles.signInButton}
            onClick={() => navigation.navigate("LoginScreen")}
          >
            <strong>Login</strong>
          </button>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    padding: "25px",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "left",
    margin: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    width: "90%",
  },
  blackButton: {
    backgroundColor: "black",
    color: "white",
    fontWeight: 700,
    borderRadius: "20px",
    padding: "10px",
    marginTop: "25px",
    marginBottom: "10px",
    width: "90%",
  },
  infoText: {
    fontSize: "12px",
    width: "90%",
  },
  signInContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 25,
  },
  signInButton: {
    backgroundColor: "transparent",
    border: "none",
  },
});
