import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const QuantityStepper = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.valueText}>Quantity: {value}</Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity
          onPress={() => onChange(Math.max(1, value - 1))}
          style={styles.button}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onChange(value + 1)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
    borderRadius: 8,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  valueText: {
    fontSize: 16,
  },
});
export default QuantityStepper;
