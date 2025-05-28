import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const ViewPicker = ({ value, setView }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  // const views = ["List", "Pantry", "Fridge"];
  return (
    <View>
      <Text>Save to:</Text>
      <View style={styles.viewsContainer}>
        <TouchableOpacity style={styles.view} onPress={() => setView("List")}>
          <Text>List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.view} onPress={() => setView("Fridge")}>
          <Text>Fridge</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.view} onPress={() => setView("Pantry")}>
          <Text>Pantry</Text>
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
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  view: {
    borderColor: "grey",
    borderWidth: 0.2,
    borderRadius: 8,
    padding: 10,
    paddingVertical: 15,
    justifySelf: "center",
    width: "30%",
    alignItems: "center",
  },
  dropdownContainer: {
    zIndex: 1000,
  },

  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: "100%",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#000",
  },
  placeholder: {
    color: "grey",
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#666",
  },
  dropdownList: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 0.2,
    borderColor: "grey",
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 150,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ViewPicker;
