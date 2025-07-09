import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import categoriesJSON from "../../assets/data/categories.json";
import { RFValue } from "react-native-responsive-fontsize";

const CategoryPicker = ({ value, setCategory }) => {
  const categories = [...Object.keys(categoriesJSON), "Other..."];
  // console.log("Categories:", categories);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const handleCustomSubmit = () => {
    if (customCategory.trim()) {
      setCategory(customCategory.trim());
      setIsCustom(false);
      setShowDropdown(false);
    }
  };

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>Category</Text>

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={[styles.dropdownButtonText, !value && styles.placeholder]}>
          {value || "Select or enter a category..."}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      {showDropdown && !isCustom && (
        <View style={styles.dropdownList}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  if (item === "Other...") {
                    setIsCustom(true);
                  } else {
                    setCategory(item);
                    setShowDropdown(false);
                  }
                }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {showDropdown && isCustom && (
        <View style={styles.dropdownListCustomCategory}>
          <TextInput
            style={styles.input}
            placeholder="Enter custom category"
            value={customCategory}
            onChangeText={setCustomCategory}
            onSubmitEditing={handleCustomSubmit}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.customCategoryButton}
            onPress={handleCustomSubmit}
          >
            <Text style={styles.customCategoryButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    zIndex: 1200,
  },

  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    color: "#000",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
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
    backgroundColor: "#FBFCFD",
    borderWidth: 0.2,
    borderColor: "grey",
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 150,
    zIndex: 2000,
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
  label: {
    fontSize: 16,
    marginBottom: 5,
    paddingLeft: 5,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    flex: 1,
  },
  dropdownListCustomCategory: {
    display: "flex",
    flexDirection: "row",
    minWidth: "95%",
  },
  customCategoryButton: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  customCategoryButtonText: {
    color: "#007aff",
    fontSize: RFValue(12),
    textAlign: "center",
  },
});

export default CategoryPicker;
