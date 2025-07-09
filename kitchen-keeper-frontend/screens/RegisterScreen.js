import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { API_BASE_URL } from "../utils/config";

const API = API_BASE_URL;

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Account created. Please log in.");
        navigation.navigate("Login");
      } else {
        Alert.alert("Register Failed", data.message || "Try again");
      }
    } catch (err) {
      Alert.alert("Error", "Could not register");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/icons/logo.png")}
      ></Image>

      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginContainer}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>Already have an account?</Text>
        <Text style={styles.loginButton}>Login</Text>
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
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    width: "85%",
    height: 50,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 55,
    borderRadius: 5,
    marginVertical: 20,
  },
  buttonText: {
    color: "#333",
    fontSize: RFValue(12),
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loginText: {
    color: "#fff",
    fontSize: RFValue(12),
  },
  loginButton: {
    color: "#fff",
    fontSize: RFValue(12),
    fontWeight: "bold",
  },
});
