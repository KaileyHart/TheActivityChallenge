import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { ScrollView } from "react-native-gesture-handler";

export default function ActivityDetailScreen({ route }) {

  // TODO: Add Wishlist button

  const {activity} = route.params;

  return (
    <View style={styles.screenContainer}>

      <ScrollView>

        <View>

        <View style={styles.titleContainer}>

          <Text style={styles.title}>{activity.activity}</Text>

        </View>


        <img style={styles.cardImage} src={activity.imagePath} />

        <p>This type of activity is <strong>{activity.type}</strong>. It has {activity.accessibility} and it can take {activity.duration} to complete. It's {activity.kidFriendly === true ? "" : "not"} great to complete with kids. It's availability score is {activity.availability}. You need at least {activity.participants > 1 ? `${activity.participants} people` : `${activity.participants} person`} to complete this activity. It's typical cost is {activity.price}.</p>
          
        </View>

      </ScrollView>

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
    justifyContent: "left",
    margin: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardImage: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    textAlign: "center",
    borderRadius: "5px",
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
});