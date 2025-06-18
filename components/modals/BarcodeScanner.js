// import React, { useState, useEffect } from "react";
// import { View, Text, Button, StyleSheet } from "react-native";

// const BarcodeScanner = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     setData(data);
//     alert(`Bar code with type ${type} and data ${data} has been scanned!`);
//   };

//   if (hasPermission === null)
//     return <Text>Requesting camera permission...</Text>;
//   if (hasPermission === false) return <Text>No access to camera</Text>;

//   return (
//     <View style={styles.container}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={StyleSheet.absoluteFillObject}
//       />
//       {scanned && (
//         <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
//       )}
//       {data && <Text style={styles.resultText}>Scanned Data: {data}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   resultText: {
//     color: "white",
//     backgroundColor: "rgba(0,0,0,0.5)",
//     padding: 10,
//     marginBottom: 20,
//     fontSize: 16,
//   },
// });

// export default BarcodeScanner;
