import { StyleSheet, Image } from "react-native";
import { Text, View } from "../components/Themed";

import logoIcon from "../assets/icons/images-outline.svg";

export default function Logo({ navigation }) {

  return (
    <View style={styles.container}>

      <Text style={styles.logo}>
        THE ACTIVITY
        <br />
        CHALLENGE <Image style={styles.iconStyles} source={logoIcon} />
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
    display: "flex",
    alignItems: "flex-end"
  },
  iconStyles: {
    color: "white",
    height: "18px",
    width: "18px",
  },
  profileButton: {
    backgroundColor: "black",
    color: "inherit",
    border: "none",
    cursor: "pointer",
  },
});
