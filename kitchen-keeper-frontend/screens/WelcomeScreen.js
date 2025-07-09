import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useAuth } from "../context/AuthContext";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/icons/logo.png")}
        ></Image>
        <Image
          style={styles.logoText}
          source={require("../assets/icons/logoText.png")}
        ></Image>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start Exploring!</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#45AAF3",
    gap: "15%",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    width: "75%",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  logo: {
    width: 95,
    height: 95,
    marginBottom: 20,
  },
  logoText: {
    width: "80%",
    height: "50%",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#333",
    fontSize: RFValue(14),
  },
});
