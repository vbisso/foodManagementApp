import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../utils/config";

const API = API_BASE_URL;

export default function useFoodData(sortBy) {
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (err) {
      console.error("Error reading token:", err);
      return null;
    }
  };

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    loadFoods();
  }, []);

  useEffect(() => {
    setFoods((prevFoods) => sortFoods([...prevFoods], sortBy));
  }, [sortBy]);

  useEffect(() => {
    // console.log("Loaded foods from storage or API:", foods);
  }, [foods]);

  const loadFoods = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${API}/foods`, {
        // const res = await fetch(`http://10.34.112.249:3000/foods`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      // console.log("API response:", data);

      const parsedFoods = data.map((food) => ({
        ...food,
        expDate: new Date(food.expDate),
      }));

      setFoods(sortFoods(parsedFoods, sortBy));
    } catch (error) {
      console.error("Error loading foods from API:", error);
    }
  };

  const saveFoods = async (newFood) => {
    try {
      const token = await getToken();

      const method = newFood._id ? "PUT" : "POST";
      const endpoint = newFood._id
        ? `${API}/foods/${newFood._id}`
        : `${API}/foods`;

      const res = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFood),
      });

      const updatedFood = await res.json();

      // refresh food list from server
      await loadFoods();
    } catch (err) {
      console.error("Error saving food to API:", err);
    }
  };
  const deleteFood = async (id) => {
    console.log("Deleting food with ID:", id);
    try {
      const token = await getToken();

      await fetch(`${API}/foods/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh the list
      await loadFoods();
    } catch (err) {
      console.error("Error deleting food from API:", err);
    }
  };

  // const loadFoods = async () => {
  //   try {
  //     // Fetch foods from API
  //     const storedFoods = await AsyncStorage.getItem("foods");
  //     if (storedFoods) {
  //       const foodsWithDates = JSON.parse(storedFoods).map((food) => ({
  //         ...food,
  //         expDate: new Date(food.expDate),
  //       }));
  //       setFoods(sortFoods(foodsWithDates, sortBy));
  //     }
  //   } catch (error) {
  //     console.error("Error loading foods:", error);
  //   }
  // };

  // const saveFoods = async (newFood) => {
  //   try {
  //     let updatedFoods;

  //     if (newFood.id) {
  //       // Edit existing item
  //       updatedFoods = foods.map((food) =>
  //         food.id === newFood.id
  //           ? { ...newFood, expDate: new Date(newFood.expDate) }
  //           : food
  //       );
  //     } else {
  //       // Add new item
  //       newFood.id = uuidv4();
  //       updatedFoods = [
  //         ...foods,
  //         { ...newFood, expDate: new Date(newFood.expDate) },
  //       ];
  //     }

  //     const sortedFoods = sortFoods(updatedFoods, sortBy);
  //     setFoods(sortedFoods);

  //     // Convert date to string before saving to storage
  //     const foodsForStorage = sortedFoods.map((item) => ({
  //       ...item,
  //       expDate: item.expDate.toISOString(),
  //     }));

  //     await AsyncStorage.setItem("foods", JSON.stringify(foodsForStorage));
  //     console.log("Foods saved to storage:", foodsForStorage);
  //   } catch (error) {
  //     console.error("Error saving food:", error);
  //   }
  // };

  // const deleteFood = async (id) => {
  //   try {
  //     console.log("Deleting food with id:", id);
  //     const newFoods = foods.filter((food) => food.id !== id);
  //     setFoods(newFoods);
  //     await AsyncStorage.setItem("foods", JSON.stringify(newFoods));
  //   } catch (error) {
  //     console.error("Error deleting food:", error);
  //   }
  // };

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
