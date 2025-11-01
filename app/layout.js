// RootLayout.jsx or layout.jsx
export const revalidate = 0;

import "./globals.css";
import { AuthProvider } from "./context/AuthProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import { loadHomeData } from "../app/lib/dataProvider";

export default async function RootLayout({ children }) {
  const { regions, categories, adsAll } = await loadHomeData(); // ✅ Fetch data on server

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {/* ✅ Pass data to Header */}
          <Header regions={regions} categories={categories} ads={adsAll?.ads} />
          {children}
          <Footer />
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
