import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

import logoIcon from "../assets/icons/images.svg";

export default function SplashScreen({ navigation }) {
  
  return (
    <View style={styles.screenContainer}>

      <View style={styles.container2}>

        <Text style={styles.title}>
          THE ACTIVITY
          <br />
          CHALLENGE <img style={styles.iconStyles} src={logoIcon} />
        </Text>

        <button style={styles.blackButton} onClick={() => navigation.navigate("SignUpScreen")}>
          GET STARTED
        </button>

      </View>

      <button style={styles.loginButton} onClick={() => navigation.navigate("LoginScreen")}>
        Login
      </button>
      
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: "50px",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    display: "flex",
    alignItems: "flex-end"
  },
  iconStyles: {
    height: "25px",
    widht: "25px"
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
    width: "100%",
  },
  blackButton: {
    backgroundColor: "black",
    color: "white",
    fontWeight: 700,
    borderRadius: "20px",
    padding: "10px",
    width: "90%",
  },
  loginButton: {
    fontWeight: 700,
    marginTop: "30px",
    backgroundColor: "transparent",
    border: "none",
  },
});
