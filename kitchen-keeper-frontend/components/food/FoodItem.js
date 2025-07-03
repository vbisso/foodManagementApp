import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SwipeRow } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import getFoodIcon from "../../utils/getFoodIcon";

const FoodItem = ({ value, onEdit, view }) => {
  if (view === "Fridge" || view === "Pantry") {
    return (
      <TouchableOpacity
        onPress={() => onEdit(value)}
        style={styles.iconContainer}
      >
        <Text style={styles.quantity}>
          {value.quantity} {value.unit}
        </Text>
        <Image source={getFoodIcon(value.category)} style={styles.icon} />
        <Text style={styles.iconText}>{value.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={() => onEdit(value)}>
      <View style={styles.rowFront}>
        <View style={styles.info}>
          <Text style={styles.name}>{value.name}</Text>
          <Text style={styles.expDate}>
            Exp Date: {value.expDate.toDateString()}
          </Text>
        </View>
        <Text style={styles.quantity}>
          {value.quantity} {value.unit}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowFront: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 75,
    // borderBottomWidth: 1,
    borderColor: "#ccc",
    minWidth: "100%",
    borderRadius: 12,
    padding: 12,
    marginVertical: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  info: {
    marginLeft: 10,
    flex: 1,
  },
  expDate: {
    fontSize: RFValue(12),
  },
  name: {
    fontSize: RFValue(12),
    fontWeight: "600",
    textAlign: "left",
    color: "#333",
  },
  quantity: {
    // marginRight: 10,
    fontSize: RFValue(12),
    // position: "absolute",
    // right: 0,
    backgroundColor: "#007AFF",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: "hidden",
    textAlign: "center",
    minWidth: 50,
  },
  hiddenRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    justifySelf: "center",
    marginVertical: 3,
    height: 75,
  },
  deleteBtn: {
    backgroundColor: "red",
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderTopEndRadius: 12,
    borderBottomEndRadius: 12,
    padding: 12,
  },
  modifyBtn: {
    backgroundColor: "orange",
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: 12,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: RFValue(12),
    textAlign: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default FoodItem;
