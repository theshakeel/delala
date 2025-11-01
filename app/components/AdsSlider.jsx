"use client";

import Link from "next/link";

// Individual Ad Card
function AdCard({ ad, idx, onClick }) {
  return (
    <Link
      href={`/${ad.category_slug}/${ad.slug}`}
      className="group relative block bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden min-w-[200px] max-w-[250px]"
      onClick={() => onClick?.(ad)}
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={ad.image || `https://picsum.photos/300/200?random=${idx}`}
          alt={ad.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {ad.sale && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow">
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
          <div className="text-sm font-bold text-[var(--delala-green)]">${ad.price || 384} / Fixed</div>
          <div className="text-xs text-gray-500 text-right">
            {ad.location || "Uttara, Dhaka"}<br />
            {ad.time || "30 min ago"}
          </div>
        </div>
      </div>
    </Link>
  );
}

// Normal Card Grid Component
export default function AdsSlider({ title, ads = [], handleAdClick }) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
          View All →
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ads.map((ad, idx) => (
          <AdCard key={`${ad.slug}-${idx}`} ad={ad} idx={idx} onClick={handleAdClick} />
        ))}
      </div>
    </div>
  );
}
