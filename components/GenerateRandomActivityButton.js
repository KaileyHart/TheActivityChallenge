import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from "react-native";
import { Text, View } from "../components/Themed";
import axios from 'axios';


export default function GenerateRandomActivityButton() {

  const [randomActivity, setRandomActivity] = useState("");

  useEffect(() => {

    generateRandomActivity();

  }, []);

  const generateRandomActivity = () => {

    setRandomActivity("");

    axios
      .get('https://www.boredapi.com/api/activity')
      .then(res => {
        setRandomActivity(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));

  };


  return (
    <View style={styles.container}>

      <Button
        title="Generate Activity"
        data-category="recreational"
        onPress={() => generateRandomActivity()}
      />

      {randomActivity.activity ? (
        <React.Fragment>
          <Text>{randomActivity.activity}</Text>
          <Text> {randomActivity.type}</Text>
        </React.Fragment>
      ) : null}

    </View>
  );
};

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
    width: "40%",
  },

});