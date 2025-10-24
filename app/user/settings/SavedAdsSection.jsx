"use client";

import { useEffect, useState } from "react";
import { Trash2, X, FolderHeart, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function SavedAdsSection() {
  const [savedAds, setSavedAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  // ✅ Fetch saved ads from Laravel
  useEffect(() => {
    const fetchSavedAds = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/user/saved-ads`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch saved ads");
        const json = await res.json();
        setSavedAds(json.data || []);
      } catch (err) {
        console.error("Error loading saved ads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedAds();
  }, []);

  // ✅ Remove one ad
  const handleRemove = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in first");

    try {
      const res = await fetch(`${API_BASE}/user/saved-ads/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        setSavedAds(savedAds.filter((ad) => ad.id !== id));
      } else {
        alert(json.message || "Failed to remove ad");
      }
    } catch (err) {
      console.error("Error removing ad:", err);
    }
  };

  // ✅ Clear all ads
  const handleClearAll = async () => {
    if (!confirm("Are you sure you want to clear all saved ads?")) return;

    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in first");

    try {
      const res = await fetch(`${API_BASE}/user/saved-ads/clear`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) setSavedAds([]);
      else alert(json.message || "Failed to clear ads");
    } catch (err) {
      console.error("Error clearing ads:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10">
        <FolderHeart className="w-8 h-8 mx-auto text-emerald-500 mb-2 animate-pulse" />
        Loading saved ads...
      </div>
    );
  }

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
          <p className="text-sm mt-1">
            Browse ads and tap “❤️ Save” to add them here.
          </p>
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
                  <p className="text-emerald-600 font-medium mt-1">
                    ${ad.price}
                  </p>
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
