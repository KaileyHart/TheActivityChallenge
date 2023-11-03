import React, {useState, useEffect} from "react";
import { StyleSheet, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "../components/Themed";
import { Typography } from "@mui/material";
import { ScrollView } from "react-native-gesture-handler";
import ActivityCard from "../components/ActivityCard";

export default function HomeScreen({ navigation }) {

  const [searchData, setSearchData] = useState("");

  return (
    <View style={styles.screenContainer}>

      <ScrollView>

         <View style={styles.searchContainer}>

          <TextInput style={styles.searchInput} onChangeText={setSearchData} value={searchData} placeholder="Search..." />

          <button style={styles.searchButton} onClick={() => {setSearchData("")}}>Clear Search</button>

        </View>

        {searchData !== "" ?

          <View>
            <ActivityCard searchData={searchData} />
          </View>

        : null}

        {/* // TODO: Create Filter */}
        {/* <Text>Filter Button</Text> */}

        <View style={styles.titleContainer}>
          <Text style={styles.title}>All Activities</Text>
        </View>

        <Typography style={styles.cardListHeader}>
          <Ionicons name="musical-notes" size={15} color="white" />
          <strong> Relaxing</strong>
        </Typography>
        <View>
          <ActivityCard type="relaxation" />
        </View>

        <Typography style={styles.cardListHeader}>
          <Ionicons name="happy" size={15} color="white" />
          <strong> Kid Friendly</strong>
        </Typography>
        <View>
          <ActivityCard kidFriendly="true" />
        </View>

        <Typography style={styles.cardListHeader}>
          <Ionicons name="fast-food" size={15} color="white" />
          <strong> Cooking</strong>
        </Typography>
        <View>
          <ActivityCard type="cooking" />
        </View>

        <Typography style={styles.cardListHeader}>
          <Ionicons name="today" size={15} color="white" />
          <strong> Multiple Day</strong>
        </Typography>
        <View>
          <ActivityCard duration="days" />
        </View>

        <Typography style={styles.cardListHeader}>
          <Ionicons name="wallet" size={15} color="white" />
          <strong> Free</strong>
        </Typography>
        <View>
          <ActivityCard price="0.0" />
        </View>

        <Typography style={styles.cardListHeader}>
          <Ionicons name="build" size={15} color="white" />
          <strong> Busywork</strong>
        </Typography>
        <View>
          <ActivityCard type="busywork" />
        </View>

        <Typography style={styles.cardListHeader}>
          <Ionicons name="school-outline" size={15} color="white" />
          <strong> Educational</strong>
        </Typography>
        <View>
          <ActivityCard type="education" />
        </View>

        <Typography style={styles.cardListHeader}>
          <Ionicons name="people" size={15} color="white" />
          <strong> Social</strong>
        </Typography>
        <View>
          <ActivityCard type="social" />
        </View>

      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
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
  searchInput: {
    borderWidth: 1,
    padding: "15px",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    width: "85%",
  }
});
