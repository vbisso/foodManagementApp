import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({ value, setDate }) => {
  return (
    <View style={styles.datePickerContainer}>
      <Text style={styles.datePickerText}>Expiration Date</Text>
      <DateTimePicker
        style={styles.datePicker}
        value={value}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => {
          if (selectedDate) {
            setDate(selectedDate);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "#A0A0A0",
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "100%",
  },
  datePickerText: {
    alignSelf: "center",
    fontSize: 16,
    color: "#000",
  },
  datePicker: {
    width: "100%",
    height: 50,
  },
});

export default DatePicker;
