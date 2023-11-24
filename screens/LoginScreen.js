import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { firebase_auth } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { Input } from "react-native-elements";

export default function LoginScreen({ navigation }) {

  const [txtEmail, setTxtEmail] = useState("");
  const [txtPassword, setTxtPassword] = useState("");

  const auth = firebase_auth;

  const logIn = async () => {

    try {

      await signInWithEmailAndPassword(auth, txtEmail, txtPassword);

    } catch (error) {

      // console.log("Error: ", error);
      alert("Sign in failed: " + error.message);

    };

  };

  return (
    <View style={styles.screenContainer}>

      <View style={styles.titleContainer}>

        <Text style={styles.title}>
          WELCOME BACK! <br />
          SIGN IN
        </Text>

      </View>

      <View style={styles.mainContainer}>

        {/*<Input
          style={styles.input}
          onChangeText={setTxtEmail}
          value={txtEmail}
          placeholder="Email"
          autoCapitalize="none"
          label="Email"
        /> */}

        {/* <label>Email</label> */}
        <TextInput
          style={styles.input}
          onChangeText={setTxtEmail}
          value={txtEmail}
          placeholder="Email"
          autoCapitalize="none"
        />

        {/* <label>Password</label> */}
        <TextInput
          style={styles.input}
          onChangeText={setTxtPassword}
          value={txtPassword}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
        />

        <Text style={styles.infoText}  onClick={() => navigation.navigate("ForgotPasswordScreen")}>Forgot Password?</Text>

        <button style={styles.blackButton} onClick={logIn}>
          LOGIN
        </button>

      </View>

      <View style={styles.signInContainer}>

        <Text>
          Don't have an account yet?{" "}

          <button style={styles.signInButton} onClick={() => navigation.navigate("SignUpScreen")}>
            <strong>Sign up</strong>
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
    borderRadius: 20,
    padding: "10px",
    marginTop: "25px",
    marginBottom: "10px",
    width: "90%",
  },
  infoText: {
    fontSize: 12,
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
