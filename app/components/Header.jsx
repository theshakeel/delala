"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import Link from "next/link";
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
   X,
} from "lucide-react";

export default function Header() {
  const { user: authUser, logout, openModal } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Mock user for now (set to false to test logged-out state)
  const mockUser = true;
  const router = useRouter();
  const user = mockUser ? { name: "Ahmed" } : authUser;
    console.log("the user is", mockUser, user, authUser)
    function MenuItem({ icon, text, onClick, className = "", as: Component = "button", href }) {
  return (
    <Component
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-gray-100 transition ${className}`}
    >
      {icon}
      <span>{text}</span>
    </Component>
  );
}

  return (
    <header className="sticky top-0 z-50 bg-[var(--delala-green)] shadow-sm text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
           <button
            className="md:hidden p-2 rounded hover:bg-green-700/40"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
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
          <Link href="/" className="font-bold text-lg text-white">
            <span className="font-bold text-lg text-white">Delala</span>
          </Link>
          
        </div>
         {/* Mobile side menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Side drawer */}
          <div className="fixed top-0 left-0 w-64 h-full bg-white text-gray-800 z-50 shadow-lg flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-semibold text-lg">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col p-4 gap-2">
              <Link
                href="/user/settings?page=saved-ads"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MenuItem icon={<Heart size={16} />} text="Saved" />
              </Link>
              <Link
                href="/user/settings?page=my-messages"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MenuItem icon={<MessageSquare size={16} />} text="Messages" />
              </Link>
              <Link
                href="/user/settings?page=my-shop"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MenuItem icon={<ShoppingBag size={16} />} text="My Shop" />
              </Link>
              <MenuItem icon={<Bell size={16} />} text="Notifications" />
            </div>
          </div>
        </>
      )}

        {/* Right side */}
        <div className="flex items-center gap-3 relative">
          {user ? (
            <>
              {/* Quick icon buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/user/settings?page=saved-ads">
                  <IconButton icon={<Heart size={18} />} title="Saved" />
                </Link>
                <Link href="/user/settings?page=my-meessages">
                  <IconButton icon={<MessageSquare size={18} />} title="Messages" />
                </Link>
                <Link href="/user/settings?page=my-shop">
                  <IconButton icon={<ShoppingBag size={18} />} title="My Shop" />
                </Link>
                
                <IconButton icon={<Bell size={18} />} title="Notifications" />
                
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
                    <MenuItem
                      icon={<Store size={16} />}
                      text="My Shop"
                      as={Link}
                      href="/user/settings?page=my-shop"
                    />
                    <MenuItem
                      icon={<Settings size={16} />}
                      text="Settings"
                      as={Link}
                      href="/user/settings?page=profile"
                    />
                     <MenuItem
                      icon={<Star size={16} />}
                      text="Feedback"
                      as={Link}
                      href="/feedback/11"
                    />
                     <MenuItem
                      icon={<LogOut size={16} />}
                      text="Logout"
                      as={Link}
                      href="/user/settings?page=logout"
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
            router.push("/user/create-ad")
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
