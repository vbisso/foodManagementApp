import IconFilter from "../IconFilter";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SwipeRow } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

const FoodItem = ({ value, onDelete, onEdit }) => {
  return (
    <SwipeRow rightOpenValue={-140}>
      <View style={styles.hiddenRow}>
        <TouchableOpacity
          onPress={() => onEdit(value)}
          style={styles.modifyBtn}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(value.id)}
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
        <Text style={styles.quantity}>
          {value.quantity} {value.unit}
        </Text>
      </View>
    </SwipeRow>
  );
};
const styles = StyleSheet.create({
  rowFront: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 70,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    minWidth: "100%",
  },
  info: {
    marginLeft: 10,
  },
  expDate: {
    fontSize: RFValue(12),
  },
  name: {
    fontWeight: "bold",
    fontSize: RFValue(12),
  },
  quantity: {
    marginRight: 10,
    fontSize: RFValue(12),
    position: "absolute",
    right: 0,
  },
  hiddenRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#eee",
    alignItems: "center",
    height: 70,
  },
  deleteBtn: {
    backgroundColor: "red",
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  modifyBtn: {
    backgroundColor: "orange",
    width: 70,
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
