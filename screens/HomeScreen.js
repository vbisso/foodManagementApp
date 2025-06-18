import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import FoodList from "../components/food/FoodList";
import FoodModal from "../components/modals/FoodModal";
import FilterModal from "../components/modals/FilterModal";
import useFoodData from "../hooks/useFoodData";
import AddOptionModal from "../components/modals/AddOptionModal";
import SearchBar from "../components/UI/SearchBar";
import { RFValue } from "react-native-responsive-fontsize";

const HomeScreen = ({ navigation }) => {
  const [sortBy, setSortBy] = useState("expDate");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const { foods, saveFoods, deleteFood } = useFoodData(sortBy);
  const [selectedFood, setSelectedFood] = useState(null);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  // const handleSortChange = (criterion) => {
  //   setSortBy(criterion); // Update sorting criteria
  //   setIsFilterVisible(false); // Close the modal after selecting
  // };

  const handleAddFood = () => {
    setSelectedFood(null); // Clear selection for new food
    setOptionModalVisible(true);
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
      setSelectedFood(null);

      // handleCloseModal();
    } catch (error) {
      console.error("Error saving food:", error);
    }
  };
  const serializedFoods = foods.map((food) => ({
    ...food,
    expDate: food.expDate.toString(),
  }));

  return (
    <LinearGradient colors={["#e8eeff", "#FEFEFF"]} style={style.container}>
      <View style={style.searchBarContainer}>
        <SearchBar
          style={style.searchBar}
          searchText={searchText}
          onSearch={setSearchText}
        ></SearchBar>
      </View>

      <ScrollView style={style.foodList}>
        <FoodList
          foods={foods}
          onDelete={handleDeleteFood}
          onEdit={handleEditFood}
          searchText={searchText}
        />
      </ScrollView>

      <View style={style.footerContainer}>
        {foods.length === 0 && (
          <View>
            <View style={style.arrowContainer}>
              <Image
                style={style.arrowImage}
                source={require("../assets/icons/arrow_icon.png")}
              ></Image>
            </View>
            <View style={style.arrowTextContainer}>
              <Text style={style.arrowText}>
                {" "}
                Click here{"\n"} to add an item
              </Text>
            </View>
          </View>
        )}

        <View style={style.footer}>
          <TouchableOpacity
            style={style.ButtonContainer}
            onPress={() => navigation.navigate("Fridge", { serializedFoods })}
          >
            <Image
              style={style.fridgeViewButton}
              source={require("../assets/icons/fridge view icon 2.png")}
            />
            <Text style={style.buttonText}>Fridge</Text>
          </TouchableOpacity>

          <Pressable onPress={handleAddFood} style={style.addButton}>
            <Image
              style={style.addButtonImage}
              source={require("../assets/icons/nav_add icon.png")}
            />
          </Pressable>

          <TouchableOpacity
            style={style.ButtonContainer}
            onPress={() => navigation.navigate("Pantry", { serializedFoods })}
          >
            <Image
              style={style.pantryViewButton}
              source={require("../assets/icons/pantry view icon 1.png")}
            />
            <Text style={style.buttonText}>Pantry</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AddOptionModal
        visible={optionModalVisible}
        onClose={() => setOptionModalVisible(false)}
        onTakePhoto={() => {
          setOptionModalVisible(false);
          alert("take photo! :)");
        }}
        onManualEntry={() => {
          setModalVisible(true);
          setOptionModalVisible(false);
        }}
      ></AddOptionModal>
      <FoodModal
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
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  foodList: {
    marginTop: 5,
    paddingBottom: "50%",
    flex: 1,
    height: "100%",
  },
  sortContainer: {
    padding: 20,
    // backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    // borderColor: "#ddd",
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
    alignItems: "start",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 15,
    paddingBottom: 25,
  },
  ButtonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
    // borderWidth: 1,
  },
  fridgeViewButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    height: 65,
  },
  addButton: {
    // paddingHorizontal: 5,
    position: "absolute",
    top: -40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  addButtonImage: {
    width: 80,
    height: 80,
  },
  pantryViewButton: {
    width: 55,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  // buttonText: {
  //   fontSize: RFValue(12),
  //   textAlign: "center",
  //   color: "#A0A0A0",
  //   marginTop: -5,
  // },
  buttonText: {
    fontSize: RFValue(12),
    textAlign: "center",
    // color: "#4A90E2", // highlight if Fridge is active
    color: "#555",
    marginTop: -7,
    // fontWeight: "500",
  },

  arrowContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    marginLeft: 15,
    position: "relative",
  },
  arrowImage: {
    width: 22,
    height: 22,
  },
  arrowTextContainer: {
    position: "absolute",
    top: -8,
    right: 80,
  },
  arrowText: {
    fontSize: RFValue(12),
    textAlign: "left",
    color: "#555",
  },
  searchBarContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default HomeScreen;
