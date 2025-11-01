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

      const token = localStorage.getItem("token");
      const localUser = localStorage.getItem("activeUser");
      if (localUser) {
        try {
          setUser(JSON.parse(localUser));
        } catch {
          setUser(localUser);
        }
      }

      if (!token) return;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Token invalid or user not found");
      const json = await res.json();
      setUser(json);
      localStorage.setItem("activeUser", JSON.stringify(json));

    } catch (err) {
      console.error("Failed to load user:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("activeUser");
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
    const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }
);

const json = await res.json();
console.log("response received from login", json)
if (res.ok && json.access_token) {
  localStorage.setItem("token", json.access_token);
  localStorage.setItem("activeUser", json.user);
  setUser(json.user);
  setModalOpen(false);
} else {
  alert(json.message || "Login failed");
}

  } finally {
    setLoading(false);
  }
};


const register = async (data) => {
  setLoading(true);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          password: data.password,
          phone: data.phone,
        }),
      }
    );

    const json = await res.json();

    if (res.ok && json.access_token) {
      // ✅ Save token & user
      localStorage.setItem("token", json.access_token);
      setUser(json.user);
      setModalOpen(false);
    } else {
      alert(json.message || "Registration failed");
    }
  } catch (err) {
    console.error("Registration error:", err);
    alert("Registration failed. Check console for details.");
  } finally {
    setLoading(false);
  }
};


  // 🧱 Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("activeUser");
    localStorage.removeItem("token");
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
