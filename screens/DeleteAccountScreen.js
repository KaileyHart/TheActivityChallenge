import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { firebase_auth } from "../FirebaseConfig";
import { getAuth, onAuthStateChanged, deleteUser, reauthenticateWithCredential, recentLoginRequired , reauthenticateAndRetrieveDataWithCredential, signInWithPopup } from "firebase/auth";


export default function DeleteAccountScreen({ navigation }) {

  // const [user, setUser] = useState({});

  const auth = firebase_auth;
  const user = auth.currentUser;

  // TODO: This is repeated code. -- 10/01/2023 KH
  // useEffect(() => {

  //   onAuthStateChanged(firebase_auth, (user) => {
  //     setUser(user);
  //   });

  // }, []);


  const deleteUserAccount = async () => {

    await deleteUser(user)
    .then(() => {

      // console.log('Successfully deleted user');

    })
    .catch((error) => {

      // * I'm not sure if this is working correctly. -- 10/01/2023 KH
      // * https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user -- 10/01/2023 KH



        // const credential = promptForCredentials();

        // reauthenticateWithCredential(user).then(() => {

        //   // console.log("Reauthenticated");

        // }).catch((error) => {

        //   alert("Error deleting user: " + error.message);
        //   console.log('Error deleting user:', error);

        // });

        alert('You need to sign in again to delete your account.');

        firebase.auth().reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(email, password)).then(function(user) {
          // The user has been reauthenticated
          console.log("User reauthenticated:", user);
        }).catch(function(error) {
          // There was an error reauthenticating the user
          console.error("Error reauthenticating user:", error);
        });

        alert("Error deleting user: " + error.message);
        console.log('Error deleting user:', error);

    });
  };

  return (
    <View style={styles.screenContainer}>

      <Text>We are sorry to see you go. Are you sure you want to delete your acocunt?</Text>
      
      <Text>You will not be able to access your account again if you proceed. All of
        your saved information will be lost.</Text>

      <button style={styles.blackButton} onClick={() => deleteUserAccount()}>
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
