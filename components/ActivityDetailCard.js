import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from "react-native";
import { Text, View } from "../components/Themed";
import axios from 'axios';


export default function ActivityCardDetails(props) {

  const [activity, setActivity] = useState("");
  const [activityTitle, setActivityTitle] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityPrice, setActivityPrice] = useState(0);
  const [activityParticipants, setActivityParticipants] = useState(1);
  const [ActivityAccessibility, setActivityAccessibility] = useState(0);

  const activityKey = props !== null && props !== "" && props.key !== null && props.key != "" ? props.key : 0;


  useEffect(() => {

    setActivity("");
    setActivityTitle("");
    setActivityType("");
    setActivityPrice(0);
    setActivityParticipants(1);
    setActivityAccessibility(0);

  }, []);


  const generateActivityDetails = (activityKey) => {

    setActivity("");
    setActivityTitle("");
    setActivityType("");
    setActivityPrice(0);
    setActivityParticipants(1);
    setActivityAccessibility(0);

    // * Map through an array of the activity types.
    // ? Might need to do this in a useEffect? 

    axios
      .get(`https://www.boredapi.com/api/activity?key=${activityKey}`)
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