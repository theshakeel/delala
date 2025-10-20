"use client";

import { useState } from "react";
import Regions from "./Regions";
import Categories from "./Categories";

export default function HomeClient({ regions = [], categories = [], ads = [] }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <>
      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div id="mobileDrawer" className="fixed inset-0 z-60">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileDrawerOpen(false)} />
          <aside className="absolute left-0 top-0 w-80 bg-white h-full p-4 overflow-auto">
            <button className="mb-4" onClick={() => setMobileDrawerOpen(false)}>Close</button>
            <h3 className="font-semibold mb-2">Categories</h3>
            <nav className="space-y-2 text-sm">
              {categories.map(cat => (
                <a key={cat.slug} href={cat.slug} className="block px-2 py-2 rounded hover:bg-gray-50">
                  {cat.categoryName}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      )}

      <Regions regions={regions} categories={categories} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-16 lg:flex lg:gap-6">
        <Categories categories={categories} />

        <section className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Trending ads</h2>
            <div className="text-sm text-gray-500">
              Showing {ads.length} results
            </div>
          </div>

          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {ads.map((ad, idx) => (
              <article key={idx} className="masonry-card bg-white rounded-lg p-3 shadow-sm">
                <div className="overflow-hidden rounded-md">
                  <img
                    className="img-cover w-full"
                    src="https://placehold.co/400x300"
                    // src={ad.images?.[0] || "/placeholder.jpg"}
                    
                    alt={ad.title}
                  />
                </div>
                <div className="mt-3">
                  <div className="text-sm font-bold text-[var(--delala-green)]">RTB {ad.price}</div>
                  <div className="text-sm font-medium mt-1">{ad.title}</div>
                  <div className="text-xs text-gray-500 mt-2">{ad.location}</div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
