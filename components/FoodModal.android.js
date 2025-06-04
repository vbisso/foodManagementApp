import React, { useState, useEffect } from "react";
import {
  Modal,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  Dimensions,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import FoodForm from "./FoodForm";

const { height } = Dimensions.get("window");

const FoodModal = ({ visible, onClose, onSave, selectedFood }) => {
  const [slideAnimation] = useState(new Animated.Value(height));
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
    Animated.spring(slideAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Keyboard.dismiss();
    Animated.spring(slideAnimation, {
      toValue: height,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
      onClose();
    });
  };

  useEffect(() => {
    if (visible) {
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnimation }] },
            ]}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "android" ? "height" : "padding"}
              style={{ flex: 1 }}
            >
              <FoodForm
                onSave={onSave}
                onClose={closeModal}
                selectedFood={selectedFood}
                isEditing={!!selectedFood}
              />
            </KeyboardAvoidingView>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    width: "100%",
    height: "90%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
});

export default FoodModal;
