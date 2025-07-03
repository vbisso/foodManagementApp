import { useContext } from "react";
import { FoodContext } from "./FoodContext";
export default function useFoodContext() {
  return useContext(FoodContext);
}
