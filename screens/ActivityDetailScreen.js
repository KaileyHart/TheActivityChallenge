import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Share } from "react-native";
import { Text, View } from "../components/Themed";
import { ScrollView } from "react-native-gesture-handler";

import { firebase_auth, firebase_db } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove} from "firebase/firestore";

import * as Calendar from "expo-calendar";

import heartOutlineIcon from "../assets/icons/heart-outline.svg";
import heartIcon from "../assets/icons/heart.svg";

export default function ActivityDetailScreen({ route }) {

  const [existingWishlistActivities, setExistingWishlistActivities] = useState([]);
  const [user, setUser] = useState({});
  const [docRef, setDocRef] = useState("");

  const [status, requestPermission] = Calendar.useCalendarPermissions();
  const [eventId, setEventId] = useState('');

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


  const eventData = {
    title: 'My Event Title',
    startDate: new Date('2023-12-14T07:00:00'),
    endDate: new Date('2023-12-14T15:00:00'),
    location: 'My Location',
  };


  const addEventToCalendar = async (title, startDate, endDate, location) => {

    try {

      const { status } = await Calendar.requestCalendarPermissionsAsync();

      if (status === 'granted') {
        //console.log('Permissions granted. Fetching available calendars...')
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
        const defaultCalendar =  calendars.find((calendar) => calendar.isPrimary) || calendars[0];
        if (defaultCalendar) {

          const eventConfig = {
            title,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            allDay: false,
            location
          };

          //console.log('eventConfig:', eventConfig)
          const eventId = await Calendar.createEventAsync(defaultCalendar.id, eventConfig)
          //console.log(eventId)
          Alert.alert('Success', 'Event added to your calendar');

        } else {

          console.warn('No available calendars found.');

        };

      } else {

        console.warn('Calendar permission not granted.');

      };

    } catch (error) {

      console.warn(error);

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
              <img style={styles.iconStyles} src={heartIcon} />
            </button>
            
            : 

            <button style={styles.heartButton} onClick={() => { updateUserWishlist(user, activity.key, "add");}}>
              <img style={styles.iconStyles} src={heartOutlineIcon} />
            </button>}

        </View>

        <img style={styles.cardImage} src={activity.imagePath} />

        <p>This type of activity is <strong>{activity.type}</strong>. It has {activity.accessibility} and it can take {activity.duration} to complete. It's {activity.kidFriendly === true ? "" : "not"} great to complete with kids. It's availability score is {activity.availability}. You need at least {activity.participants > 1 ? `${activity.participants} people` : `${activity.participants} person`} to complete this activity. It's typical cost is {activity.price}.</p>
          
        </View>

      </ScrollView>

      <button style={styles.blackButton} onClick={() => shareActivity()}>
        Share Activity
      </button>

      <button style={styles.blackButton} onClick={()=>Calendar.openEventInCalendar(eventId)}>
        Add Activity to Calendar
      </button>

      {/*addEventToCalendar(
        `Service at ${store.name}`,
        new Date(start_time ?? ''),
        new Date(end_time ?? ''),
        `${store.address.street}, ${store.address.street2}, ${store.address.city}, ${store.address.state} ${store.address.postcode}`
      ) */}

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
    height: "38px",
    width: "38px"
  },
  iconStyles: {
    fontSize: "20px",
    alignItems: "flex-start"
  }
});