import React, {useState, useEffect} from 'react';
import { StyleSheet,TextInput  } from "react-native";
import { Text, View } from "../components/Themed";

export default function SignUpScreen({navigation}) {

  const [txtFirstName, setTxtFirstName] = useState("");
  const [txtLastName, setTxtLastName] = useState("");
  const [txtEmail, setTxtEmail] = useState("");
  const [txtPassword, setTxtPassword] = useState("");
  const [dateBirthday, setDateBirthday] = useState("");

  return (
    <View style={styles.screenContainer}>

      <View style={styles.titleContainer}> 

        <Text style={styles.title}>LET'S GET <br/>STARTED!</Text>

      </View>

      <View style={styles.mainContainer}>

        <TextInput style={styles.input}  onChangeText={setTxtFirstName} value={txtFirstName} placeholder="First Name"/>

        <TextInput style={styles.input}  onChangeText={setTxtLastName} value={txtLastName} placeholder="Last Name"/>

        <TextInput style={styles.input}  onChangeText={setTxtEmail} value={txtEmail} placeholder="Email"/>

        <TextInput style={styles.input}  onChangeText={setTxtPassword} value={txtPassword} placeholder="Password"/>

        <TextInput style={styles.input}  onChangeText={setDateBirthday} value={dateBirthday} placeholder="Birthday (Optional)"/>

        <button style={styles.blackButton} onClick={() => navigation.navigate('HomeScreen')}>CREATE ACCOUNT</button>

        <Text style={styles.infoText}>By signing up, you agree to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong></Text>
        
      </View>

      <View style={styles.signInContainer}>
      
        <Text>Already have an account? <button style={styles.signInButton} onClick={() => navigation.navigate('LoginScreen')}><strong>Login</strong></button></Text>
        
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    padding: "25px"
  },  
  titleContainer: {
    display: "flex",
    justifyContent: "left",
    margin: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    width: "90%"
  },
  blackButton: {
    backgroundColor: "black",
    color: "white",
    fontWeight: 700,
    borderRadius: "20px",
    padding: "10px",
    marginTop: "25px",
    marginBottom: "10px",
    width: "90%",
  },
  infoText: {
    fontSize: "12px",
    width: "90%",
  },
  signInContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 25,
  },
  signInButton: {
    backgroundColor: "transparent",
    border: "none",
  }
});
