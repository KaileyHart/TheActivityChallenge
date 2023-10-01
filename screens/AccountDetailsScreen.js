import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { onAuthStateChanged } from "firebase/auth";
import { firebase_auth } from "../FirebaseConfig";

export default function AccountDetailsScreen({ navigation }) {
  const [txtUsername, setTxtUsername] = useState("");
  const [txtEmail, setTxtEmail] = useState("");
  // const [txtPassword, setTxtPassword] = useState("");
  // const [dateBirthday, setDateBirthday] = useState("");

  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(firebase_auth, (user) => {
      setUser(user);
      setTxtUsername(user.displayName);
      setTxtEmail(user.email);
      // setTxtPassword(user.password);
    });
  }, []);

  return (
    <View style={styles.screenContainer}>
      <Text>Account Details</Text>
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

      {/*<TextInput
        style={styles.input}
        onChangeText={setTxtPassword}
        value={txtPassword}
        placeholder="Password"
      />/}

      {/*<TextInput
        style={styles.input}
        onChangeText={setDateBirthday}
        value={dateBirthday}
        placeholder="Birthday (Optional)"
      />*/}

      {/* Maybe just show a modal that says saved? */}
      <button
        style={styles.blackButton}
        onClick={() => navigation.navigate("HomeScreen")}
      >
        SAVE
      </button>

      <button style={styles.blackButton} onClick={() => navigation.goBack()}>
        CANCEL
      </button>
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
    borderRadius: "20px",
    padding: "10px",
    marginTop: "25px",
    marginBottom: "10px",
    width: "90%",
  },
});
