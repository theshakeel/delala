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
  <header className="sticky top-0 z-50 bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="h-16 flex items-center justify-between gap-4">

      {/* Left: Mobile menu + Logo + User */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded hover:bg-gray-100 transition"
          aria-label="Open sidebar menu"
        >
          <MenuIcon className="w-5 h-5 text-gray-700" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--delala-green)] text-white font-bold text-lg">
            D
          </div>
          <span className="hidden sm:block font-semibold text-gray-800">Delala</span>
        </Link>

        {/* User / Join */}
        {user ? (
          <Link
            href="/user/settings?page=my-profile"
            className="hidden sm:flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition"
          >
            <img
              src={user.avatar || "/images/user.png"}
              alt="user"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium">{user.name || "User"}</span>
          </Link>
        ) : (
          <button
            onClick={() => openModal("register")}
            className="hidden sm:flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 transition text-sm font-medium"
          >
            <img src="/images/user.png" alt="user" className="w-6 h-6 rounded-full" />
            <span>Join Me</span>
          </button>
        )}

        {/* Mobile Search */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded hover:bg-gray-100 transition"
          aria-label="Open search"
        >
          <SearchIcon className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Center: Search & Filters */}
      <form onSubmit={submitSearch} className="flex-1 hidden md:flex flex-col relative">
        <div className="flex items-center gap-2 w-full max-w-3xl">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search, Whatever you need..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 outline-none focus:border-[var(--delala-green)] transition"
          />
          <button type="submit" className="bg-[var(--delala-green)] text-white p-2 rounded-full hover:bg-green-600 transition">
            <SearchIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setFilterOpen(!filterOpen)}
            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
          >
            <FilterIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <div ref={filterRef} className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg p-4 z-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Region</label>
                <select
                  className="mt-1 block w-full border rounded p-2"
                  value={selectedRegion?.slug || ""}
                  onChange={(e) => {
                    const region = regions.find(r => r.slug === e.target.value);
                    setSelectedRegion(region || null);
                    setSelectedZone(null);
                  }}
                >
                  <option value="">All Regions</option>
                  {regions.map(r => <option key={r.slug} value={r.slug}>{r.region}</option>)}
                </select>
              </div>
              {selectedRegion?.zones?.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Zone</label>
                  <select
                    className="mt-1 block w-full border rounded p-2"
                    value={selectedZone?.slug || ""}
                    onChange={(e) => {
                      const zone = selectedRegion.zones.find(z => z.slug === e.target.value);
                      setSelectedZone(zone || null);
                    }}
                  >
                    <option value="">All Zones</option>
                    {selectedRegion.zones.map(z => <option key={z.slug} value={z.slug}>{z.zone}</option>)}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  className="mt-1 block w-full border rounded p-2"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  {categories.map(c => <option key={c.slug}>{c.categoryName}</option>)}
                </select>
              </div>
            </div>
            <button
              className="mt-3 w-full bg-[var(--delala-green)] text-white py-2 rounded hover:bg-green-600 transition"
              onClick={() => { submitSearch(); setFilterOpen(false); }}
            >
              Apply Filters
            </button>
          </div>
        )}
      </form>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Favorites */}
        <Link href="/user/settings?page=saved-ads" className="relative p-2 rounded hover:bg-gray-100 transition">
          <Heart className="w-5 h-5 text-gray-700" />
        </Link>

        {/* Messages */}
        <div className="relative">
          <button onClick={() => setMessagesOpen(!messagesOpen)} className="p-2 rounded hover:bg-gray-100 transition">
            <MessageSquare className="w-5 h-5 text-gray-700" />
          </button>
          {messagesOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50">
              <div className="p-2 border-b flex justify-between items-center">
                <h5 className="font-semibold">Messages ({messagesCount || 0})</h5>
                <Link href="/messages" className="text-blue-500 text-sm">View All</Link>
              </div>
              <ul className="divide-y max-h-64 overflow-y-auto">
                {messages.map(m => (
                  <li key={m.id} className="p-2 flex items-start gap-2 hover:bg-gray-50">
                    <img src={m.avatar} alt="avatar" className="w-8 h-8 rounded-full"/>
                    <div className="flex-1">
                      <h6 className="font-medium">{m.name} <span className="text-xs text-gray-400">{m.time}</span></h6>
                      <p className="text-sm text-gray-600 truncate">{m.message}</p>
                    </div>
                    {m.count > 0 && <span className="text-xs bg-red-500 text-white rounded-full px-1">{m.count}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="p-2 rounded hover:bg-gray-100 transition relative">
            <Bell className="w-5 h-5 text-gray-700" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">{notificationsCount}</span>
            )}
          </button>
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50">
              <div className="p-2 border-b flex justify-between items-center">
                <h5 className="font-semibold">Notifications ({notificationsCount || 0})</h5>
                <Link href="/notifications" className="text-blue-500 text-sm">View All</Link>
              </div>
              <ul className="divide-y max-h-64 overflow-y-auto">
                {notifications.map(n => (
                  <li key={n.id} className="p-2 flex items-start gap-2 hover:bg-gray-50">
                    <img src={n.avatar} alt="avatar" className="w-8 h-8 rounded-full"/>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{n.message}</p>
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
          onClick={() => user ? router.push("/user/create-ad") : openModal("login")}
          className="ml-2 px-4 py-2 rounded-full bg-[var(--delala-green)] text-white hover:bg-green-600 transition flex items-center gap-1"
        >
          <ShoppingBag className="w-5 h-5" />
          Post Your Ad
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Slide-Over */}
  {mobileMenuOpen && (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black bg-opacity-40" onClick={() => setMobileMenuOpen(false)}></div>
      <div className="relative w-80 max-w-full bg-white h-full shadow-xl p-4 overflow-y-auto">
        <button className="absolute top-4 right-4 text-gray-600" onClick={() => setMobileMenuOpen(false)}>
          <X className="w-5 h-5" />
        </button>
        <div className="mt-8 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-full px-4 py-2 outline-none"
          />
          <select
            className="w-full border rounded p-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            {categories.map(c => <option key={c.slug}>{c.categoryName}</option>)}
          </select>
          <select
            className="w-full border rounded p-2"
            value={selectedRegion?.slug || ""}
            onChange={(e) => {
              const region = regions.find(r => r.slug === e.target.value);
              setSelectedRegion(region || null);
              setSelectedZone(null);
            }}
          >
            <option value="">All Regions</option>
            {regions.map(r => <option key={r.slug} value={r.slug}>{r.region}</option>)}
          </select>
          {selectedRegion?.zones?.length > 0 && (
            <select
              className="w-full border rounded p-2"
              value={selectedZone?.slug || ""}
              onChange={(e) => {
                const zone = selectedRegion.zones.find(z => z.slug === e.target.value);
                setSelectedZone(zone || null);
              }}
            >
              <option value="">All Zones</option>
              {selectedRegion.zones.map(z => <option key={z.slug} value={z.slug}>{z.zone}</option>)}
            </select>
          )}
          <button
            className="w-full bg-[var(--delala-green)] text-white py-2 rounded mt-2"
            onClick={() => { submitSearch(); setMobileMenuOpen(false); }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )}
</header>

);

}
