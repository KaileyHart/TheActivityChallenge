import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { SearchBar } from 'react-native-elements';

export default function Search() {

  const [searchData, setSearchData] = useState("");

  const updateSearch = (search) => {

    setSearchData(search);

  };

  useEffect(() => {

    setSearchData();

  }, []);



  return (
    <View> 

      <TextInput style={styles.input} onChangeText={setSearchData} value={searchData} placeholder="Search..."/>

      {/*<SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={searchData}
      /> */}

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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    width: "100%"
  },
});