"use client";
import { useEffect, useState } from "react";
import { Plus, Store, Phone, Mail } from "lucide-react";

export default function ProfileSection() {
  const [activeTab, setActiveTab] = useState("Personal Details");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    // Personal Details
    name: "",
    username: "",
    location: "",
    bio: "",
    avatar: "",
    cover_image: "",
    
    // Business Details
    shop_name: "",
    shop_url: "",
    shop_logo: "",
    shop_address: "",
    shop_description: "",
    business_hours: "",
    
    // Contact
    email: "",
    phone: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const profileTabs = [
    "Personal Details",
    "Business Details",
    "Contact Information",
    "Change Password",
  ];

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  // ✅ Fetch user info on load
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setLoading(false);
      
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!res.ok) throw new Error("Failed to load user");
        
        const data = await res.json();
        setUser(data);

        // Populate form with user data
        setForm({
          name: data.name || "",
          username: data.username || "",
          location: data.location || "",
          bio: data.bio || "",
          avatar: data.avatar || "",
          cover_image: data.cover_image || "",
          shop_name: data.shop_name || "",
          shop_url: data.shop_url || "",
          shop_logo: data.shop_logo || "",
          shop_address: data.shop_address || "",
          shop_description: data.shop_description || "",
          business_hours: data.business_hours || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      } catch (e) {
        console.error(e);
        alert("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [API_BASE]);

  // ✅ Save to Laravel
  const saveProfile = async (payload) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/user/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      
      if (json.success) {
        alert(json.message || "Profile updated successfully");
        setUser(json.user);
        
        // Update form state with new user data
        setForm(prev => ({
          ...prev,
          ...json.user
        }));
        
        // Clear password fields if they were used
        if (payload.new_password) {
          setPasswordForm({
            current_password: "",
            new_password: "",
            new_password_confirmation: "",
          });
        }
      } else {
        // Handle validation errors
        if (json.errors) {
          const errorMessages = Object.values(json.errors).flat().join('\n');
          alert(errorMessages);
        } else {
          alert(json.message || "Update failed");
        }
      }
    } catch (e) {
      console.error(e);
      alert("Network error saving profile");
    }
  };

  // ✅ Personal Details Tab
  const renderPersonalDetails = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="City, Country"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            placeholder="Tell us about yourself..."
            rows={4}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Avatar URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/avatar.jpg"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={form.avatar}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/cover.jpg"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={form.cover_image}
              onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
            />
          </div>
        </div>

        <button
          onClick={() =>
            saveProfile({
              name: form.name,
              username: form.username,
              location: form.location,
              bio: form.bio,
              avatar: form.avatar,
              cover_image: form.cover_image,
            })
          }
          className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-6 py-2 transition-colors"
        >
          Save Personal Details
        </button>
      </div>
    </div>
  );

  // ✅ Business Details Tab
  const renderBusinessDetails = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Store className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold">Business/Shop Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop Name
            </label>
            <input
              type="text"
              placeholder="Your Shop Name"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={form.shop_name}
              onChange={(e) => setForm({ ...form, shop_name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop URL/Slug
            </label>
            <input
              type="text"
              placeholder="my-shop-url"
              className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={form.shop_url}
              onChange={(e) => setForm({ ...form, shop_url: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shop Address
          </label>
          <input
            type="text"
            placeholder="123 Main Street, City"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={form.shop_address}
            onChange={(e) => setForm({ ...form, shop_address: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shop Logo URL
          </label>
          <input
            type="text"
            placeholder="https://example.com/logo.png"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={form.shop_logo}
            onChange={(e) => setForm({ ...form, shop_logo: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shop Description
          </label>
          <textarea
            placeholder="Describe your business..."
            rows={4}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={form.shop_description}
            onChange={(e) => setForm({ ...form, shop_description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Hours
          </label>
          <input
            type="text"
            placeholder="Mon-Fri: 9AM-6PM"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={form.business_hours}
            onChange={(e) => setForm({ ...form, business_hours: e.target.value })}
          />
        </div>

        <button
          onClick={() =>
            saveProfile({
              shop_name: form.shop_name,
              shop_url: form.shop_url,
              shop_address: form.shop_address,
              shop_logo: form.shop_logo,
              shop_description: form.shop_description,
              business_hours: form.business_hours,
            })
          }
          className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-6 py-2 transition-colors"
        >
          Save Business Details
        </button>
      </div>
    </div>
  );

  // ✅ Contact Information Tab
  const renderContactInformation = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold">Contact Information</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <p className="text-xs text-gray-500 mt-1">
            Changing your email may require verification
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              Phone Number
            </div>
          </label>
          <input
            type="tel"
            placeholder="+1 234 567 8900"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <button
          onClick={() =>
            saveProfile({
              email: form.email,
              phone: form.phone,
            })
          }
          className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-6 py-2 transition-colors"
        >
          Save Contact Information
        </button>
      </div>
    </div>
  );

  // ✅ Change Password Tab
  const renderChangePassword = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <input
            type="password"
            placeholder="Enter current password"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={passwordForm.current_password}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, current_password: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password (min. 8 characters)"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={passwordForm.new_password}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, new_password: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="Re-enter new password"
            className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={passwordForm.new_password_confirmation}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                new_password_confirmation: e.target.value,
              })
            }
          />
        </div>

        <button
          onClick={() => {
            if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
              alert("New passwords do not match!");
              return;
            }
            if (passwordForm.new_password.length < 8) {
              alert("Password must be at least 8 characters long!");
              return;
            }
            saveProfile(passwordForm);
          }}
          className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium rounded px-6 py-2 transition-colors"
        >
          Change Password
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Profile Settings</h2>
        {user && (
          <div className="text-sm text-gray-600">
            Last updated: {new Date(user.updated_at).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex flex-wrap -mb-px overflow-x-auto">
          {profileTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`mr-8 py-3 px-1 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-[var(--delala-green)] text-[var(--delala-green)] font-semibold"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "Personal Details" && renderPersonalDetails()}
        {activeTab === "Business Details" && renderBusinessDetails()}
        {activeTab === "Contact Information" && renderContactInformation()}
        {activeTab === "Change Password" && renderChangePassword()}
      </div>
    </div>
  );
}