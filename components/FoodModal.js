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
import FoodForm from "./FoodForm";
const { height } = Dimensions.get("window");

const FoodModal = ({ visible, onClose, onSave, selectedFood }) => {
  const [slideAnimation] = useState(new Animated.Value(1000)); // starts off-screen
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
    Animated.spring(slideAnimation, {
      toValue: -150,
      // friction: 5,
      // tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    setIsModalVisible(false); //closing modal (includes the blurred background)
    onClose();
    Animated.spring(slideAnimation, {
      toValue: 1000,
      friction: 0,
      tension: 0,
      useNativeDriver: true,
    }).start();
  };

  // Handle overlay tap to close modal
  const handleOverlayPress = () => {
    closeModal();
  };

  //open modal when visible changes
  useEffect(() => {
    if (visible) {
      setIsModalVisible(true);
      openModal();
    }
  }, [visible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleOverlayPress}
      >
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: slideAnimation }],
            },
          ]}
        >
          <FoodForm
            onSave={onSave}
            onClose={closeModal}
            selectedFood={selectedFood}
            isEditing={!!selectedFood}
          />
        </Animated.View>
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
    height: height * 0.6,
    width: "90%",
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
