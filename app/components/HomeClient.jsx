"use client";
import Link from "next/link";
import { useState } from "react";
import Regions from "./Regions";
import Categories from "./Categories";
import AdsSlider from "./AdsSlider";
import FeaturedAds from "./FeaturedAds";
import CategoryAds from "./CategoryAds";

export default function HomeClient({ regions = [], categories = [], ads = [] }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
 const handleAdClick = (ad) => {
    console.log("Clicked ad:", ad);
  };
  return (
    <>
      {/* 🔹 Mobile Drawer */}
      {mobileDrawerOpen && (
        <div id="mobileDrawer" className="fixed inset-0 z-60">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <aside className="absolute left-0 top-0 w-80 bg-white h-full p-4 overflow-auto">
            <button className="mb-4" onClick={() => setMobileDrawerOpen(false)}>
              Close
            </button>
            <h3 className="font-semibold mb-2">Categories</h3>
            <nav className="space-y-2 text-sm">
              {categories.map((cat) => (
                <a
                  key={cat.slug}
                  href={cat.slug}
                  className="block px-2 py-2 rounded hover:bg-gray-50"
                >
                  {cat.categoryName}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* 🌆 HERO SECTION */}
      <section className="relative w-full h-[700px] overflow-hidden">
        {/* Background image */}
        <img
          src="/01.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* ✅ Proper backdrop overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-brightness-75"></div>

        {/* <div className="absolute inset-0 bg-black/70 backdrop-brightness-50"></div> */}

        {/* Optional soft gradient on top for visual depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-transparent"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-xl">
            Find Anything You Need — Instantly!
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-gray-200 mb-8 leading-relaxed">
            Discover great deals on vehicles, real estate, electronics, and much more. 
            Your next opportunity starts here.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
           

            <Link
              href="/ads/search"
              className="inline-flex items-center px-6 py-3 rounded-full border border-white/40 text-white font-medium hover:bg-white/10 transition-all duration-200"
            >
              Browse Listings
            </Link>
          </div>
        </div>

        {/* White fade-out bottom transition */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-white via-white/90 to-transparent"></div>
      </section>

      {/* 🟩 Category Overlap */}
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto">
          <Categories categories={categories} />
        </div>
      </div>
      <div>
      <FeaturedAds
        ads={ads}
      />
    </div>
    <div>
      <AdsSlider
        title="Featured Ads"
        ads={ads}
        handleAdClick={handleAdClick}
      />
    </div>
      <div>
      <CategoryAds
        ads={ads}
      />
    </div>
    

    </>
  );
}
