"use client";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import  SingleAd from '../components/SingleAd'
import { 
  Filter, 
  Search, 
  MapPin, 
  Heart, 
  Share2, 
  ChevronDown, 
  ChevronUp,
  Grid3X3,
  List,
  SlidersHorizontal,
  X
} from "lucide-react";

export default function CategoryPage({ params, searchParams }) {
  const router = useRouter();
//   const categorySlug = params.category;
  const { category } = React.use(params); // ✅ unwraps the promise
  const categorySlug = category;
  const MULTI_SELECT_FILTERS = [
    "make", "model", "year", "mileage", "fuel_type", "color",
    "condition", "location", "body_type", "drive_type", "transmission"
    ];
  // State management
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showMoreSubcategories, setShowMoreSubcategories] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // Initialize filters from searchParams
  useEffect(() => {
  const initialFilters = {};

  // Handle multi-values properly
  Object.entries(searchParams).forEach(([key, value]) => {
    if (initialFilters[key]) {
      // convert to array if repeated param
      initialFilters[key] = Array.isArray(initialFilters[key])
        ? [...initialFilters[key], value]
        : [initialFilters[key], value];
    } else {
      initialFilters[key] = value;
    }
  });

  // Special case for price range
  if (initialFilters.price_min && initialFilters.price_max) {
    initialFilters.price_range = `${initialFilters.price_min}-${initialFilters.price_max}`;
    initialFilters._price_range_label = initialFilters.price_range; // optional UI key
  }

  setSelectedFilters(initialFilters);
}, [searchParams]);


  // Fetch data
  useEffect(() => {
  async function fetchData() {
    setLoading(true);
    setError(null);

    const query = new URLSearchParams(searchParams).toString();

    // Replace "all-categories" with the actual category slug for API
    const apiSlug = categorySlug === "all-categories" ? "vehicles" : categorySlug;

    try {
      const res = await fetch(`${API_BASE}/get-category/${apiSlug}?${query}`);
      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      setCategoryData(data);
      setAds(data.ads || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  fetchData();
}, [categorySlug, searchParams]);


  // Handle filter save
  const handleSave = () => {
    const params = new URLSearchParams();
    
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      }
    });
    
    router.push(`/${categorySlug}?${params.toString()}`);
  };

  // Handle filter change
