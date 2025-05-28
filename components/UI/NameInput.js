import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

const NameInput = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        placeholder="e.g., Milk, Chicken, Apples"
        placeholderTextColor="grey"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
  input: {
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    textAlign: "left",
    fontSize: 16,
    color: "#000",
    minWidth: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    paddingLeft: 5,
  },
});
export default NameInput;
