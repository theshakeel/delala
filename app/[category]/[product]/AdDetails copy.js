"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ChevronLeft, ChevronRight, X, MapPin, Phone, MessageCircle, Plus } from "lucide-react";

export default function ProductPage() {
  const router = useRouter();
  const { categorySlug, productSlug } = router.query;

  const [ad, setAd] = useState(null);
  const [relatedAds, setRelatedAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");

  // Fetch ad data from API
  useEffect(() => {
    const fetchAdData = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${baseUrl}/${categorySlug}/${productSlug}`);
        if (!res.ok) throw new Error("Failed to load ad details");
        const data = await res.json();
        setAd(data.product);
        setRelatedAds(data.related_ads || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug && productSlug) fetchAdData();
  }, [categorySlug, productSlug]);

  // Slider autoplay
  useEffect(() => {
    if (!ad || !ad.images) return;
    const images = JSON.parse(ad.images);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [ad]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!ad) return null;

  const images = JSON.parse(ad.images || "[]");
//   const attributes = ad.attributes ? JSON.parse(ad.attributes) : {};

//   const specsArray = [
//     ["Make", ad.make],
//     ["Model", ad.model],
//     ["Year", ad.year],
//     ["Price", ad.price],
//     ["Mileage", ad.mileage],
//     ["Fuel Type", ad.fuel_type],
//     ["Transmission", ad.transmission],
//     ["Color", ad.color],
//     ["Condition", ad.condition],
//     ["Location", ad.location],
//     ["Engine Capacity (cc)", ad.engine_capacity_cc],
//     ["Body Type", ad.body_type],
//     ["Seats", ad.number_of_seats],
//     ["Drive Type", ad.drive_type],
//     ...Object.entries(attributes),
//   ];

//   const visibleSpecs = showAllSpecs ? specsArray : specsArray.slice(0, 6);
  const specsArray = ad.category?.columns
  ? ad.category.columns
      .map((col) => [col.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()), ad[col]])
      .filter(([key, value]) => value !== null && value !== undefined)
  : [];

// Merge additional attributes if present
const attributes = ad.attributes ? JSON.parse(ad.attributes) : {};
const allSpecs = [...specsArray, ...Object.entries(attributes)];
const visibleSpecs = showAllSpecs ? allSpecs : allSpecs.slice(0, 6);
  const suggestedOffers = [
    Math.floor(ad.price * 0.9),
    Math.floor(ad.price * 0.95),
    Math.floor(ad.price),
  ];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  const goToImage = (index) => setCurrentImageIndex(index);
  const handleOfferSubmit = () => {
    console.log("Offer submitted:", offerAmount);
    setShowOfferModal(false);
    setOfferAmount("");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-10 lg:gap-8">
          
          {/* Left - Images + Info */}
          <div className="lg:col-span-7 mb-8 lg:mb-0">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
              <div className="aspect-w-16 aspect-h-12 relative h-96 sm:h-[500px]">
                <img
                  src={images[currentImageIndex] || "https://via.placeholder.com/640x480?text=No+Image"}
                  alt={`${ad.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => goToImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${idx === currentImageIndex ? "border-emerald-500 scale-105" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Product Info */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{ad.title}</h1>
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="w-4 h-4 mr-1" /> {ad.location}
              </div>

              {/* Specs */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {visibleSpecs.map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
                {specsArray.length > 6 && (
                  <button
                    onClick={() => setShowAllSpecs(!showAllSpecs)}
                    className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  >
                    {showAllSpecs ? "Show Less" : `Show More (${specsArray.length - 6})`}
                  </button>
                )}
              </div>

              <p className="mb-6 text-gray-700">{ad.description}</p>

              {/* Make Offer Button */}
              <button
                onClick={() => setShowOfferModal(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
              >
                Make an Offer
              </button>
            </div>
          </div>

          {/* Right Sidebar (Price + Contact) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <div className="mb-4">
                <div className="text-3xl font-bold text-gray-900 mb-2">{ad.price}</div>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">Fixed Price</span>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl mb-6 transition-all duration-200 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Request Call Back
              </button>

              {/* Advertiser info & actions */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg">Show Contact</button>
                <button className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Start Chat
                </button>
                <button className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Post Ad Like This
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Make Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Make an Offer</h3>
              <button onClick={() => setShowOfferModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <input
                type="text"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                placeholder="Enter your offer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-emerald-500"
              />
              <div className="flex gap-2 mb-4">
                {suggestedOffers.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setOfferAmount(amt)}
                    className={`px-4 py-2 border rounded-lg font-medium ${offerAmount == amt ? "bg-emerald-600 text-white" : "border-emerald-200 text-emerald-700"}`}
                  >
                    {amt}
                  </button>
                ))}
              </div>
              <button
                onClick={handleOfferSubmit}
                disabled={!offerAmount}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg"
              >
                Send Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
