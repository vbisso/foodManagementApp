import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import QuantityStepper from "./UI/QuantityStepper";
import DatePicker from "./UI/DatePicker";
import CategoryPicker from "./UI/CategoryPicker";
import NameInput from "./UI/NameInput";
import ViewPicker from "./UI/ViewPicker";

const FoodForm = ({ onSave, onClose, selectedFood, isEditing }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("");
  const [view, setView] = useState("");

  useEffect(() => {
    if (selectedFood) {
      setName(selectedFood.name || "");
      setCategory(selectedFood.category || "");
      setDate(selectedFood.expDate ? new Date(selectedFood.expDate) : new Date());
      setQuantity(selectedFood.quantity || 1);
      setUnit(selectedFood.unit || "");
      setView(selectedFood.view || "");
    } else {
      resetForm();
    }
  }, [selectedFood]);

  const resetForm = () => {
    setName("");
    setCategory("");
    setDate(new Date());
    setQuantity(1);
    setUnit("");
    setView("");
  };

  const handleSave = () => {
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

    if (isEditing && selectedFood?.id) {
      foodData.id = selectedFood.id;
    }

    onSave(foodData);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <NameInput value={name} onChangeText={setName} />
          <CategoryPicker selectedValue={category} onValueChange={setCategory} />
          <DatePicker date={date} onDateChange={setDate} />
          <QuantityStepper
            quantity={quantity}
            setQuantity={setQuantity}
            unit={unit}
            setUnit={setUnit}
          />
          <ViewPicker selectedView={view} onSelectView={setView} />
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveBtn: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelBtn: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#f44336",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FoodForm;
