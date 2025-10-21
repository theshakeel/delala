// lib/api.js
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  "https://offline.local/api";

export async function fetchAPI(path, { cache = "force-cache" } = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { cache });
    if (!res.ok) {console.log("path ", path, "failed"); throw new Error(`HTTP ${res.status}`);}
    return res.json();
  } catch (err) {
    console.warn(`⚠️ API fetch failed for ${path}:`, err.message);
    // Return null so dataProvider can trigger dummy fallback
    return null;
  }
}

export const api = {
  getSeller: (slug) => fetchAPI(`/seller/${slug}`, { cache: "no-store" }),
  getSellerFeedbacks: (slug) => fetchAPI(`/seller/feedbacks/${slug}`, { cache: "no-store" }),

  // 🛒 Seller ads
  getSellerAds: (slug) => fetchAPI(`/seller/${slug}/ads`, { cache: "no-store" }),
  searchAds: (query, locationSlug) =>
    fetchAPI(`/ads/search?q=${encodeURIComponent(query)}&location=${locationSlug}`, {
      cache: "no-store",
    }),
  // 🏠 Homepage
  getHomepageAds: (from = 0, to = 10) =>
    fetchAPI(`/ads/random?from=${from}&to=${to}`, { cache: "no-store" }),

  // 🌍 Regions with ad count
  getRegions: () => fetchAPI("/regions/with-count"),

  // 🗂️ Categories with subcategories and counts
  getCategories: () => fetchAPI("/categories/with-count"),
  getCategoriesAll: () => fetchAPI("/categories/all"),
  getAdsAll: (from = 0, to = 20) => fetchAPI(`/ads/random?from=${from}&to=${to}`, { cache: "no-store" }),
  // getAdsAll: () => fetchAPI("/ads/all"),
  getUser: (id) => fetchAPI(`/user/${id}`, { cache: "no-store" }),
  getUserAds: (id) => fetchAPI(`/user/${id}/ads`, { cache: "no-store" }),

  // 📦 Ads by category
  getCategoryAds: (slug) => fetchAPI(`/ads/category/${slug}`, { cache: "no-store" }),
};
