"use client";

import dynamic from "next/dynamic";

// ✅ Dynamically load About.jsx as a client-side component
const AboutMainSection = dynamic(() => import("./About"), {
  loading: () => (
    <div className="flex items-center justify-center h-[60vh]">
      <span className="text-gray-600 text-lg animate-pulse">
        Preparing content...
      </span>
    </div>
  ),
});

export default function ClientWrapper() {
  return <AboutMainSection />;
}
