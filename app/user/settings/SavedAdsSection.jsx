"use client";

import { useState } from "react";
import { Trash2, X, FolderHeart, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function SavedAdsSection() {
  // --- Dummy data (replace later with API data)
  const [savedAds, setSavedAds] = useState([
    {
      id: 1,
      title: "iPhone 14 Pro Max 256GB",
      price: 1150,
      image: "https://via.placeholder.com/300x200.png?text=iPhone+14",
      category_slug: "mobiles",
      slug: "iphone-14-pro-max",
      location: "Karachi, Pakistan",
    },
    {
      id: 2,
      title: "Honda Civic 2021",
      price: 28000,
      image: "https://via.placeholder.com/300x200.png?text=Honda+Civic",
      category_slug: "vehicles-cars",
      slug: "honda-civic-2021",
      location: "Lahore, Pakistan",
    },
    {
      id: 3,
      title: "MacBook Air M2 2023",
      price: 1350,
      image: "https://via.placeholder.com/300x200.png?text=MacBook+Air",
      category_slug: "laptops",
      slug: "macbook-air-m2-2023",
      location: "Islamabad, Pakistan",
    },
  ]);

  // --- Remove one ad
  const handleRemove = (id) => {
    setSavedAds(savedAds.filter((ad) => ad.id !== id));
  };

  // --- Clear all
  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all saved ads?")) {
      setSavedAds([]);
    }
  };

  // --- API example (commented out)
  /*
  useEffect(() => {
    async function fetchSavedAds() {
      const res = await fetch("/api/saved-ads");
      const data = await res.json();
      setSavedAds(data.ads);
    }
    fetchSavedAds();
  }, []);
  */

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FolderHeart className="w-6 h-6 text-emerald-600" />
          Saved Ads
        </h2>
        {savedAds.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-red-600 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        )}
      </div>

      {savedAds.length === 0 ? (
        <div className="text-gray-500 bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-base">No saved ads yet.</p>
          <p className="text-sm mt-1">Browse ads and tap “❤️ Save” to add them here.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedAds.map((ad) => (
            <div
              key={ad.id}
              className="relative border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white group"
            >
              <button
                onClick={() => handleRemove(ad.id)}
                className="absolute top-2 right-2 bg-white/90 hover:bg-red-100 text-red-600 rounded-full p-1.5 shadow-sm transition"
                title="Remove from saved"
              >
                <X className="w-4 h-4" />
              </button>

              <Link href={`/${ad.category_slug}/${ad.slug}`} className="block">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-emerald-700">
                    {ad.title}
                  </h3>
                  <p className="text-emerald-600 font-medium mt-1">${ad.price}</p>
                  <p className="text-gray-500 text-sm mt-1">{ad.location}</p>
                  <div className="flex items-center text-emerald-600 text-xs mt-2">
                    <ExternalLink className="w-3.5 h-3.5 mr-1" />
                    View Ad
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
