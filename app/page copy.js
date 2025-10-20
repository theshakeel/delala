"use client"; // Required for client-side interactivity like event listeners

import { useState, useEffect } from "react";
import Regions from "./components/Regions";
import Categories from "./components/Categories";
import { loadHomeData } from "./lib/dataProvider";
export default function HomePage() {
   const [regions, setRegions] = useState([]);
   const [categories, setCategories] = useState([]);
   const [ads, setAdds] = useState([]);
  // const { regions } = await loadHomeData();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
 useEffect(() => {
    loadHomeData().then(({ regions = [], categories = [], ads = [] }) => {
      setRegions(regions);
      setCategories(categories);
      setAdds(ads);
    });
  }, []);
  return (
    <>
      <main className="bg-gray-50 text-[var(--text)] antialiased">
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                id="openSidebarBtn"
                onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
                className="md:hidden p-2 rounded hover:bg-gray-100"
                aria-label="Open menu"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg" style={{ color: "var(--delala-green)" }}>
                  Delala
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="hidden sm:inline-flex p-2 rounded-full hover:bg-gray-100"
                title="Messages"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button className="bg-[var(--delala-green)] text-white rounded-md px-4 py-2 text-sm font-semibold hover:bg-green-600">
                SELL
              </button>
            </div>
          </div>
        </header>

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
                <a href="#" className="block px-2 py-2 rounded hover:bg-gray-50">
                  Vehicles
                </a>
                <a href="#" className="block px-2 py-2 rounded hover:bg-gray-50">
                  Mobile Phones
                </a>
                <a href="#" className="block px-2 py-2 rounded hover:bg-gray-50">
                  Electronics
                </a>
                <a href="#" className="block px-2 py-2 rounded hover:bg-gray-50">
                  Property
                </a>
              </nav>
            </aside>
          </div>
        )}

         <Regions regions={regions || []} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-16">
          <div className="lg:flex lg:gap-6">
      <Categories categories={categories} />
            

            <section className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Trending ads</h2>
                <div className="text-sm text-gray-500">Showing 1-12 of 50,000</div>
              </div>

              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {/* Cards */}
                {
                ads.map(({ alt, text, price, location, condition, imgText, imgHeight }) => (
                  <article
                    key={text}
                    className="masonry-card bg-white rounded-lg p-3 shadow-sm"
                  >
                    <div className="overflow-hidden rounded-md">
                      <img
                        className="img-cover"
                        src={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='${imgHeight}'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='20'>${encodeURIComponent(
                          imgText
                        )}</text></svg>`}
                        alt={alt}
                      />
                    </div>
                    <div className="mt-3">
                      <div className="text-sm font-bold text-[var(--delala-green)]">{price}</div>
                      <div className="text-sm font-medium mt-1">{text}</div>
                      <div className="text-xs text-gray-500 mt-2">
                        {location} • {condition}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </main>

        <footer className="bg-[var(--delala-footer)] text-white pt-12">
          <div className="skyline">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-14">
              <path
                d="M0,40 L30,40 L30,80 L80,80 L80,40 L150,40 L150,90 L210,90 L210,40 L300,40 L300,80 L360,80 L360,40 L420,40 L420,100 L480,100 L480,40 L540,40 L540,72 L600,72 L600,40 L660,40 L660,90 L720,90 L720,40 L780,40 L780,86 L840,86 L840,40 L900,40 L900,76 L960,76 L960,40 L1020,40 L1020,90 L1080,90 L1080,40 L1140,40 L1140,80 L1200,80 L1200,0 L0,0 Z"
                fill="#ffffff"
                opacity="0.15"
              ></path>
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
              <div>
                <h4 className="font-semibold mb-3">About us</h4>
                <ul className="space-y-2 text-sm">
                  <li>About delala</li>
                  <li>Terms & Conditions</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li>support@delala.com.et</li>
                  <li>Safety tips</li>
                  <li>Contact us</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Our apps</h4>
                <div className="flex gap-3">
                  <a href="#" className="inline-block">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Play"
                      style={{ height: "38px" }}
                    />
                  </a>
                  <a href="#" className="inline-block">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29_logo.svg"
                      alt="AppStore"
                      style={{ height: "38px" }}
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 pb-8">
              <div className="flex flex-wrap justify-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/30"></div>
                <div className="w-6 h-6 rounded-full bg-white/30"></div>
                <div className="w-6 h-6 rounded-full bg-white/30"></div>
                <div className="w-6 h-6 rounded-full bg-white/30"></div>
                <div className="w-6 h-6 rounded-full bg-white/30"></div>
              </div>

              <div className="text-sm">&copy; 2025 delala.com.et — All rights reserved.</div>
            </div>
          </div>
        </footer>

        <nav className="fixed bottom-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-3 py-2 z-50 md:hidden">
          <div className="flex gap-6 items-center">
            <button className="flex flex-col items-center text-sm text-gray-700">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 12h18M3 6h18M3 18h18"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Home</span>
            </button>
            <button className="flex flex-col items-center text-sm text-[var(--delala-green)]">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Sell</span>
            </button>
            <button className="flex flex-col items-center text-sm text-gray-700">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 12a5 5 0 100-10 5 5 0 000 10zM2 22a10 10 0 0120 0"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <span>Account</span>
            </button>
          </div>
        </nav>
      </main>
    </>
  );
}
