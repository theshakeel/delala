import { api } from "./api";

export async function loadHomeData() {
  try {
    const [regions, categories,categoriesAll, adsAll, ads] = await Promise.all([
      api.getRegions(),
      api.getCategories(),
      api.getCategoriesAll(),
      api.getHomepageAds(),
      api.getAdsAll(),
    ]);
    

    if (!regions || !categories || !ads) {
      console.error("❌ One or more API responses are null or invalid");
      throw new Error("API returned null or invalid response");
    }

    return { regions, categories, categoriesAll, ads, adsAll };
  } catch (err) {
    console.error("❌ Failed to load home data from API:", err.message);
    throw err;
  }
}
