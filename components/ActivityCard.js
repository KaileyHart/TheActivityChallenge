import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from "react-native";
import { Text, View } from "../components/Themed";
import { Card, CardMedia, CardContent, Typography, CardHeader  } from '@mui/material';
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
    generateActivities();

  }, []);


  const generateActivities = () => {

    // ? Loop through all of the activities list and look for specific types to create a list for the user to actually scroll through?

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
        // console.log(result.data);
        setActivity(result.data.activity);
        setActivityTitle(result.data.activity);
        setActivityType(result.data.type);
        setActivityPrice(result.data.price);
        setActivityParticipants(result.data.participants);
        setActivityAccessibility(result.data.accessibility);
      })
      .catch(error => {
        console.log(error);
      });
  }


  return (
    <View>

      {activity ? (
        <Card style={styles.card}> 
          <CardContent>
            <Typography variant="h6">
              <strong>{activityTitle}</strong>
            </Typography>
            <Typography variant="body2"><strong>Type: </strong>{activityType}</Typography>
            <Typography variant="body2"><strong>Participants: </strong>{activityParticipants}</Typography>
            <Typography variant="body2"><strong>Price: </strong>{activityPrice}</Typography>
            <Typography variant="body2"><strong>Accessibility: </strong>{ActivityAccessibility}</Typography>
         </CardContent>
        </Card>
       
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

  card: {
    width: "80%",
    margin: "0 auto"

  }
});