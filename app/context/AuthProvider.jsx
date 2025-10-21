"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // start in loading state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("login"); // 'login' | 'register'

  // 🧩 Load user when app starts
  useEffect(() => {
   const loadUser = async () => {
  try {
    setLoading(true);

    // Fetch user ID=1 (replace with real session/user ID later)
    const res = await api.getUser(1);

    if (res?.success && res?.data) {
      setUser(res.data);
      // No localStorage storage
    } else {
      setUser(null);
    }
  } catch (err) {
    console.error("Failed to load user:", err);
    setUser(null);
  } finally {
    setLoading(false);
  }
};

    loadUser();
  }, []);

  // 🧱 Login (mock for now)
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      // TODO: Replace with real API
      const fakeUser = { id: 1, name: "Ahmed", email };
      setUser(fakeUser);
      localStorage.setItem("user", JSON.stringify(fakeUser));
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  // 🧱 Register (mock for now)
  const register = async (data) => {
    setLoading(true);
    try {
      const fakeUser = { id: 2, name: data.firstName, email: data.email };
      setUser(fakeUser);
      localStorage.setItem("user", JSON.stringify(fakeUser));
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  // 🧱 Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const openModal = (mode = "login") => {
    setModalMode(mode);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        openModal,
        closeModal,
        modalOpen,
        modalMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
