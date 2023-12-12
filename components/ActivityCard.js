import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import { Text, View } from "../components/Themed";
import { Card, CardContent } from "@mui/material";
import { formatLowerCase, formatSearchInput } from "../utilities/sharedFunctions";

import { firebase_auth, firebase_db } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove} from "firebase/firestore";

import activityDataJSON from "../assets/json/activities.json";

import imagePlaceholder from "../assets/images/no-image-found-placeholder.svg";
import heartOutlineIcon from "../assets/icons/heart-outline.svg";
import heartIcon from "../assets/icons/heart.svg";

export default function ActivityCard(props) {

  const navigation = useNavigation();

  const auth = firebase_auth;
  const user = auth.currentUser;
  const db = firebase_db;

  const [activityDataList, setActivityDataList] = useState([]);
  const [activities, setActivities] = useState([]);
  const [docRef, setDocRef] = useState("");
  const [existingWishlistActivities, setExistingWishlistActivities] = useState([]);
  const [scrollHorizontal, setScrollHorizontal] = useState(true);

  const activityProp = props.activityProp !== "" && props.activityProp !== undefined && props.activityProp !== null ? props.activityProp : "";
  const randomActivityData = props.randomActivityData !== "" && props.randomActivityData !== undefined && props.randomActivityData !== null ? props.randomActivityData : false;
  const searchData = props.searchData !== "" && props.searchData !== undefined && props.searchData !== null ? props.searchData : "";

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {

      setDocRef(doc(db, "users", user.uid));

    });

    if (user !== "" || user !== undefined || user !== null) {

      readUserWishlist();

    };

  }, [user]);


  useEffect(() => {

    if (Object.keys(activityDataJSON).length !== 0 && Object.keys(activityDataJSON.activityData).length !== 0) {

      setActivityDataList([...activityDataJSON.activityData]);

    };

  }, [randomActivityData]);


  useEffect(() => {

    if (activityProp.activitySaved === true) {
      
      setScrollHorizontal(false);

    };

  }, [activityProp]);


  useEffect(() => {
 
    if (activityDataList !== "" || activityDataList !== undefined || activityDataList !== null) {

      let newActivitiesArray = [];
      let activityFilter = [];

      if (activityProp !== "" && activityProp !== undefined && activityProp !== null) {

        activityFilter = activityDataList.filter((activityData) => activityData.type === activityProp.type ||activityData.price == activityProp.price || activityData.kidFriendly === activityProp.kidFriendly || activityData.duration == activityProp.duration);

      } else if (activityProp.activitySaved === true) {

        if (existingWishlistActivities) {

          for (let i = 0; existingWishlistActivities.length > i; i++) {

            for (let j = 0; activityDataList.length > j; j++) {

              if (activityDataList[j].key == existingWishlistActivities[i]) {

                activityFilter.push(activityDataList[j]);

              };

            };

          };

        };

      };

      if (activityFilter.length > 0) {

        newActivitiesArray = [...activityFilter];

      } else if (randomActivityData !== "" && randomActivityData !== undefined && randomActivityData !== null) {

        newActivitiesArray = [randomActivityData];

      };

      setActivities(newActivitiesArray);

    };
   
  }, [existingWishlistActivities, randomActivityData, activityDataList]);


  // * Search data
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

    {activities.length !== 0 ? 

      <ScrollView horizontal={scrollHorizontal}>

        {activities.map((activity, index) => (
      
          <Card key={index} style={styles.card}>
        
            <CardContent>

              <View style={styles.activityName}> 

                <Text onClick={() => navigation.navigate("ActivityDetailScreen", {activity: activity})}>
                  <strong>{activity.activity}</strong>
                </Text>  

                {existingWishlistActivities.includes((activity.key)) ? 

                  <button style={styles.heartButton} onClick={() => { updateUserWishlist(user, activity.key, "remove");}}>
                    <Image style={styles.iconStyles} source={heartIcon} />
                  </button>
                  
                  : 

                  <button style={styles.heartButton} onClick={() => { updateUserWishlist(user, activity.key, "add");}}>
                    <Image style={styles.iconStyles} source={heartOutlineIcon} />
                  </button>

                }

              </View>

              {activity.imagePath ? 
                <Image style={styles.cardImage} source={activity.imagePath} />
              : 
                <Image style={styles.cardImage} source={imagePlaceholder} />
              }

            </CardContent> 

          </Card>

        ))}

      </ScrollView>

    : 

      <ScrollView horizontal={scrollHorizontal}>
  
        <Card style={styles.card}>
      
          <CardContent>

            <View style={styles.activityName}> 
              <Text><strong>Uh oh! No Results Found.</strong></Text>
            </View>

            <p>Try searching for something else.</p>

            <Image style={styles.cardImage} src="https://images.unsplash.com/photo-1453227588063-bb302b62f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

          </CardContent>

        </Card> 

      </ScrollView>

    }

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
    minWidth: "200px",
    height: "200px",
    objectFit: "cover",
    alignItems: "center",
    borderRadius: 10,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px"
  },
  heartButton: {
    backgroundColor: "white",
    border: "none",
    height: "35px",
    width: "35px"
  },
  iconStyles: {
    height: "18px",
    width: "18px",
    alignItems: "flex-start"
  }
});
