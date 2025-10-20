"use client";
import React, { useState } from "react";

export default function SafetyClient({ data }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const intro = data[0];
  const categories = data.slice(1);

  return (
    <div className="bg-white shadow-sm border rounded-lg p-8">
      {/* Intro Section */}
      <div
        className="prose max-w-none text-gray-700 mb-10"
        dangerouslySetInnerHTML={{ __html: intro.html }}
      />

      {/* Safety Categories */}
      <div className="space-y-6">
        {categories.map((section, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleCategory(section.category)}
              className="w-full text-left px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <span className="text-lg font-semibold text-gray-900">
                {section.category}
              </span>
              <span className="text-gray-400 text-xl">
                {expandedCategory === section.category ? "−" : "+"}
              </span>
            </button>

            {expandedCategory === section.category && (
              <ul className="px-6 py-4 space-y-2 bg-white">
                {section.tips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-start text-gray-700 leading-relaxed"
                  >
                    <span className="text-emerald-600 mr-2 mt-[2px]">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
