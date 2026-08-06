"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
  token: string | null;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  lastEmail: string | null;
  clearLastEmail: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [lastEmail, setLastEmail] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const savedLastEmail = localStorage.getItem("lastEmail");
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    if (savedLastEmail) {
      setLastEmail(savedLastEmail);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token: newToken } = response.data;
      
      setToken(newToken);
      const userData = { email };
      setUser(userData);
      
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("lastEmail", email);
      setLastEmail(email);
      
      return true;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        return false;
      }
      console.warn("Login request failed:", error?.response?.status || "unknown status");
      return false;
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      await axios.post("/api/auth/register", { email, password });
      return await login(email, password);
    } catch (error: any) {
      if (error?.response?.status) {
        console.warn("Registration failed with status:", error.response.status);
      }
      return false;
    }
  };


  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const clearLastEmail = () => {
    setLastEmail(null);
    localStorage.removeItem("lastEmail");
  };

  const value = {
    token,
    user,
    login,
    register,
    logout,
    loading,
    lastEmail,
    clearLastEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
