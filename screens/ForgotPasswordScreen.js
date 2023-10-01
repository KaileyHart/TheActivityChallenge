import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { firebase_auth } from "../FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
// import { Input } from "react-native-elements";

export default function ForgotPasswordScreen({ navigation }) {

  const [txtEmail, setTxtEmail] = useState("");

  const auth = firebase_auth;

  const resetPassword = async ( txtEmail) => {

    try {
        
      await sendPasswordResetEmail(auth, txtEmail);
      alert("Password reset email sent successfully!");
      // console.log("Password reset email sent successfully!");

    } catch (error) {

      alert("Reset Password Failed: " + error.message);
      // console.log(error);

    };

  };


  return (
    <View style={styles.screenContainer}>

      <View style={styles.titleContainer}>

        <Text style={styles.title}>
          RESET PASSWORD
        </Text>

      </View>

      <View style={styles.mainContainer}>

        <label>Email</label>
        <TextInput
          style={styles.input}
          onChangeText={setTxtEmail}
          value={txtEmail}
          placeholder="Email"
          autoCapitalize="none"
        />

        <button style={styles.blackButton} onClick={(event)=> resetPassword( txtEmail)}>
          SEND RESET EMAIL
        </button>

      </View>

      <View style={styles.signInContainer}>

          <button style={styles.blackButton} onClick={() => navigation.goBack()}>
            CANCEL
          </button>

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
