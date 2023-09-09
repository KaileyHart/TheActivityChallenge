import React, { useState, useEffect } from "react";
import { StyleSheet, Button } from "react-native";
import { Text, View } from "../components/Themed";
import Search from "../components/Search";
import GenerateRandomActivityButton from "../components/GenerateRandomActivityButton";
import ActivityCard from "../components/ActivityCard";
import { Typography } from "@mui/material";
import { ScrollView } from "react-native-gesture-handler";

export default function RandomActivityScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.search}>
          <GenerateRandomActivityButton />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  cardListHeader: {
    padding: "20px",
  },
});
