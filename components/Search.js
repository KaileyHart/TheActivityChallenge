import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { SearchBar } from "react-native-elements";

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
      <TextInput
        style={styles.input}
        onChangeText={setSearchData}
        value={searchData}
        placeholder="Search..."
      />
    </View>
  );
}

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
    borderWidth: 1,
    padding: "10px",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    width: "280px",
  },
});
