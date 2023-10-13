import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { Card, CardContent, Typography } from "@mui/material";
import activityDataJSON from "/assets/json/activities.json";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

import { firebase_auth, firebase_db } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove} from "firebase/firestore";

export default function ActivityCard(props) {

  const [activityDataList, setActivityDataList] = useState([]);
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState({});
  const [docRef, setDocRef] = useState("");
  const [existingWishlistActivities, setExistingWishlistActivities] = useState([]);
  const [scrollHorizontal, setScrollHorizontal] = useState(true);

  const auth = firebase_auth;
  const db = firebase_db;

  const activityType = props.type !== "" && props.type !== undefined && props.type !== null ? props.type : "";
  const activityPrice = props.price !== "" && props.price !== undefined && props.price !== null ? props.price : "";
  const activityKidFriendliness = props.kidFriendly !== "" && props.kidFriendly !== undefined && props.kidFriendly !== null ? props.kidFriendly : "";
  const activityDuration = props.duration !== "" && props.duration !== undefined && props.duration !== null ? props.duration : "";
  const activitySaved = props.activitySaved !== "" && props.activitySaved !== undefined && props.activitySaved !== null ? props.activitySaved : false;
  // const activityParticipants = props.participants !== "" && props.participants !== undefined && props.participants !== null ? props.participants : "";


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
      let newArrayBySaved = [];

      if (activityType !== "" &&activityType !== undefined &&activityType !== null) {

        newArrayByType = activityDataList.filter((activityData) => activityData.type === activityType);

      } else if (activityPrice !== "" &&activityPrice !== undefined &&activityPrice !== null) {

        newArrayByPrice = activityDataList.filter((activityData) => activityData.price == activityPrice);

      } else if (activityKidFriendliness !== "" &&activityKidFriendliness !== undefined &&activityKidFriendliness !== null) {

        // ? For some reason this doesn't work.
        // newArrayByKidFriendliness = activityDataList.filter(activityData => activityData.kidFriendly == activityKidFriendliness);
        newArrayByKidFriendliness = activityDataList.filter((activityData) => activityData.kidFriendly == true);

      } else if (activityDuration !== "" && activityDuration !== undefined && activityDuration !== null) {

        newArrayByDuration = activityDataList.filter((activityData) => activityData.duration == activityDuration);

      } else if (activitySaved == true) {

        setScrollHorizontal(false);

        if (existingWishlistActivities) {

          for (let i = 0; existingWishlistActivities.length > i; i++) {

            for (let j = 0; activityDataList.length > j; j++) {

              if (activityDataList[j].key == existingWishlistActivities[i]) {

                newArrayBySaved.push(activityDataList[j]);

              };

            };

          };

        };

      };

      // console.log(newArrayByKidFriendliness);

      if (newArrayByType.length > 0) {

        newActivitiesArray = [...newArrayByType];

      } else if (newArrayByPrice.length > 0) {

        newActivitiesArray = [...newArrayByPrice];

      } else if (newArrayByKidFriendliness.length > 0) {

        newActivitiesArray = [...newArrayByKidFriendliness];

      } else if (newArrayByDuration.length > 0) {

        newActivitiesArray = [...newArrayByDuration];

      } else if (newArrayBySaved.length > 0) {

        newActivitiesArray = [...newArrayBySaved];

      };

      setActivities([...newActivitiesArray]);

    };
   
  }, [existingWishlistActivities, activityDataList, activitySaved]);


  useEffect(() => {

    onAuthStateChanged(auth, (user) => {

      setUser(user);
      setDocRef(doc(db, "users", user.uid));

    });

  }, []);


  useEffect(() => {

    if (user !== "" || user !== undefined || user !== null) {

      readUserWishlist();

    };

  }, [user]);


  const updateUserWishlist = async (user, wishlistID, actionType) => {

    if (actionType === "add") {

      try { 
        
        updateDoc(docRef, {
          wishlistActivities: arrayUnion(`${wishlistID}`)
          })
          .then(docRef => {
            console.log("A New Document Field has been added to an existing document");
          })
          .catch(error => {
              console.log("Error:", error);
          });

          let newExistingWishlistActivities = [...existingWishlistActivities];

          newExistingWishlistActivities.push(wishlistID);

          setExistingWishlistActivities(newExistingWishlistActivities);

          readUserWishlist(user);
        
      } catch (error) {

        console.log("Error: ", error);

      };

    } else if (actionType === "remove") {

      try { 
        
        updateDoc(docRef, {
          wishlistActivities: arrayRemove(`${wishlistID}`)
          })
          .then(docRef => {
            console.log("An existing document field has been removed");
          })
          .catch(error => {
              console.log("Error:", error);
          });

          let newExistingWishlistActivities = [...existingWishlistActivities];

          newExistingWishlistActivities.filter((activity) => {
            return activity !== wishlistID;
          });

          setExistingWishlistActivities(newExistingWishlistActivities);

          readUserWishlist(user);
        
      } catch (error) {

        console.log("Error: ", error);

      };

    };

  };


  const readUserWishlist = async (user) => {

    try {

      if (docRef) {

        const docSnap = await getDoc(docRef);
      
        if (docSnap.exists()) {

          setExistingWishlistActivities(docSnap.data().wishlistActivities);

        } else {

          console.log("This document does not exist");

        };

      };

    } catch (error) {

      console.log("Error: ", error);

    };

  };

  return (
    <View style={scrollHorizontal === true ? styles.horizontalCards : styles.verticalCards}>

      {activities !== "" || activities !== undefined || activities !== null ? (

        <ScrollView horizontal={scrollHorizontal}>

          {activities.map((activity) => (
          
            <Card key={activity.key} style={styles.card}>
          
              <CardContent>

                <Typography variant="body1" style={styles.activityName}>
                  <strong>{activity.activity}</strong>

                  {existingWishlistActivities.includes((activity.key)) ? 

                    <button style={styles.heartButton} onClick={() => { updateUserWishlist(user, activity.key, "remove");}}>
                      <Ionicons style={styles.icon} name="heart"></Ionicons>
                    </button>
                    
                    : 
  
                    <button style={styles.heartButton} onClick={() => { updateUserWishlist(user, activity.key, "add");}}>
                      <Ionicons style={styles.icon} name="heart-outline"></Ionicons>  
                    </button>
  
                  }
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
  horizontalCards: {
    display: "flex",
  },
  verticalCards: {
    display: "flex",
    alignItems: "center"
  },
  activityName: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px"
  },
  heartButton: {
    backgroundColor: "white",
    border: "none",
    height: "40px",
    width: "40px"
  },
  icon: {
    fontSize: "20px",
    alignItems: "flex-start"
  }
});
