import { StyleSheet } from "react-native";

// import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function IntroScreen() {
  return (
    <View style={styles.container}>

    <Text style={styles.title}>LOGO</Text>
    <Text>Get started Button</Text>
    <Text>Sign In Button</Text>

    {/* <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      /> */}

    {/* <EditScreenInfo path="/screens/Login.tsx" /> */}

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
