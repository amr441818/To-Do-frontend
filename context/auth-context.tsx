import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInApi, signUpApi } from "../api/auth";

type AuthContextType = {
  isLoading: boolean;
  token: string | null;
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string, name: string) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  token: null,
  signIn: (email: string, password: string) => {},
  signUp: (email: string, password: string, name: string) => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usertoken, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const USER__TOKEN = "token";

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem(USER__TOKEN);
      if (token) {
        const parsedToken = JSON.parse(token);
        console.log(parsedToken);
        setToken(parsedToken);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data } = await signInApi(email, password);
      await AsyncStorage.setItem(USER__TOKEN, JSON.stringify(data.token));
      setToken(data.token);
      setIsLoading(false);
    } catch (error) {
      console.error("Error saving user data:");
    }
  };
  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const { data } = await signUpApi(email, password, name);
      await AsyncStorage.setItem(USER__TOKEN, JSON.stringify(data.token));
      setToken(data.token);
      setIsLoading(false);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem(USER__TOKEN);
      setToken(null);
      setIsLoading(false);
    } catch (error) {
      console.error("Error removing user data:", error);
    }
  };

  const contextValue = {
    token: usertoken,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
