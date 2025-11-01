"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

export default function Categories({ categories = [] }) {
  const scrollRef = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    let animationFrame;

    const scroll = () => {
      if (!container) return;
      scrollAmount += 0.3; // speed control
      if (scrollAmount >= container.scrollWidth / 20000) scrollAmount = 0;
      container.scrollLeft = scrollAmount;
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    container.addEventListener("mouseenter", () =>
      cancelAnimationFrame(animationFrame)
    );
    container.addEventListener("mouseleave", () => {
      animationFrame = requestAnimationFrame(scroll);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Utility for colors
  const colorClasses = [
    "bg-emerald-100 text-emerald-600",
    "bg-pink-100 text-pink-600",
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-orange-100 text-orange-600",
  ];

  return (
    <section className="relative w-full overflow-hidden" style={{marginTop:"-210px"}}>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-6 py-4"
        style={{
          scrollBehavior: "smooth",
          whiteSpace: "nowrap",
        }}
      >
        {[...categories, ...categories].map((cat, i) => (
          <Link
            key={`${cat.slug}-${i}`}
            href={cat.slug}
            className="group relative flex-shrink-0 w-56 sm:w-60 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="relative">
              <img
                src={cat.image}
                alt={cat.categoryName}
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
            </div>

            <div className="p-4">
              <h3 className="text-gray-900 font-semibold text-lg truncate">
                {cat.categoryName}
              </h3>
              <div
                className={`inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full ${
                  colorClasses[i % colorClasses.length]
                }`}
              >
                {cat.total} Ads
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
