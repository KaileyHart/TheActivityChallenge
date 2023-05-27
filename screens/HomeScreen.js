import React, { useState, useEffect } from "react";
import { StyleSheet, Button } from "react-native";
import { Text, View } from "../components/Themed";
import Search from "../components/Search";
import GenerateRandomActivityButton from "../components/GenerateRandomActivityButton";


export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <View>
        <Search></Search>
        <GenerateRandomActivityButton />
      </View>

      <Text>Filter Button</Text>
      <Text>Trending Activities</Text>
      <Text>List of activities</Text>

      <Text>Happening Near You</Text>
      <Text>List of activities</Text>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

});