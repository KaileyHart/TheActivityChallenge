import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { firebase_auth } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { deleteUser, reauthenticateWithCredential  } from "firebase/auth";
import { recentLoginRequired } from "firebase/auth";


export default function DeleteAccountScreen({ navigation }) {

  const [user, setUser] = useState({});

  // const auth = firebase_auth;

  // TODO: This is repeated code. -- 10/01/2023 KH
  useEffect(() => {

    onAuthStateChanged(firebase_auth, (user) => {
      setUser(user);
    });

  }, []);


  const deleteUserAccount = async () => {

    await deleteUser(user)
    .then(() => {

      console.log('Successfully deleted user');

    })
    .catch((error) => {

      // * I'm not sure if this is working correctly. -- 10/01/2023 KH
      // * https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user -- 10/01/2023 KH
      if (recentLoginRequired === true) {

        alert("Error deleting user: " + error.message);
        console.log('Error deleting user:', error);

        const credential = promptForCredentials();

        reauthenticateWithCredential(user, credential).then(() => {

          console.log("Reauthenticated");

        }).catch((error) => {

          console.log("error", error);

        });

      } else {

        alert("Error deleting user: " + error.message);
        console.log('Error deleting user:', error);

      };

    });

  };

  return (
    <View style={styles.screenContainer}>

      <Text>We are sorry to see you go. Are you sure you want to delete your acocunt?</Text>
      <Text>
        You will not be able to access your account again if you proceed. All of
        your saved information will be lost.
      </Text>

      <button
        style={styles.blackButton}
        onClick={() => deleteUserAccount()}>
        DELETE ACCOUNT
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
