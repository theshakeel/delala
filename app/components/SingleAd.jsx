"use client";

import Link from "next/link";
import { Heart, Share2 } from "lucide-react";

export default function SingleAd({ ad, idx, onClick }) {
  return (
    <div className="relative group min-w-[200px] max-w-[250px]">
      {/* Card Link */}
      <Link
        href={`/${ad.category_slug}/${ad.slug}`}
        className="block bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
        onClick={() => onClick?.(ad)}
      >
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={ad.image || `https://picsum.photos/300/200?random=${idx}`}
            alt={ad.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Sale Badge */}
          {ad.sale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow">
              SALE
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 border-t border-gray-100 flex flex-col justify-between h-36">
          <div>
            <div className="text-xs text-gray-400 mb-1">{ad.category || "Fashion/Shoes"}</div>
            <div className="text-sm font-medium line-clamp-2">{ad.description || "Lorem ipsum dolor sit amet"}</div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="text-sm font-bold text-[var(--delala-green)]">
              ${ad.price || 384} / Fixed
            </div>
            <div className="text-xs text-gray-500 text-right">
              {ad.location || "Uttara, Dhaka"}<br />
              {ad.time || "30 min ago"}
            </div>
          </div>
        </div>
      </Link>

      {/* Top-right icons (outside Link to avoid triggering click) */}
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button className="bg-white/90 p-1 rounded-full shadow hover:bg-white transition">
          <Heart className="h-4 w-4 text-red-500" />
        </button>
        <button className="bg-white/90 p-1 rounded-full shadow hover:bg-white transition">
          <Share2 className="h-4 w-4 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
