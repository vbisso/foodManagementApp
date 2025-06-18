export default function getFoodIcon(category) {
  const icons = {
    Protein: require("../assets/icons/meat_icon.png"),
    Fruit: require("../assets/icons/fruit_icon.png"),
    Vegetable: require("../assets/icons/vegetable_icon.png"),
    Grain: require("../assets/icons/carb_icon.png"),
    Dairy: require("../assets/icons/dairy_icon.png"),
    Sweet: require("../assets/icons/sweet_icon.png"),
    Juice: require("../assets/icons/juice_icon.png"),
  };
  // Fallback to a default icon if category not found
  return icons[category] || require("../assets/icons/juice_icon.png");
}