const handleFilterChange = (filterName, value, extra = null) => {
  setSelectedFilters(prev => {
    let updated = { ...prev };

    // Multi-select (checkboxes)
    if (MULTI_SELECT_FILTERS.includes(filterName)) {
      const current = Array.isArray(prev[filterName]) ? prev[filterName] : [];
      updated[filterName] = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
    }

    // Price range selected: set price_min/price_max but don't persist price_range in URL
    else if (filterName === "price_range" && extra) {
      // keep a readable UI value in state if you want, but we'll exclude it from URL
      updated.price_min = extra.price_min;
      updated.price_max = extra.price_max;
      // optionally keep UI convenience key but it must not be emitted:
      updated._price_range_label = `${extra.price_min}-${extra.price_max}`;
    }

    // Single-select (radio)
    else {
      updated[filterName] = prev[filterName] === value ? "" : value;
    }

    // Build URL params instantly but SKIP any internal-only keys (like _price_range_label)
    const params = new URLSearchParams();
    Object.entries(updated).forEach(([key, val]) => {
      if (key === "_price_range_label") return; // skip internal label
      if (val === null || val === undefined || val === "") return;

      if (Array.isArray(val)) {
        val.forEach(v => params.append(key, v));
      } else {
        params.set(key, val);
      }
    });

    // Push new route (category slug prioritized)
    router.push(`/${categorySlug}?${params.toString()}`);

    return updated;
  });
};




  // Handle subcategory navigation
  const handleSubcategoryClick = (subcategory) => {
    router.push(`/${categorySlug}?subcategory=${encodeURIComponent(subcategory)}`);
  };

  // Loading skeleton component
  const LoadingSkeleton = ({ type = 'card' }) => {
    if (type === 'filter') {
      return (
        <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      );
    }
    
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  };

  // Filter sidebar component
  // Filter Sidebar Component
 const FilterSidebar = ({ isMobile = false }) => {
  const isSubcategory = categoryData?.type === "subcategory";
  const currentSlug = categoryData?.slug;

  return (
    <div className={`space-y-4 ${isMobile ? "p-4" : ""}`}>
      {/* ✅ Subcategories Section */}
      {categoryData?.subcategories?.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center">
            <Filter className="w-4 h-4 mr-1.5 text-orange-600" />
            Subcategories
          </h3>
          <div className="space-y-1.5">
            {categoryData.subcategories.map((sub) => {
              const isActive = sub.slug === currentSlug;
              return (
                <a
                  key={sub.slug}
                  href={`/${sub.slug}`}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                    isActive
                      ? "bg-green-50 border border-green-200 text-green-700"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <span className="text-sm font-medium">{sub.name}</span>
                  <span className="text-xs text-gray-500 font-medium">
                    ({sub.count})
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* ✅ Price Range Filter */}
      {categoryData?.price_ranges?.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center">
            <SlidersHorizontal className="w-4 h-4 mr-1.5 text-green-600" />
            Price Range
          </h3>
          <div className="space-y-1.5">
            {categoryData.price_ranges.map((range, idx) => (
              <label
                key={idx}
                className="flex items-center justify-between p-1.5 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="price_range"
                    value={`${range.min}-${range.max}`}
                    checked={
                      selectedFilters.price_range ===
                      `${range.min}-${range.max}`
                    }
                    onChange={() =>
                      handleFilterChange("price_range", `${range.min}-${range.max}`, {
                        price_min: range.min,
                        price_max: range.max,
                      })
                    }
                    className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {range.label}
                  </span>
                </div>
                {range.count && (
                  <span className="text-xs text-gray-500 font-medium">
                    ({range.count})
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Dynamic Filters */}
      {isSubcategory &&
        categoryData.filters &&
        Object.entries(categoryData.filters).map(([key, values]) => (
          <div
            key={key}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
          >
            <h3 className="text-base font-semibold text-gray-900 mb-2 capitalize flex items-center">
              <Filter className="w-4 h-4 mr-1.5 text-purple-600" />
              {key.replace("_", " ")}
            </h3>
            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {values.map((val, idx) => {
                const label = (() => {
                  if (val === null || val === undefined) return "";
                  if (typeof val === "string" || typeof val === "number")
                    return String(val);
                  if (typeof val === "object")
                    return String(val.label ?? val.value ?? "");
                  return String(val);
                })();

                const count =
                  typeof val === "object" && val !== null && val.count !== undefined
                    ? Number(val.count)
                    : null;

                const displayLabel = label || "(unknown)";

                return (
                  <label
                    key={idx}
                    className="flex items-center justify-between p-1.5 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center">
                      <input
                        type={
                          MULTI_SELECT_FILTERS.includes(key) ? "checkbox" : "radio"
                        }
                        name={
                          MULTI_SELECT_FILTERS.includes(key)
                            ? `${key}[]`
                            : key
                        }
                        value={displayLabel}
                        checked={
                          MULTI_SELECT_FILTERS.includes(key)
                            ? Array.isArray(selectedFilters[key]) &&
                              selectedFilters[key].includes(displayLabel)
                            : selectedFilters[key] === displayLabel
                        }
                        onChange={() => handleFilterChange(key, displayLabel)}
                        className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />

                      <span className="ml-2 text-sm text-gray-700">
                        {displayLabel}
                      </span>
                    </div>
                    {count !== null && (
                      <span className="text-xs text-gray-500 font-medium">
                        ({count})
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};



  // Ad card component
  const AdCard = ({ ad, categorySlug, isListView = false }) => (
      <Link
    href={`/${ad.category_slug}/${ad.slug}`}
    className={`block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 card-hover ${
      isListView ? 'flex' : ''
    }`}
  >
    <div className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 card-hover ${isListView ? 'flex' : ''}`}>
      <div className={`relative ${isListView ? 'w-48 h-32' : 'h-48'} overflow-hidden`}>
        <img
          src={ad.images?.[0] || 'https://placehold.co/400x300'}
          alt={ad.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x300';
          }}
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className={`p-4 ${isListView ? 'flex-1' : ''}`}>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
          {ad.title}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <p className="text-xl font-bold text-green-600">${ad.price}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate">{ad.location}</span>
          </div>
        </div>
        
        {/* Dynamic attributes for subcategory */}
        {categoryData?.type === "subcategory" && categoryData.filters && (
          <div className="space-y-1">
            {Object.keys(categoryData.filters).slice(0, 2).map(key => (
              ad[key] && (
                <div key={key} className="flex items-center text-xs text-gray-600">
                  <span className="font-medium capitalize mr-2">{key.replace('_', ' ')}:</span>
                  <span className="bg-gray-100 px-2 py-1 rounded-full">{ad[key]}</span>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-80">
              <LoadingSkeleton type="filter" />
            </aside>
            <main className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <LoadingSkeleton key={i} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 capitalize mb-2">
                {categoryData?.name || categorySlug.replace('-', ' ')}
              </h1>
              <p className="text-gray-600">
                {ads.length} {ads.length === 1 ? 'listing' : 'listings'} found
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
              
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-80">
            <div className="sticky top-8">
              {categoryData && <FilterSidebar />}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {ads.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
                <button
                  onClick={() => router.push(`/${categorySlug}`)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
            {ads.slice(0, 15).map((ad, idx) => (
              <SingleAd
                key={ad.id || idx}
                ad={ad}
                idx={idx}
                onClick={() => console.log("Clicked:", ad.title)}
              />
            ))}

              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="fixed right-0 top-0 h-full w-80 bg-gray-50 overflow-y-auto">
            <div className="flex items-center justify-between p-6 bg-white border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {categoryData && <FilterSidebar isMobile />}
          </div>
        </div>
      )}
    </div>
  );
}