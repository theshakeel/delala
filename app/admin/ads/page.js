"use client";
import AdminAside from "../AdminAside";
import { loadHomeData } from "../../lib/dataProvider";

import { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Star, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';

// Dummy action functions - TODO: replace with real API calls
const approveAd = async (adId) => {
  console.log(`Approving ad ${adId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

const rejectAd = async (adId) => {
  console.log(`Rejecting ad ${adId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

const deleteAd = async (adId) => {
  console.log(`Deleting ad ${adId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

const toggleFeatured = async (adId, featured) => {
  console.log(`Setting ad ${adId} featured to ${featured}`);
  await new Promise(resolve => setTimeout(resolve, 300));
  return true;
};

const updateAd = async (adId, data) => {
  console.log(`Updating ad ${adId}`, data);
  await new Promise(resolve => setTimeout(resolve, 800));
  return { ...data, id: adId };
};

// Toast component
function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2`}>
        <span>{message}</span>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

// Search input component
function SearchInput({ value, onChange, placeholder = "Search ads..." }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

// Filter bar component
function FilterBar({ 
  statusFilter, 
  setStatusFilter, 
  featuredFilter, 
  setFeaturedFilter, 
  reportedFilter, 
  setReportedFilter,
  categoryFilter,
  setCategoryFilter,
  categories 
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div>
        <label htmlFor="featured-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Featured
        </label>
        <select
          id="featured-filter"
          value={featuredFilter}
          onChange={(e) => setFeaturedFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Ads</option>
          <option value="featured">Featured Only</option>
          <option value="non-featured">Non-Featured</option>
        </select>
      </div>

      <div>
        <label htmlFor="reported-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Reports
        </label>
        <select
          id="reported-filter"
          value={reportedFilter}
          onChange={(e) => setReportedFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Ads</option>
          <option value="reported">Reported Only</option>
        </select>
      </div>

      <div>
        <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category-filter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// Status badge component
function StatusBadge({ status }) {
  const colors = {
    pending: 'bg-amber-100 text-amber-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// Edit modal component
function EditModal({ isOpen, ad, categories, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_slug: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && ad) {
      setFormData({
        title: ad.title || '',
        description: ad.description || '',
        category_slug: ad.category_slug || ''
      });
    }
  }, [isOpen, ad]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(ad.id, formData);
      onClose();
    } catch (error) {
      console.error('Failed to update ad:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Ad</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="edit-title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="edit-category"
              value={formData.category_slug}
              onChange={(e) => setFormData(prev => ({ ...prev, category_slug: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
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
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Report modal component
function ReportModal({ isOpen, ad, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Report Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Ad: {ad?.title}</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-gray-600">Reported for: Spam content</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-gray-600">Reported for: Inappropriate images</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-gray-600">Reported for: Misleading information</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              This ad has been reported by multiple users. Please review the content and take appropriate action.
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Delete confirmation modal
function DeleteConfirmModal({ isOpen, ad, onConfirm, onClose }) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Failed to delete ad:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Delete Ad</h3>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete "{ad?.title}"? This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Ads table component
function AdsTable({ ads, categories, onAction }) {
  const getCategoryName = (slug) => {
    const category = categories.find(cat => cat.slug === slug);
    return category ? category.name : slug;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'RTB'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Ad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Flags
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ads.map((ad, index) => (
              <tr key={ad.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      {ad.images && ad.images.length > 0 ? (
                        <img
                          src={ad.images[0]}
                          alt={ad.title}
                          className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        {ad.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {ad.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{getCategoryName(ad.category_slug)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{formatPrice(ad.price)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{ad.user?.name || 'Unknown'}</div>
                  <div className="text-sm text-gray-500">{ad.user?.email || ''}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={ad.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {ad.featured && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </span>
                    )}
                    {ad.reported && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Reported
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    {ad.status === 'pending' && (
                      <>
                        <button
                          onClick={() => onAction('approve', ad)}
                          className="text-green-600 hover:text-green-900 transition-colors"
                          title="Approve"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => onAction('reject', ad)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Reject"
                        >
                          <X size={16} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onAction('toggleFeatured', ad)}
                      className={`transition-colors ${ad.featured ? 'text-yellow-600 hover:text-yellow-900' : 'text-gray-400 hover:text-gray-600'}`}
                      title={ad.featured ? 'Remove from featured' : 'Make featured'}
                    >
                      <Star size={16} />
                    </button>
                    <button
                      onClick={() => onAction('edit', ad)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    {ad.reported && (
                      <button
                        onClick={() => onAction('viewReports', ad)}
                        className="text-orange-600 hover:text-orange-900 transition-colors"
                        title="View reports"
                      >
                        <Eye size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => onAction('delete', ad)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        {ads.map((ad) => (
          <div key={ad.id} className="border-b border-gray-200 p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {ad.images && ad.images.length > 0 ? (
                  <img
                    src={ad.images[0]}
                    alt={ad.title}
                    className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">No Image</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{ad.title}</h3>
                    <p className="text-sm text-gray-500">{getCategoryName(ad.category_slug)}</p>
                    <p className="text-sm font-medium text-gray-900">{formatPrice(ad.price)}</p>
                    <p className="text-xs text-gray-500">{ad.user?.name || 'Unknown'}</p>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <StatusBadge status={ad.status} />
                    <div className="flex items-center space-x-1">
                      {ad.featured && <Star className="h-4 w-4 text-yellow-500" />}
                      {ad.reported && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-2 mt-3">
                  {ad.status === 'pending' && (
                    <>
                      <button
                        onClick={() => onAction('approve', ad)}
                        className="text-green-600 hover:text-green-900 transition-colors"
                        title="Approve"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => onAction('reject', ad)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Reject"
                      >
                        <X size={16} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onAction('toggleFeatured', ad)}
                    className={`transition-colors ${ad.featured ? 'text-yellow-600 hover:text-yellow-900' : 'text-gray-400 hover:text-gray-600'}`}
                    title={ad.featured ? 'Remove from featured' : 'Make featured'}
                  >
                    <Star size={16} />
                  </button>
                  <button
                    onClick={() => onAction('edit', ad)}
                    className="text-blue-600 hover:text-blue-900 transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  {ad.reported && (
                    <button
                      onClick={() => onAction('viewReports', ad)}
                      className="text-orange-600 hover:text-orange-900 transition-colors"
                      title="View reports"
                    >
                      <Eye size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => onAction('delete', ad)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {ads.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <p>No ads found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

// Pagination component
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {getVisiblePages().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                disabled={page === '...'}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  page === currentPage
                    ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                    : page === '...'
                    ? 'text-gray-700 ring-1 ring-inset ring-gray-300 cursor-default'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

// Main component
export default function AdminAdsPage({ regions, categoriesAll: loadedCategories, adsAll: initialAds }) {
  const [ads, setAds] = useState(initialAds || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [featuredFilter, setFeaturedFilter] = useState('all');
  const [reportedFilter, setReportedFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [editModal, setEditModal] = useState({ isOpen: false, ad: null });
  const [reportModal, setReportModal] = useState({ isOpen: false, ad: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, ad: null });
  const [toast, setToast] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const { ads } = await loadHomeData();
        setAds(ads?.ads || []);
      } catch (err) {
        console.error("❌ Failed to load admin ads data:", err);
      }
    }

    fetchData();
  }, []);
  const pageSize = 10;

  // Filter ads based on search and filters
  const filteredAds = useMemo(() => {
    let filtered = ads;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(ad =>
        ad.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(ad => ad.status === statusFilter);
    }

    // Featured filter
    if (featuredFilter === 'featured') {
      filtered = filtered.filter(ad => ad.featured);
    } else if (featuredFilter === 'non-featured') {
      filtered = filtered.filter(ad => !ad.featured);
    }

    // Reported filter
    if (reportedFilter === 'reported') {
      filtered = filtered.filter(ad => ad.reported);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(ad => ad.category_slug === categoryFilter);
    }

    return filtered;
  }, [ads, searchTerm, statusFilter, featuredFilter, reportedFilter, categoryFilter]);

  // Paginate filtered ads
  const paginatedAds = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAds.slice(startIndex, startIndex + pageSize);
  }, [filteredAds, currentPage]);

  const totalPages = Math.ceil(filteredAds.length / pageSize);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, featuredFilter, reportedFilter, categoryFilter]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  const handleAction = async (action, ad) => {
    try {
      switch (action) {
        case 'approve':
          await approveAd(ad.id);
          setAds(prev => prev.map(a => a.id === ad.id ? { ...a, status: 'approved' } : a));
          showToast('Ad approved successfully!');
          break;

        case 'reject':
          await rejectAd(ad.id);
          setAds(prev => prev.map(a => a.id === ad.id ? { ...a, status: 'rejected' } : a));
          showToast('Ad rejected successfully!');
          break;

        case 'toggleFeatured':
          const newFeaturedStatus = !ad.featured;
          await toggleFeatured(ad.id, newFeaturedStatus);
          setAds(prev => prev.map(a => a.id === ad.id ? { ...a, featured: newFeaturedStatus } : a));
          showToast(newFeaturedStatus ? 'Ad marked as featured!' : 'Ad removed from featured!');
          break;

        case 'edit':
          setEditModal({ isOpen: true, ad });
          break;

        case 'viewReports':
          setReportModal({ isOpen: true, ad });
          break;

        case 'delete':
          setDeleteModal({ isOpen: true, ad });
          break;

        default:
          console.log('Unknown action:', action);
      }
    } catch (error) {
      console.error('Action failed:', error);
      showToast('Action failed. Please try again.', 'error');
    }
  };

  const handleSaveEdit = async (adId, formData) => {
    await updateAd(adId, formData);
    setAds(prev => prev.map(a => a.id === adId ? { ...a, ...formData } : a));
    showToast('Ad updated successfully!');
  };

  const handleDeleteConfirm = async () => {
    const ad = deleteModal.ad;
    await deleteAd(ad.id);
    setAds(prev => prev.filter(a => a.id !== ad.id));
    showToast('Ad deleted successfully!');
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
        <main className="flex-1 overflow-auto">
        {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by title, user name, or email..."
              />
            </div>
          </div>
          
          <FilterBar
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            featuredFilter={featuredFilter}
            setFeaturedFilter={setFeaturedFilter}
            reportedFilter={reportedFilter}
            setReportedFilter={setReportedFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            categories={loadedCategories || []}
          />
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {paginatedAds.length} of {filteredAds.length} ads
          {filteredAds.length !== ads.length && ` (filtered from ${ads.length} total)`}
        </p>
      </div>

      {/* Ads Table */}
      <AdsTable
        ads={paginatedAds}
        categories={loadedCategories || []}
        onAction={handleAction}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modals */}
      <EditModal
        isOpen={editModal.isOpen}
        ad={editModal.ad}
        categories={loadedCategories || []}
        onSave={handleSaveEdit}
        onClose={() => setEditModal({ isOpen: false, ad: null })}
      />

      <ReportModal
        isOpen={reportModal.isOpen}
        ad={reportModal.ad}
        onClose={() => setReportModal({ isOpen: false, ad: null })}
      />

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        ad={deleteModal.ad}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeleteModal({ isOpen: false, ad: null })}
      />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
        </main>
       </div> 
    </div> 
      
  );
}
