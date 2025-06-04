import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import FoodItem from "./FoodItem";
import SearchBar from "../components/UI/SearchBar";

const FoodList = ({ foods, onDelete, onEdit }) => {
  const [searchText, setSearchText] = useState("");

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View>
      <SearchBar searchText={searchText} onSearch={setSearchText} />

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

// {filteredFoods.length === 0 ? (
//   <View style={styles.textContainer}>
//     <Text style={styles.text}>No items found.</Text>
//   </View>
// ) : (
//   filteredFoods.map((food) => (
//     <View style={styles.itemContainer} key={food.id}>
//       <FoodItem value={food} onDelete={onDelete} onEdit={onEdit} />
//     </View>
//   ))
// )}

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
