"use client";
import React from "react";
import Link from "next/link";

export default function ContactClient({ data }) {
  return (
    <div className="bg-white shadow-sm border rounded-lg p-8">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{data.heading}</h1>

      {/* Intro */}
      <div
        className="prose max-w-none text-gray-700 mb-8"
        dangerouslySetInnerHTML={{ __html: data.intro }}
      />

      {/* Contact Info */}
      <div className="space-y-4 mb-10">
        {data.contactInfo.map((item, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-gray-900 w-40">
              {item.label}:
            </span>
            <span className="text-gray-700">{item.value}</span>
          </div>
        ))}
      </div>

      {/* FAQ Mention */}
      <div
        className="prose max-w-none text-gray-700 border-t pt-6"
        dangerouslySetInnerHTML={{ __html: data.faqNote }}
      />

      {/* Optional direct button */}
      <div className="mt-6">
        <Link
          href="/faq"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-all"
        >
          Visit FAQ Page
        </Link>
      </div>
    </div>
  );
}
