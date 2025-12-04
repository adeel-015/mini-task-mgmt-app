"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => Cookies.get("token") || null);
  const [loading, setLoading] = useState(true);

  // Bootstrap: restore user from cookie if present, otherwise leave unauthenticated.
  useEffect(() => {
    const bootstrap = async () => {
      const storedToken = Cookies.get("token");
      const storedUser = Cookies.get("user");
      if (storedToken) {
        setToken(storedToken);
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            // corrupted user cookie
            Cookies.remove("user");
          }
        }
      }
      setLoading(false);
    };
    bootstrap();
  }, []);

  useEffect(() => {
    if (token) {
      Cookies.set("token", token);
    } else {
      Cookies.remove("token");
      Cookies.remove("user");
    }
  }, [token]);

  const login = async (data) => {
    const res = await api.login(data);
    setToken(res.token);
    setUser(res.user);
    Cookies.set("user", JSON.stringify(res.user));
    return res;
  };

  const signup = async (data) => {
    const res = await api.signup(data);
    setToken(res.token);
    setUser(res.user);
    Cookies.set("user", JSON.stringify(res.user));
    return res;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
