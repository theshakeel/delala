"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("login"); // 'login' | 'register'

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      // TODO: connect real API
      await new Promise((res) => setTimeout(res, 800));
      setUser({ id: "1", name: "Ahmed", email });
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      // TODO: connect real API
      await new Promise((res) => setTimeout(res, 800));
      setUser({ id: "2", name: data.firstName, email: data.email });
      setModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setUser(null);

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
