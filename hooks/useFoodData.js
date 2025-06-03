import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useFoodData(sortBy) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    loadFoods();
  }, []);

  useEffect(() => {
    setFoods((prevFoods) => sortFoods([...prevFoods], sortBy));
  }, [sortBy]);

  const loadFoods = async () => {
    try {
      const storedFoods = await AsyncStorage.getItem("foods");
      if (storedFoods) {
        const foodsWithDates = JSON.parse(storedFoods).map((food) => ({
          ...food,
          expDate: new Date(food.expDate),
        }));
        setFoods(sortFoods(foodsWithDates, sortBy));
      }
    } catch (error) {
      console.error("Error loading foods:", error);
    }
  };

  // const saveFoods = async (food) => {
  //   try {
  //     // Generate unique ID for new items
  //     const foodWithId = {
  //       ...food,
  //       id:
  //         food.id ||
  //         Date.now().toString() + Math.random().toString(36).substr(2, 9),
  //       expDate: new Date(food.expDate),
  //     };

  //     // Check if food already exists (by id)
  //     const existingIndex = foods.findIndex((f) => f.id === foodWithId.id);

  //     let newFoods;
  //     if (existingIndex !== -1) {
  //       // Edit: replace existing item
  //       newFoods = [...foods];
  //       newFoods[existingIndex] = foodWithId;
  //     } else {
  //       // Add: append new item
  //       newFoods = [...foods, foodWithId];
  //     }

  //     // Sort the foods array
  //     const sortedFoods = sortFoods(newFoods, sortBy);

  //     // Update state
  //     setFoods(sortedFoods);

  //     // Save to AsyncStorage (convert dates to strings for JSON)
  //     const foodsForStorage = sortedFoods.map((item) => ({
  //       ...item,
  //       expDate: item.expDate.toISOString(),
  //     }));

  //     await AsyncStorage.setItem("foods", JSON.stringify(foodsForStorage));
  //   } catch (error) {
  //     console.error("Error saving food:", error);
  //   }
  // };

  const saveFoods = (newFood) => {
    if (newFood.id) {
      // Edit existing item - update by matching id
      console.log("Editing food with id:", newFood.id);
      const updatedFoods = foods.map((food) =>
        food.id === newFood.id ? newFood : food
      );
      setFoods(updatedFoods);
    } else {
      // Add new item - generate unique id and add
      newFood.id = uuidv4();
      setFoods([...foods, newFood]);
    }
  };

  const deleteFood = async (id) => {
    try {
      console.log("Deleting food with id:", id);
      const newFoods = foods.filter((food) => food.id !== id);
      setFoods(newFoods);
      await AsyncStorage.setItem("foods", JSON.stringify(newFoods));
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  const sortFoods = (foods, criterion) => {
    return foods.sort((a, b) => {
      if (criterion === "expDate") {
        return new Date(a.expDate) - new Date(b.expDate);
      } else if (criterion === "category") {
        return a.category.localeCompare(b.category);
      } else if (criterion === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  };
  const handleEdit = (foodItem) => {
    return foodItem;
  };

  return {
    foods,
    saveFoods,
    loadFoods,
    deleteFood,
    sortFoods,
    handleEdit,
  };
}
