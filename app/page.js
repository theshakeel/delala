export const revalidate = 0;
import { loadHomeData } from "./lib/dataProvider";
import HomeClient from "./components/HomeClient";
// import Header from "./components/Header";
// import Footer from "./components/Footer";


export default async function HomePage() {
  const { regions, categories, ads } = await loadHomeData();

  return (
    <main className="bg-gray-50 text-[var(--text)] antialiased">
      {/* <Header /> */}
      <HomeClient regions={regions} categories={categories} ads={ads.ads} />
      {/* <Footer /> */}
    </main>
  );
}
