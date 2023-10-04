import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Logo({ navigation }) {

  return (
    <View style={styles.container}>

      <Text style={styles.logo}>
        THE ACTIVITY
        <br />
        CHALLENGE <Ionicons style={styles.icon} name="images"></Ionicons>
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  logo: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  userAccountIcon: {
    color: "white",
    fontSize: 30,
  },
  profileButton: {
    backgroundColor: "black",
    color: "inherit",
    border: "none",
    cursor: "pointer",
  },
});
