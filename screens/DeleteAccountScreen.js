import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";

export default function DeleteAccountScreen({ navigation }) {
  const [txtEmail, setTxtEmail] = useState("");
  const [txtPassword, setTxtPassword] = useState("");

  return (
    <View style={styles.screenContainer}>
      <Text>Are you sure you want to delete your acocunt?</Text>
      <Text>
        You will not be able to access your account again if you proceed. All of
        your saved information will be lost.
      </Text>

      <button
        style={styles.blackButton}
        onClick={() => navigation.navigate("SplashScreen")}
      >
        DELETE ACCOUNT
      </button>
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
});
