"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import {
  Heart,
  MessageSquare,
  Bell,
  ShoppingBag,
  User,
  ChevronDown,
  LogOut,
  Settings,
  BarChart3,
  Star,
  Store,
} from "lucide-react";

export default function Header() {
  const { user: authUser, logout, openModal } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // Mock user for now (set to false to test logged-out state)
  const mockUser = true;
  const user = mockUser ? { name: "Ahmed" } : authUser;
    console.log("the user is", mockUser, user, authUser)
  return (
    <header className="sticky top-0 z-50 bg-[var(--delala-green)] shadow-sm text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 rounded hover:bg-green-700/40"
            aria-label="Open menu"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="font-bold text-lg text-white">Delala</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 relative">
          {user ? (
            <>
              {/* Quick icon buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <IconButton icon={<Heart size={18} />} title="Saved" />
                <IconButton icon={<MessageSquare size={18} />} title="Messages" />
                <IconButton icon={<Bell size={18} />} title="Notifications" />
                <IconButton icon={<ShoppingBag size={18} />} title="My Adverts" />
              </div>

              {/* User dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full transition"
                >
                  <div className="w-8 h-8 bg-white text-[var(--delala-green)] rounded-full flex items-center justify-center font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={16} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <MenuItem icon={<Store size={16} />} text="My Shop" />
                    <MenuItem icon={<BarChart3 size={16} />} text="Performance" />
                    <MenuItem icon={<Settings size={16} />} text="Settings" />
                    <MenuItem icon={<Star size={16} />} text="Feedback" />
                    <MenuItem
                      icon={<LogOut size={16} />}
                      text="Logout"
                      onClick={logout}
                      className="border-t"
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => openModal("login")}
                className="text-sm text-white hover:underline"
              >
                Sign In
              </button>
              <span className="text-white/50">|</span>
              <button
                onClick={() => openModal("register")}
                className="text-sm text-white hover:underline"
              >
                Register
              </button>
            </>
          )}

          {/* SELL button */}
          <button
            onClick={() =>
              user ? console.log("go to sell page") : openModal("login")
            }
            className="bg-white text-[var(--delala-green)] rounded-md px-4 py-2 text-sm font-semibold hover:bg-gray-100 transition"
          >
            SELL
          </button>
        </div>
      </div>
    </header>
  );
}

/* ✅ Reusable components */
function IconButton({ icon, title }) {
  return (
    <button
      title={title}
      className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition"
    >
      {icon}
    </button>
  );
}

function MenuItem({ icon, text, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-gray-100 transition ${className}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}
