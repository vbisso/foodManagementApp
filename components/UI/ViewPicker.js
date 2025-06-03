import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ViewPicker = ({ value, setView }) => {
  return (
    <View>
      <Text style={styles.label}>Save to:</Text>
      <View style={styles.viewsContainer}>
        <TouchableOpacity
          style={[styles.button, value == "Fridge" && styles.buttonPressed]}
          onPress={() => setView("Fridge")}
        >
          <Text style={value == "Fridge" && styles.buttonPressedText}>
            Fridge
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, value == "Pantry" && styles.buttonPressed]}
          onPress={() => setView("Pantry")}
        >
          <Text style={value == "Pantry" && styles.buttonPressedText}>
            Pantry
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    // <View style={styles.dropdownContainer}>
    //   <TouchableOpacity
    //     style={styles.dropdownButton}
    //     onPress={() => setShowDropdown(!showDropdown)}
    //   >
    //     <Text style={[styles.dropdownButtonText, !value && styles.placeholder]}>
    //       {value || "Save to..."}
    //     </Text>
    //     <Text style={styles.dropdownArrow}>▼</Text>
    //   </TouchableOpacity>

    //   {showDropdown && (
    //     <View style={styles.dropdownList}>
    //       <FlatList
    //         data={views}
    //         keyExtractor={(item) => item}
    //         renderItem={({ item }) => (
    //           <TouchableOpacity
    //             style={styles.dropdownItem}
    //             onPress={() => {
    //               setView(item);
    //               setShowDropdown(false);
    //             }}
    //           >
    //             <Text style={styles.dropdownItemText}>{item}</Text>
    //           </TouchableOpacity>
    //         )}
    //       />
    //     </View>
    //   )}
    // </View>
  );
};
const styles = StyleSheet.create({
  viewsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    paddingLeft: 5,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
    borderWidth: 0.2,
    borderColor: "grey",
  },
  buttonPressed: {
    backgroundColor: "#007AFF",
    color: "white",
  },
  buttonText: {
    textAlign: "center",
  },
  buttonPressedText: {
    color: "white",
  },
});

export default ViewPicker;
