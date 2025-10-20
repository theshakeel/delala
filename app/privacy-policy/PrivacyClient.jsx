"use client";
import React from "react";

export default function PrivacyClient({ data }) {
  if (!data) {
    return (
      <div className="text-center text-gray-500 py-10">
        Unable to load Privacy Policy. Please try again later.
      </div>
    );
  }

  return (
    <article className="prose max-w-none">
      {/* Title */}
      <h1 className="text-3xl font-bold text-emerald-600 mb-6">
        {data.title || "Privacy Policy"}
      </h1>

      {/* Render HTML Content */}
      <div
        className="text-gray-700 leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </article>
  );
}
