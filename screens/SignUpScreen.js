import { StyleSheet } from "react-native";

// import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>

    <Text style={styles.title}>LET'S GET <br/>STARTED!</Text>

    <Text>First Name Input</Text>
    <Text>Last Name Input</Text>
    <Text>Email Input</Text>
    <Text>Password Input</Text>
    <Text>Gender (Optional) Input</Text>
    <Text>Birthday (Optional) Input</Text>

    <Text>Create Account Button</Text>
    <Text>By signing up, you agree to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong></Text>
    <Text>Already have an account? <strong>Sign In</strong></Text>

      {/* <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      /> */}

    {/* <EditScreenInfo path="/screens/SignUpScreen.tsx" /> */}

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
