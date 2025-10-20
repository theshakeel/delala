"use client";
import { loadHomeData } from "../../lib/dataProvider";

import { useState, useEffect, useMemo } from 'react';
import AdminAside from "../AdminAside";
async function saveCategory(payload) {
  // TODO: replace with real API call
  await new Promise(resolve => setTimeout(resolve, 800));
  return { ...payload, id: Date.now(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
}

async function deleteCategory(slug) {
  // TODO: replace with real API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return true;
}



// Available database columns for attributes
const availableColumns = [
  'brand', 'model', 'year', 'condition', 'color', 'price', 'location', 'size', 'material', 'weight'
];

// Attribute types
const attributeTypes = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'single', label: 'Single Select' },
  { value: 'multi', label: 'Multi Select' },
  { value: 'date', label: 'Date' },
  { value: 'location', label: 'Location' }
];

// Helper functions
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function isSlugUnique(slug, categories, excludeId = null) {
  return !categories.some(cat => cat.slug === slug && cat.id !== excludeId);
}

// Toast component
function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`px-4 py-3 rounded-lg shadow-lg ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
        <div className="flex items-center justify-between">
          <span>{message}</span>
          <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

// Confirm modal component
function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Attribute builder component
function AttributeBuilder({ attributes, onChange, errors }) {
  const addAttribute = () => {
    const newAttribute = {
      column: '',
      type: 'text',
      options: []
    };
    onChange([...attributes, newAttribute]);
  };

  const updateAttribute = (index, field, value) => {
    const updated = [...attributes];
    updated[index] = { ...updated[index], [field]: value };
    
    // Clear options if type doesn't support them
    if (field === 'type' && !['single', 'multi'].includes(value)) {
      updated[index].options = [];
    }
    
    onChange(updated);
  };

  const removeAttribute = (index) => {
    const updated = attributes.filter((_, i) => i !== index);
    onChange(updated);
  };

  const moveAttribute = (index, direction) => {
    const updated = [...attributes];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < updated.length) {
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      onChange(updated);
    }
  };

  const addOption = (attrIndex, option) => {
    if (!option.trim()) return;
    
    const updated = [...attributes];
    if (!updated[attrIndex].options.includes(option.trim())) {
      updated[attrIndex].options.push(option.trim());
      onChange(updated);
    }
  };

  const removeOption = (attrIndex, optionIndex) => {
    const updated = [...attributes];
    updated[attrIndex].options.splice(optionIndex, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">Attributes</label>
        <button
          type="button"
          onClick={addAttribute}
          className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg transition-colors"
        >
          Add Attribute
        </button>
      </div>

      {attributes.map((attr, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Attribute {index + 1}</span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => moveAttribute(index, 'up')}
                disabled={index === 0}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                aria-label="Move up"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveAttribute(index, 'down')}
                disabled={index === attributes.length - 1}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                aria-label="Move down"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeAttribute(index)}
                className="p-1 text-red-400 hover:text-red-600"
                aria-label="Remove attribute"
              >
                ×
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={`attr-column-${index}`} className="block text-xs font-medium text-gray-700 mb-1">
                Column
              </label>
              <select
                id={`attr-column-${index}`}
                value={attr.column}
                onChange={(e) => updateAttribute(index, 'column', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors[`attributes.${index}.column`] ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select column</option>
                {availableColumns.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
              {errors[`attributes.${index}.column`] && (
                <p className="text-xs text-red-600 mt-1">{errors[`attributes.${index}.column`]}</p>
              )}
            </div>

            <div>
              <label htmlFor={`attr-type-${index}`} className="block text-xs font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                id={`attr-type-${index}`}
                value={attr.type}
                onChange={(e) => updateAttribute(index, 'type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {attributeTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          {['single', 'multi'].includes(attr.type) && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Options</label>
              <OptionsInput
                options={attr.options}
                onAdd={(option) => addOption(index, option)}
                onRemove={(optionIndex) => removeOption(index, optionIndex)}
                error={errors[`attributes.${index}.options`]}
              />
            </div>
          )}
        </div>
      ))}

      {attributes.length === 0 && (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
          <p>No attributes added yet</p>
          <p className="text-sm">Click "Add Attribute" to get started</p>
        </div>
      )}
    </div>
  );
}

// Options input component for single/multi select attributes
function OptionsInput({ options, onAdd, onRemove, error }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter option"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg transition-colors"
        >
          Add
        </button>
      </div>
      
      {options.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {options.map((option, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg"
            >
              {option}
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="ml-2 text-gray-400 hover:text-gray-600"
                aria-label={`Remove ${option}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

