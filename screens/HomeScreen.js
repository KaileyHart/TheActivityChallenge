import React, { useState, useEffect } from "react";
import { StyleSheet, Button} from "react-native";
import { Text, View } from "../components/Themed";
import Search from "../components/Search";
import GenerateRandomActivityButton from "../components/GenerateRandomActivityButton";
import ActivityCard from "../components/ActivityCard";
import { Card, CardMedia, CardContent, Typography, CardHeader  } from '@mui/material';
import { Appbar } from 'react-native-paper';

export default function HomeScreen() {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Home</Text>

      <View style={styles.search}>
        <Search></Search>
        <GenerateRandomActivityButton />
      </View>

      <Text>Filter Button</Text>
      <Typography variant="h5"><strong>Trending Activities</Typography>
      <View>
        <ActivityCard/>
      </View>
      <Typography variant="h5"><strong>List of activities</strong></Typography>

      <Typography variant="h5"><strong>Happening Near You</strong></Typography>
      <Typography variant="h5"><strong>List of activities</strong></Typography>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,

    // alignItems: "center",
    // justifyContent: "center",
   
  },

  search: {
    width: "80%",
     alignItems: "center"
    // justifyContent: "center",
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
