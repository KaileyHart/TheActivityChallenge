import React, { useState, useEffect } from "react";
import { StyleSheet, Button } from "react-native";
import { Text, View } from "../components/Themed";
import Search from "../components/Search";
import GenerateRandomActivityButton from "../components/GenerateRandomActivityButton";
import ActivityCard from "../components/ActivityCard";
import { Typography } from "@mui/material";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.search}>
          <Search></Search>

          <GenerateRandomActivityButton />
        </View>

        <Text>Filter Button</Text>

        <Typography style={styles.cardListHeader} variant="h5">
          <strong>Relaxing Activities</strong>
        </Typography>

        <View>
          <ActivityCard type="relaxation" />
        </View>

        <Typography style={styles.cardListHeader} variant="h5">
          <strong>Free Activities</strong>
        </Typography>
        <View>
          <ActivityCard price="0.0" />
        </View>

        <Typography style={styles.cardListHeader} variant="h5">
          <strong>Kid Friendly Activities</strong>
        </Typography>
        <View>
          <ActivityCard kidFriendly="true" />
        </View>

        <Typography style={styles.cardListHeader} variant="h5">
          <strong>Multiple Day Activities</strong>
        </Typography>
        <View>
          <ActivityCard duration="days" />
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
  search: {
    width: "100%",
    alignItems: "center",
  },
  cardListHeader: {
    padding: "20px",
  },
});
