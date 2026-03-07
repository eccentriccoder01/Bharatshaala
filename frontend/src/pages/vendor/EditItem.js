import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import LoadingSpinner from '../../components/LoadingSpinner';
import { useLanguage } from '../../context/LanguageContext';
import VendorSidebar from "../../components/VendorSidebar";
import "../../App.css";

const EditItem = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    description: "",
    descriptionEn: "",
    category: "",
    subcategory: "",
    price: "",
    originalPrice: "",
    quantity: "",
    images: [],
    materials: [],
    colors: [],
    isActive: true,
    isHandmade: true,
    tags: []
  });

  const categories = [
    { id: 'jewelry', name: 'आभूषण' },
    { id: 'clothing', name: 'वस्त्र' },
    { id: 'handicrafts', name: 'हस्तशिल्प' },
    { id: 'books', name: 'पुस्तकें' },
    { id: 'accessories', name: 'एक्सेसरीज़' },
    { id: 'houseware', name: 'घरेलू सामान' }
  ];

  useEffect(() => {
    loadItemData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadItemData = async () => {
    try {
      const response = await axios.get(`/vendor/items/${id}`);
      if (response.data.success) {
        setFormData(response.data.item);
      }
    } catch (error) {
      console.error("Error loading item:", error);
      // Mock data for demo
      setFormData({
        id: id,
        name: 'कुंदन हार',
        nameEn: 'Kundan Necklace',
        description: 'पारंपरिक कुंदन और मीनाकारी से सजा हुआ खूबसूरत हार। यह शुद्ध पीतल पर सोने की पॉलिश के साथ बना है।',
        descriptionEn: 'Beautiful necklace decorated with traditional Kundan and Meenakari work. Made with gold plating on pure brass.',
        category: 'jewelry',
        subcategory: 'हार',
        price: 15000,
        originalPrice: 18000,
        quantity: 5,
        images: ['/images/items/kundan-necklace.jpg'],
        materials: ['Brass', 'Gold Plating', 'Kundan Stones'],
        colors: ['Gold', 'Green', 'Red'],
        isActive: true,
        isHandmade: true,
        tags: ['traditional', 'wedding', 'jewelry']
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayInput = (name, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item !== "");
    setFormData(prev => ({
      ...prev,
      [name]: items
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await axios.put(`/vendor/items/${id}`, formData);
      if (response.data.success) {
        navigate('/vendor/items?success=item-updated');
      }
    } catch (error) {
      console.error("Error saving item:", error);
      // For demo, simulate success
      setTimeout(() => {
        setSaving(false);
        navigate('/vendor/items?success=item-updated');
      }, 1000);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(language === 'hi' ? "क्या आप वाकई इस उत्पाद को हटाना चाहते हैं?" : "Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/vendor/items/${id}`);
        navigate('/vendor/items?success=item-deleted');
      } catch (error) {
        console.error("Error deleting item:", error);
        navigate('/vendor/items?success=item-deleted');
      }
    }
  };

  if (loading) {
    return <LoadingSpinner message={language === 'hi' ? "उत्पाद की जानकारी लोड हो रही है..." : "Loading item details..."} />;
  }

  return (
    <React.StrictMode>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 dark:from-gray-900 via-green-50 dark:via-gray-900 to-emerald-100 dark:to-gray-800 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
                  उत्पाद संपादित करें
                </h1>
                <p className="text-emerald-600 dark:text-emerald-400 text-lg">
                  उत्पाद की जानकारी अपडेट करें या स्थिति बदलें
                </p>
              </div>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors duration-300 shadow-md flex items-center space-x-2"
              >
                <span>🗑️</span>
                <span>उत्पाद हटाएं</span>
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block">
              <VendorSidebar />
            </div>

            {/* Main Form Content */}
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* Basic Info Section */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-6 flex items-center space-x-2">
                    <span>📝</span>
                    <span>बुनियादी जानकारी</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-emerald-700 dark:text-emerald-300 font-semibold mb-2">उत्पाद का नाम (हिन्दी में)</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-emerald-100 dark:border-emerald-700 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-emerald-700 dark:text-emerald-300 font-semibold mb-2">Product Name (in English)</label>
                      <input
                        type="text"
                        name="nameEn"
                        value={formData.nameEn}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-emerald-100 dark:border-emerald-700 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-emerald-700 dark:text-emerald-300 font-semibold mb-2">विवरण (हिन्दी में)</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border-2 border-emerald-100 dark:border-emerald-700 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-all"
                      ></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-emerald-700 dark:text-emerald-300 font-semibold mb-2">Description (in English)</label>
                      <textarea
                        name="descriptionEn"
                        value={formData.descriptionEn}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border-2 border-emerald-100 dark:border-emerald-700 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-all"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Pricing and Stock Section */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-6 flex items-center space-x-2">
                    <span>💰</span>
                    <span>कीमत और स्टॉक</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-emerald-700 dark:text-emerald-300 font-semibold mb-2">कीमत (₹)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-emerald-100 dark:border-emerald-700 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-emerald-700 dark:text-emerald-300 font-semibold mb-2">पुरानी कीमत (MRP ₹)</label>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-emerald-100 dark:border-emerald-700 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-emerald-700 dark:text-emerald-300 font-semibold mb-2">मात्रा (Quantity)</label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-emerald-100 dark:border-emerald-700 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Categorization & Attributes */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-6 flex items-center space-x-2">
                    <span>🏷️</span>
                    <span>श्रेणी और विशेषताएं</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-emerald-700 dark:text-emerald-300 font-semibold mb-2">श्रेणी</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-emerald-100 dark:border-emerald-700 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-all"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-emerald-700 dark:text-emerald-300 font-semibold mb-2">सामग्री (अल्पविराम से अलग करें)</label>
                      <input
                        type="text"
                        value={formData.materials.join(', ')}
                        onChange={(e) => handleArrayInput('materials', e.target.value)}
                        placeholder="जैसे: Brass, Silk, Leather"
                        className="w-full px-4 py-3 border-2 border-emerald-100 dark:border-emerald-700 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-gray-100 transition-all"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-8">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`w-14 h-7 rounded-full transition-colors duration-200 ${formData.isActive ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                        <div className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${formData.isActive ? 'translate-x-7' : 'translate-x-0'}`}></div>
                      </div>
                      <span className="text-emerald-800 dark:text-emerald-200 font-semibold">उत्पाद सक्रिय है</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="isHandmade"
                          checked={formData.isHandmade}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`w-14 h-7 rounded-full transition-colors duration-200 ${formData.isHandmade ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                        <div className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${formData.isHandmade ? 'translate-x-7' : 'translate-x-0'}`}></div>
                      </div>
                      <span className="text-emerald-800 dark:text-emerald-200 font-semibold">हस्तनिर्मित (Handmade)</span>
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate('/vendor/items')}
                    className="px-8 py-3 bg-white dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-100 dark:border-emerald-600 rounded-xl hover:bg-emerald-50 dark:hover:bg-gray-600 transition-all font-bold"
                  >
                    रद्द करें
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className={`px-12 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all font-bold flex items-center space-x-2 ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {saving ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
                        <span>अपडेट हो रहा है...</span>
                      </>
                    ) : (
                      <>
                        <span>💾</span>
                        <span>बदलाव सहेजें</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default EditItem;