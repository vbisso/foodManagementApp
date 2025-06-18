import IconFilter from "../IconFilter";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SwipeRow } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

const FoodItem = ({ value, onDelete, onEdit }) => {
  return (
    // <SwipeRow rightOpenValue={-130}>
    //   <View style={styles.hiddenRow}>
    //     <TouchableOpacity
    //       onPress={() => onEdit(value)}
    //       style={styles.modifyBtn}
    //     >
    //       <Text>Edit</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       onPress={() => onDelete(value.id)}
    //       style={styles.deleteBtn}
    //     >
    //       <Text>Delete</Text>
    //     </TouchableOpacity>
    //   </View>

    // </SwipeRow>
    <TouchableOpacity onPress={() => onEdit(value)}>
      <View style={styles.rowFront}>
        {/* <Icon name="fast-food-outline" size={30} color="#333" /> */}
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
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
});

export default FoodItem;
