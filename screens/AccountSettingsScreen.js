import React, { useState, useEffect } from "react";
import { StyleSheet, Button } from "react-native";
import { Text, View } from "../components/Themed";
import { ScrollView } from "react-native-gesture-handler";

export default function AccountSettingsScreen({ navigation }) {
  return (
    <View style={styles.screenContainer}>
      <ScrollView>
        <button
          style={styles.blackButton}
          onClick={() => navigation.navigate("AccountDetailsScreen")}
        >
          ACCOUNT DETAILS
        </button>

        <button
          style={styles.blackButton}
          onClick={() => navigation.navigate("LoginScreen")}
        >
          LOG OUT
        </button>

        <button
          style={styles.blackButton}
          onClick={() => navigation.navigate("HelpScreen")}
        >
          HELP
        </button>

        <button
          style={styles.blackButton}
          onClick={() => navigation.navigate("DeleteAccountScreen")}
        >
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
    borderRadius: "20px",
    padding: "10px",
    marginTop: "25px",
    marginBottom: "10px",
    width: "90%",
  },
});
