"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthProvider";
import {
  Heart,
  MessageSquare,
  Bell,PlusCircle,
  SearchIcon,
  ShoppingBag,
  ChevronDown,
  LogOut,
  Settings,
  Star,
  Store,
  X,
  Menu as MenuIcon,
  Filter as FilterIcon,
} from "lucide-react";


export default function Header({ regions = [], categories = [] }) {
  const { user: authUser, logout, openModal } = useAuth();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(null);
  const [notificationsCount, setNotificationsCount] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const user = authUser;

  const searchRef = useRef(null);
  const filterRef = useRef(null);

  // close dropdowns on escape
  useEffect(() => {
    const onKey = () => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileMenuOpen(false);
        setFilterOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // dummy suggestions for now
  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }
    const dummy = [
      { id: "1", title: "Sample Ad 1", link: "/sample1" },
      { id: "2", title: "Sample Ad 2", link: "/sample2" },
      { id: "3", title: "Sample Ad 3", link: "/sample3" },
    ];
    setSuggestions(dummy);
  }, [search]);

  const submitSearch = (e) => {
    e?.preventDefault();
    // implement real routing
    router.push(`/ads/search?q=${encodeURIComponent(search)}&category=${selectedCategory}`);
  };

 return (
  <header className="sticky top-0 z-50 bg-white shadow-md">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between h-16">

      {/* Left: Menu Button + Logo + User Profile */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded hover:bg-gray-100 transition"
          aria-label="Open sidebar menu"
        >
          <MenuIcon className="w-6 h-6 text-gray-700" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[var(--delala-green)] text-white font-extrabold flex items-center justify-center text-xl leading-none select-none">
            D
          </div>
          <span className="hidden sm:inline-block text-lg font-semibold text-gray-900">Delala</span>
        </Link>

        {/* User Info or Join Button */}
        {user ? (
          <Link
            href="/user/settings?page=my-profile"
            className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100 transition"
          >
            <img
              src={user.avatar || "/images/user.png"}
              alt="User avatar"
              className="w-7 h-7 rounded-full object-cover"
            />
            <span className="font-medium text-gray-800 truncate max-w-xs">{user.name || "User"}</span>
          </Link>
        ) : (
          <button
            onClick={() => openModal("register")}
            className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-semibold transition"
          >
            <img src="/images/user.png" alt="User icon" className="w-7 h-7 rounded-full" />
            <span>Join Me</span>
          </button>
        )}

        {/* Mobile Search Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded hover:bg-gray-100 transition"
          aria-label="Open search"
        >
          <SearchIcon className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Center: Search & Filters */}
      <form
        onSubmit={submitSearch}
        className="hidden md:flex flex-grow max-w-4xl items-center gap-3 relative"
      >
        <input
          ref={searchRef}
          type="text"
          placeholder="Search, Whatever you need..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow rounded-full border border-gray-300 px-5 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--delala-green)] transition"
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-[var(--delala-green)] hover:bg-green-700 rounded-full p-3 transition"
          aria-label="Submit search"
        >
          <SearchIcon className="w-5 h-5 text-white" />
        </button>

        <button
          type="button"
          className="bg-gray-100 hover:bg-gray-200 rounded-full p-3 transition"
          onClick={() => setFilterOpen(!filterOpen)}
          aria-label="Toggle filters"
        >
          <FilterIcon className="w-5 h-5 text-gray-700" />
        </button>

        {/* Filter Panel */}
        {filterOpen && (
          <div
            ref={filterRef}
            className="absolute top-full left-0 right-0 mt-3 bg-white shadow-lg rounded-lg p-5 z-50 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Region Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Region</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                value={selectedRegion?.slug || ""}
                onChange={(e) => {
                  const region = regions.find((r) => r.slug === e.target.value);
                  setSelectedRegion(region || null);
                  setSelectedZone(null);
                }}
              >
                <option value="">All Regions</option>
                {regions.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.region}
                  </option>
                ))}
              </select>
            </div>

            {/* Zone Filter */}
            {selectedRegion && selectedRegion.zones?.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Zone</label>
                <select
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={selectedZone?.slug || ""}
                  onChange={(e) => {
                    const zone = selectedRegion.zones.find((z) => z.slug === e.target.value);
                    setSelectedZone(zone || null);
                  }}
                >
                  <option value="">All Zones</option>
                  {selectedRegion.zones.map((z) => (
                    <option key={z.slug} value={z.slug}>
                      {z.zone}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Apply Filters Button */}
            <div className="md:col-span-3">
              <button
                type="button"
                className="w-full bg-[var(--delala-green)] hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
                onClick={() => {
                  submitSearch();
                  setFilterOpen(false);
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Right: Icons and Post Button */}
      <div className="flex items-center gap-4">
        {/* Favorites */}
        <Link href="/user/settings?page=saved-ads" className="relative p-2 rounded hover:bg-gray-100 transition">
          <Heart className="w-6 h-6 text-gray-700" />
          {/* Uncomment badge if needed */}
          {/* <sup className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">{favoritesCount || 0}</sup> */}
        </Link>

        {/* Messages */}
        <div className="relative">
          <button
            onClick={() => setMessagesOpen(!messagesOpen)}
            className="p-2 rounded hover:bg-gray-100 transition"
            aria-label="Toggle messages"
          >
            <MessageSquare className="w-6 h-6 text-gray-700" />
            {/* Badge */}
            {/* <sup className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">{messagesCount || 0}</sup> */}
          </button>
          {messagesOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50">
              <div className="p-3 border-b flex justify-between items-center">
                <h5 className="font-semibold">Messages ({messagesCount || 0})</h5>
                <Link href="/messages" className="text-blue-600 text-sm hover:underline">
                  View All
                </Link>
              </div>
              <ul className="divide-y">
                {messages.map((m) => (
                  <li key={m.id} className="p-3 flex gap-3 hover:bg-gray-50 transition">
                    <img src={m.avatar} alt="avatar" className="w-9 h-9 rounded-full object-cover" />
                    <div className="flex-1 overflow-hidden">
                      <h6 className="font-semibold truncate">
                        {m.name} <span className="text-xs font-normal text-gray-400">{m.time}</span>
                      </h6>
                      <p className="text-sm text-gray-600 truncate">{m.message}</p>
                    </div>
                    {m.count > 0 && (
                      <span className="text-xs bg-red-600 text-white rounded-full px-2 flex items-center justify-center min-w-[20px]">
                        {m.count}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded hover:bg-gray-100 transition"
            aria-label="Toggle notifications"
          >
            <Bell className="w-6 h-6 text-gray-700" />
            <sup className="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full px-1">
              {notificationsCount || 0}
            </sup>
          </button>
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50">
              <div className="p-3 border-b flex justify-between items-center">
                <h5 className="font-semibold">Notifications ({notificationsCount || 0})</h5>
                <Link href="/notifications" className="text-blue-600 text-sm hover:underline">
                  View All
                </Link>
              </div>
              <ul className="divide-y">
                {notifications.map((n) => (
                  <li key={n.id} className="p-3 flex gap-3 hover:bg-gray-50 transition">
                    <img src={n.avatar} alt="avatar" className="w-9 h-9 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{n.message}</p>
                      <span className="text-xs text-gray-400">{n.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Post Ad Button */}
        <button
          onClick={() => (user ? router.push("/user/create-ad") : openModal("login"))}
          className="ml-3 inline-flex items-center gap-2 bg-[var(--delala-green)] hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-full transition"
        >
          <PlusCircle className="w-6 h-6" />
          Post Your Ad
        </button>
      </div>
    </div>

    {/* Mobile Slide-Over */}
    {mobileMenuOpen && (
      <div className="fixed inset-0 z-50 flex">
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <aside className="relative w-80 max-w-full bg-white h-full shadow-xl p-6 overflow-y-auto">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col gap-5 mt-12">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--delala-green)] transition"
            />

            <select
              className="w-full border border-gray-300 rounded-md p-3"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.categoryName}
                </option>
              ))}
            </select>

            <select
              className="w-full border border-gray-300 rounded-md p-3"
              value={selectedRegion?.slug || ""}
              onChange={(e) => {
                const region = regions.find((r) => r.slug === e.target.value);
                setSelectedRegion(region || null);
                setSelectedZone(null);
              }}
            >
              <option value="">All Regions</option>
              {regions.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.region}
                </option>
              ))}
            </select>

            {selectedRegion && selectedRegion.zones?.length > 0 && (
              <select
                className="w-full border border-gray-300 rounded-md p-3"
                value={selectedZone?.slug || ""}
                onChange={(e) => {
                  const zone = selectedRegion.zones.find((z) => z.slug === e.target.value);
                  setSelectedZone(zone || null);
                }}
              >
                <option value="">All Zones</option>
                {selectedRegion.zones.map((z) => (
                  <option key={z.slug} value={z.slug}>
                    {z.zone}
                  </option>
                ))}
              </select>
            )}

            <button
              className="w-full bg-[var(--delala-green)] hover:bg-green-700 text-white py-3 rounded-full font-semibold transition"
              onClick={() => {
                submitSearch();
                setMobileMenuOpen(false);
              }}
            >
              Apply Filters
            </button>
          </div>
        </aside>
      </div>
    )}
  </header>
);

}
