"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, MapPin, Phone, MessageCircle, Plus } from "lucide-react";
import MakeOffer from './MakeOffer';
import { useRouter } from "next/navigation";
export default function AdDetails({ ad }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const router = useRouter();

  // Parse attributes JSON safely
  let attributes = {};
  try {
    attributes = ad.attributes ? JSON.parse(ad.attributes) : {};
  } catch (err) {
    console.warn("Invalid attributes JSON", err);
  }
  let images = [];
if (ad.images) {
  try {
    images = typeof ad.images === "string" ? JSON.parse(ad.images) : ad.images;
  } catch (err) {
    console.warn("Invalid images JSON", err);
    images = [];
  }
}
  // Convert ad object dynamically to specs array
  const specsArray = Object.entries(ad)
    .filter(([key, value]) => value !== null && key !== "images" && key !== "attributes")
    .map(([key, value]) => [key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()), value])
    .concat(Object.entries(attributes).map(([key, value]) => [key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()), value]));

  const visibleSpecs = showAllSpecs ? specsArray : specsArray.slice(0, 6);

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % (images?.length || 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % (images?.length || 1));
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + (images?.length || 1)) % (images?.length || 1));
  const goToImage = (index) => setCurrentImageIndex(index);

  const suggestedOffers = [ad.price, Math.floor(ad.price * 0.9), Math.floor(ad.price * 1.1)];

  const handleOfferSubmit = () => {
    console.log("Offer submitted:", offerAmount);
    setShowOfferModal(false);
    setOfferAmount("");
  };

  const hasFeedback = ad.feedback_count > 0;
  const handleClick = () => {
    if (hasFeedback) {
      router.push(`/feedback/${ad.shop_url}`);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
        {showOfferModal && (
          <MakeOffer
            ad={ad}
            onClose={() => setShowOfferModal(false)}
            onSubmit={(amount) => {
              console.log("Offer submitted:", amount);
              setShowOfferModal(false);
            }}
          />
        )}
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-10 lg:gap-8">
          
          {/* Left Section - Images + Specs */}
          <div className="lg:col-span-7 mb-8 lg:mb-0">
            {/* Image Slider */}
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
              <div className="aspect-w-16 aspect-h-12 relative h-96 sm:h-[500px]">
                <img
                  src="https://placehold.co/400x300"
                  // src={images?.[currentImageIndex] || "https://placehold.co/400x300"}
                  alt={`${ad.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images?.length || 0}
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                    index === currentImageIndex ? "border-2 border-emerald-500 scale-105" : "border-2 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img src='https://placehold.co/400x300' alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  {/* <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" /> */}
                </button>
              ))}
            </div>

            {/* Specs */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{ad.title}</h1>
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{ad.location}</span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 
                  {visibleSpecs.map(([key, value]) => {
                  // Skip certain keys
                  if (["Id", "Category Slug","Title","Slug","Updated At","Created At","Status","Zone Id","Region Id","Is Reported","Is Active","Is Featured"].includes(key)) return null;

                  // Decide full-width for specific keys
                  const isFullWidth = ["Description","Seller Notes"].includes(key);

                  return (
                    <div
                      key={key}
                      className={`py-2 border-b border-gray-100 ${isFullWidth ? "col-span-2" : "flex justify-between"}`}
                    >
                      <span className="font-medium text-gray-700">{key}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  );
                })}

                </div>
                {specsArray.length > 6 && (
                  <button
                    onClick={() => setShowAllSpecs(!showAllSpecs)}
                    className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  >
                    {showAllSpecs ? "Show Less" : `Show More (${specsArray.length - 6} more)`}
                  </button>
                )}
              </div>

              {/* Make Offer */}
              <button
                onClick={() => setShowOfferModal(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
              >
                Make an Offer
              </button>
            </div>
          </div>

          {/* Right Section - Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <div className="mb-4">
                <div className="text-3xl font-bold text-gray-900 mb-2">{ad.price} ETB</div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl mb-6 transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Request Call Back
              </button>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Advertiser</h3>
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-3">
                    {ad.user_name?.[0] || "A"}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{ad.user_name || "Unknown"}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 hover:shadow-md">
                    Show Contact
                  </button>
                  <button className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200">
                    <MessageCircle className="w-4 h-4" />
                    Start Chat
                  </button>
                 <button
                  onClick={handleClick}
                  disabled={!hasFeedback}
                  className={`w-full border-2 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200
                    ${
                      hasFeedback
                        ? "border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                        : "border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50"
                    }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  View Feedback ({ad.feedback_count || 0})
                </button>
                  <button className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200">
                    <Plus className="w-4 h-4" />
                    Post Ad Like This
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between border-b border-gray-200 mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Make an Offer</h3>
              <button onClick={() => setShowOfferModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Offer (ETB)</label>
              <input
                type="text"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                placeholder="Enter your offer amount"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Quick select:</p>
              <div className="flex gap-2">
                {suggestedOffers.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setOfferAmount(amount)}
                    className={`px-4 py-2 rounded-lg border-2 font-medium ${
                      offerAmount == amount
                        ? "bg-emerald-600 text-white scale-105"
                        : "border-emerald-200 text-emerald-700 hover:border-emerald-300"
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleOfferSubmit}
              disabled={!offerAmount}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
            >
              Send Offer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
