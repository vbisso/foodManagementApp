import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import QuantityStepper from "./UI/QuantityStepper";
import DatePicker from "./UI/DatePicker";
import CategoryPicker from "./UI/CategoryPicker";
import NameInput from "./UI/NameInput";
import ViewPicker from "./UI/ViewPicker";
import categoryKeywords from "../assets/data/categories.json";

const FoodForm = ({ onSave, onClose, selectedFood, isEditing }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("");
  const [view, setView] = useState("");
  const [suggestedCategory, setSuggestedCategory] = useState("");

  // Pre-populate form fields when editing a food item
  useEffect(() => {
    if (selectedFood) {
      setName(selectedFood.name || "");
      setCategory(selectedFood.category || "");
      setDate(
        selectedFood.expDate ? new Date(selectedFood.expDate) : new Date()
      );
      setQuantity(selectedFood.quantity || 1);
      setUnit(selectedFood.unit || "");
      setView(selectedFood.view || "");
    } else {
      resetForm();
    }
  }, [selectedFood]);

  //Auto fill category based on name
  useEffect(() => {
    if (!name.trim()) {
      setSuggestedCategory("");
      return;
    }
    const lowerName = name.trim().toLowerCase();
    let foundCategory = "";
    for (const [cat, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.includes(lowerName)) {
        foundCategory = cat;
        break;
      }
    }
    setSuggestedCategory(foundCategory);
  }, [name]);

  const resetForm = () => {
    setName("");
    setCategory("");
    setDate(new Date());
    setQuantity(1);
    setUnit("");
    setView("");
  };

  const handleSave = () => {
    // Basic validation
    if (!name.trim()) {
      alert("Please enter a food name");
      return;
    }
    if (!category) {
      alert("Please select a category");
      return;
    }

    const foodData = {
      name: name.trim(),
      category,
      expDate: new Date(date),
      quantity,
      unit,
      view,
    };

    // Include id if editing existing food
    if (isEditing && selectedFood?.id) {
      foodData.id = selectedFood.id;
    }

    onSave(foodData);
    // Don't reset or close here; parent handles success/error
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.foodFormContainer}>
            <Text style={styles.text}>
              {selectedFood ? "Edit Food Item" : "Add Food Item"}
            </Text>
            <NameInput value={name} onChange={setName}></NameInput>
            {suggestedCategory && !category && (
              <View style={styles.suggestionContainer}>
                <Text style={styles.suggestionText}>
                  Suggested category: {suggestedCategory}
                </Text>
              </View>
            )}
            <CategoryPicker
              value={category || suggestedCategory}
              setCategory={setCategory}
            ></CategoryPicker>
            <DatePicker value={date} setDate={setDate}></DatePicker>
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              unit={unit}
              setUnit={setUnit}
            />
            <ViewPicker value={view} setView={setView}></ViewPicker>
          </View>

          <View style={styles.buttonFixPosition}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={handleCancel} style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  foodFormContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    height: "100%",
  },
  text: {
    fontSize: 20,
    fontWeight: "450",
    marginBottom: 10,
  },

  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  cancelBtn: {
    backgroundColor: "#B8B7B7",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "40%",
    alignItems: "center",
  },
  cancelBtnText: {
    color: "white",
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "40%",
    alignItems: "center",
  },
  saveBtnText: {
    color: "white",
    fontSize: 16,
  },
  buttonFixPosition: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  suggestionContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    minWidth: "100%",
  },
  suggestionText: {
    fontStyle: "italic",
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    textAlign: "left",
  },
});
export default FoodForm;
