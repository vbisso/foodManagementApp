import IconFilter from "./IconFilter";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SwipeRow } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/Ionicons";

const FoodItem = ({ value, onDelete, onEdit }) => {
  return (
    <SwipeRow rightOpenValue={-150}>
      <View style={styles.hiddenRow}>
        <TouchableOpacity
          onPress={() => onEdit(value)}
          style={styles.modifyBtn}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(value)}
          style={styles.deleteBtn}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowFront}>
        <Icon name="fast-food-outline" size={30} color="#333" />
        <View style={styles.info}>
          <Text style={styles.name}>{value.name}</Text>
          <Text style={styles.expDate}>
            Exp Date: {value.expDate.toDateString()}
          </Text>
        </View>
        <Text style={styles.quantity}>{value.quantity} units</Text>
      </View>
    </SwipeRow>
  );
};
const styles = StyleSheet.create({
  rowFront: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 75,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    minWidth: "100%",
  },
  info: {
    marginLeft: 10,
  },
  expDate: {
    fontSize: 16,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  quantity: {
    marginRight: 10,
    fontSize: 16,
    position: "absolute",
    right: 0,
  },
  hiddenRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#eee",
    alignItems: "center",
    height: "75",
  },
  deleteBtn: {
    backgroundColor: "red",
    width: 75,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  modifyBtn: {
    backgroundColor: "orange",
    width: 75,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FoodItem;
