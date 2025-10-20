"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
export default function ProfileSection() {
const [activeTab, setActiveTab] = useState("Personal Details");
const [activeMenu, setActiveMenu] = useState('Profile');
const [sidebarOpen, setSidebarOpen] = useState(false);
const [showAddStore, setShowAddStore] = useState(false);
const [showAddDelivery, setShowAddDelivery] = useState(false);
const [showAddPhone, setShowAddPhone] = useState(false);
const [showOtpVerify, setShowOtpVerify] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [chargeFee, setChargeFee] = useState(false);
const [selectedDays, setSelectedDays] = useState([]);
    const [toggles, setToggles] = useState({
                googleLogin: false,
                facebookLogin: false,
                disableChats: false,
                disableFeedback: false,
                messages: true,
                offers: true,
                expiry: false,
                system: true
            });
    const profileTabs = [
        'Personal Details',
        'Business Details',
        'Phone Numbers',
        'Change Email',
        'Disable Chats',
        'Disable Feedback',
        'Notifications',
        'Change Password'
    ];
  const handleToggle = (key) => {
                setToggles(prev => ({ ...prev, [key]: !prev[key] }));
            };  
  const renderChangeEmail = () => (
    <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">Change Email Address</h3>
            <div>
                <label htmlFor="currentEmail" className="block text-sm font-medium text-gray-700 mb-1">Current Email</label>
                <input type="email" id="currentEmail" className="border rounded px-3 py-2 w-full" value="user@example.com" disabled />
            </div>
            <div>
                <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700 mb-1">New Email</label>
                <input type="email" id="newEmail" className="border rounded px-3 py-2 w-full" placeholder="Enter new email" />
            </div>
            <button 
                onClick={() => alert('Verification email sent!')}
                className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-4 py-2"
            >
                Save & Verify
            </button>
        </div>
    </div>
    );

    const renderDisableChats = () => (
    <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">Chat Settings</h3>
            <p className="text-gray-600">Disable chats to prevent users from messaging you directly about your listings.</p>
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Disable All Chats</span>
                <button
                    role="switch"
                    aria-checked={toggles.disableChats}
                    onClick={() => handleToggle('disableChats')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        toggles.disableChats ? 'bg-red-500' : 'bg-[var(--delala-green)]'
                    }`}
                >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        toggles.disableChats ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                </button>
            </div>
        </div>
    </div>
    );

    const renderDisableFeedback = () => (
    <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">Feedback Settings</h3>
            <p className="text-gray-600">Disable feedback to prevent users from leaving reviews on your profile and listings.</p>
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Disable All Feedback</span>
                <button
                    role="switch"
                    aria-checked={toggles.disableFeedback}
                    onClick={() => handleToggle('disableFeedback')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        toggles.disableFeedback ? 'bg-red-500' : 'bg-[var(--delala-green)]'
                    }`}
                >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        toggles.disableFeedback ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                </button>
            </div>
        </div>
    </div>
    );

    const renderNotifications = () => (
    <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">Notification Preferences</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-sm font-medium">New Messages</span>
                        <p className="text-xs text-gray-500">Get notified when someone messages you</p>
                    </div>
                    <button
                        role="switch"
                        aria-checked={toggles.messages}
                        onClick={() => handleToggle('messages')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            toggles.messages ? 'bg-[var(--delala-green)]' : 'bg-gray-200'
                        }`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            toggles.messages ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-sm font-medium">Special Offers</span>
                        <p className="text-xs text-gray-500">Receive promotional offers and deals</p>
                    </div>
                    <button
                        role="switch"
                        aria-checked={toggles.offers}
                        onClick={() => handleToggle('offers')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            toggles.offers ? 'bg-[var(--delala-green)]' : 'bg-gray-200'
                        }`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            toggles.offers ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-sm font-medium">Listing Expiry</span>
                        <p className="text-xs text-gray-500">Alerts when your listings are about to expire</p>
                    </div>
                    <button
                        role="switch"
                        aria-checked={toggles.expiry}
                        onClick={() => handleToggle('expiry')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            toggles.expiry ? 'bg-[var(--delala-green)]' : 'bg-gray-200'
                        }`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            toggles.expiry ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-sm font-medium">System Updates</span>
                        <p className="text-xs text-gray-500">Important platform updates and maintenance</p>
                    </div>
                    <button
                        role="switch"
                        aria-checked={toggles.system}
                        onClick={() => handleToggle('system')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            toggles.system ? 'bg-[var(--delala-green)]' : 'bg-gray-200'
                        }`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            toggles.system ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                    </button>
                </div>
            </div>
        </div>
    </div>
    );

    const renderChangePassword = () => (
    <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">Change Password</h3>
            <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input type="password" id="currentPassword" className="border rounded px-3 py-2 w-full" placeholder="Enter current password" />
            </div>
            <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input type="password" id="newPassword" className="border rounded px-3 py-2 w-full" placeholder="Enter new password" />
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input type="password" id="confirmPassword" className="border rounded px-3 py-2 w-full" placeholder="Confirm new password" />
            </div>
            <button 
                onClick={() => alert('Password change requires OTP verification')}
                className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-4 py-2"
            >
                Change Password
            </button>
        </div>
    </div>
    );    
 const renderPhoneNumbers = () => (
    <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">Phone Numbers</h3>
            <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <span>+1 (555) 123-4567</span>
                    <span className="text-green-600 text-sm">Verified</span>
                </div>
            </div>
            
            {!showAddPhone && !showOtpVerify && (
                <button 
                    onClick={() => setShowAddPhone(true)}
                    className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-4 py-2 flex items-center space-x-2"
                >
                    <Plus />
                    <span>Add Phone</span>
                </button>
            )}
            
            {showAddPhone && (
                <div className="border-t pt-4 space-y-4">
                    <div>
                        <label htmlFor="newPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="tel" id="newPhone" className="border rounded px-3 py-2 w-full" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => {
                                setShowAddPhone(false);
                                setShowOtpVerify(true);
                            }}
                            className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-4 py-2"
                        >
                            Send OTP
                        </button>
                        <button 
                            onClick={() => setShowAddPhone(false)}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-medium rounded px-4 py-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            
            {showOtpVerify && (
                <div className="border-t pt-4 space-y-4">
                    <p className="text-sm text-gray-600">Enter the 6-digit code sent to your phone</p>
                    <div className="flex space-x-2">
                        {[1,2,3,4,5,6].map(i => (
                            <input 
                                key={i}
                                type="text" 
                                maxLength="1" 
                                className="w-12 h-12 text-center border rounded font-mono text-lg"
                            />
                        ))}
                    </div>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => {
                                alert('Phone verified!');
                                setShowOtpVerify(false);
                            }}
                            className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-4 py-2"
                        >
                            Confirm
                        </button>
                        <button 
                            onClick={() => alert('OTP resent!')}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-medium rounded px-4 py-2"
                        >
                            Resend
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
);    
const renderBusinessDetails = () => (
    <div className="space-y-4">
        {/* Company Info Card */}
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">Company Information</h3>
            <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input type="text" id="companyName" className="border rounded px-3 py-2 w-full" placeholder="Enter company name" />
            </div>
            <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">About</label>
                <textarea id="about" rows="3" className="border rounded px-3 py-2 w-full" placeholder="Tell us about your business"></textarea>
            </div>
            <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Business Slug</label>
                <input type="text" id="slug" className="border rounded px-3 py-2 w-full" placeholder="your-business-name" />
            </div>
            <button 
                onClick={() => alert('Company info saved!')}
                className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-4 py-2"
            >
                Save
            </button>
        </div>

        {/* Store Section Card */}
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Store Locations</h3>
                <button 
                    onClick={() => setShowAddStore(!showAddStore)}
                    className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-4 py-2 flex items-center space-x-2"
                >
                    <Plus />
                    <span>Add Store</span>
                </button>
            </div>
            
            {showAddStore && (
                <div className="border-t pt-4 space-y-4">
                    <div>
                        <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                        <input type="text" id="storeName" className="border rounded px-3 py-2 w-full" placeholder="Enter store name" />
                    </div>
                    <div>
                        <label htmlFor="storeRegion" className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                        <input type="text" id="storeRegion" className="border rounded px-3 py-2 w-full" placeholder="Enter region" />
                    </div>
                    <div>
                        <label htmlFor="storeAddress" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea id="storeAddress" rows="2" className="border rounded px-3 py-2 w-full" placeholder="Enter full address"></textarea>
                    </div>
                    <div>
                        <label htmlFor="howToFind" className="block text-sm font-medium text-gray-700 mb-1">How to Find</label>
                        <textarea id="howToFind" rows="2" className="border rounded px-3 py-2 w-full" placeholder="Directions or landmarks"></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="openTime" className="block text-sm font-medium text-gray-700 mb-1">Opening Time</label>
                            <input type="time" id="openTime" className="border rounded px-3 py-2 w-full" />
                        </div>
                        <div>
                            <label htmlFor="closeTime" className="block text-sm font-medium text-gray-700 mb-1">Closing Time</label>
                            <input type="time" id="closeTime" className="border rounded px-3 py-2 w-full" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Operating Days</label>
                        <div className="flex flex-wrap gap-2">
                            {weekdays.map(day => (
                                <button
                                    key={day}
                                    onClick={() => handleDayToggle(day)}
                                    className={`inline-flex px-2 py-1 text-sm rounded-full transition-colors ${
                                        selectedDays.includes(day)
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-100 hover:bg-green-100'
                                    }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            alert('Store added!');
                            setShowAddStore(false);
                        }}
                        className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-4 py-2"
                    >
                        Save Store
                    </button>
                </div>
            )}
        </div>

        {/* Delivery Section Card */}
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Delivery Options</h3>
                <button 
                    onClick={() => setShowAddDelivery(!showAddDelivery)}
                    className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-4 py-2 flex items-center space-x-2"
                >
                    <Plus />
                    <span>Add Delivery</span>
                </button>
            </div>
            
            {showAddDelivery && (
                <div className="border-t pt-4 space-y-4">
                    <div>
                        <label htmlFor="deliveryName" className="block text-sm font-medium text-gray-700 mb-1">Delivery Name</label>
                        <input type="text" id="deliveryName" className="border rounded px-3 py-2 w-full" placeholder="e.g., Same Day Delivery" />
                    </div>
                    <div>
                        <label htmlFor="deliveryRegion" className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                        <input type="text" id="deliveryRegion" className="border rounded px-3 py-2 w-full" placeholder="Enter delivery region" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="deliveryFrom" className="block text-sm font-medium text-gray-700 mb-1">Delivery From</label>
                            <select id="deliveryFrom" className="border rounded px-3 py-2 w-full">
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>
                                <option>Sunday</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="deliveryTo" className="block text-sm font-medium text-gray-700 mb-1">Delivery To</label>
                            <select id="deliveryTo" className="border rounded px-3 py-2 w-full">
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>
                                <option>Sunday</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Charge Delivery Fee?</span>
                        <button
                            role="switch"
                            aria-checked={chargeFee}
                            onClick={() => setChargeFee(!chargeFee)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                chargeFee ? 'bg-[var(--delala-green)]' : 'bg-gray-200'
                            }`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                chargeFee ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                        </button>
                    </div>
                    {chargeFee && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="minFee" className="block text-sm font-medium text-gray-700 mb-1">Minimum Fee ($)</label>
                                <input type="number" id="minFee" className="border rounded px-3 py-2 w-full" placeholder="0.00" />
                            </div>
                            <div>
                                <label htmlFor="maxFee" className="block text-sm font-medium text-gray-700 mb-1">Maximum Fee ($)</label>
                                <input type="number" id="maxFee" className="border rounded px-3 py-2 w-full" placeholder="0.00" />
                            </div>
                        </div>
                    )}
                    <button 
                        onClick={() => {
                            alert('Delivery option added!');
                            setShowAddDelivery(false);
                        }}
                        className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-4 py-2"
                    >
                        Save Delivery
                    </button>
                </div>
            )}
        </div>
    </div>
);    
  const renderPersonalDetails = () => (
    <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" id="firstName" className="border rounded px-3 py-2 w-full" placeholder="Enter first name" />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" id="lastName" className="border rounded px-3 py-2 w-full" placeholder="Enter last name" />
                </div>
            </div>
            <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select id="location" className="border rounded px-3 py-2 w-full">
                    <option>Select location</option>
                    <option>New York</option>
                    <option>Los Angeles</option>
                    <option>Chicago</option>
                </select>
            </div>
            <div>
                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
                <input type="date" id="birthday" className="border rounded px-3 py-2 w-full" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <div className="flex space-x-4">
                    <label className="flex items-center">
                        <input type="radio" name="gender" value="male" className="mr-2" />
                        Male
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="gender" value="female" className="mr-2" />
                        Female
                    </label>
                    <label className="flex items-center">
                        <input type="radio" name="gender" value="other" className="mr-2" />
                        Other
                    </label>
                </div>
            </div>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Google Login</span>
                    <button
                        role="switch"
                        aria-checked={toggles.googleLogin}
                        onClick={() => handleToggle('googleLogin')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            toggles.googleLogin ? 'bg-[var(--delala-green)]' : 'bg-gray-200'
                        }`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            toggles.googleLogin ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Facebook Login</span>
                    <button
                        role="switch"
                        aria-checked={toggles.facebookLogin}
                        onClick={() => handleToggle('facebookLogin')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            toggles.facebookLogin ? 'bg-[var(--delala-green)]' : 'bg-gray-200'
                        }`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            toggles.facebookLogin ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                    </button>
                </div>
            </div>
            <button 
                onClick={() => alert('Personal details saved!')}
                className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-4 py-2"
            >
                Save Changes
            </button>
        </div>
    </div>
);  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile Settings</h2>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex flex-wrap -mb-px">
          {profileTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`mr-8 py-2 px-1 text-sm font-medium ${
                activeTab === tab
                  ? "border-b-2 border-[var(--delala-green)] text-[var(--delala-green)] font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "Personal Details" && renderPersonalDetails?.()}
        {activeTab === "Business Details" && renderBusinessDetails?.()}
        {activeTab === "Phone Numbers" && renderPhoneNumbers?.()}
        {activeTab === "Change Email" && renderChangeEmail?.()}
        {activeTab === "Disable Chats" && renderDisableChats?.()}
        {activeTab === "Disable Feedback" && renderDisableFeedback?.()}
        {activeTab === "Notifications" && renderNotifications?.()}
        {activeTab === "Change Password" && renderChangePassword?.()}
      </div>
    </div>
  );
}
