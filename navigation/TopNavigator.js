import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Ionicons from "@expo/vector-icons/Ionicons";

// TODO: Navigate to home after clicking logo -- 09/04/2023
// TODO: Navigate to account settings after clicking user account icon -- 09/04/2023

export default function TopNavigator({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        THE ACTIVITY
        <br />
        CHALLENGE <Ionicons style={styles.icon} name="images"></Ionicons>
      </Text>

      <Ionicons
        style={styles.userAccountIcon}
        name="person-circle-outline"
      ></Ionicons>
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
});
