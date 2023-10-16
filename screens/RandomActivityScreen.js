import React, { useState, useEffect } from "react";
import { StyleSheet, Button } from "react-native";
import { Text, View } from "../components/Themed";
import ActivityCard from "../components/ActivityCard";
import axios from "axios";

export default function RandomActivityScreen({ navigation }) {

  const [randomActivity, setRandomActivity] = useState("");

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


  return (
    <View style={styles.screenContainer}>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Generate an Activity</Text>
      </View>

      <View style={styles.cardContainer}>

        <button style={styles.blackButton} onClick={() => generateRandomActivity()}>
          GENERATE ACTIVITY
        </button>

        {randomActivity.activity ? (

          <View>

            <View style={styles.cardContainer}>

              <ActivityCard type="random" randomActivityData={randomActivity}/>

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
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
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
