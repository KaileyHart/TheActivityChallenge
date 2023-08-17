import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
// import EditScreenInfo from "../components/EditScreenInfo";
import { Text, Button, View } from "../components/Themed";
import SignUpScreen from "./SignUpScreen";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function IntroScreen({navigation}) {
  return (
    <View style={styles.container}>

    <View style={styles.container2}>
      <Text style={styles.title}>THE ACTIVITY<br/>CHALLENGE <Ionicons style={styles.icon} name="images"></Ionicons></Text>
      <button style={styles.blackButton} onClick={() => navigation.navigate('SignUpScreen' )}>GET STARTED</button>
    </View>
    <Text style={styles.signInText}>SIGN IN</Text>

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
    padding: "50px"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    fontSize: "19px"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  
  blackButton: {
    backgroundColor: "black",
    color: "white",
    fontWeight: 700,
    borderRadius: "20px",
    padding: "10px",
    width: "90%",
  },
  signInText: {
    fontWeight: 700,
    marginTop: "30px"
  }
});
