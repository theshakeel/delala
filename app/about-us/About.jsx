"use client";
import React, { useState } from 'react';


        export default function AboutMainSection() {
            return (
                <main className="min-h-full bg-white font-sans text-gray-800">
                    {/* Hero Section */}
                    <section className="py-16 px-4 max-w-7xl mx-auto">
                        <div className="lg:flex lg:items-center lg:gap-12">
                            {/* Hero Text */}
                            <div className="lg:w-1/2 mb-12 lg:mb-0">
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                                    delala is the best place to sell anything to real people.
                                </h1>
                                
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <h2 className="text-2xl lg:text-3xl font-bold text-delala-green">Sell faster</h2>
                                    <h2 className="text-2xl lg:text-3xl font-bold text-delala-orange">Buy smarter</h2>
                                </div>
                                
                                <p className="text-xl text-gray-700 mb-4">
                                    delala is the biggest free online classified with an advanced security system.
                                </p>
                                
                                <p className="text-lg text-gray-600 mb-8">
                                    We provide a simple hassle-free solution to sell and buy almost anything.
                                </p>
                                
                                {/* CTA Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg transition font-semibold">
                                        Sign in
                                    </button>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-semibold">
                                        Registration
                                    </button>
                                    <button className="bg-[var(--delala-green)] hover:bg-[var(--delala-green-dark)] text-white px-8 py-3 rounded-lg transition font-semibold transform hover:scale-105">
                                        Sell
                                    </button>
                                </div>
                            </div>
                            
                            {/* Hero Graphic */}
                            <div className="lg:w-1/2 flex justify-center">
                                <div className="w-full max-w-md">
                                    <svg viewBox="0 0 400 300" className="w-full h-auto">
                                        {/* Phone illustration */}
                                        <rect x="150" y="50" width="100" height="180" rx="15" fill="#1f2937" stroke="#374151" strokeWidth="2"/>
                                        <rect x="160" y="70" width="80" height="140" rx="5" fill="#f3f4f6"/>
                                        
                                        {/* Camera taking photo */}
                                        <circle cx="200" cy="130" r="25" fill="#00A651"/>
                                        <circle cx="200" cy="130" r="15" fill="#ffffff"/>
                                        <rect x="185" y="115" width="30" height="8" rx="4" fill="#374151"/>
                                        
                                        {/* Item being photographed */}
                                        <rect x="80" y="180" width="60" height="40" rx="5" fill="#FF6B35"/>
                                        <circle cx="110" cy="200" r="8" fill="#ffffff"/>
                                        
                                        {/* Connecting lines */}
                                        <path d="M 140 200 Q 170 180 175 150" stroke="#00A651" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                                        
                                        {/* People icons */}
                                        <circle cx="50" cy="80" r="15" fill="#3b82f6"/>
                                        <rect x="40" y="95" width="20" height="25" rx="10" fill="#3b82f6"/>
                                        
                                        <circle cx="320" cy="80" r="15" fill="#ef4444"/>
                                        <rect x="310" y="95" width="20" height="25" rx="10" fill="#ef4444"/>
                                        
                                        {/* Connection arrow */}
                                        <path d="M 70 90 Q 200 40 300 90" stroke="#6b7280" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
                                        
                                        <defs>
                                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                                <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280"/>
                                            </marker>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Table of Contents */}
                    <section className="py-16 px-4 max-w-4xl mx-auto bg-gray-50">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Table of Contents</h2>
                        <nav className="grid md:grid-cols-2 gap-4">
                            <a href="#how-to-sell" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                                <span className="text-lg font-semibold text-delala-green">How to sell on delala?</span>
                            </a>
                            <a href="#how-to-buy" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                                <span className="text-lg font-semibold text-delala-orange">How to buy on delala?</span>
                            </a>
                            <a href="#safety" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                                <span className="text-lg font-semibold text-blue-600">Safety</span>
                            </a>
                            <a href="#sell-pro" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                                <span className="text-lg font-semibold text-purple-600">Sell like a pro!</span>
                            </a>
                        </nav>
                    </section>

                    {/* How to sell on delala */}
                    <section id="how-to-sell" className="py-16 px-4 max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-delala-green mb-8">How to sell on delala?</h2>
                        <ol className="list-decimal list-inside space-y-4 text-lg">
                            <li className="leading-relaxed">
                                <strong>Register</strong> using email and phone or via Facebook/Google.
                            </li>
                            <li className="leading-relaxed">
                                <strong>Make photos</strong> of your item from multiple good angles.
                            </li>
                            <li className="leading-relaxed">
                                Click <strong>"SELL"</strong> button, choose category, upload photos, write title/description, set price, submit for review.
                            </li>
                            <li className="leading-relaxed">
                                <strong>Respond promptly</strong> to client messages and calls.
                            </li>
                        </ol>
                    </section>

                    {/* How to buy on delala */}
                    <section id="how-to-buy" className="py-16 px-4 max-w-4xl mx-auto bg-gray-50">
                        <h2 className="text-3xl font-bold text-delala-orange mb-8">How to buy on delala?</h2>
                        <ol className="list-decimal list-inside space-y-4 text-lg">
                            <li className="leading-relaxed">
                                <strong>Search</strong> for items with filters.
                            </li>
                            <li className="leading-relaxed">
                                <strong>Contact seller</strong> through chat or phone.
                            </li>
                            <li className="leading-relaxed">
                                <strong>Meet seller</strong> in public, inspect item before paying.
                            </li>
                            <li className="leading-relaxed">
                                <strong>Leave feedback</strong> for the seller.
                            </li>
                        </ol>
                    </section>

                    {/* Safety */}
                    <section id="safety" className="py-16 px-4 max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-blue-600 mb-8">Safety</h2>
                        <ul className="space-y-4 text-lg">
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-3">•</span>
                                <span>Do not pay in advance.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-3">•</span>
                                <span>Meet in public places.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-3">•</span>
                                <span>Check items before buying.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-600 mr-3">•</span>
                                <span>Pay after collection.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Sell like a pro */}
                    <section id="sell-pro" className="py-16 px-4 max-w-4xl mx-auto bg-gray-50">
                        <h2 className="text-3xl font-bold text-purple-600 mb-8">Sell like a pro!</h2>
                        <div className="space-y-4 text-lg">
                            <div className="flex items-start">
                                <span className="text-purple-600 mr-3">•</span>
                                <span><strong>Take good photos.</strong></span>
                            </div>
                            <div className="flex items-start">
                                <span className="text-purple-600 mr-3">•</span>
                                <span><strong>Answer quickly.</strong></span>
                            </div>
                            <div className="flex items-start">
                                <span className="text-purple-600 mr-3">•</span>
                                <span><strong>Use Premium Services to gain more customers.</strong></span>
                            </div>
                        </div>
                    </section>

                    {/* Additional Links */}
                    <section className="py-12 px-4 max-w-4xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-6 mb-8">
                            <a href="#" className="text-delala-green hover:text-delala-green-dark font-semibold transition">FAQ</a>
                            <a href="#" className="text-delala-green hover:text-delala-green-dark font-semibold transition">Premium Services</a>
                        </div>
                        
                        {/* Social Media Icons */}
                        <div className="flex justify-center gap-6 mb-8">
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-blue-800 transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-pink-600 transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017 0z"/>
                                </svg>
                            </a>
                            <a href="#" className="text-gray-600 hover:text-red-600 transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="py-6 px-4 text-center text-gray-500 border-t border-gray-200">
                        <p>© 2025 delala – All rights reserved.</p>
                    </footer>
                </main>
            );
        }