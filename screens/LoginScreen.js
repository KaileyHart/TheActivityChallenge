import { StyleSheet } from "react-native";

// import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function Login() {
  return (
    <View style={styles.container}>

    <Text style={styles.title}>WELCOME BACK! <br/>SIGN IN</Text>

    <Text>Email Input</Text>
    <Text>Password Input</Text>

    <Text>SIGN IN Button</Text>

    <Text>Don't have an account yet? <strong>Create Account </strong></Text>

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
