// lib/api.js
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  "https://offline.local/api";


export async function fetchAPI(path, { cache = "force-cache" } = {}) {
  const url = `${BASE_URL}${path}`;
  console.log("🟡 Fetching:", url);

  try {
    const res = await fetch(url, { cache });
    console.log("🔵 Status:", res.status, "for", url);

    if (!res.ok) {
      console.error("❌ HTTP Error:", res.status, "for", url);
      throw new Error(`HTTP ${res.status}`);
    }

    const json = await res.json();

    if (json === null || json === undefined) {
      console.error("⚠️ JSON null/undefined for:", url);
      return null;
    }

    // Optional deeper validation (if your endpoints should return objects)
    if (typeof json !== "object") {
      console.error("⚠️ Invalid JSON format for:", url, json);
      return null;
    }

    console.log("✅ Success:", url);
    return json;
  } catch (err) {
    console.warn(`⚠️ API fetch failed for ${url}:`, err.message);
    return null;
  }
}


export const api = {
  getSeller: (slug) => fetchAPI(`/seller/${slug}`, { cache: "no-store" }),
  getSellerFeedbacks: (slug) => fetchAPI(`/seller/feedbacks/${slug}`, { cache: "no-store" }),
  getSellerAds: (slug) => fetchAPI(`/seller/${slug}/ads`, { cache: "no-store" }),
  searchAds: (query, locationSlug) => fetchAPI(`/ads/search?q=${encodeURIComponent(query)}&location=${locationSlug}`, {
      cache: "no-store", }),
  getHomepageAds: (from = 0, to = 10) => fetchAPI(`/ads/random?from=${from}&to=${to}`, { cache: "no-store" }),
  getRegions: () => fetchAPI("/regions/with-count"),
  getCategories: () => fetchAPI("/categories/with-count"),
  getCategoriesAll: () => fetchAPI("/categories/all"),
  getAdsAll: (from = 0, to = 20) => fetchAPI(`/ads/random?from=${from}&to=${to}`, { cache: "no-store" }),
  getUser: (id) => fetchAPI(`/user/${id}`, { cache: "no-store" }),
  getUserAds: (id) => fetchAPI(`/user/${id}/ads`, { cache: "no-store" }),
  getCategoryAds: (slug) => fetchAPI(`/ads/category/${slug}`, { cache: "no-store" }),
};
