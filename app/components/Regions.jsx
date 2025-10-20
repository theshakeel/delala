"use client";
import Link from "next/link";

import { useState, useEffect, useRef } from "react";
import { api } from "../lib/api";

export default function Regions({ regions = [], categories = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedLocationSlug, setSelectedLocationSlug] = useState("all-ethiopia");
  const [selectedLocationName, setSelectedLocationName] = useState("All Ethiopia");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  if (!search.trim()) {
    setSuggestions([]);
    return;
  }

  const timeout = setTimeout(async () => {
    setLoading(true);
    try {
      const data = await api.searchAds(search, selectedLocationSlug);

      const formatted = data.map((ad) => {
        const categoryName = ad.category_slug.replace(/-/g, " ");
        let title = ad.title;
        if (title.toLowerCase().includes(categoryName.toLowerCase())) {
          title = title.replace(new RegExp(categoryName, "i"), "");
        }
        title = title
          .toLowerCase()
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
          .trim();
        return { ...ad, formattedTitle: title };
      });

      setSuggestions(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, 300);

  return () => clearTimeout(timeout);
}, [search, selectedLocationSlug]);
  const dropdownRef = useRef();

useEffect(() => {
  if (!search.trim()) {
    setSuggestions([]);
    return;
  }

  const timeout = setTimeout(async () => {
    setLoading(true);
    try {
      const data = await api.searchAds(search, selectedLocationSlug);

      const formatted = data.map((ad) => {
        const categoryName = ad.category_slug.replace(/-/g, " ");
        let title = ad.title;
        if (title.toLowerCase().includes(categoryName.toLowerCase())) {
          title = title.replace(new RegExp(categoryName, "i"), "");
        }
        title = title
          .toLowerCase()
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
          .trim();
        return { ...ad, formattedTitle: title };
      });

      setSuggestions(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, 300);

  return () => clearTimeout(timeout);
}, [search, selectedLocationSlug]);


  // Close suggestions dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredRegions = regions.filter(r =>
    r.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-[var(--delala-green)] rounded-b-3xl text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">
            What are you looking for?
          </h1>
        </div>

        {/* Search bar */}
        <div className="max-w-3xl mx-auto relative">
          <div className="flex items-center gap-2 bg-white rounded-full p-2 text-gray-700 shadow-md">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-white px-3 rounded-full outline-none text-sm flex items-center gap-1 border border-gray-200"
            >
              <span>{selectedLocationName}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <input
              type="text"
              className="flex-1 outline-none px-4 py-2 rounded-full border border-gray-300 focus:border-[var(--delala-green)]"
              placeholder="What are you looking for?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="bg-[var(--delala-green)] text-white px-4 py-2 rounded-full font-medium">
              Search
            </button>
          </div>

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute z-50 w-full bg-white shadow-lg rounded-lg mt-2 max-h-64 overflow-y-auto"
            >
              {loading ? (
                <div className="p-3 text-gray-500 text-sm">Loading...</div>
              ) : (
                suggestions.map((ad) => (
                
                <a
                  key={ad.id}
                  href={`/${ad.category_slug}/${ad.slug}`}
                  className="ad-item block px-4 py-2 border-b last:border-b-0 transition-all duration-200"
                >
                  <div className="ad-title">{ad.title}</div>
                  <div className="ad-category">{ad.category_slug.replace(/-/g, " ")}</div>
                </a>

                ))
              )}
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="block sm:hidden max-w-4xl mx-auto mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-800">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white rounded-lg p-3 text-center shadow-sm">
              <Link href={'/'+cat.slug} onClick={() => setMobileMenuOpen(false)}>
                <div className="text-3xl mb-2 fontes">{cat.categoryName}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Regions modal */}
      {isOpen && (
        <div className=" fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 block md:hidden">
          <div className="bg-white text-gray-800 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 relative mlimit">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-gray-600 text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              {selectedRegion ? "Select Zone" : "Select Region"}
            </h2>

            <div className="flex justify-between items-center mb-4">
              {selectedRegion ? (
                <button
                  onClick={() => setSelectedRegion(null)}
                  className="text-sm text-[var(--delala-green)] underline"
                >
                  ← Back to Regions
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedLocationName("All Ethiopia");
                    setSelectedLocationSlug("all-ethiopia");
                    setIsOpen(false);
                  }}
                  className="bg-[var(--delala-green)] text-white px-4 py-2 rounded-full"
                >
                  All Ads
                </button>
              )}
            </div>

            {!selectedRegion && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredRegions.map((r) => (
                  <div
                    key={r.slug}
                    className="border rounded-lg p-3 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedRegion(r);
                      setSelectedLocationName(r.region);
                      setSelectedLocationSlug(r.slug);
                    }}
                  >
                    <span>{r.region}</span>
                    <span className="text-sm text-gray-500">{r.value}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedRegion && (
              <div>
                <div
                  className="border rounded-lg p-3 flex justify-between items-center hover:bg-gray-100 cursor-pointer mb-3"
                  onClick={() => {
                    setSelectedLocationName(selectedRegion.region);
                    setSelectedLocationSlug(selectedRegion.slug);
                    setIsOpen(false);
                  }}
                >
                  <span className="font-semibold text-[var(--delala-green)]">
                    Load All ({selectedRegion.region})
                  </span>
                  <span className="text-sm text-gray-500">{selectedRegion.value}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedRegion.zones.map((z) => (
                    <div
                      key={z.slug}
                      className="border rounded-lg p-3 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedLocationName(z.zone);
                        setSelectedLocationSlug(z.slug);
                        setIsOpen(false);
                      }}
                    >
                      <span>{z.zone}</span>
                      <span className="text-sm text-gray-500">{z.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
