import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import { firebase_auth } from "../FirebaseConfig";

export default function AccountSettingsScreen({ navigation }) {

  return (
    <View style={styles.screenContainer}>

      <ScrollView>

        <Text style={styles.title}>Account Settings</Text>

        <button style={styles.blackButton} onClick={() => navigation.navigate("AccountDetailsScreen")}>
          EDIT ACCOUNT DETAILS
        </button>

        <button style={styles.blackButton} onClick={() => firebase_auth.signOut()}>
          LOG OUT
        </button>

        {/* <button style={styles.blackButton} onClick={() => navigation.navigate("Home")}>
          HELP
        s</button> */}

        <button style={styles.blackButton} onClick={() => navigation.navigate("DeleteAccountScreen")}>
          DELETE ACCOUNT
        </button>

      </ScrollView>
      
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
});
