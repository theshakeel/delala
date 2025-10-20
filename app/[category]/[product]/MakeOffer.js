import { useState } from "react";
import { X } from "lucide-react";

export default function OfferModal({ ad, onClose, onSubmit }) {
  const [offerAmount, setOfferAmount] = useState("");

  if (!ad?.price) return null;

  const basePrice = Number(ad.price);
  const presets = [
    Math.floor(basePrice * 0.8),  // -20%
    Math.floor(basePrice * 0.9),  // -10%
    Math.floor(basePrice * 1.1),  // +10%
    Math.floor(basePrice * 1.2),  // +20%
  ];

  const handleSubmit = () => {
    if (!offerAmount) return;
    onSubmit(offerAmount);
    setOfferAmount("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold mb-4">Make an Offer</h2>

        {/* Preset offers */}
        <div className="flex flex-wrap gap-2 mb-4">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setOfferAmount(p)}
              className={`px-3 py-1 rounded-lg border ${
                offerAmount == p
                  ? "bg-emerald-600 text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              } text-sm font-medium transition`}
            >
              {p} ETB
            </button>
          ))}
        </div>

        {/* Number input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Offer
          </label>
          <div className="relative">
            <input
              type="number"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              placeholder="Enter offer"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 text-sm">
              ETB
            </span>
          </div>
        </div>

        {/* Current ad price badge */}
        <div className="mb-4 text-sm text-gray-600">
          Current Price: <span className="font-semibold">{basePrice} ETB</span>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!offerAmount}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium transition"
        >
          Submit Offer
        </button>
      </div>
    </div>
  );
}
