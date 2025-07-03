// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      if (savedToken) setToken(savedToken);
    };
    loadToken();
  }, []);

  const login = async (token) => {
    await AsyncStorage.setItem("token", token);
    setToken(token);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
