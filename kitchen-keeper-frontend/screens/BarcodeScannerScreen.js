// BarcodeScannerScreen.js
import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Alert, Button } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import FoodModal from "../components/modals/FoodModal";
import useFoodHandlers from "../hooks/useFoodHandlers";
import { lookupProductByBarcode } from "../services/lookUpProductByBarcode";
import { extractFoodData } from "../utils/extractFoodData";
import { processUPCResponse } from "../services/processUPCData";
import categoriesJSON from "../assets/data/categories.json";
import { Vibration } from "react-native";

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
  const scannedUPCs = useRef(new Set());

  let scanLock = false;

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanLock || scannedUPCs.current.has(data)) {
      console.log("Duplicate scan skipped:", data);
      return;
    }

    scanLock = true; // block all new scans instantly

    scannedUPCs.current.add(data);
    setScanned(true); // this is for UI
    Vibration.vibrate();

    // if (scannedUPCs.current.has(data)) {
    //   console.log("Duplicate scan skipped:", data);
    //   // Still reset scanned flag after short delay
    //   setTimeout(() => setScanned(false), 1500);
    //   return;
    // }

    // scannedUPCs.current.add(data);

    try {
      const upcData = await lookupProductByBarcode(data);
      if (!upcData) return;

      console.log("UPC response:", upcData);

      // Asks ChatGPT to clean and enrich data
      const processed = await processUPCResponse(
        upcData,
        Object.keys(categoriesJSON)
      );
      console.log("Processed by AI:", processed);
      //converts string to date
      const expDate = processed?.expDate
        ? new Date(processed.expDate)
        : new Date();

      const newFood = {
        name: processed?.name || upcData.title || "Unknown item",
        category: processed?.category,
        quantity: processed?.quantity || 1,
        unit: processed?.unit || "",
        expDate,
        view: "",
      };

      setSelectedFood(newFood);
      setModalVisible(true);
    } catch (error) {
      console.error("Error scanning barcode:", error);
    } finally {
      // Allow scanning again after delay
      setTimeout(() => {
        setScanned(false);
      }, 5000);
    }
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
      {/* <CameraView
        ref={cameraRef}
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "upc_a"],
        }}
        style={StyleSheet.absoluteFillObject}
      /> */}
      {!scanned && (
        <CameraView
          ref={cameraRef}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "ean13", "upc_a"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      <FoodModal
        visible={modalVisible}
        selectedFood={selectedFood}
        onClose={() => {
          setModalVisible(false);
          setScanned(false);
          scannedUPCs.current.clear(); // allow rescanning
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
