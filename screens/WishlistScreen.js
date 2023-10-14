import React from "react";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "../components/Themed";
import ActivityCard from "../components/ActivityCard";
import { Typography } from "@mui/material";
import { ScrollView } from "react-native-gesture-handler";

export default function WishlistScreen({ navigation }) {

  return (
    <View style={styles.container}>

      <ScrollView>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Wishlist Activities</Text>
      </View>

        <Typography style={styles.cardListHeader}>

          <Ionicons name="heart" size={15} color="white" />
          <strong> Your Saved Activities</strong>

        </Typography>

        <View>

          <ActivityCard activitySaved={true} />

        </View>

      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "left",
    marginLeft: 25,
    marginTop: 15,
    marginBottom: 15
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "95%",
    margin: "10px",
    marginTop: "20px",
  },
  searchButton: {
    padding: "10px",
    border: "1px solid",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "black",
    color: "white",
  },
  cardListHeaderIcon: {
    color: "white",
  },
  cardListHeader: {
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    color: "white",
    fontSize: "30",
    backgroundColor: "black",
  },
});
