'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {api} from '../../lib/api';

export default function SellerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [seller, setSeller] = useState(null);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch seller data and ads
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [sellerData, adsData] = await Promise.all([
          api.getSeller(id),
          api.getSellerAds(id)
        ]);
        setSeller(sellerData);
        setAds(adsData.ads);
      } catch (error) {
        console.warn('Failed to fetch seller data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);
  const formatCategoryName = (categorySlug) => {
    return categorySlug
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };
  // Group ads by category
  const categoryCounts = useMemo(() => {
    const counts = {};
    ads.forEach(ad => {
      const category = formatCategoryName(ad.category_slug);
      counts[ad.category_slug] = (counts[ad.category_slug] || 0) + 1;
    });
    return counts;
  }, [ads]);

  // Filter ads based on search and category
  const filteredAds = useMemo(() => {
    let filtered = ads;

    if (debouncedSearchTerm) {
      filtered = filtered.filter(ad =>
        ad.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(ad => ad.category_slug === selectedCategory);
    }

    return filtered;
  }, [ads, debouncedSearchTerm, selectedCategory]);

  // Format category name from camelCase


  // Format time ago
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} d ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} w ago`;
  };

  // Format join date
  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  // Handle phone call
  const handlePhoneCall = () => {
    if (seller?.phone) {
      window.location.href = `tel:${seller.phone}`;
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!seller) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center py-12">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Seller not found</h1>
            <p className="text-gray-600">The seller you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <style>{`
        body {
          box-sizing: border-box;
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Seller Header */}
        <div className="bg-white shadow-sm rounded-xl p-4 mb-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-lg font-bold text-gray-900">{seller.name}</h1>
                  <div className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1 text-sm text-gray-600">
                  <p>On Delala since {formatJoinDate(seller.join_date)}</p>
                  <p>Last seen {seller.last_seen}</p>
                  {seller.location && <p>{seller.location}</p>}
                </div>

                <button 
                  onClick={() => {/* Handle feedback view */}}
                  className="text-sm text-green-600 hover:text-green-700 font-medium mt-2"
                >
                  View feedback ({seller.feedback_count})
                </button>
              </div>

              <button
                onClick={handlePhoneCall}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-sm font-medium">Call</span>
              </button>
            </div>

            {seller.about && (
              <p className="text-sm text-gray-600 mt-2">{seller.about}</p>
            )}
          </div>
        </div>

        {/* Category Summary */}
        {Object.keys(categoryCounts).length > 0 && (
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                All ({ads.length})
              </button>
              {Object.entries(categoryCounts).map(([categorySlug, count]) => (
                <button
                  key={categorySlug}
                  onClick={() => setSelectedCategory(categorySlug)}
                  className={`flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === categorySlug
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {formatCategoryName(categorySlug)} ({count})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Seller Ads */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search in adverts of ${seller.name}`}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            />
          </div>
        </div>

        {/* Ads Grid */}
        {filteredAds.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAds.map((ad) => (
              <Link
                key={ad.id}
                href={`/ad/${ad.category_slug}/${ad.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] hover:border-green-400 border border-transparent"
              >
                <div className="aspect-square relative">
                  {ad.thumbnail ? (
                    <img
                      src={ad.thumbnail}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="p-3">
                  <h3 className="text-sm font-medium text-green-600 truncate mb-1">
                    {ad.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 mb-2">
                    {formatCategoryName(ad.category_slug)}
                  </p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold text-gray-900">
                      ETB {ad.price?.toLocaleString()}
                    </p>
                    {ad.condition && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {ad.condition}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-400">
                    {ad.location} • {formatTimeAgo(ad.created_at)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {debouncedSearchTerm || selectedCategory !== 'all' 
                ? 'No ads found' 
                : 'No active ads from this seller yet'
              }
            </h3>
            {(debouncedSearchTerm || selectedCategory !== 'all') && (
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Seller Header Skeleton */}
        <div className="bg-white shadow-sm rounded-xl p-4 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-36 animate-pulse"></div>
              </div>
            </div>
            <div className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Category Chips Skeleton */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
          ))}
        </div>

        {/* Search Skeleton */}
        <div className="h-10 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>

        {/* Ads Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-square bg-gray-200 animate-pulse"></div>
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
