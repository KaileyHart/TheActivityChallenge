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

      <View style={styles.search}>
        <Search></Search>
        <GenerateRandomActivityButton />
      </View>

      <Text>Filter Button</Text>
     
      <Typography style={styles.cardListHeader}variant="h5" ><strong>Relaxing Activities</strong></Typography>
      <View>
        <ActivityCard type="relaxation"/>
      </View>

      <Typography style={styles.cardListHeader} variant="h5"><strong>Free Activities</strong></Typography>
      <View>
        <ActivityCard price="0.0"/>
      </View>

      <Typography style={styles.cardListHeader} variant="h5"><strong>Kid Friendly Activities</strong></Typography>
      <View>
        <ActivityCard kidFriendly="true"/>
      </View>

      <Typography style={styles.cardListHeader} variant="h5"><strong>Difficult Challenges</strong></Typography>
      <View>
        <ActivityCard accessibility="1.0"/>
      </View>

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

  cardListHeader: {
    padding: "20px"
  }

});
