import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Alert, StyleSheet, Share } from "react-native";
import { Text, View } from "../components/Themed";
import { ScrollView } from "react-native-gesture-handler";

import { firebase_auth, firebase_db } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove} from "firebase/firestore";

export default function ActivityDetailScreen({ route }) {

  const [existingWishlistActivities, setExistingWishlistActivities] = useState([]);
  const [user, setUser] = useState({});
  const [docRef, setDocRef] = useState("");

  const auth = firebase_auth;
  const db = firebase_db;

  const {activity} = route.params;

  let url = "";
  let title = activity.activity;
  let message = activity.description;
  let image = activity.imagePath;

  const options = {url, title, message, image}

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {

      setUser(user);
      setDocRef(doc(db, "users", user.uid));

    });

  }, []);


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

  // * https://reactnative.dev/docs/share
  const shareActivity = async () => {

    try {

      await Share.share({url: url, title: activity.title, message:activity.description, image: activity.imagePath});

    } catch (error) {

      Alert.alert(error.message);

    };

  };


  return (
    <View style={styles.screenContainer}>

      <ScrollView>

        <View>

        <View style={styles.titleContainer}>

          <Text style={styles.title}>{activity.activity}</Text>

          {existingWishlistActivities.includes((activity.key)) ? 

            <button style={styles.heartButton} onClick={() => { updateUserWishlist(user, activity.key, "remove");}}>
              <Ionicons style={styles.icon} name="heart"></Ionicons>
            </button>
            
            : 

            <button style={styles.heartButton} onClick={() => { updateUserWishlist(user, activity.key, "add");}}>
              <Ionicons style={styles.icon} name="heart-outline"></Ionicons>  
            </button>}

        </View>

        <img style={styles.cardImage} src={activity.imagePath} />

        <p>This type of activity is <strong>{activity.type}</strong>. It has {activity.accessibility} and it can take {activity.duration} to complete. It's {activity.kidFriendly === true ? "" : "not"} great to complete with kids. It's availability score is {activity.availability}. You need at least {activity.participants > 1 ? `${activity.participants} people` : `${activity.participants} person`} to complete this activity. It's typical cost is {activity.price}.</p>
          
        </View>

      </ScrollView>

      <button style={styles.blackButton} onClick={() => shareActivity()}>
        Share Activity
      </button>

    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    padding: "25px",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    marginTop: 25,
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardImage: {
    width: "100%",
    height: "50%",
    objectFit: "cover",
    textAlign: "center",
    borderRadius: "10px",
    paddingTop: "8px"
  },
  blackButton: {
    backgroundColor: "black",
    color: "white",
    fontWeight: 700,
    borderRadius: "20px",
    padding: "10px",
    marginTop: "25px",
    marginBottom: "10px",
    width: "90%",
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