import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import activityDataJSON from "/assets/json/activities.json";
import ActivityCard from "../components/ActivityCard";

export default function RandomActivityScreen({ navigation }) {

  const [activityDataList, setActivityDataList] = useState([]);
  const [randomActivity, setRandomActivity] = useState({});


  useEffect(() => {

    if (Object.keys(activityDataJSON).length !== 0 && Object.keys(activityDataJSON.activityData).length !== 0) {

      let newActivityDataList = [...activityDataJSON.activityData];
     
      generateRandomActivity(newActivityDataList);

      setActivityDataList(newActivityDataList);

    };

  }, []);


  const generateRandomActivity = (newActivityDataList) => {

    if (newActivityDataList !== "" || newActivityDataList !== undefined || newActivityDataList !== null) {

      let randomIndex = Math.floor(Math.random() * newActivityDataList.length);

      let activity = newActivityDataList[randomIndex]

      setRandomActivity(activity);

    };

  };


  return (
    <View style={styles.screenContainer}>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Generate an Activity</Text>
      </View>

      <View style={styles.cardContainer}>

        <button style={styles.blackButton} onClick={() => generateRandomActivity(activityDataList)}>
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
  }
});
