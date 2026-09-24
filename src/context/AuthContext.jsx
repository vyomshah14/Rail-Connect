import React, { createContext, useState, useEffect, useCallback } from "react";
import { passengerApi } from "../api/passengerApi";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [passengerProfile, setPassengerProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const role = user?.role || null;

  // Fetch passenger profile if user is a passenger
  const fetchPassengerProfile = useCallback(async () => {
    if (!token || user?.role !== "passenger") {
      setPassengerProfile(null);
      return;
    }

    try {
      const data = await passengerApi.getMyPassenger();
      setPassengerProfile(data);
    } catch (err) {
      // 404 means profile not created yet
      setPassengerProfile(null);
    }
  }, [token, user?.role]);

  // Restore authentication state on startup
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        if (parsedUser.role === "passenger") {
          try {
            const data = await passengerApi.getMyPassenger();
            setPassengerProfile(data);
          } catch (err) {
            setPassengerProfile(null);
          }
        }
      } else {
        setToken(null);
        setUser(null);
        setPassengerProfile(null);
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  // Handle unauthorized event dispatched by API client on 401
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener("auth-unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("auth-unauthorized", handleUnauthorized);
    };
  }, []);

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);

    if (userData.role === "passenger") {
      passengerApi
        .getMyPassenger()
        .then((profile) => setPassengerProfile(profile))
        .catch(() => setPassengerProfile(null));
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setPassengerProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        role,
        passengerProfile,
        loading,
        isAuthenticated: !!token && !!user,
        login,
        logout,
        fetchPassengerProfile,
        setPassengerProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
