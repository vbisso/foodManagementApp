export default function getFoodIcon(category) {
  const icons = {
    Protein: require("../assets/icons/protein.png"),
    Fruit: require("../assets/icons/fruits.png"),
    Vegetable: require("../assets/icons/vegetable.png"),
    Dairy: require("../assets/icons/dairy.png"),
    // Sweet: require("../assets/icons/sweet_icon.png"),
    // Juice: require("../assets/icons/juice_icon.png"),
    Condiments: require("../assets/icons/condiments.png"),
    Beverages: require("../assets/icons/beverages.png"),
    Grain: require("../assets/icons/grains.png"),
    "Oils & Fats": require("../assets/icons/oils&fats.png"),
    "Dry Goods": require("../assets/icons/dry goods.png"),
    "Nuts & Seeds": require("../assets/icons/seeds and nuts.png"),
    "Canned Goods": require("../assets/icons/canned goods.png"),
    Snacks: require("../assets/icons/snacks.png"),
    "Herbs & Spices": require("../assets/icons/spices.png"),
  };
  // Fallback to a default icon if category not found
  return icons[category] || require("../assets/icons/other.png");
}
