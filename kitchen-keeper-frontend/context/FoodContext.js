import React, { createContext, useContext } from "react";
import useFoodData from "../hooks/useFoodData";

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const foodData = useFoodData();

  return (
    <FoodContext.Provider value={foodData}>{children}</FoodContext.Provider>
  );
};
export const useFoodContext = () => useContext(FoodContext);
