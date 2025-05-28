import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({ value, setDate }) => {
  return (
    <View style={styles.datePickerContainer}>
      <Text style={styles.datePickerText}>Select the exp. date</Text>
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
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  datePickerText: {
    fontSize: 16,
    marginBottom: 5,
    paddingLeft: 5,
  },
  datePicker: {
    width: "100%",
    height: 50,
  },
});

export default DatePicker;
