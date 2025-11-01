"use client";

import { useState, useEffect } from "react";

export default function FeaturedAds({ ads = [] }) {
  const [mainIndex, setMainIndex] = useState(0);

  // Cycle through ads every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMainIndex((prev) => (prev + 1) % ads.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [ads.length]);

  if (!ads.length) return null;

  const mainAd = ads[mainIndex];
  const previewAds = ads.filter((_, i) => i !== mainIndex).slice(0, 4);

  return (
    <div class="max-w-7xl mx-auto">
  <div class="flex flex-col md:flex-row gap-4">
    
    <div className="w-full md:w-1/2 p-16 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Discover Our Featured Classified Ads
        </h2>
        <p className="text-gray-700 mb-6">
            Find exactly what you’re looking for among our hand-picked featured ads. 
            From the latest electronics to premium properties, explore high-quality listings 
            that match your needs and lifestyle. Lorem ipsum dolor sit amet consectetur 
            adipisicing elit, aspernatur illum vel sunt libero voluptatum repudiandae veniam 
            maxime tenetur fugiat eaque alias nobis doloremque culpa nam.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200">
            View All Featured
        </button>
    </div>


    <div class="w-full md:w-1/2  rounded-lg">
   <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Main Ad */}
<div className="relative rounded-2xl overflow-hidden shadow-lg group">
  {/* Background Image */}
  <img
    src={mainAd.image || `https://picsum.photos/800/500?random=${mainAd.id}`}
    alt={mainAd.title}
    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/30"></div>

  {/* Content over image */}
  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
    {mainAd.sale && (
      <div className="absolute top-4 left-4 bg-blue-600 px-3 py-1.5 rounded-full font-semibold text-xs shadow-lg">
        FOR RENT
      </div>
    )}
    <h1 className="text-xl md:text-2xl font-bold mb-1">{mainAd.title}</h1>
    <div className="flex justify-between items-center mb-2 text-sm md:text-base">
      <span>{mainAd.location}</span>
      <span className="font-semibold text-blue-400">${mainAd.price}</span>
    </div>
    <p className="text-sm md:text-base mb-3 line-clamp-2">{mainAd.description}</p>
    <div className="flex flex-wrap gap-2">
      <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md font-medium hover:bg-blue-700 transition-colors shadow-md">
        Schedule Tour
      </button>
      <button className="border-2 border-blue-600 text-blue-200 px-4 py-2 text-sm rounded-md font-medium hover:bg-blue-600/20 transition-colors">
        Call {mainAd.phone || "(555) 123-4567"}
      </button>
    </div>
  </div>
</div>


      {/* Preview Ads */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {previewAds.map((ad, idx) => (
    <a
      key={ad.id || idx}
      href={`/${ad.category_slug}/${ad.slug}`}
      className="block rounded-xl overflow-hidden shadow-md cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <img
        src={ad.image || `https://picsum.photos/300/200?random=${idx}`}
        alt={ad.title}
        className="w-full h-32 object-cover"
      />
    </a>
  ))}
</div>

    </main>
    </div>

  </div>
</div>

    
  );
}
