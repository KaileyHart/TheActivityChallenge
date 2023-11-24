import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { firebase_auth } from "../FirebaseConfig";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

export default function AccountDetailsScreen({ navigation }) {

  const [txtUsername, setTxtUsername] = useState("");
  const [txtEmail, setTxtEmail] = useState("");
  const [user, setUser] = useState({});

  // TODO: This is repeated code. -- 10/01/2023 KH
  useEffect(() => {

    onAuthStateChanged(firebase_auth, (user) => {
      setUser(user);
      setTxtUsername(user.displayName);
      setTxtEmail(user.email);
    });

  }, []);


  const updateUserProfile = async () => {

    try { 

      await updateProfile(user, {
        displayName: `${txtUsername}`,
        email: `${txtEmail}`,
      });

      alert("Update Successful!");
      navigation.goBack();

    } catch (error) {

      alert("Error updating user: " + error.message);

    };

  };

  return (
    <View style={styles.screenContainer}>

      <Text style={styles.title}>Edit Account Details</Text>

      <View style={styles.inputContainer}> 

        <Text>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTxtUsername}
          value={txtUsername}
          placeholder="Username"
        />

        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTxtEmail}
          value={txtEmail}
          placeholder="Email"
        />
      
      </View>

      <View style={styles.buttonContainer}> 

        <button style={styles.blackButton} onClick={() => navigation.navigate("ForgotPasswordScreen")}>
        RESET PASSWORD
        </button>

        {/* Maybe just show a modal that says saved? */}
        <button style={styles.blackButton} onClick={() => updateUserProfile()}>
          SAVE
        </button>

        <button style={styles.blackButton} onClick={() => navigation.goBack()}>
          CANCEL
        </button>

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    padding: "25px",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    width: "90%",
  },
  blackButton: {
    backgroundColor: "black",
    color: "white",
    fontWeight: 700,
    borderRadius: 20,
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    width: "90%",
  },
  inputContainer: {
    height: "50%"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
  }
});
