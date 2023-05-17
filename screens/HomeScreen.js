import { StyleSheet } from "react-native";

// import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { ListItem, SearchBar } from "react-native-elements";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      {/* <SearchBar
        placeholder="Type Here..."
         onChangeText={this.update} 
        value={search} /> */}
      <Text>Filter Button</Text>

      <Text>Trending Activities</Text>
      <Text>List of activities</Text>

      <Text>Happening Near You</Text> 
      <Text>List of activities</Text>
      
      {/* <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      /> */}
     {/* <EditScreenInfo path="/screens/HomeScreen.tsx" /> */}
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
    width: "80%",
  },
});
