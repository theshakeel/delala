"use client";

import { useState, useRef } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Categories({ categories = [] }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [panelPos, setPanelPos] = useState(null);
  const sidebarRef = useRef(null);

  // --- Color utility functions ---
  const getStageColor = (index) => {
    const colors = ["bg-emerald-500", "bg-pink-500", "bg-blue-500", "bg-purple-500", "bg-orange-500"];
    return colors[index % colors.length];
  };

  const getGradientColor = (index) => {
    const gradients = [
      "from-emerald-50 to-transparent",
      "from-pink-50 to-transparent",
      "from-blue-50 to-transparent",
      "from-purple-50 to-transparent",
      "from-orange-50 to-transparent",
    ];
    return gradients[index % gradients.length];
  };

  const getIconBgColor = (index) => {
    const colors = ["bg-emerald-100", "bg-pink-100", "bg-blue-100", "bg-purple-100", "bg-orange-100"];
    return colors[index % colors.length];
  };

  const getIconTextColor = (index) => {
    const colors = ["text-emerald-600", "text-pink-600", "text-blue-600", "text-purple-600", "text-orange-600"];
    return colors[index % colors.length];
  };

  // --- Hover Handlers ---
  const onCategoryEnter = (index, e) => {
    const itemRect = e.currentTarget.getBoundingClientRect();
    const sidebarRect = sidebarRef.current?.getBoundingClientRect();
    const left = ((sidebarRect ? sidebarRect.right : itemRect.right) + 12) -40;
    const top = itemRect.top;
    setPanelPos({ left, top, height: itemRect.height });
    setActiveCategory(index);
  };

  const onCategoryLeave = () => {
    setActiveCategory(null);
    setPanelPos(null);
  };

  return (
    <>
      <style jsx>{`
        .sidebar-shadow {
          box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .subcategory-shadow {
          box-shadow:
            0 10px 25px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .subcategory-link:hover {
          background: linear-gradient(90deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%);
          border-left: 3px solid var(--delala-green);
          padding-left: 13px;
        }

        @media (max-width: 768px) {
          .subcategory-panel {
            position: fixed !important;
            left: -50 !important;
            right: 0 !important;
            top: auto !important;
            width: 100% !important;
            transform: translateY(8px);
            z-index: 9999;
          }
        }
      `}</style>

      <aside
        ref={sidebarRef}
        id="sidebar"
        className="relative w-full md:w-80 shrink-0 bg-white rounded-2xl sidebar-shadow"
        style={{ overflow: "visible" }}
      >
        <div className="sticky top-16 h-full max-h-[calc(100vh-4rem)]" style={{ overflow: "visible" }}>
        
          {/* CATEGORY LIST */}
          <nav
            className="relative h-full pb-6"
            style={{ overflowY: "auto", overflowX: "visible" }}
          >
            <div className="p-2">
              {categories.map((cat, i) => (
                <div
                  key={cat.categoryName}
                  className={`category-item group relative ${
                    activeCategory === i ? "active" : ""
                  }`}
                >
                  <div
                    onMouseEnter={(e) => onCategoryEnter(i, e)}
                    // onMouseLeave={onCategoryLeave}
                    className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all duration-200 cursor-pointer rounded-xl mx-2 my-1"
                  >
                    <Link
                      href={cat.slug}
                      className="flex items-center gap-4 flex-1 category-link"
                    >
                      <div className="relative">
                        <img
                          src={cat.image}
                          alt={cat.categoryName}
                          className="w-12 h-12 rounded-xl object-cover border-2 border-gray-100 category-image"
                        />
                        <div
                          className={`absolute -top-1 -right-1 w-4 h-4 ${getStageColor(
                            i
                          )} rounded-full border-2 border-white`}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 group-hover:text-[var(--delala-green)] transition-colors">
                          {cat.categoryName}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="category-count text-xs px-2 py-1 rounded-full font-medium text-gray-600">
                            {cat.total} ads
                          </span>
                        </div>
                      </div>
                    </Link>

                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 chevron-icon transition-transform ${
                        activeCategory === i
                          ? "rotate-90 text-[var(--delala-green)]"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </aside>

      {/* SUBCATEGORY PANEL (Fixed-position) */}
      {activeCategory !== null && panelPos && (
        <div
          className="subcategory-panel bg-white border border-gray-200 rounded-2xl subcategory-shadow z-[9999]"
          style={{
            position: "fixed",
            left: `${panelPos.left}px`,
            top: `${Math.max(12, panelPos.top)}px`,
            width: "320px",
            maxHeight: "75vh",
            overflowY: "auto",
          }}
          onMouseEnter={() => setActiveCategory(activeCategory)}
          onMouseLeave={onCategoryLeave}
        >
          

          <ul className="py-2">
            {categories[activeCategory]?.subcategories?.map((sub) => (
              <li key={sub.name}>
                <Link
                  href={sub.slug}
                  className="subcategory-link flex justify-between items-center p-3 mx-2 rounded-lg transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-gray-700 font-medium">{sub.name}</span>
                  </div>
                  <span className="subcategory-count text-xs px-2 py-1 rounded-full font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100">
                    {sub.ads}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
