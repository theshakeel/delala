"use client"

import React, { useState, useEffect } from "react";
        import { Edit, Eye, Grid3X3, List, Store, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

import { api } from '../../lib/api'
export default function MyShop({ user }) {
            const [formData, setFormData] = useState({
                shop_name: '',
                shop_logo: '',
                shop_address: '',
                shop_description: '',
                business_hours: ''
            });
            const [ads, setAds] = useState([]);
            const [loading, setLoading] = useState(false);
            const [submitting, setSubmitting] = useState(false);
            const [viewMode, setViewMode] = useState('grid');
            const [showToast, setShowToast] = useState(false);

            useEffect(() => {
                if (user?.is_official_shop) {
                    loadAds();
                }
            }, [user]);

            const loadAds = async () => {
                setLoading(true);
                try {
                    const shopAds = await api.getUserAds(user.id);
                    setAds(shopAds?.data);
                    console.log("the api response", shopAds)
                } catch (error) {
                    console.error('Failed to load shop ads:', error);
                } finally {
                    setLoading(false);
                }
            };

            const handleInputChange = (e) => {
                const { name, value } = e.target;
                setFormData(prev => ({
                    ...prev,
                    [name]: value
                }));
            };

            const handleSubmit = async (e) => {
                e.preventDefault();
                setSubmitting(true);

                try {
                    const shopUrl = slugify(formData.shop_name);
                    const requestData = {
                        ...formData,
                        shop_url: shopUrl,
                        user_id: user.id
                    };

                    await submitShopRequest(requestData);
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                } catch (error) {
                    console.error('Failed to submit shop request:', error);
                } finally {
                    setSubmitting(false);
                }
            };

            const editAd = (adId) => {
                console.log('Edit ad:', adId);
            };

            // Toast notification
            const Toast = () => (
                <div className={`fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 z-50 ${showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                    <div className="flex items-center space-x-2">
                        <CheckCircle size={20} />
                        <span>Shop application submitted successfully!</span>
                    </div>
                </div>
            );

            // 1️⃣ No shop URL - Show application form
            if (!user.shop_url) {
                return (
                    <>
                        <Toast />
                        <div className="max-w-2xl mx-auto p-6">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="text-center mb-8">
                                    <Store size={48} className="mx-auto text-[var(--delala-green)] mb-4" />
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply for Your Shop</h1>
                                    <p className="text-gray-600">Start selling by creating your official shop</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="shop_name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Shop Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="shop_name"
                                            name="shop_name"
                                            value={formData.shop_name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--delala-green)] focus:border-transparent transition-colors"
                                            placeholder="Enter your shop name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="shop_logo" className="block text-sm font-medium text-gray-700 mb-2">
                                            Shop Logo (URL)
                                        </label>
                                        <input
                                            type="url"
                                            id="shop_logo"
                                            name="shop_logo"
                                            value={formData.shop_logo}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--delala-green)] focus:border-transparent transition-colors"
                                            placeholder="https://example.com/logo.png"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="shop_address" className="block text-sm font-medium text-gray-700 mb-2">
                                            Shop Address *
                                        </label>
                                        <input
                                            type="text"
                                            id="shop_address"
                                            name="shop_address"
                                            value={formData.shop_address}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--delala-green)] focus:border-transparent transition-colors"
                                            placeholder="Enter your shop address"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="shop_description" className="block text-sm font-medium text-gray-700 mb-2">
                                            Shop Description *
                                        </label>
                                        <textarea
                                            id="shop_description"
                                            name="shop_description"
                                            value={formData.shop_description}
                                            onChange={handleInputChange}
                                            required
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--delala-green)] focus:border-transparent transition-colors resize-none"
                                            placeholder="Describe your shop and what you sell"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="business_hours" className="block text-sm font-medium text-gray-700 mb-2">
                                            Business Hours
                                        </label>
                                        <input
                                            type="text"
                                            id="business_hours"
                                            name="business_hours"
                                            value={formData.business_hours}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--delala-green)] focus:border-transparent transition-colors"
                                            placeholder="e.g., Mon-Fri 9AM-6PM, Sat 10AM-4PM"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-[var(--delala-green)] hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
                                    >
                                        {submitting ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                <span>Submitting...</span>
                                            </div>
                                        ) : (
                                            'Submit Application'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </>
                );
            }

            // 2️⃣ Pending review
            if (user.shop_url && !user.is_official_shop) {
                return (
                    <div className="max-w-2xl mx-auto p-6">
                        <div className="bg-gray-50 rounded-xl shadow-sm border p-6">
                            <div className="text-center mb-8">
                                <Clock size={48} className="mx-auto text-yellow-500 mb-4" />
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">Your shop is under review</h1>
                                <p className="text-gray-600">We've received your shop request. You'll be notified once approved.</p>
                            </div>

                            <div className="bg-white rounded-lg p-6 space-y-4">
                                <h3 className="font-semibold text-gray-900 mb-4">Submitted Details</h3>
                                
                                <div className="grid gap-4">
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Shop Name</span>
                                        <p className="text-gray-900 mt-1">{user.shop_name || 'Not provided'}</p>
                                    </div>
                                    
                                    {user.shop_logo && (
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Shop Logo</span>
                                            <div className="mt-2">
                                                <img 
                                                    src={user.shop_logo} 
                                                    alt="Shop logo" 
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                    onError={(e) => {
                                                        e.target.src = '';
                                                        e.target.alt = 'Logo failed to load';
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Address</span>
                                        <p className="text-gray-900 mt-1">{user.shop_address || 'Not provided'}</p>
                                    </div>
                                    
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Description</span>
                                        <p className="text-gray-900 mt-1">{user.shop_description || 'Not provided'}</p>
                                    </div>
                                    
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Business Hours</span>
                                        <p className="text-gray-900 mt-1">{user.business_hours || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            // 3️⃣ Official shop dashboard
            return (
                <div className="max-w-7xl mx-auto p-6">
                    {/* Shop Header */}
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <div className="flex items-start gap-6">
                            {user.shop_logo && (
                                <img 
                                    src={user.shop_logo} 
                                    alt={user.shop_name} 
                                    className="w-20 h-20 object-cover rounded-lg"
                                    onError={(e) => {
                                        e.target.src = '';
                                        e.target.alt = 'Logo failed to load';
                                        e.target.style.display = 'none';
                                    }}
                                />
                            )}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold text-gray-900">{user.shop_name}</h1>
                                    {user.is_verified && (
                                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                            <CheckCircle size={14} />
                                            Verified
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 mb-2">{user.shop_description}</p>
                                {user.business_hours && (
                                    <p className="text-sm text-gray-500">Hours: {user.business_hours}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* View Toggle */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">My Listings</h2>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors ${
                                    viewMode === 'grid' 
                                        ? 'bg-[var(--delala-green)] text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <Grid3X3 size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${
                                    viewMode === 'list' 
                                        ? 'bg-[var(--delala-green)] text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <List size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--delala-green)]"></div>
                            <span className="ml-3 text-gray-600">Loading your ads...</span>
                        </div>
                    ) : (
                        /* Ads Grid */
                        <div className={viewMode === 'grid' 
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
                            : "space-y-4"
                        }>
                            {ads.map(ad => (
                                <div key={ad.id} className={viewMode === 'grid' 
                                    ? "bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow" 
                                    : "bg-white rounded-lg border shadow-sm p-4 flex gap-4 hover:shadow-md transition-shadow"
                                }>
                                    <img 
                                        src={ad.image} 
                                        alt={ad.title} 
                                        className={viewMode === 'grid' 
                                            ? "w-full h-40 object-cover rounded mb-2" 
                                            : "w-24 h-24 object-cover rounded flex-shrink-0"
                                        }
                                        onError={(e) => {
                                            e.target.src = '';
                                            e.target.alt = 'Image failed to load';
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    <div className={viewMode === 'grid' ? "" : "flex-1"}>
                                        <h3 className="font-semibold text-gray-900 mb-1">{ad.title}</h3>
                                        <div className="flex items-center justify-between text-gray-500 text-sm mt-1 mb-3">
                                            <div className="flex items-center space-x-1">
                                                <Eye size={16} />
                                                <span>{ad.views} views</span>
                                            </div>
                                            <span className="font-semibold text-[var(--delala-green)]">{ad.price}</span>
                                        </div>
                                        <button
                                            onClick={() => editAd(ad.id)}
                                            className="w-full bg-[var(--delala-green)] hover:bg-green-700 text-white rounded py-2 flex items-center justify-center space-x-2 transition-colors"
                                        >
                                            <Edit size={16} />
                                            <span>Edit</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && ads.length === 0 && (
                        <div className="text-center py-12">
                            <Store size={48} className="mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
                            <p className="text-gray-600 mb-6">Start selling by creating your first listing</p>
                            <button className="bg-[var(--delala-green)] hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors">
                                <Link href="/user/create-ad" >
                                    Create Listing
                                </Link>
                            </button>
                        </div>
                    )}
                </div>
            );
        }