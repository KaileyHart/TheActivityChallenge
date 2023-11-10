import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Card, CardContent, Typography } from "@mui/material";
import activityDataJSON from "/assets/json/activities.json";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useNavigation } from '@react-navigation/native';
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
  const randomActivityData = props.randomActivityData !== "" && props.randomActivityData !== undefined && props.randomActivityData !== null ? props.randomActivityData : false;
  const activitySaved = props.activitySaved !== "" && props.activitySaved !== undefined && props.activitySaved !== null ? props.activitySaved : false;
  const searchData = props.searchData !== "" && props.searchData !== undefined && props.searchData !== null ? props.searchData : "";

  const navigation = useNavigation();

  useEffect(() => {

    if (Object.keys(activityDataJSON).length !== 0 && Object.keys(activityDataJSON.activityData).length !== 0) {

      setActivityDataList([...activityDataJSON.activityData]);

    };

  }, []);


  useEffect(() => {

    // TODO: There is probably a way to do this without creating separate arrays for each activity type. 
    if (activityDataList !== "" || activityDataList !== undefined || activityDataList !== null) {

      let newActivitiesArray = [];
      let newArrayByType = [];
      let newArrayByPrice = [];
      let newArrayByKidFriendliness = [];
      let newArrayByDuration = [];
      let newArrayBySaved = [];

      if (activityType !== "" && activityType !== undefined && activityType !== null) {

        newArrayByType = activityDataList.filter((activityData) => activityData.type === activityType);

      } else if (activityPrice !== "" && activityPrice !== undefined && activityPrice !== null) {

        newArrayByPrice = activityDataList.filter((activityData) => activityData.price == activityPrice);

      } else if (activityKidFriendliness !== "" && activityKidFriendliness !== undefined && activityKidFriendliness !== null) {

        // ? For some reason this doesn't work.
        // newArrayByKidFriendliness = activityDataList.filter(activityData => activityData.kidFriendly == activityKidFriendliness);
        newArrayByKidFriendliness = activityDataList.filter((activityData) => activityData.kidFriendly == true);

      } else if (activityDuration !== "" && activityDuration !== undefined && activityDuration !== null) {

        newArrayByDuration = activityDataList.filter((activityData) => activityData.duration == activityDuration);

      }  else if (activitySaved == true) {

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

      } else if (randomActivityData !== "" && randomActivityData !== undefined && randomActivityData !== null) {

        newActivitiesArray = [randomActivityData];

      };

      setActivities(newActivitiesArray);

    };
   
  }, [existingWishlistActivities, randomActivityData, activityDataList, activitySaved]);


  useEffect(() => {

    if (activityDataList !== "" || activityDataList !== undefined || activityDataList !== null) {

      // * Example data
      // "activity": "Bake pastries for you and your neighbor",
      // "availability": 0.3,
      // "type": "cooking",
      // "participants": 1,
      // "price": 0.4,
      // "accessibility": "Minor challenges",
      // "duration": "hours",
      // "kidFriendly": true,
      // "imagePath": "https://plus.unsplash.com/premium_photo-1666353534120-7540056d6b4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFraW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      // "link": "",
      // "key": "8125168"

      let combinedResults = [...activityDataList];

      if (searchData !== "" && searchData !== undefined && searchData !== null) {

        combinedResults = combinedResults.filter((data) => formatLowerCase(data.activity).includes(formatSearchInput(searchData)) || formatLowerCase(data.type).includes(formatSearchInput(searchData)) || formatLowerCase(data.duration).includes(formatSearchInput(searchData)) || formatLowerCase(data.accessibility).includes(formatSearchInput(searchData)) || formatLowerCase(data.kidFriendly).includes(formatSearchInput(searchData)) );

      };

      setActivities(combinedResults);

    };

  }, [searchData, activityDataList]);


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
  

  // TODO: Put in a utility file
  const formatSearchInput = (value) => {

    let formattedSearchInput = "";

    if (value !== "" || value !== undefined || value !== null) {

      formattedSearchInput = formatTrim(value).toLowerCase();

    };

    return formattedSearchInput;

  };


  // TODO: Put in a utility file
  const formatToString = (value) => {

    let toStringValue = "";

    if (value !== "" || value !== undefined || value !== null) {

      toStringValue = value.toString();

    };

    return toStringValue;

  };


  // TODO: Put in a utility file
  const formatLowerCase = (value) => {

    let lowerCaseValue = "";

    if (value !== "" || value !== undefined || value !== null) {

      lowerCaseValue = formatToString(value).toLowerCase();

    };

    return lowerCaseValue;

  };


  // TODO: Put in a utility file
  const formatTrim = (value) => {

    let trimValue = "";

    if (value !== "" || value !== undefined || value !== null) {

      trimValue = formatToString(value).toLowerCase();

    };

    return trimValue;

  };


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

                  <Text onClick={() => navigation.navigate('ActivityDetailScreen', {activity: activity})}><strong>{activity.activity}</strong></Text>

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

                {activity.imagePath ? 

                  <img style={styles.cardImage} src={activity.imagePath} />

                : null}

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
  cardImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    alignItems: "center",
    borderRadius: "10px",
    marginTop: "8px"
  },
  card: {
    maxWidth: "320px",
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
