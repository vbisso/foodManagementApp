import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";

const NameInput = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        placeholder="Enter name"
        placeholderTextColor="grey"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 20,
    minWidth: "100%",
  },
  input: {
    textAlign: "left",
    fontSize: 16,
    color: "#000",
  },
});
export default NameInput;
