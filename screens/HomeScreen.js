import React from "react";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "../components/Themed";
import Search from "../components/Search";
import ActivityCard from "../components/ActivityCard";
import { Typography } from "@mui/material";
import { ScrollView } from "react-native-gesture-handler";


export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>

      <ScrollView>

        <View style={styles.searchContainer}>

          <Search/>

          <button style={styles.searchButton}>Search</button>

        </View>

        {/* // TODO: Create Filter */}
        {/* <Text>Filter Button</Text> */}

        <Typography style={styles.cardListHeader}>
          <Ionicons name="musical-notes" size={15} color="white" />
          <strong> Relaxing Activities</strong>
        </Typography>
        <View>
          <ActivityCard type="relaxation" />
        </View>

        <Typography style={styles.cardListHeader}>
          <Ionicons name="wallet" size={15} color="white" />
          <strong> Free Activities</strong>
        </Typography>
        <View>
          <ActivityCard price="0.0" />
        </View>

        <Typography style={styles.cardListHeader}>
          <Ionicons name="happy" size={15} color="white" />
          <strong> Kid Friendly Activities</strong>
        </Typography>
        <View>
          <ActivityCard kidFriendly="true" />
        </View>

        <Typography style={styles.cardListHeader}>
          <Ionicons name="today" size={15} color="white" />
          <strong> Multiple Day Activities</strong>
        </Typography>

        <View>
          <ActivityCard duration="days" />
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
    margin: 25,
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
