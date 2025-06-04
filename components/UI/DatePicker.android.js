import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";


const DatePicker = ({ date, onDateChange }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select the exp. date</Text>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={styles.dateButton}
      >
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    paddingLeft: 5,
  },
  dateButton: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
  },
  dateText: {
    fontSize: 16,
  },
});

export default DatePicker;
