"use client";
import React, { useState, useEffect } from "react";
import ProfileSection from "./ProfileSection";
import SavedAdsSection from "./SavedAdsSection";
import MyShop from "./MyShop";
import { useAuth } from "../../context/AuthProvider";
import { useRouter } from "next/navigation";
import {
  User,
  Store,
  MessageSquare,
  Trash2,
  LogOut,
  Menu,
  X,
  Send,
} from "lucide-react";

export default function SettingsPage() {
  const { user: authUser, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Handle active menu via query param
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const page = params.get("page") || "profile";
      setActiveMenu(page);
    };
    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  const menuItems = [
    { name: "Profile", slug: "profile", icon: User },
    { name: "Saved Ads", slug: "saved-ads", icon: User },
    { name: "My Shop", slug: "my-shop", icon: Store },
    { name: "My Messages", slug: "my-messages", icon: MessageSquare },
    { name: "Delete Account", slug: "delete-account", icon: Trash2 },
    { name: "Logout", slug: "logout", icon: LogOut },
  ];

  const handleMenuClick = (slug) => {
    setActiveMenu(slug);
    router.replace(`/user/settings?page=${slug}`);
  };

  // 📨 Messages mock (replace later with API)
  const sampleMessages = [
    {
      id: 1,
      name: "John Doe",
      message: "Is this item still available?",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      name: "Sarah Smith",
      message: "Thank you for the quick delivery!",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 3,
      name: "Mike Johnson",
      message: "Can we negotiate the price?",
      time: "3 hours ago",
      unread: true,
    },
  ];

  // 🧱 Delete account logic
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in first");

    if (!deletePassword.trim()) {
      setDeleteError("Please enter your password.");
      return;
    }

    setIsDeleting(true);
    setDeleteError("");

    try {
      const res = await fetch(`${API_BASE}/user/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: deletePassword }),
      });

      const json = await res.json();

      if (json.success) {
        alert("Your account has been permanently deleted.");
        logout();
        router.push("/");
      } else {
        setDeleteError(json.message || "Incorrect password.");
      }
    } catch (err) {
      console.error(err);
      setDeleteError("Server error. Please try again later.");
    } finally {
      setIsDeleting(false);
    }
  };

  // 📬 Messages Section
  const renderMyMessages = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Messages</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-96">
        {/* Message List */}
        <div className="lg:col-span-1 bg-white rounded-lg border">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Conversations</h3>
          </div>
          <div className="divide-y">
            {sampleMessages.map((message) => (
              <div
                key={message.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{message.name}</span>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {message.message}
                </p>
                {message.unread && (
                  <div className="w-2 h-2 bg-[var(--delala-green)] rounded-full mt-1"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 bg-white rounded-lg border flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-semibold">John Doe</h3>
          </div>
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-xs">
                <p className="text-sm">Is this item still available?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-[var(--delala-green)] text-white rounded-lg px-3 py-2 max-w-xs">
                <p className="text-sm">Yes, it's still available!</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border rounded px-3 py-2"
              />
              <button
                onClick={() => alert("Message sent!")}
                className="bg-[var(--delala-green)] hover:bg-green-700 text-white rounded px-4 py-2"
              >
                <Send />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ❌ Delete Account Section
  const renderDeleteAccount = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-red-600">Delete Account</h2>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-red-800 mb-2">⚠️ Warning</h3>
        <p className="text-red-700 mb-4">
          This action cannot be undone. Deleting your account will permanently
          remove all your data, listings, messages, and profile information.
        </p>

        <div className="space-y-3">
          <label
            htmlFor="deletePassword"
            className="block text-sm font-medium text-red-700"
          >
            Enter your password to continue
          </label>
          <input
            type="password"
            id="deletePassword"
            className="border border-red-300 rounded px-3 py-2 w-full"
            placeholder="Enter password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            disabled={isDeleting}
          />
          {deleteError && (
            <p className="text-sm text-red-600 mt-1">{deleteError}</p>
          )}

          <button
            onClick={() => setShowDeleteModal(true)}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white font-medium rounded px-4 py-2"
          >
            Continue with Account Deletion
          </button>
        </div>
      </div>

      {/* Final Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              Confirm Account Deletion
            </h3>
            <p className="text-gray-700 mb-4">
              Please confirm again that you want to permanently delete your
              account.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className={`flex-1 ${
                  isDeleting
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                } text-white font-medium rounded px-4 py-2`}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Account"}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (!authUser) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-white p-2 rounded-md shadow-sm border"
            >
              {sidebarOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Sidebar */}
          <div className={`lg:w-64 ${sidebarOpen ? "block" : "hidden lg:block"}`}>
            <nav className="bg-white rounded-lg shadow-sm p-4 space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.slug}
                    onClick={() => handleMenuClick(item.slug)}
                    className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 ${
                      activeMenu === item.slug
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex-1 p-4">
              {activeMenu === "profile" && <ProfileSection />}
              {activeMenu === "saved-ads" && <SavedAdsSection />}
              {activeMenu === "my-shop" && <MyShop user={authUser} />}
              {activeMenu === "my-messages" && renderMyMessages()}
              {activeMenu === "delete-account" && renderDeleteAccount()}
              {activeMenu === "logout" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Logout</h2>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="mb-4">Are you sure you want to logout?</p>
                    <button
                      onClick={logout}
                      className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-6 py-2"
                    >
                      Confirm Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
