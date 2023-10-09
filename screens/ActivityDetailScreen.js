import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import GenerateRandomActivityButton from "../components/GenerateRandomActivityButton";
import { ScrollView } from "react-native-gesture-handler";

export default function ActivityDetailScreen({ navigation }) {

  return (
    <View style={styles.container}>

      <ScrollView>

        <View style={styles.search}>

          <GenerateRandomActivityButton />
          
        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  cardListHeader: {
    padding: "20px",
  },
});
