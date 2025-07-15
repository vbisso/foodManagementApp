import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../context/AuthContext";
import useUserData from "../hooks/useUserData";
import { ActivityIndicator } from "react-native";

export default function ProfileScreen({ navigation }) {
  const { data: user, loading, error } = useUserData();
  const { logout } = useAuth();

  if (loading) return <ActivityIndicator />;

  // console.log("User Data:", user);
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      {/* <Text style={styles.title}>Profile</Text> */}

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={styles.name}>Welcome, {user.firstName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* My Profile Section */}
      <TouchableOpacity style={styles.section}>
        <View style={styles.sectionRow}>
          <Icon name="person-circle-outline" size={24} color="#003366" />
          <Text style={styles.sectionText}>Account</Text>
        </View>
        <Icon name="chevron-forward" size={20} />
      </TouchableOpacity>

      {/* Settings Section */}
      <TouchableOpacity style={styles.section}>
        <View style={styles.sectionRow}>
          <Icon name="settings-outline" size={24} color="#003366" />
          <Text style={styles.sectionText}>Settings</Text>
        </View>
        <Icon name="chevron-forward" size={20} />
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Icon name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: "#fff",
  },

  userInfo: {
    marginTop: 60,
    marginBottom: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  name: {
    fontSize: 20,
  },
  email: {
    color: "gray",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginTop: 10,
    marginHorizontal: 10,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sectionText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "#D32F2F",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "left",
  },
});
