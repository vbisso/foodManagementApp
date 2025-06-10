import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { height } = Dimensions.get("window");

const AddOptionModal = ({ visible, onClose, onTakePhoto, onManualEntry }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.cancel}>
            <Image
              source={require("../../assets/icons/cancel_icon.png")}
              style={styles.cancelIcon}
            ></Image>
          </TouchableOpacity>
          <Text style={styles.title}>How do you want to add food?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
              <Image
                source={require("../../assets/icons/camera_icon.png")}
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Scan Barcode</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onManualEntry}>
              <Image
                source={require("../../assets/icons/edit_icon.png")}
                style={styles.icon}
              ></Image>
              <Text style={styles.buttonText}>Enter Manually</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    height: height * 0.4,
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
  title: {
    fontSize: RFValue(14),
    fontWeight: "600",
    marginBottom: 15,
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    maxWidth: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: RFValue(12),
  },
  cancel: {
    position: "absolute",
    top: 15,
    right: 15,
  },

  icon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  cancelIcon: {
    width: 30,
    height: 30,
  },
});

export default AddOptionModal;
