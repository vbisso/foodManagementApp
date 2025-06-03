import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
} from "react-native";

import FoodList from "../components/FoodList";
import FoodModal from "../components/FoodModal";
import FilterModal from "../components/FilterModal";
import useFoodData from "../hooks/useFoodData";

const HomeScreen = () => {
  const [sortBy, setSortBy] = useState("expDate");
  const [modalVisible, setModalVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const { foods, saveFoods, deleteFood } = useFoodData(sortBy);
  const [selectedFood, setSelectedFood] = useState(null);

  // const handleSortChange = (criterion) => {
  //   setSortBy(criterion); // Update sorting criteria
  //   setIsFilterVisible(false); // Close the modal after selecting
  // };

  const handleAddFood = () => {
    setSelectedFood(null); // Clear selection for new food
    setModalVisible(true);
  };
  const handleDeleteFood = (index) => {
    deleteFood(index);
  };
  const handleEditFood = (food) => {
    setSelectedFood(food); // Set selected food for editing
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedFood(null); // Clear selection when closing
  };

  const handleSaveFood = async (foodData) => {
    try {
      await saveFoods(foodData);
      handleCloseModal();
    } catch (error) {
      console.error("Error saving food:", error);
    }
  };

  return (
    <View style={style.container}>
      <ScrollView style={style.foodList}>
        <FoodList
          foods={foods}
          onDelete={handleDeleteFood}
          onEdit={handleEditFood}
        />
      </ScrollView>

      <View style={style.footerContainer}>
        {foods.length === 0 && (
          <View style={style.arrowContainer}>
            <Image
              style={style.arrowImage}
              source={require("../assets/icons/arrow_icon.png")}
            ></Image>

            <Text style={style.arrowText}> Click here to add an item</Text>
          </View>
        )}

        <View style={style.footer}>
          <TouchableOpacity>
            <Image
              style={style.fridgeViewButton}
              source={require("../assets/icons/fridge_icon.png")}
            />
            <Text style={style.buttonText}>Fridge</Text>
          </TouchableOpacity>

          <Pressable
            // onPress={() => setModalVisible(true)}
            onPress={handleAddFood}
            style={style.addButton}
          >
            <Image
              style={style.addButtonImage}
              source={require("../assets/icons/add_button.png")}
            />
          </Pressable>

          <TouchableOpacity onPress={() => setIsFilterVisible(true)}>
            <Image
              style={style.pantryViewButton}
              source={require("../assets/icons/pantry_icon.png")}
            />
            <Text style={style.buttonText}>Pantry</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FoodModal
        // visible={modalVisible}
        // onClose={() => setModalVisible(false)}
        // onSave={saveFoods}
        visible={modalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveFood}
        selectedFood={selectedFood}
      />
      {/* <FilterModal
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        onSortChange={handleSortChange}
      /> */}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  foodList: {
    padding: 15,
  },
  sortContainer: {
    padding: 20,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    height: 140,
    justifyContent: "center",
  },
  sortText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 0,
    backgroundColor: "#fffff",
    paddingTop: 15,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  fridgeViewButton: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: 36,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    paddingHorizontal: 5,
    position: "absolute",
    top: -30,
  },
  addButtonImage: {
    width: 60,
    height: 60,
  },
  pantryViewButton: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: 40,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 12,
    textAlign: "center",
    color: "#A0A0A0",
  },
  arrowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "center",
    marginLeft: 155,
  },
  arrowImage: {
    width: 30,
    height: 30,
  },
  arrowText: {
    fontSize: 12,
    textAlign: "center",
    color: "#A0A0A0",
  },
});

export default HomeScreen;
