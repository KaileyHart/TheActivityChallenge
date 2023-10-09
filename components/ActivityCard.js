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
  const [existingWishlistActivities, setExistingWishlistActivities] = useState([]);

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

      } else if (activitySaved === true) {

        if (existingWishlistActivities) {

          for (let i = 0; existingWishlistActivities.length > 0; i++) {

            newArrayBySaved.push(activityDataList.filter((activityData) => activityData.key == existingWishlistActivities[i]));

          };

        }else {
          console.log("Else");
        }

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

      console.log("newActivitiesArray", newActivitiesArray);
      console.log("newArrayBySaved", newArrayBySaved);

      setActivities([...newActivitiesArray]);

    };
   
  }, [existingWishlistActivities, activityDataList, activitySaved]);


  useEffect(() => {

    onAuthStateChanged(auth, (user) => {

      setUser(user);

    });

  }, []);


  useEffect(() => {

    if (user) {

      readUserWishlist(user);

    };
  
  }, [user]);


  const updateUserWishlist = async (user, wishlistID, actionType) => {

    if (actionType === "add") {

      try { 

        const docRef = doc(db, "users", user.uid);
        
        updateDoc(docRef, {
          wishlistActivities: arrayUnion(`${wishlistID}`)
          })
          .then(docRef => {
            console.log("A New Document Field has been added to an existing document");
          })
          .catch(error => {
              console.log(error);
          });

          let newExistingWishlistActivities = [...existingWishlistActivities];

          newExistingWishlistActivities.push(wishlistID);

          setExistingWishlistActivities(newExistingWishlistActivities);

          readUserWishlist(user);
        
      } catch (error) {

        console.log("Error: ", error);

      };

    } else if (actionType === "remove") {

      // TODO: Update to remove an item in the wishlist. 
      try { 

        const docRef = doc(db, "users", user.uid);
        
        updateDoc(docRef, {
          wishlistActivities: arrayRemove(`${wishlistID}`)
          })
          .then(docRef => {
            console.log("A New Document Field has been added to an existing document");
          })
          .catch(error => {
              console.log(error);
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

  // TODO: Read the user wishlist in order to determine which activities should display a filled in heart versus the other one.  10/06/2023 Kh
  const readUserWishlist = async (user) => {

    try {

      console.log("user", user);

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {

        setExistingWishlistActivities(docSnap.data().wishlistActivities);

      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");

      };

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

                {existingWishlistActivities.includes((activity.key)) ? 

                  <button onClick={() => { updateUserWishlist(user, activity.key, "remove");}}>
                    <Ionicons style={styles.icon} name="heart"></Ionicons>
                  </button>
                  
                  : 

                  <button onClick={() => { updateUserWishlist(user, activity.key, "add");}}>
                    <Ionicons style={styles.icon} name="heart-outline"></Ionicons>  
                  </button>

                }

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
