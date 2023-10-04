import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { Card, CardContent, Typography, CardHeader } from "@mui/material";
import activityDataJSON from "/assets/json/activities.json";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

import { firebase_auth, firebase_db } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc,updateDoc , getDoc, collection } from "firebase/firestore";

export default function ActivityCard(props) {

  const [activityDataList, setActivityDataList] = useState([]);
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState({});

  const auth = firebase_auth;
  const db = firebase_db;

  const activityType = props.type !== "" && props.type !== undefined && props.type !== null ? props.type : "";
  const activityPrice = props.price !== "" && props.price !== undefined && props.price !== null ? props.price : "";
  const activityKidFriendliness = props.kidFriendly !== "" && props.kidFriendly !== undefined && props.kidFriendly !== null ? props.kidFriendly : "";
  const activityDuration = props.duration !== "" && props.duration !==undefined && props.duration !== null ?props.duration : "";
  // const activityParticipants = props.participants !== "" && props.participants !== undefined && props.participants !== null ? props.participants : "";


  useEffect(() => {
    if (
      Object.keys(activityDataJSON).length !== 0 &&
      Object.keys(activityDataJSON.activityData).length !== 0
    ) {
      setActivityDataList([...activityDataJSON.activityData]);
    }
  }, []);


  useEffect(() => {
    if (
      activityDataList !== "" ||
      activityDataList !== undefined ||
      activityDataList !== null
    ) {
      let newActivitiesArray = [];
      let newArrayByType = [];
      let newArrayByPrice = [];
      let newArrayByKidFriendliness = [];
      let newArrayByDuration = [];

      if (
        activityType !== "" &&
        activityType !== undefined &&
        activityType !== null
      ) {
        newArrayByType = activityDataList.filter(
          (activityData) => activityData.type === activityType
        );
      } else if (
        activityPrice !== "" &&
        activityPrice !== undefined &&
        activityPrice !== null
      ) {
        newArrayByPrice = activityDataList.filter(
          (activityData) => activityData.price == activityPrice
        );
      } else if (
        activityKidFriendliness !== "" &&
        activityKidFriendliness !== undefined &&
        activityKidFriendliness !== null
      ) {
        // ? For some reason this doesn't work.
        // newArrayByKidFriendliness = activityDataList.filter(activityData => activityData.kidFriendly == activityKidFriendliness);
        newArrayByKidFriendliness = activityDataList.filter(
          (activityData) => activityData.kidFriendly == true
        );
      } else if (
        activityDuration !== "" &&
        activityDuration !== undefined &&
        activityDuration !== null
      ) {
        newArrayByDuration = activityDataList.filter(
          (activityData) => activityData.duration == activityDuration
        );
      }

      // console.log(newArrayByKidFriendliness);

      if (newArrayByType.length > 0) {
        newActivitiesArray = [...newArrayByType];
      } else if (newArrayByPrice.length > 0) {
        newActivitiesArray = [...newArrayByPrice];
      } else if (newArrayByKidFriendliness.length > 0) {
        newActivitiesArray = [...newArrayByKidFriendliness];
      } else if (newArrayByDuration.length > 0) {
        newActivitiesArray = [...newArrayByDuration];
      }

      setActivities([...newActivitiesArray]);
    }
  }, [activityDataList]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });
  }, []);


  const addToUserWishlist = async (wishlistID) => {

    try { 

      const docRef = doc(db, "users", user.uid); 

      const wishlistActivitiesData = {
        activity: wishlistID
      };
      
      updateDoc(docRef, wishlistActivitiesData, {merge:true})
      .then(docRef => {
          console.log("A New Document Field has been added to an existing document");
      })
      .catch(error => {
          console.log(error);
      });
      
    } catch (error) {

      console.log("Error: ", error);

    };

  };


  return (
    <View style={styles.cards}>

      {activities !== "" || activities !== undefined || activities !== null ? (

        <ScrollView horizontal={true}>

          {activities.map((activity) => (

            <Card key={activity.key} style={styles.card}>

              <CardContent>

              {/* // TODO: Set icon to be filled (heart) after the user adds it. */}
              <button onClick={() => addToUserWishlist(activity.key)}>
                <Ionicons style={styles.icon} name="heart-outline"></Ionicons>
              </button>

                <Typography variant="body1">
                  <strong>{activity.activity}</strong>
                </Typography>

                <Typography variant="body2">
                  <strong>Type: </strong>
                  {activity.type}
                </Typography>

                <Typography variant="body2">
                  <strong>Participants: </strong>
                  {activity.participants}
                </Typography>

                <Typography variant="body2">
                  <strong>Price: </strong>
                  {activity.price}
                </Typography>

                <Typography variant="body2">
                  <strong>kidFriendly: </strong>
                  {activity.kidFriendly === true ? "Yes" : "No"}
                </Typography>

                <Typography variant="body2">
                  <strong>Accessibility: </strong>
                  {activity.accessibility}
                </Typography>

                <Typography variant="body2">
                  <strong>Duration: </strong>
                  {activity.duration}
                </Typography>

              </CardContent>

            </Card>

          ))}

        </ScrollView>

      ) : null}

    </View>
  );
}

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
    maxWidth: "300px",
    height: "auto",
    margin: "10px",
  },
  cards: {
    display: "flex",
  },
});
