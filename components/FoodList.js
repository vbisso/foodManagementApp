import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import FoodItem from "./FoodItem";
import { RFValue } from "react-native-responsive-fontsize";

const FoodList = ({ foods, onDelete, onEdit, searchText }) => {
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View>
      {foods.length === 0 ? (
        <View style={styles.textContainer}>
          <Text style={styles.text}>No items found.</Text>
          <Text style={styles.text}>Start adding items.</Text>
        </View>
      ) : filteredFoods.length === 0 ? (
        <View style={styles.textContainer}>
          <Text style={styles.text}>No items found.</Text>
        </View>
      ) : (
        filteredFoods.map((food) => (
          <View style={styles.itemContainer} key={food.id}>
            <FoodItem value={food} onDelete={onDelete} onEdit={onEdit} />
          </View>
        ))
      )}
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
    fontSize: RFValue(12),
    textAlign: "center",
    paddingTop: 10,
  },
  itemText: {
    fontSize: RFValue(12),
  },
  itemContainer: {
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
  },
});

export default FoodList;
