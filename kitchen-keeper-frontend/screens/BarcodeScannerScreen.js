// BarcodeScannerScreen.js
import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Alert, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import FoodModal from "../components/modals/FoodModal";
import useFoodHandlers from "../hooks/useFoodHandlers";
import { lookupProductByBarcode } from "../services/lookUpProductByBarcode";

export default function BarcodeScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const { handleSaveFood, handleDeleteFood, handleCloseFoodModal, foods } =
    useFoodHandlers();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned) return;
    setScanned(true);

    try {
      const product = await lookupProductByBarcode(data);
      // console.log("api:", product);
      // console.log("api:", product?.name);
      const newFood = {
        name: product?.name || data,
        quantity: 1,
        unit: "",
        category: product?.category || "",
        expDate: new Date(),
        view: "",
      };
      setSelectedFood(newFood);
      setModalVisible(true);
    } catch (error) {
      console.error("Error looking up product:", error);
    }
    // Delay next scan permission

    // setTimeout(() => {
    //   setScanned(false);
    // }, 3000);
  };

  if (!permission || !permission.granted) {
    return (
      <View style={styles.centered}>
        <Text>No access to camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "upc_a"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <FoodModal
        visible={modalVisible}
        selectedFood={selectedFood}
        onClose={() => {
          setModalVisible(false);
          setScanned(false);
        }}
        onSave={(food) => {
          handleSaveFood(food);
          setModalVisible(false);
        }}
        onDelete={(id) => {
          handleDeleteFood(id);
          setModalVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
