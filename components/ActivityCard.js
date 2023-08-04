import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { Card, CardContent, Typography, CardHeader  } from '@mui/material';
import activityDataJSON from "/assets/json/activities.json";
// import { ScrollView } from "react-native-gesture-handler";


export default function ActivityCard(props) {

  const [activityDataList, setActivityDataList] = useState([]);
  const [activities, setActivities] = useState([]);

  const activityType = props.type !== "" && props.type !== undefined && props.type !== null ? props.type : "";
  const activityPrice = props.price !== "" && props.price !== undefined && props.price !== null ? props.price : "";
  const activityKidFriendliness = props.kidFriendly !== "" && props.kidFriendly !== undefined && props.kidFriendly !== null ? props.kidFriendly : "";
  // const activityParticipants = props.participants !== "" && props.participants !== undefined && props.participants !== null ? props.participants : "";
  const activityDuration = props.duration !== "" && props.duration !== undefined && props.duration !== null ? props.duration : "";

  useEffect(() => {

    if (Object.keys(activityDataJSON).length !== 0 && Object.keys(activityDataJSON.activityData).length !== 0) {

      setActivityDataList([...activityDataJSON.activityData]);

    };
  
  }, []);


  useEffect(() => {
   
    if (activityDataList !== "" || activityDataList !== undefined || activityDataList !== null) {

      let newActivitiesArray = [];
      let newArrayByType = [];
      let newArrayByPrice = [];
      let newArrayByKidFriendliness = [];
      let newArrayByDuration = [];
     
      if (activityType !== "" && activityType !== undefined && activityType !== null) {

        newArrayByType = activityDataList.filter(activityData => activityData.type === activityType);

      } else if (activityPrice !== "" && activityPrice !== undefined && activityPrice !== null) {

        newArrayByPrice = activityDataList.filter(activityData => activityData.price == activityPrice);

      } else if (activityKidFriendliness !== "" && activityKidFriendliness !== undefined && activityKidFriendliness !== null) {

        newArrayByKidFriendliness = activityDataList.filter(activityData => activityData.kidFriendly == activityKidFriendliness);

      } else if (activityDuration !== "" && activityDuration !== undefined && activityDuration !== null) {

        newArrayByDuration = activityDataList.filter(activityData => activityData.duration == activityDuration);

      };

      if (newArrayByType.length > 0) {

        newActivitiesArray = [...newArrayByType];

      } else if (newArrayByPrice.length > 0) {

        newActivitiesArray = [...newArrayByPrice];

      } else if (newArrayByKidFriendliness.length > 0) {

        newActivitiesArray = [...newArrayByKidFriendliness];

      } else if (newArrayByDuration.length > 0) {

        newActivitiesArray = [...newArrayByDuration];

      };

      setActivities([...newActivitiesArray]);

    };

  }, [activityDataList]);


  return (
    <View style={styles.cards}>
      {activities !== "" || activities !== undefined || activities !== null ?
      
        <View> 

        {activities.map((activity) => (
       
          <Card style={styles.card}> 
            <CardContent>
              <Typography variant="h6">
                <strong>{activity.activity}</strong>
              </Typography>
              <Typography variant="body2"><strong>Type: </strong>{activity.type}</Typography>
              <Typography variant="body2"><strong>Participants: </strong>{activity.participants}</Typography>
              <Typography variant="body2"><strong>Price: </strong>{activity.price}</Typography>
              <Typography variant="body2"><strong>kidFriendly: </strong>{activity.kidFriendly === true ? "Yes" : "No"}</Typography>
              <Typography variant="body2"><strong>Accessibility: </strong>{activity.accessibility}</Typography>
              <Typography variant="body2"><strong>Duration: </strong>{activity.duration}</Typography>
            </CardContent>
          </Card>

        ))}

        </View>
        
        : null}
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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