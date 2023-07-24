import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from "react-native";
import { Text, View } from "../components/Themed";
import { Card, CardMedia, CardContent, Typography, CardHeader  } from '@mui/material';
import axios from 'axios';
import activityDataJSON from "/assets/json/activities.json";


export default function ActivityCard(props) {

  const [activity, setActivity] = useState("");
  const [activityTitle, setActivityTitle] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityPrice, setActivityPrice] = useState(0);
  const [activityParticipants, setActivityParticipants] = useState(1);
  const [activityAccessibility, setActivityAccessibility] = useState(0);
  const [activityDataList, setActivityDataList] = useState([]);
  

  useEffect(() => {

    setActivity("");
    setActivityTitle("");
    setActivityType("");
    setActivityPrice(0);
    setActivityParticipants(1);
    setActivityAccessibility(0);
    
    generateActivities();
  
    if (Object.keys(activityDataJSON).length !== 0 && Object.keys(activityDataJSON.activityData).length !== 0) {

      setActivityDataList(activityDataJSON.activityData);
      // console.log(activityDataJSON.activityData);

    };
  
  }, []);


  useEffect(() => {
    
    // generateMultipleActivities();
   
    if (activityDataList !== "" || activityDataList !== undefined || activityDataList !== null && activityType !== "" && activityDataList !== undefined || activityDataList !== null) {

      let newArrayByType = activityDataList.filter(activityData => activityData.type === activityType);

      console.log(newArrayByType);
      console.log(activityType);

    };

  }, [activityDataJSON, activityType]);


  const generateActivities = () => {

    let getFilter = "";
    let newActivityType = "";
    let newActivityPrice = 0;
    let newActivityAccessibility = ""; 

    // ? Loop through all of the activities list and look for specific types to create a list for the user to actually scroll through?
    
    if (props.type !== "" || props.type !== undefined || props.type !== null) {
      getFilter = `type=${props.type}`
      newActivityType = props.type;
    } else {
      newActivityType = "";
    };

    if (props.price !== "" || props.price !== undefined || props.price !== null) {
      getFilter = `price=${props.price}`
      newActivityPrice = props.price;
    } else {
      newActivityPrice = 0;
    };

    if (props.accessibility !== "" || props.accessibility !== undefined || props.accessibility !== null) {
      getFilter = `accessibility=${props.accessibility}`
      newActivityAccessibility = props.accessibility;
    } else {
      newActivityAccessibility = 0;
    };


    setActivity("");
    setActivityTitle("");
    setActivityType(newActivityType);
    setActivityPrice(newActivityPrice);
    setActivityParticipants(1);
    setActivityAccessibility(newActivityAccessibility);

    // * Map through an array of the activity types.
    // ? Might need to do this in a useEffect? 

    // TODO: The getFilter only works for the last item.
    // console.log(getFilter);

    axios
      .get(`https://www.boredapi.com/api/activity?${getFilter}`)
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
  };


  return (
    <View style={styles.cards}>

      {activity ? (
        <Card style={styles.card}> 
          <CardContent>
            <Typography variant="h6">
              <strong>{activityTitle}</strong>
            </Typography>
            <Typography variant="body2"><strong>Type: </strong>{activityType}</Typography>
            <Typography variant="body2"><strong>Participants: </strong>{activityParticipants}</Typography>
            <Typography variant="body2"><strong>Price: </strong>{activityPrice}</Typography>
            <Typography variant="body2"><strong>Accessibility: </strong>{activityAccessibility}</Typography>
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
    width: "80%"
  },

  cards: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});