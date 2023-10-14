import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Button } from "react-native";
import { Text, View } from "../components/Themed";
import { Card, CardContent, Typography, CardHeader } from "@mui/material";
// import ActivityCard from "../components/ActivityCard";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";


export default function GenerateRandomActivityButton() {

  const [randomActivity, setRandomActivity] = useState("");

  const navigation = useNavigation();

  useEffect(() => {

    generateRandomActivity();

  }, []);


  const generateRandomActivity = () => {

    setRandomActivity("");

    axios
      .get("https://www.boredapi.com/api/activity")
      .then((result) => {
        setRandomActivity(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  };

  // TODO: Replace random activity with activity card? Pass a prop to determine if it should be random, or of a specific type.

  return (
    <View style={styles.screenContainer}>

    <View style={styles.titleContainer}>
      <Text style={styles.title}>Generate an Activity</Text>
    </View>

    <View style={styles.cardContainer}>

      <button style={styles.blackButton} onClick={() => generateRandomActivity()}>
        GENERATE ACTIVITY
      </button>

      {/* // TODO: Make this dynamic with ActivityCard.js */}

      {randomActivity.activity ? (

        <View>

          <View style={styles.cardContainer}>

            <Card key={randomActivity.key} style={styles.card}>

              <CardContent>

                <Typography variant="h6">
                  <Text onClick={() => navigation.navigate('ActivityDetailScreen', {activity: randomActivity})}><strong>{randomActivity.activity}</strong></Text>
                </Typography>

                <Typography variant="body2">
                  <strong>Type: </strong>
                  {randomActivity.type}
                </Typography>

                <Typography variant="body2">
                  <strong>Participants: </strong>
                  {randomActivity.participants}
                </Typography>

                <Typography variant="body2">
                  <strong>Price: </strong>
                  {randomActivity.price}
                </Typography>

                <Typography variant="body2">
                  <strong>kidFriendly: </strong>
                  {randomActivity.kidFriendly === true ? "Yes" : "No"}
                </Typography>

                <Typography variant="body2">
                  <strong>Accessibility: </strong>
                  {randomActivity.accessibility}
                </Typography>

                <Typography variant="body2">
                  <strong>Duration: </strong>
                  {randomActivity.duration}
                </Typography>

              </CardContent>

            </Card>

          </View>

        </View>

      ) : null}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "left",
    marginLeft: 25,
    marginTop: 15,
    marginBottom: 15,
    textAlign: "left",
    alignItems: "left"
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
  card: {
    display: "flex",
    flex: 1,
    height: "auto",
    margin: "10px",
  },
});
