"use client"
import { loadHomeData } from "../../lib/dataProvider";
import React, { useState, useEffect } from "react";
        // Mock data for types.json
        const mockTypes = {
            "brand": "select",
            "model": "text",
            "year": "number",
            "condition": "select",
            "color": "multi",
            "size": "select",
            "material": "multi",
            "features": "multi",
            "bedrooms": "number",
            "bathrooms": "number",
            "area": "number",
            "fuel_type": "select",
            "transmission": "select",
            "mileage": "number"
        };

        // Mock data for data.json
        const mockData = {
            "brand": ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"],
            "condition": ["New", "Like New", "Good", "Fair", "Poor"],
            "color": ["Black", "White", "Red", "Blue", "Green", "Silver", "Gold"],
            "size": ["XS", "S", "M", "L", "XL", "XXL"],
            "material": ["Cotton", "Polyester", "Wool", "Silk", "Leather", "Denim"],
            "features": ["WiFi", "Bluetooth", "GPS", "Camera", "Touchscreen", "Waterproof"],
            "fuel_type": ["Petrol", "Diesel", "Electric", "Hybrid"],
            "transmission": ["Manual", "Automatic", "CVT"]
        };

        // Icons
        const ChevronDown = () => (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        );

        const X = () => (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        );

        const Plus = () => (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
        );

        const Video = () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        );

        const Truck = () => (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        );

      export default function CreateAdPage() {
            const [categories, setCategories] = useState([]);
            const [regions, setRegions] = useState([]);
            const [mainCategory, setMainCategory] = useState('');
            const [subCategory, setSubCategory] = useState('');
            const [attributes, setAttributes] = useState([]);
            const [selectedRegion, setSelectedRegion] = useState('');
            const [selectedZone, setSelectedZone] = useState('');
            const [videoUrl, setVideoUrl] = useState('');
            const [title, setTitle] = useState('');
            const [formData, setFormData] = useState({});
            const [price, setPrice] = useState('');
            const [priceType, setPriceType] = useState('fixed');
            const [selectedPlan, setSelectedPlan] = useState('free');
            const [deliveryOptions, setDeliveryOptions] = useState([
                {
                    id: 1,
                    deliveryName: "Same Day Delivery",
                    fromRegion: "downtown",
                    toRegion: "citywide",
                    isFree: false,
                    deliveryTimeDays: 1
                },
                {
                    id: 2,
                    deliveryName: "Standard Delivery",
                    fromRegion: "citywide",
                    toRegion: "nationwide",
                    isFree: true,
                    deliveryTimeDays: 3
                }
            ]);
            const [selectedDelivery, setSelectedDelivery] = useState('');
            const [showAddDelivery, setShowAddDelivery] = useState(false);
            const [newDelivery, setNewDelivery] = useState({
                deliveryName: '',
                fromRegion: '',
                toRegion: '',
                isFree: true,
                deliveryTimeDays: 1
            });
            const [loading, setLoading] = useState(true);
            const [multiSelectStates, setMultiSelectStates] = useState({});
            // const { regions, categories } = await loadHomeData();
            

            // Mock API calls
            useEffect(() => {
            const fetchData = async () => {
                try {
                const { regions, categories } = await loadHomeData();

                setRegions(regions || []);
                setCategories(categories || []);
                setLoading(false);
                } catch (error) {
                console.error("❌ Failed to fetch regions/categories:", error);
                setLoading(false);
                }
            };

            fetchData();
            }, []);

            const mainCategories = categories.filter(cat => cat.is_category);
            const subCategories = categories.filter(cat => !cat.is_category && cat.parent_slug === mainCategory);
            const selectedSubCategory = categories.find(cat => cat.slug === subCategory);
            // console.log("categories we have ",categories, subCategory)

            const handleMainCategoryChange = (slug) => {
                setMainCategory(slug);
                setSubCategory('');
                setFormData({});
                setMultiSelectStates({});
            };

            const handleSubCategoryChange = (sub) => {
                // console.log("the sub is", sub.slug,sub.attr)
                setSubCategory(sub.slug);
                setAttributes(sub.attr);
                setFormData({});
                setMultiSelectStates({});
            };

            const handleFieldChange = (fieldName, value) => {
                setFormData(prev => ({
                    ...prev,
                    [fieldName]: value
                }));
            };

            const handleMultiSelectToggle = (fieldName, value) => {
                const currentValues = formData[fieldName] || [];
                const newValues = currentValues.includes(value)
                    ? currentValues.filter(v => v !== value)
                    : [...currentValues, value];
                
                handleFieldChange(fieldName, newValues);
            };

            const toggleMultiSelect = (fieldName) => {
                setMultiSelectStates(prev => ({
                    ...prev,
                    [fieldName]: !prev[fieldName]
                }));
            };

            const handleAddDelivery = () => {
                const newId = Math.max(...deliveryOptions.map(d => d.id), 0) + 1;
                setDeliveryOptions(prev => [...prev, { ...newDelivery, id: newId }]);
                setNewDelivery({
                    deliveryName: '',
                    fromRegion: '',
                    toRegion: '',
                    isFree: true,
                    deliveryTimeDays: 1
                });
                setShowAddDelivery(false);
            };

            const handleSubmit = (e) => {
                e.preventDefault();
                
                const payload = {
                    category_slug: subCategory,
                    region_slug: selectedRegion,
                    video_url: videoUrl,
                    title: title,
                    fields: formData,
                    price: price,
                    negotiable: priceType === 'negotiable',
                    delivery: selectedDelivery,
                    plan: selectedPlan
                };

                console.log('Ad Payload:', payload);
                alert('Ad created successfully! Check console for payload.');
            };

            const renderDynamicField = (fieldName) => {
                const fieldType = mockTypes[fieldName] || 'text';
                const fieldData = mockData[fieldName] || [];

                switch (fieldType) {
                    case 'text':
                        return (
                            <div key={fieldName}>
                                <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                    {fieldName.replace('_', ' ')}
                                </label>
                                <input
                                    type="text"
                                    id={fieldName}
                                    value={formData[fieldName] || ''}
                                    onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2"
                                    placeholder={`Enter ${fieldName.replace('_', ' ')}`}
                                />
                            </div>
                        );

                    case 'number':
                        return (
                            <div key={fieldName}>
                                <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                    {fieldName.replace('_', ' ')}
                                </label>
                                <input
                                    type="number"
                                    id={fieldName}
                                    value={formData[fieldName] || ''}
                                    onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2"
                                    placeholder={`Enter ${fieldName.replace('_', ' ')}`}
                                />
                            </div>
                        );

                    case 'select':
                        return (
                            <div key={fieldName}>
                                <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                    {fieldName.replace('_', ' ')}
                                </label>
                                <select
                                    id={fieldName}
                                    value={formData[fieldName] || ''}
                                    onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2 bg-white"
                                >
                                    <option value="">Select {fieldName.replace('_', ' ')}</option>
                                    {fieldData.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        );

                    case 'multi':
                        const selectedValues = formData[fieldName] || [];
                        const isOpen = multiSelectStates[fieldName] || false;
                        
                        return (
                            <div key={fieldName}>
                                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                                    {fieldName.replace('_', ' ')}
                                </label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => toggleMultiSelect(fieldName)}
                                        className="w-full border rounded-lg px-3 py-2 bg-white text-left flex items-center justify-between"
                                    >
                                        <span className="text-gray-500">
                                            {selectedValues.length > 0 
                                                ? `${selectedValues.length} selected` 
                                                : `Select ${fieldName.replace('_', ' ')}`
                                            }
                                        </span>
                                        <ChevronDown />
                                    </button>
                                    
                                    {isOpen && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                            {fieldData.map(option => (
                                                <label key={option} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedValues.includes(option)}
                                                        onChange={() => handleMultiSelectToggle(fieldName, option)}
                                                        className="mr-2"
                                                    />
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                {selectedValues.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedValues.map(value => (
                                            <span key={value} className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                                                {value}
                                                <button
                                                    type="button"
                                                    onClick={() => handleMultiSelectToggle(fieldName, value)}
                                                    className="ml-1 text-green-600 hover:text-green-800"
                                                >
                                                    <X />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );

                    default:
                        return null;
                }
            };

            if (loading) {
                return (
                    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--delala-green)] mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading categories and regions...</p>
                        </div>
                    </div>
                );
            }

            return (
                <div className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-4xl mx-auto p-6 space-y-6">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Ad</h1>
                            
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Step 1: Category Selection */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                                        1. Choose Category
                                    </h2>

                                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-3">
                                        {/* ✅ Main Category */}
                                        <div>
                                        <label
                                            htmlFor="mainCategory"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Category
                                        </label>
                                        <select
                                            id="mainCategory"
                                            value={mainCategory}
                                            onChange={(e) => handleMainCategoryChange(e.target.value)}
                                            className="w-full border rounded-lg px-3 py-2 bg-white"
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((category) => (
                                            <option key={category.slug} value={category.slug}>
                                                {category.categoryName}
                                            </option>
                                            ))}
                                        </select>
                                        </div>

                                        {/* ✅ Subcategory */}
                                        {mainCategory && (
                                        <div>
                                            <label
                                            htmlFor="subCategory"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                            Subcategory
                                            </label>
                                         <select
  id="subCategory"
  value={subCategory || ""}
  onChange={(e) => {
    const selectedSlug = e.target.value;
    const parent = categories.find((cat) => cat.slug === mainCategory);
    const selectedSub = parent?.subcategories?.find(
      (sub) => sub.slug === selectedSlug
    );
    handleSubCategoryChange(selectedSub);
  }}
  className="w-full border rounded-lg px-3 py-2 bg-white"
  required
>
  <option value="">Select Subcategory</option>
  {categories
    .find((cat) => cat.slug === mainCategory)
    ?.subcategories?.map((sub) => (
      <option key={sub.slug} value={sub.slug}>
        {sub.name}
      </option>
    ))}
</select>


                                        </div>
                                        )}
                                    </div>
                                    </div>


                                {/* Step 2: Location */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                                        2. Choose Location
                                    </h2>
                                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-3">
                                    {/* ✅ Region Select */}
                                    {!selectedRegion ? (
                                        <div>
                                        <label
                                            htmlFor="region"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Region
                                        </label>
                                        <select
                                            id="region"
                                            value={selectedRegion}
                                            onChange={(e) => setSelectedRegion(e.target.value)}
                                            className="w-full border rounded-lg px-3 py-2 bg-white"
                                            required
                                        >
                                            <option value="">Select region</option>
                                            {regions.map((region) => (
                                            <option key={region.slug} value={region.slug}>
                                                {region.region}
                                            </option>
                                            ))}
                                        </select>
                                        </div>
                                    ) : (
                                        <>
                                        {/* ✅ Zone Select (shown only when region selected) */}
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                            <label
                                                htmlFor="zone"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Zone —{" "}
                                                <span className="text-emerald-600 font-semibold">
                                                {regions.find((r) => r.slug === selectedRegion)?.name}
                                                </span>
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                setSelectedRegion("");
                                                setSelectedZone("");
                                                }}
                                                className="text-xs text-red-500 hover:text-red-600 underline"
                                            >
                                                Change
                                            </button>
                                            </div>

                                            <select
                                            id="zone"
                                            value={selectedZone}
                                            onChange={(e) => setSelectedZone(e.target.value)}
                                            className="w-full border rounded-lg px-3 py-2 bg-white"
                                            required
                                            >
                                            <option value="">Select Zone</option>
                                            {regions
                                                .find((r) => r.slug === selectedRegion)
                                                ?.zones?.map((zone) => (
                                                <option key={zone.slug} value={zone.slug}>
                                                    {zone.zone}
                                                </option>
                                                ))}
                                            </select>
                                        </div>
                                        </>
                                    )}
                                    </div>

                                </div>

                                {/* Step 3: Video URL */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                                        3. Add Video (Optional)
                                    </h2>
                                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-3">
                                        <div>
                                            <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                                                <Video className="inline w-4 h-4 mr-1" />
                                                YouTube or Facebook Video URL
                                            </label>
                                            <input
                                                type="url"
                                                id="videoUrl"
                                                value={videoUrl}
                                                onChange={(e) => setVideoUrl(e.target.value)}
                                                className="w-full border rounded-lg px-3 py-2"
                                                placeholder="https://youtube.com/watch?v=..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4: Title */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                                        4. Ad Title
                                    </h2>
                                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-3">
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="w-full border rounded-lg px-3 py-2"
                                                placeholder="Enter a descriptive title for your ad"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Step 5: Dynamic Fields */}
                                {attributes.length > 0 && (
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                                            5. Product Details
                                        </h2>
                                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-3">
                                            {attributes.map(fieldName => renderDynamicField(fieldName))}
                                        </div>
                                    </div>
                                )}

                                {/* Step 6: Price */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                                        6. Pricing
                                    </h2>
                                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-3">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Price ($)
                                                </label>
                                                <input
                                                    type="number"
                                                    id="price"
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    className="w-full border rounded-lg px-3 py-2"
                                                    placeholder="0.00"
                                                    min="0"
                                                    step="0.01"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="priceType" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Price Type
                                                </label>
                                                <select
                                                    id="priceType"
                                                    value={priceType}
                                                    onChange={(e) => setPriceType(e.target.value)}
                                                    className="w-full border rounded-lg px-3 py-2 bg-white"
                                                >
                                                    <option value="fixed">Fixed Price</option>
                                                    <option value="negotiable">Negotiable</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 7: Delivery Options */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                                        7. Delivery Options
                                    </h2>
                                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-3">
                                        <div className="space-y-2">
                                            {deliveryOptions.map(option => (
                                                <label key={option.id} className="flex items-center p-3 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="radio"
                                                        name="delivery"
                                                        value={option.id}
                                                        checked={selectedDelivery === option.id.toString()}
                                                        onChange={(e) => setSelectedDelivery(e.target.value)}
                                                        className="mr-3"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2">
                                                            <Truck />
                                                            <span className="font-medium">{option.deliveryName}</span>
                                                            {option.isFree && (
                                                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                                    Free
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            From {option.fromRegion} to {option.toRegion} • {option.deliveryTimeDays} day(s)
                                                        </p>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>

                                        {!showAddDelivery && (
                                            <button
                                                type="button"
                                                onClick={() => setShowAddDelivery(true)}
                                                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-[var(--delala-green)] hover:text-[var(--delala-green)] transition-colors flex items-center justify-center space-x-2"
                                            >
                                                <Plus />
                                                <span>Add Delivery Option</span>
                                            </button>
                                        )}

                                        {showAddDelivery && (
                                            <div className="border-t pt-4 space-y-3">
                                                <h4 className="font-medium text-gray-800">Add New Delivery Option</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <input
                                                        type="text"
                                                        placeholder="Delivery name"
                                                        value={newDelivery.deliveryName}
                                                        onChange={(e) => setNewDelivery(prev => ({ ...prev, deliveryName: e.target.value }))}
                                                        className="w-full border rounded-lg px-3 py-2"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="From region"
                                                        value={newDelivery.fromRegion}
                                                        onChange={(e) => setNewDelivery(prev => ({ ...prev, fromRegion: e.target.value }))}
                                                        className="w-full border rounded-lg px-3 py-2"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="To region"
                                                        value={newDelivery.toRegion}
                                                        onChange={(e) => setNewDelivery(prev => ({ ...prev, toRegion: e.target.value }))}
                                                        className="w-full border rounded-lg px-3 py-2"
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="Delivery days"
                                                        value={newDelivery.deliveryTimeDays}
                                                        onChange={(e) => setNewDelivery(prev => ({ ...prev, deliveryTimeDays: parseInt(e.target.value) }))}
                                                        className="w-full border rounded-lg px-3 py-2"
                                                        min="1"
                                                    />
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        id="isFree"
                                                        checked={newDelivery.isFree}
                                                        onChange={(e) => setNewDelivery(prev => ({ ...prev, isFree: e.target.checked }))}
                                                    />
                                                    <label htmlFor="isFree" className="text-sm">Free delivery</label>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        type="button"
                                                        onClick={handleAddDelivery}
                                                        className="bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg"
                                                    >
                                                        Save Delivery Option
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowAddDelivery(false)}
                                                        className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded-lg"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Step 8: Ad Plans */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                                        8. Choose Ad Plan
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <label className={`cursor-pointer ${selectedPlan === 'free' ? 'ring-2 ring-green-500' : ''}`}>
                                            <input
                                                type="radio"
                                                name="plan"
                                                value="free"
                                                checked={selectedPlan === 'free'}
                                                onChange={(e) => setSelectedPlan(e.target.value)}
                                                className="sr-only"
                                            />
                                            <div className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                                                <h3 className="font-semibold text-lg mb-2">Free</h3>
                                                <p className="text-2xl font-bold text-gray-900 mb-2">$0</p>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• Basic listing</li>
                                                    <li>• No promotion</li>
                                                    <li>• Standard visibility</li>
                                                </ul>
                                            </div>
                                        </label>

                                        <label className={`cursor-pointer ${selectedPlan === 'base' ? 'ring-2 ring-green-500' : ''}`}>
                                            <input
                                                type="radio"
                                                name="plan"
                                                value="base"
                                                checked={selectedPlan === 'base'}
                                                onChange={(e) => setSelectedPlan(e.target.value)}
                                                className="sr-only"
                                            />
                                            <div className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                                                <h3 className="font-semibold text-lg mb-2">Base Plan</h3>
                                                <p className="text-2xl font-bold text-gray-900 mb-2">$9.99</p>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• 7 days promotion</li>
                                                    <li>• Higher visibility</li>
                                                    <li>• Featured badge</li>
                                                </ul>
                                            </div>
                                        </label>

                                        <label className={`cursor-pointer ${selectedPlan === 'premium' ? 'ring-2 ring-green-500' : ''}`}>
                                            <input
                                                type="radio"
                                                name="plan"
                                                value="premium"
                                                checked={selectedPlan === 'premium'}
                                                onChange={(e) => setSelectedPlan(e.target.value)}
                                                className="sr-only"
                                            />
                                            <div className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                                                <h3 className="font-semibold text-lg mb-2">Premium</h3>
                                                <p className="text-2xl font-bold text-gray-900 mb-2">$24.99</p>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    <li>• 30 days promotion</li>
                                                    <li>• Top visibility</li>
                                                    <li>• Premium badge</li>
                                                    <li>• Priority support</li>
                                                </ul>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Step 9: Submit */}
                                <div className="pt-6 border-t">
                                    <button
                                        type="submit"
                                        className="w-full bg-[var(--delala-green)] hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg text-lg transition-colors"
                                    >
                                        Post Ad
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
