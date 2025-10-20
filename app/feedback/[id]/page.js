"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from 'next/navigation';
import {api} from '../../lib/api'
import {
  ThumbsUp,
  ThumbsDown,
  Minus,
  MessageSquare,
  User,
  Heart,
} from "lucide-react";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
const { id } = useParams();
 const formatTitle = (text) => {
    if (!text) return "";
    return text
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
    const shopTitle = formatTitle(id);
useEffect(() => {
  async function loadFeedbacks() {
    try {
      const data = await api.getSellerFeedbacks(id);
      setFeedbacks(data || []); // data is already an array as per Laravel output
    } catch (err) {
      console.error("❌ Failed to load feedbacks:", err);
      setFeedbacks([]); // fallback
    }
  }

  loadFeedbacks();
}, [id]);


  const sentimentCounts = {
    positive: feedbacks.filter((f) => f.sentiment === "positive").length,
    neutral: feedbacks.filter((f) => f.sentiment === "neutral").length,
    negative: feedbacks.filter((f) => f.sentiment === "negative").length,
  };

  const SentimentIcon = ({ type }) => {
    switch (type) {
      case "positive":
        return <ThumbsUp className="w-4 h-4 text-green-600" />;
      case "neutral":
        return <Minus className="w-4 h-4 text-gray-400" />;
      case "negative":
        return <ThumbsDown className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const ReplyThread = ({ replies, level = 1 }) => {
    if (!replies?.length) return null;
    return (
      <div className={`pl-${level * 6} mt-3 space-y-3`}>
     
        {replies.map((reply) => (
          <div
            key={reply.id}
            className="border border-gray-100 rounded-lg p-3 bg-gray-50"
          >
            <div className="flex items-center justify-between mb-1">
              <Link
                href={`/seller-page/${reply.user_id}`}
                className="text-sm font-medium text-emerald-700 hover:underline flex items-center gap-1"
              >
                <User className="w-4 h-4" />
                {reply.user_name}
              </Link>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Heart className="w-4 h-4 text-pink-500" />
                {reply.likes}
              </div>
            </div>
            <p className="text-sm text-gray-700">{reply.message}</p>
            <ReplyThread replies={reply.replies} level={level + 1} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
           <Link
        href={`/shop/${id}`}
        className="block text-lg font-semibold  transition-colors duration-150 mb-3"
      >
        <h1>Feedback for:  <span className="text-emerald-700 hover:text-emerald-800"> {shopTitle} </span> </h1>
      </Link>
      {/* Summary Counts */}
      <div className="flex flex-wrap gap-6 justify-start">
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">
          <ThumbsUp className="w-5 h-5 text-green-600" />
          <span className="font-medium text-green-700">
            Good: {sentimentCounts.positive}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg">
          <Minus className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-700">
            Neutral: {sentimentCounts.neutral}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
          <ThumbsDown className="w-5 h-5 text-red-600" />
          <span className="font-medium text-red-700">
            Bad: {sentimentCounts.negative}
          </span>
        </div>
      </div>

      {/* Feedback Cards */}
      <section className="space-y-6">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition p-5"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-gray-900">
                {fb.ad_title}
              </h3>
              <SentimentIcon type={fb.sentiment} />
            </div>

            <p className="text-gray-700 mb-3">{fb.message}</p>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <Link
                href={`/seller-page/${fb.user_id}`}
                className="inline-flex items-center gap-1 text-emerald-700 hover:underline"
              >
                <User className="w-4 h-4" />
                Feedback by {fb.user_name}
              </Link>

              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-pink-500" />
                {fb.likes}
              </div>
            </div>

            {/* Replies */}
            <div className="mt-4">
              <ReplyThread replies={fb.replies} />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
