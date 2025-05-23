import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity, FlatList } from "react-native";

const FoodForm = ({ onSave, onClose }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSave = () => {
    if (name && category) {
      onSave({ name, category, expDate: new Date(date) });
      setName("");
      setCategory("");
      onClose();
    }
  };
  const handleCancel = () => {
    onClose();
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const categories = [
    "Fruit",
    "Vegetable",
    "Grain",
    "Meat",
    "Juice",
    "Dairy",
    "Sweet",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <Text style={styles.text}>Enter Food Details</Text>

        <TextInput
          style={styles.nameInput}
          onChangeText={setName}
          value={name}
          placeholder="Enter Name"
          placeholderTextColor={"gray"}
        />

        <View style={styles.container2}>
          <Text style={styles.text}>Category: {category || "None"}</Text>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text
                style={[
                  styles.dropdownButtonText,
                  !category && styles.placeholder,
                ]}
              >
                {category || "Select a category..."}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>

            {showDropdown && (
              <View style={styles.dropdownList}>
                <FlatList
                  data={categories}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        setCategory(item);
                        setShowDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
        </View>

        <View style={styles.datePicker}>
          <Text style={styles.datePickerText}>Exp Date:</Text>
          <DateTimePicker
            value={date} //value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        </View>
      </View>

      <View style={styles.buttonFixPosition}>
        <View style={styles.buttonsContainer}>
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={handleCancel} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "450",
    marginBottom: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },

  container: {
    flex: 1,
    justifyContent: "center",
  },
  inputsContainer: {
    flexDirection: "column",
    alignItems: "center",
    height: "60%",
    paddingBottom: 20,
  },
  nameInput: {
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 20,
    width: "100%",
    maxWidth: "90%",
    textAlign: "left",
  },
  datePicker: {
    //display: "flex",
    //flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  datePickerText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "450",
    marginBottom: 10,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  buttonFixPosition: {
    position: "absolute",
    bottom: 25,
    width: "100%",
  },
  pickerContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
  },
  dropdownContainer: {
    marginBottom: 15,
    zIndex: 1000,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    backgroundColor: "#fff",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#000",
  },
  placeholder: {
    color: "#999",
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
    borderWidth: 1,
    borderColor: "#ddd",
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 200,
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
export default FoodForm;
