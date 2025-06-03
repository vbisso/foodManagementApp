import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import IconFilter from "./IconFilter";
import FoodItem from "./FoodItem";

const FoodList = ({ foods, onDelete, onEdit }) => {
  if (foods.length === 0) {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>No items found.</Text>
        <Text style={styles.text}>Start Adding items.</Text>
      </View>
    );
  }
  return (
    <View>
      {foods.map((food, index) => (
        <View style={styles.itemContainer} key={index}>
          <FoodItem
            key={index}
            value={food}
            onDelete={onDelete}
            onEdit={onEdit}
          ></FoodItem>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    position: "absolute",
    transform: [{ translateY: 250 }],
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    paddingTop: 10,
  },
  itemText: {
    fontSize: 16,
  },
  itemContainer: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
  },
});

export default FoodList;
