
"use client"
import React, { useState, useEffect } from "react";
import ProfileSection from "./ProfileSection";
import SavedAdsSection from "./SavedAdsSection";
import { useRouter, useSearchParams } from "next/navigation";
        // Lucide React Icons (simplified SVG components)
        const User = () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        );

        const Store = () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        );

        const MessageSquare = () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        );

        const Trash2 = () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        );

        const LogOut = () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
        );

        const Menu = () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        );

        const X = () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        );

        const Plus = () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
        );

        const Edit = () => (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        );

        const Eye = () => (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        );

        const Send = () => (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
        );

    export default function SettingsPage() {
    const [activeMenu, setActiveMenu] = useState("profile"); // default to 'profile'
    const [activeTab, setActiveTab] = useState("Personal Details");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showAddStore, setShowAddStore] = useState(false);
    const [showAddDelivery, setShowAddDelivery] = useState(false);
    const [showAddPhone, setShowAddPhone] = useState(false);
    const [showOtpVerify, setShowOtpVerify] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [chargeFee, setChargeFee] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const [activePage, setActivePage] = useState("profile");
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const page = searchParams.get("page") || "profile";
        setActivePage(page);

        if (!searchParams.get("page")) {
        router.replace("/user/settings?page=profile");
        }
    }, [searchParams, router]);


          

          const menuItems = [
                { name: "Profile", slug: "profile", icon: User },
                { name: "Saved Ads", slug: "saved-ads", icon: User },
                { name: "My Shop", slug: "my-shop", icon: Store },
                { name: "My Messages", slug: "my-messages", icon: MessageSquare },
                { name: "Delete Account", slug: "delete-account", icon: Trash2 },
                { name: "Logout", slug: "logout", icon: LogOut },
            ];
          
            const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

            const sampleAdverts = [
                { id: 1, title: 'iPhone 14 Pro Max', views: 245, image: '📱' },
                { id: 2, title: 'MacBook Air M2', views: 189, image: '💻' },
                { id: 3, title: 'AirPods Pro', views: 156, image: '🎧' }
            ];

            const sampleMessages = [
                { id: 1, name: 'John Doe', message: 'Is this item still available?', time: '2 min ago', unread: true },
                { id: 2, name: 'Sarah Smith', message: 'Thank you for the quick delivery!', time: '1 hour ago', unread: false },
                { id: 3, name: 'Mike Johnson', message: 'Can we negotiate the price?', time: '3 hours ago', unread: true }
            ];

            

            const handleDayToggle = (day) => {
                setSelectedDays(prev => 
                    prev.includes(day) 
                        ? prev.filter(d => d !== day)
                        : [...prev, day]
                );
            };

            

            

           

          

            const renderMyShop = () => (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">My Shop</h2>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Grid</button>
                            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">List</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sampleAdverts.map(advert => (
                            <div key={advert.id} className="bg-white rounded-lg border shadow-sm p-4">
                                <div className="text-4xl mb-2 text-center">{advert.image}</div>
                                <h3 className="font-semibold mb-2">{advert.title}</h3>
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                    <div className="flex items-center space-x-1">
                                        <Eye />
                                        <span>{advert.views} views</span>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => alert(`Editing ${advert.title}`)}
                                        className="flex-1 bg-[var(--delala-green)] hover:bg-green-700 text-white text-sm font-medium rounded px-3 py-2 flex items-center justify-center space-x-1"
                                    >
                                        <Edit />
                                        <span>Edit</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );

            const renderMyMessages = () => (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">My Messages</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-96">
                        {/* Message List */}
                        <div className="lg:col-span-1 bg-white rounded-lg border">
                            <div className="p-4 border-b">
                                <h3 className="font-semibold">Conversations</h3>
                            </div>
                            <div className="divide-y">
                                {sampleMessages.map(message => (
                                    <div key={message.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-medium text-sm">{message.name}</span>
                                            <span className="text-xs text-gray-500">{message.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">{message.message}</p>
                                        {message.unread && (
                                            <div className="w-2 h-2 bg-[var(--delala-green)] rounded-full mt-1"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Chat Area */}
                        <div className="lg:col-span-2 bg-white rounded-lg border flex flex-col">
                            <div className="p-4 border-b">
                                <h3 className="font-semibold">John Doe</h3>
                            </div>
                            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-xs">
                                        <p className="text-sm">Is this item still available?</p>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <div className="bg-[var(--delala-green)] text-white rounded-lg px-3 py-2 max-w-xs">
                                        <p className="text-sm">Yes, it's still available!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 border-t">
                                <div className="flex space-x-2">
                                    <input 
                                        type="text" 
                                        placeholder="Type your message..." 
                                        className="flex-1 border rounded px-3 py-2"
                                    />
                                    <button 
                                        onClick={() => alert('Message sent!')}
                                        className="bg-[var(--delala-green)] hover:bg-green-700 text-white rounded px-4 py-2"
                                    >
                                        <Send />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

            const renderDeleteAccount = () => (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-red-600">Delete Account</h2>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-red-800 mb-2">⚠️ Warning</h3>
                        <p className="text-red-700 mb-4">
                            This action cannot be undone. Deleting your account will permanently remove all your data, 
                            listings, messages, and profile information.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="deletePassword" className="block text-sm font-medium text-red-700 mb-1">
                                    Enter your password to continue
                                </label>
                                <input 
                                    type="password" 
                                    id="deletePassword" 
                                    className="border border-red-300 rounded px-3 py-2 w-full" 
                                    placeholder="Enter password" 
                                />
                            </div>
                            <button 
                                onClick={() => setShowDeleteModal(true)}
                                className="bg-red-600 hover:bg-red-700 text-white font-medium rounded px-4 py-2"
                            >
                                Continue with Account Deletion
                            </button>
                        </div>
                    </div>

                    {/* Delete Confirmation Modal */}
                    {showDeleteModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                                <h3 className="text-lg font-semibold text-red-600 mb-4">Final Confirmation</h3>
                                <p className="text-gray-700 mb-4">
                                    Please enter the OTP sent to your registered email to confirm account deletion.
                                </p>
                                <div className="flex space-x-2 mb-4">
                                    {[1,2,3,4,5,6].map(i => (
                                        <input 
                                            key={i}
                                            type="text" 
                                            maxLength="1" 
                                            className="w-10 h-10 text-center border rounded font-mono"
                                        />
                                    ))}
                                </div>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => {
                                            alert('Account deletion confirmed');
                                            setShowDeleteModal(false);
                                        }}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded px-4 py-2"
                                    >
                                        Delete Account
                                    </button>
                                    <button 
                                        onClick={() => setShowDeleteModal(false)}
                                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded px-4 py-2"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );

        

            return (
                <div className="min-h-screen bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Mobile Menu Button */}
                            <div className="lg:hidden">
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="bg-white p-2 rounded-md shadow-sm border"
                                >
                                    {sidebarOpen ? <X /> : <Menu />}
                                </button>
                            </div>

                            {/* Sidebar */}
                            <div className={`lg:w-64 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
                                <nav className="bg-white rounded-lg shadow-sm p-4 space-y-2">
                                    {menuItems.map(item => {
                                    const IconComponent = item.icon;
                                    return (
                                        <button
                                        key={item.slug}
                                        onClick={() => handleMenuClick(item.slug)}
                                        className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 ${
                                            activeMenu === item.slug ? "bg-gray-200" : "hover:bg-gray-100"
                                        }`}
                                        >
                                        <IconComponent className="w-5 h-5" />
                                        <span>{item.name}</span>
                                        </button>
                                    );
                                    })}

                                </nav>
                            </div>

                            {/* Main Content */}
                           <main className="flex-1">
                            <div className="flex-1 p-4">
                                {activePage === "profile" && <ProfileSection />}
                                {activePage === "saved-ads" && <SavedAdsSection />}
                                {activePage === "my-shop" && renderMyShop()}
                                {activePage === "my-messages" && renderMyMessages()}
                                {activePage === "delete-account" && renderDeleteAccount()}
                                {activePage === "logout" && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold">Logout</h2>
                                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                                    <p className="mb-4">Are you sure you want to logout?</p>
                                    <button
                                        onClick={() => alert("Logged out successfully!")}
                                        className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-6 py-2"
                                    >
                                        Confirm Logout
                                    </button>
                                    </div>
                                </div>
                                )}
                                {!["profile","saved-ads","my-shop","my-messages","delete-account","logout"].includes(activePage) && (
                                <div className="text-center text-gray-500 py-10">
                                    Please select a section from the menu to view its content.
                                </div>
                                )}
                            </div>
    </main>

                        </div>
                    </div>
                </div>
            );
        }