// Category form modal
function CategoryModal({ isOpen, category, onSave, onClose, categories }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    is_category: true,
    parent_slug: '',
    image: '',
    attributes: []
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showTypeChangeWarning, setShowTypeChangeWarning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (category) {
        setFormData({
          name: category.name,
          slug: category.slug,
          is_category: category.is_category,
          parent_slug: category.parent_slug || '',
          image: category.image || '',
          attributes: category.attributes || []
        });
      } else {
        setFormData({
          name: '',
          slug: '',
          is_category: true,
          parent_slug: '',
          image: '',
          attributes: []
        });
      }
      setErrors({});
      setShowTypeChangeWarning(false);
    }
  }, [isOpen, category]);

  const handleNameChange = (name) => {
    const slug = generateSlug(name);
    setFormData(prev => ({ ...prev, name, slug }));
    
    // Clear name and slug errors
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.name;
      delete newErrors.slug;
      return newErrors;
    });
  };

  const handleSlugChange = (slug) => {
    setFormData(prev => ({ ...prev, slug }));
    
    // Clear slug error
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.slug;
      return newErrors;
    });
  };

  const handleTypeChange = (is_category) => {
    if (category && !category.is_category && is_category && formData.attributes.length > 0) {
      setShowTypeChangeWarning(true);
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      is_category,
      parent_slug: is_category ? '' : prev.parent_slug,
      attributes: is_category ? [] : prev.attributes
    }));
  };

  const confirmTypeChange = () => {
    setFormData(prev => ({
      ...prev,
      is_category: true,
      parent_slug: '',
      attributes: []
    }));
    setShowTypeChangeWarning(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // TODO: In real implementation, upload to server and get URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!isSlugUnique(formData.slug, categories, category?.id)) {
      newErrors.slug = 'Slug must be unique';
    }

    if (!formData.is_category && !formData.parent_slug) {
      newErrors.parent_slug = 'Parent category is required for subcategories';
    }

    if (!formData.is_category && formData.attributes.length === 0) {
      newErrors.attributes = 'At least one attribute is required for subcategories';
    }

    // Validate attributes
    if (!formData.is_category) {
      const usedColumns = new Set();
      formData.attributes.forEach((attr, index) => {
        if (!attr.column) {
          newErrors[`attributes.${index}.column`] = 'Column is required';
        } else if (usedColumns.has(attr.column)) {
          newErrors[`attributes.${index}.column`] = 'Column already used';
        } else {
          usedColumns.add(attr.column);
        }

        if (['single', 'multi'].includes(attr.type) && attr.options.length === 0) {
          newErrors[`attributes.${index}.options`] = 'Options are required for this type';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        attributes: formData.is_category ? null : formData.attributes
      };
      
      if (category) {
        payload.id = category.id;
      }

      await onSave(payload);
      onClose();
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  const mainCategories = categories.filter(cat => cat.is_category);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {category ? 'Edit Category' : 'Create Category'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    checked={formData.is_category}
                    onChange={() => handleTypeChange(true)}
                    className="mr-2 text-emerald-600 focus:ring-emerald-500"
                  />
                  Main Category
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    checked={!formData.is_category}
                    onChange={() => handleTypeChange(false)}
                    className="mr-2 text-emerald-600 focus:ring-emerald-500"
                  />
                  Subcategory
                </label>
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="category-name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                id="category-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter category name"
              />
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="category-slug" className="block text-sm font-medium text-gray-700 mb-1">
                Slug *
              </label>
              <input
                id="category-slug"
                type="text"
                value={formData.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                  errors.slug ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="category-slug"
              />
              {errors.slug && <p className="text-sm text-red-600 mt-1">{errors.slug}</p>}
            </div>

            {/* Parent Category (for subcategories) */}
            {!formData.is_category && (
              <div>
                <label htmlFor="parent-category" className="block text-sm font-medium text-gray-700 mb-1">
                  Parent Category *
                </label>
                <select
                  id="parent-category"
                  value={formData.parent_slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, parent_slug: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.parent_slug ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select parent category</option>
                  {mainCategories.map(cat => (
                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
                {errors.parent_slug && <p className="text-sm text-red-600 mt-1">{errors.parent_slug}</p>}
              </div>
            )}

            {/* Image Upload */}
            <div>
              <label htmlFor="category-image" className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                id="category-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>

            {/* Attributes (for subcategories) */}
            {!formData.is_category && (
              <div>
                <AttributeBuilder
                  attributes={formData.attributes}
                  onChange={(attributes) => setFormData(prev => ({ ...prev, attributes }))}
                  errors={errors}
                />
                {errors.attributes && <p className="text-sm text-red-600 mt-1">{errors.attributes}</p>}
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Category'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Type Change Warning Modal */}
      {showTypeChangeWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Warning</h3>
            <p className="text-gray-600 mb-6">
              Changing to Main Category will remove all existing attributes. Are you sure you want to continue?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowTypeChangeWarning(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmTypeChange}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Main page component
export default function CategoriesPage() {
const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(true);
const [searchTerm, setSearchTerm] = useState('');
const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'main', 'sub'
const [currentPage, setCurrentPage] = useState(1);
const [showModal, setShowModal] = useState(false);
const [editingCategory, setEditingCategory] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deletingCategory, setDeletingCategory] = useState(null);
const [toast, setToast] = useState(null);

const pageSize = 10;

// Load categories on mount (from loadHomeData)
useEffect(() => {
  loadCategories();
}, []);

const loadCategories = async () => {
  try {
    setLoading(true);

    // ✅ Use loadHomeData as the single source
    const { regions, categoriesAll: loadedCategories, ads } = await loadHomeData();
    console.log("fetched data is ", regions, loadedCategories, ads)

    // ✅ Set categories directly from loaded data
    setCategories(loadedCategories || []);

  } catch (error) {
    console.error('Failed to load categories:', error);
    showToast('Failed to load categories', 'error');
  } finally {
    setLoading(false);
  }
};


  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Filter and search categories
  const filteredCategories = useMemo(() => {
    let filtered = categories;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (typeFilter === 'main') {
      filtered = filtered.filter(cat => cat.is_category);
    } else if (typeFilter === 'sub') {
      filtered = filtered.filter(cat => !cat.is_category);
    }

    return filtered;
  }, [categories, searchTerm, typeFilter]);

  // Paginate categories
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredCategories.slice(startIndex, startIndex + pageSize);
  }, [filteredCategories, currentPage]);

  const totalPages = Math.ceil(filteredCategories.length / pageSize);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter]);

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDeleteCategory = (category) => {
    setDeletingCategory(category);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCategory(deletingCategory.slug);
      setCategories(prev => prev.filter(cat => cat.id !== deletingCategory.id));
      showToast('Category deleted successfully');
    } catch (error) {
      console.error('Failed to delete category:', error);
      showToast('Failed to delete category', 'error');
    } finally {
      setShowDeleteModal(false);
      setDeletingCategory(null);
    }
  };

  const handleSaveCategory = async (categoryData) => {
    try {
      const savedCategory = await saveCategory(categoryData);
      
      if (editingCategory) {
        // Update existing category
        setCategories(prev => prev.map(cat => 
          cat.id === editingCategory.id ? savedCategory : cat
        ));
        showToast('Category updated successfully');
      } else {
        // Add new category
        setCategories(prev => [...prev, savedCategory]);
        showToast('Category created successfully');
      }
    } catch (error) {
      console.error('Failed to save category:', error);
      showToast('Failed to save category', 'error');
      throw error;
    }
  };

  const getParentName = (parentSlug) => {
    const parent = categories.find(cat => cat.slug === parentSlug);
    return parent ? parent.name : parentSlug;
  };

  return (
    <div className="min-h-full bg-gray-50">
      <style>{`
        body {
          box-sizing: border-box;
        }
      `}</style>
      
      <div className="flex h-full">
        {/* Sidebar */}
        <AdminAside />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
              <button
                onClick={handleCreateCategory}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Category
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="search" className="sr-only">Search categories</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      id="search"
                      type="text"
                      placeholder="Search by name or slug..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <label htmlFor="type-filter" className="sr-only">Filter by type</label>
                  <select
                    id="type-filter"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="all">All Types</option>
                    <option value="main">Main Categories</option>
                    <option value="sub">Subcategories</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                  <p className="mt-2 text-gray-600">Loading categories...</p>
                </div>
              ) : paginatedCategories.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  {filteredCategories.length === 0 && categories.length > 0 ? (
                    <p>No categories match your search criteria.</p>
                  ) : (
                    <p>No categories found. Create your first category to get started.</p>
                  )}
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Slug
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Parent
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedCategories.map((category) => (
                          <tr key={category.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  {category.image ? (
                                    <img
                                      src={category.image}
                                      alt={category.name}
                                      className="h-10 w-10 rounded-lg object-cover border border-gray-200"
                                    />
                                  ) : (
                                    <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                      <span className="text-gray-500 text-sm font-medium">
                                        {category.name.charAt(0).toUpperCase()}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 font-mono">{category.slug}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                category.is_category 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {category.is_category ? 'Main' : 'Sub'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {category.parent_slug ? getParentName(category.parent_slug) : '—'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end space-x-2">
                                <button
                                  onClick={() => handleEditCategory(category)}
                                  className="text-emerald-600 hover:text-emerald-900 transition-colors"
                                  aria-label={`Edit ${category.name}`}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDeleteCategory(category)}
                                  className="text-red-600 hover:text-red-900 transition-colors"
                                  aria-label={`Delete ${category.name}`}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 flex justify-between sm:hidden">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm text-gray-700">
                              Showing{' '}
                              <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span>
                              {' '}to{' '}
                              <span className="font-medium">
                                {Math.min(currentPage * pageSize, filteredCategories.length)}
                              </span>
                              {' '}of{' '}
                              <span className="font-medium">{filteredCategories.length}</span>
                              {' '}results
                            </p>
                          </div>
                          <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                              <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </button>
                              
                              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                  key={page}
                                  onClick={() => setCurrentPage(page)}
                                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                    page === currentPage
                                      ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
                                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                  }`}
                                >
                                  {page}
                                </button>
                              ))}
                              
                              <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </nav>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Category Modal */}
      <CategoryModal
        isOpen={showModal}
        category={editingCategory}
        onSave={handleSaveCategory}
        onClose={() => setShowModal(false)}
        categories={categories}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Category"
        message={`Are you sure you want to delete "${deletingCategory?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
}
