export default function getFoodIcon(category) {
  const icons = {
    // Protein: require("../assets/icons/Protein.png"),
    // Fruit: require("../assets/icons/Fruit.png"),
    // Vegetable: require("../assets/icons/Vegetable.png"),
    // Dairy: require("../assets/icons/Dairy.png"),
    // Sweet: require("../assets/icons/sweet_icon.png"),
    // Juice: require("../assets/icons/juice_icon.png"),
    // Condiments: require("../assets/icons/Condiments.png"),
    // Beverages: require("../assets/icons/Beverages.png"),
    Grain: require("../assets/icons/grains.png"),
    "Oils & Fats": require("../assets/icons/oils&fats.png"),
    "Dry Goods": require("../assets/icons/dry goods.png"),
    "Nuts & Seeds": require("../assets/icons/seeds and nuts.png"),
  };
  // Fallback to a default icon if category not found
  return icons[category] || require("../assets/icons/juice_icon.png");
}
