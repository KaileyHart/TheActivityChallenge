import React, {useState} from "react";
import { StyleSheet, TextInput, TouchableOpacity, Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View } from "../components/Themed";
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

        <View style={styles.titleContainer}>
          <Text style={styles.title}>All Activities</Text>
        </View>

         <View style={styles.searchContainer}>

          <TextInput style={styles.searchInput} onChangeText={setSearchData} value={searchData} placeholder="Search..." />

          <TouchableOpacity style={styles.searchButton} onPress={() => {setSearchData("")}}><Text style={styles.searchButtonText}>Clear Search</Text></TouchableOpacity>

        </View>

        {searchData !== "" ?

          <View>
            <ActivityCard searchData={searchData} />
          </View>

        : null}

        {/* // TODO: Create Filter */}
        {/* <Text>Filter Button</Text> */}

        <Text style={styles.cardListHeader}>
          <Image style={styles.iconStyles} source={MusicNoteIcon} />
          <strong> Relaxing</strong>
        </Text>
        <View>
          <ActivityCard activityProp={{type: "relaxation"}} />
        </View>

        <Text style={styles.cardListHeader}>
          <Image style={styles.iconStyles} source={happyFaceIcon} />
          <strong> Kid Friendly</strong>
        </Text>
        <View>
          <ActivityCard activityProp={{kidFriendly: true}} />
        </View>

        <Text style={styles.cardListHeader}>
          <Image style={styles.iconStyles} source={fastFoodIcon} />
          <strong> Cooking</strong>
        </Text>
        <View>
          <ActivityCard activityProp={{type: "cooking"}} />
        </View>

        <Text style={styles.cardListHeader}>
          <Image style={styles.iconStyles} source={calendarIcon} />
          <strong> Multiple Day</strong>
        </Text>
        <View>
          <ActivityCard activityProp={{duration: "days"}} />
        </View>

        <Text style={styles.cardListHeader}>
          <Image style={styles.iconStyles} source={walletIcon} />
          <strong> Free</strong>
        </Text>
        <View>
          <ActivityCard activityProp={{price: "0.0"}}  />
        </View>

        <Text style={styles.cardListHeader}>
          <Image style={styles.iconStyles} source={busyWorkIcon} />
          <strong> Busywork</strong>
        </Text>
        <View>
          <ActivityCard activityProp={{type: "busywork"}} />
        </View>

        <Text style={styles.cardListHeader}>
          <Image style={styles.iconStyles} source={schoolCapIcon} />
          <strong> Educational</strong>
        </Text>
        <View>
          <ActivityCard activityProp={{type: "education"}} />
        </View>

        <Text style={styles.cardListHeader}>
          <Image style={styles.iconStyles} source={peopleIcon} />
          <strong> Social</strong>
        </Text>
        <View>
          <ActivityCard activityProp={{type: "social"}} />
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
    padding: "5px",
    border: "1px solid",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "black",
  },
  searchButtonText: {
    color: "white",
    padding: "10px"
  },
  cardListHeaderIcon: {
    color: "white",
  },
  cardListHeader: {
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    color: "white",
    fontSize: 18,
    backgroundColor: "black",
    display: "flex",
    alignItems: "center"
  },
  searchInput: {
    borderWidth: 1,
    padding: 15,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    width: "85%",
  },
  iconStyles: {
    height: "15px",
    width: "15px"
  }
});
