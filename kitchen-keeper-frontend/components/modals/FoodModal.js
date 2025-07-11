import React, { useState, useEffect } from "react";
import {
  Modal,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  View,
} from "react-native";
import FoodForm from "../food/FoodForm";
const { height } = Dimensions.get("window");

const FoodModal = ({ visible, onClose, onSave, onDelete, selectedFood }) => {
  // // Handle overlay tap to close modal
  // console.log("Selected food:", selectedFood);
  const handleOverlayPress = () => {
    onClose();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleOverlayPress}
      >
        <View style={styles.modalContent}>
          <FoodForm
            onSave={onSave}
            onClose={onClose}
            onDelete={onDelete}
            selectedFood={selectedFood}
            isEditing={!!selectedFood}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.7,
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    elevation: 5, // for Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default FoodModal;
