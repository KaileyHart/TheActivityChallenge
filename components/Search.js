import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SearchBar } from 'react-native-elements';
import db from '../controllers/users-controller.js'
// import axios from 'axios';




export default function Search() {

  const [searchData, setSearchData] = useState("");


  useEffect(() => {

    setSearchData();

  }, []);


  const updateSearch = (search) => {

    setSearchData(search);

  };


  return (
    <SearchBar
      placeholder="Type Here..."
      onChangeText={updateSearch}
      value={searchData}
    />
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