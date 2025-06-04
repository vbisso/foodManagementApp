import React from "react";
import { TextInput, StyleSheet, View, Image } from "react-native";

const SearchBar = ({ searchText, onSearch }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.searchImage}
        source={require("../../assets/icons/search_icon.png")}
      ></Image>
      <TextInput
        placeholder="Search food by name"
        value={searchText}
        onChangeText={onSearch}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
    marginTop: 10,
    marginHorizontal: 5,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  input: {
    fontSize: 16,
  },
  searchImage: {
    width: 22,
    height: 22,
    marginRight: 5,
  },
});

export default SearchBar;
