import React, {useState, useEffect} from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { ScrollView } from "react-native-gesture-handler";
import ActivityCard from "../components/ActivityCard";

import MusicNoteIcon from "../assets/icons/musical-notes.svg";
import happyFaceIcon from "../assets/icons/happy.svg";
import fastFoodIcon from "../assets/icons/fast-food.svg";
import calendarIcon from "../assets/icons/today.svg";
import walletIcon from "../assets/icons/wallet.svg";
import busyWorkIcon from "../assets/icons/build.svg";
import schoolCapIcon from "../assets/icons/school.svg";
import peopleIcon from "../assets/icons/people.svg";


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

        <Text style={styles.cardListHeader}>
          <img style={styles.iconStyles} src={MusicNoteIcon} />
          <strong> Relaxing</strong>
        </Text>
        <View>
          <ActivityCard type="relaxation" />
        </View>

        <Text style={styles.cardListHeader}>
          <img style={styles.iconStyles} src={happyFaceIcon} />
          <strong> Kid Friendly</strong>
        </Text>
        <View>
          <ActivityCard kidFriendly="true" />
        </View>

        <Text style={styles.cardListHeader}>
          <img style={styles.iconStyles} src={fastFoodIcon} />
          <strong> Cooking</strong>
        </Text>
        <View>
          <ActivityCard type="cooking" />
        </View>

        <Text style={styles.cardListHeader}>
          <img style={styles.iconStyles} src={calendarIcon} />
          <strong> Multiple Day</strong>
        </Text>
        <View>
          <ActivityCard duration="days" />
        </View>

        <Text style={styles.cardListHeader}>
          <img style={styles.iconStyles} src={walletIcon} />
          <strong> Free</strong>
        </Text>
        <View>
          <ActivityCard price="0.0" />
        </View>

        <Text style={styles.cardListHeader}>
          <img style={styles.iconStyles} src={busyWorkIcon} />
          <strong> Busywork</strong>
        </Text>
        <View>
          <ActivityCard type="busywork" />
        </View>

        <Text style={styles.cardListHeader}>
          <img style={styles.iconStyles} src={schoolCapIcon} />
          <strong> Educational</strong>
        </Text>
        <View>
          <ActivityCard type="education" />
        </View>

        <Text style={styles.cardListHeader}>
          <img style={styles.iconStyles} src={peopleIcon} />
          <strong> Social</strong>
        </Text>
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
    display: "flex",
    alignItems: "center"
  },
  searchInput: {
    borderWidth: 1,
    padding: "15px",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    width: "85%",
  },
  iconStyles: {
    height: "15px",
    width: "15px"
  }
});
