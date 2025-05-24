import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import QuantityStepper from "./UI/QuantityStepper";
import DatePicker from "./UI/DatePicker";
import CategoryPicker from "./UI/CategoryPicker";
import NameInput from "./UI/NameInput";
import ViewPicker from "./UI/ViewPicker";

const FoodForm = ({ onSave, onClose }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState("");

  const handleSave = () => {
    if (name && category) {
      onSave({ name, category, expDate: new Date(date), quantity, view });
      setName("");
      setCategory("");
      setDate(new Date());
      setQuantity(1);
      setView("");
      onClose();
    }
  };
  const handleCancel = () => {
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter Food Details</Text>

      <NameInput value={name} onChange={setName}></NameInput>
      <CategoryPicker
        value={category}
        setCategory={setCategory}
      ></CategoryPicker>
      <DatePicker value={date} setDate={setDate}></DatePicker>
      <QuantityStepper value={quantity} onChange={setQuantity} />
      <ViewPicker value={view} setView={setView}></ViewPicker>

      <View style={styles.buttonFixPosition}>
        <View style={styles.buttonsContainer}>
          <Button title="Cancel" onPress={handleCancel} />
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "450",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "start",
    paddingVertical: 20,
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonFixPosition: {
    position: "absolute",
    bottom: 25,
    width: "100%",
  },
});
export default FoodForm;
