import { View, Text, Image, StyleSheet } from "react-native";
const Fridge = ({ navigation, route }) => {
  const rawFoods = route?.params?.serializedFoods ?? [];
  const foods = rawFoods.map((food) => ({
    ...food,
    expDate: new Date(food.expDate),
  }));

  const chunkArray = (array, size) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );
  };
  const foodRows = chunkArray(foods, 4);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/backgrounds/fridgeBackground.png")}
        style={styles.fridgeBackground}
      />
      <View style={styles.fridgeGrid}>
        {foodRows.map((row, rowIndex) => {
          const hasFridgeItem = row.some((food) => food.view === "Fridge");
          if (!hasFridgeItem) return null; // Skip this row completely

          return (
            <View key={rowIndex} style={styles.fridgeRow}>
              {row.map((food, index) =>
                food.view === "Fridge" ? (
                  <View key={index} style={styles.foodItem}>
                    <Image
                      source={require("../assets/icons/dairy_icon.png")}
                      style={styles.icon}
                    />
                    <Text>{food.name}</Text>
                  </View>
                ) : null
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  fridgeBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
    padding: 5,
  },
  //   fridgeGrid: {
  //     position: "relative",
  //     top: "5%",
  //     left: "5%",
  //     width: "75%",
  //     height: "72%",
  //     display: "grid",
  //     gridTemplateColumns: "1fr",
  //     gridTemplateRows: "repeat(4, 1fr)",

  //     borderWidth: 1,
  //     borderColor: "black",
  //     gap: 10,
  //   },
  //   gridItem1: {
  //     display: "flex",
  //     flexDirection: "row",
  //     flexWrap: "wrap",
  //     justifyContent: "space-evenly",
  //     alignItems: "center",
  //     borderWidth: 1,
  //     borderColor: "red",
  //     maxHeight: "100%",
  //   },
  fridgeGrid: {
    position: "relative",
    top: "5%",
    left: "7%",
    width: "72%",
    height: "72%",
  },
  fridgeRow: {
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 5,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // paddingVertical: 15,
  },

  foodItem: {
    padding: 3,
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 60,
  },
});
export default Fridge;
