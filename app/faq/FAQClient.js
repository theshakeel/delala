"use client"
import React, { useState,  useEffect, useMemo } from "react";

        // FAQClient Component
export default function FAQClient({ data, initialIndex = 0 }) {
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);
    const [query, setQuery] = useState('');
    const [expandedGroups, setExpandedGroups] = useState({});

    // Filter FAQ items (excluding first descriptive item)
    const faqItems = data.slice(1);
    
    const filteredItems = useMemo(() => {
        if (!query.trim()) return faqItems;
        return faqItems.filter(item => 
            item.q.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, faqItems]);

    // Group items by category or first letter
    const groupedItems = useMemo(() => {
        const hasCategories = filteredItems.some(item => item.category);
        const groups = {};

        filteredItems.forEach((item, index) => {
            const key = hasCategories 
                ? item.category || 'Other'
                : item.q.charAt(0).toUpperCase();
            
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push({ ...item, originalIndex: index + 1 });
        });

        return Object.keys(groups).sort().map(key => ({
            title: key,
            items: groups[key]
        }));
    }, [filteredItems]);

    // Initialize expanded groups
    useEffect(() => {
        const initialExpanded = {};
        groupedItems.forEach(group => {
            initialExpanded[group.title] = true;
        });
        setExpandedGroups(initialExpanded);
    }, [groupedItems]);

    const toggleGroup = (groupTitle) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupTitle]: !prev[groupTitle]
        }));
    };

    const handleQuestionSelect = (originalIndex) => {
        setSelectedIndex(originalIndex);
    };

    const handleBackToHome = () => {
        setSelectedIndex(0);
    };

    const selectedItem = data[selectedIndex];
    const isHomePage = selectedIndex === 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
                        {/* Search */}
                        <div className="mb-6">
                            <label htmlFor="faq-search" className="block text-sm font-medium text-gray-700 mb-2">
                                Search Questions
                            </label>
                            <div className="relative" role="search">
                                <input
                                    id="faq-search"
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Type to search..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                />
                                {query && (
                                    <div className="absolute right-3 top-2 text-xs text-gray-500">
                                        {filteredItems.length} matches
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Question Groups */}
                        <nav className="space-y-2">
                            {groupedItems.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <p>No results found</p>
                                    <p className="text-sm mt-1">Try different keywords</p>
                                </div>
                            ) : (
                                groupedItems.map(group => (
                                    <div key={group.title} className="border border-gray-200 rounded-lg">
                                        <button
                                            onClick={() => toggleGroup(group.title)}
                                            className="w-full px-3 py-2 text-left font-medium text-gray-700 hover:bg-gray-50 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center justify-between"
                                            aria-expanded={expandedGroups[group.title]}
                                        >
                                            <span>{group.title}</span>
                                            <span className="text-gray-400">
                                                {expandedGroups[group.title] ? '−' : '+'}
                                            </span>
                                        </button>
                                        {expandedGroups[group.title] && (
                                            <div className="border-t border-gray-200">
                                                {group.items.map(item => (
                                                    <button
                                                        key={item.originalIndex}
                                                        onClick={() => handleQuestionSelect(item.originalIndex)}
                                                        className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                                                            selectedIndex === item.originalIndex
                                                                ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500'
                                                                : 'text-gray-600'
                                                        }`}
                                                        aria-current={selectedIndex === item.originalIndex ? "true" : undefined}
                                                    >
                                                        {item.q.replace(/^[^:]+:\s*/, '')}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-3">
                    <div className="bg-white rounded-lg shadow-sm border p-8">
                        {!isHomePage && (
                            <div className="mb-6 pb-4 border-b border-gray-200">
                                <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                                    <button
                                        onClick={handleBackToHome}
                                        className="hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600 rounded px-1"
                                    >
                                        ← Back to FAQ Home
                                    </button>
                                </nav>
                            </div>
                        )}

                        {isHomePage ? (
                            <div dangerouslySetInnerHTML={{ __html: selectedItem.html }} />
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    {selectedItem.q}
                                </h2>
                                <div 
                                    className="prose max-w-none text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: selectedItem.a }}
                                />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}