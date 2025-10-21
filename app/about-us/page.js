import { Suspense } from "react";
import { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";

// ✅ SEO Metadata
export const metadata = {
  title: "About Us | Delala – Sell Faster, Buy Smarter",
  description:
    "Delala is your trusted online marketplace for selling and buying almost anything. Post ads, connect with real people, and experience safe, fast trading.",
  keywords: [
    "Delala",
    "About Delala",
    "Buy and sell online",
    "Free classifieds",
    "Marketplace",
    "Ethiopia classifieds",
    "Sell faster",
    "Buy smarter",
  ],
  openGraph: {
    title: "Delala – The Best Place to Sell Anything to Real People",
    description:
      "Delala makes buying and selling easy and safe with a simple ad-posting process and trusted community connections.",
    url: "https://delala.com/about-us",
    siteName: "Delala",
    images: [
      {
        url: "/images/marketplace-illustration.jpg",
        width: 1200,
        height: 630,
        alt: "Delala – Buy and Sell Easily",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delala – Sell Faster, Buy Smarter",
    description:
      "Join Delala, the biggest online classifieds platform for safe, easy, and fast buying and selling.",
    images: ["/images/marketplace-illustration.jpg"],
  },
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[60vh]">
            <span className="text-gray-600 text-lg animate-pulse">
              Loading About Us page...
            </span>
          </div>
        }
      >
        <ClientWrapper />
      </Suspense>
    </main>
  );
}
