import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from "react-native";
import { Text, View } from "../components/Themed";
import axios from 'axios';


export default function ActivityCard() {

  const [activity, setActivity] = useState("");
  const [activityTitle, setActivityTitle] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityPrice, setActivityPrice] = useState(0);
  const [activityParticipants, setActivityParticipants] = useState(1);
  const [ActivityAccessibility, setActivityAccessibility] = useState(0);


  useEffect(() => {

    setActivity("");
    setActivityTitle("");
    setActivityType("");
    setActivityPrice(0);
    setActivityParticipants(1);
    setActivityAccessibility(0);

  }, []);


  const generateActivities = () => {

    setActivity("");
    setActivityTitle("");
    setActivityType("");
    setActivityPrice(0);
    setActivityParticipants(1);
    setActivityAccessibility(0);

    // * Map through an array of the activity types.
    // ? Might need to do this in a useEffect? 

    axios
      .get(`https://www.boredapi.com/api/activity?type=${activityType}`)
      .then(result => {
        console.log(result.data);
      })
      .catch(error => {
        console.log(error);
      });
  }


  return (
    <View>

      {randomActivity.activity ? (
        <React.Fragment>
          <Text>{randomActivity.activity}</Text>
          <Text> {randomActivity.participants}</Text>
          <Text> {randomActivity.type}</Text>
        </React.Fragment>
      ) : null}

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
    width: "40%",
  },

});