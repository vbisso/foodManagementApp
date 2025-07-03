import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { Camera } from "expo-camera";
export default function BarcodeScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const cameraRef = React.useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (scanned) return;
    setScanned(true);
    Alert.alert("Bar code has been scanned!", `Type: ${type}\nData: ${data}`, [
      {
        text: "OK",
        onPress: () => {
          setScanned(false);
          navigation.goBack();
        },
      },
    ]);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        onBarCodeScanned={handleBarCodeScanned}
        barCodeScannerSetting={{
          barCodeTypes: [
            Camera.Constants.BarCodeType.ean13,
            Camera.Constants.BarCodeType.upc_a,
            Camera.Constants.BarCodeType.qr,
          ],
        }}
        style={StyleSheet.absoluteFillObject}
      ></Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
