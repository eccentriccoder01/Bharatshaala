import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from '../../components/LoadingSpinner';
import { useLanguage } from '../../context/LanguageContext';
import VendorSidebar from "../../components/VendorSidebar";
import "../../App.css";

const VendorInventory = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStockValue: 0,
    lowStockItems: 0,
    outOfStockItems: 0
  });

  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    stockStatus: "all",
    sortBy: "stock-low"
  });

  useEffect(() => {
    loadInventoryData();
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [filters]);

  const loadInventoryData = async () => {
    try {
      const response = await axios.get('/vendor/inventory', { params: filters });
      if (response.data.success) {
        setInventoryItems(response.data.items);
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error("Error loading inventory:", error);
      // Mock data for demo
      const mockItems = [
        { id: 1, name: 'कुंदन हार', category: 'jewelry', price: 15000, quantity: 5, sku: 'JW-KDN-001', lastUpdated: '2025-08-01' },
        { id: 2, name: 'राजस्थानी चूड़ी सेट', category: 'jewelry', price: 2800, quantity: 0, sku: 'JW-BNG-042', lastUpdated: '2025-07-28' },
        { id: 3, name: 'मीनाकारी झुमके', category: 'jewelry', price: 3500, quantity: 12, sku: 'JW-EAR-015', lastUpdated: '2025-08-03' },
        { id: 4, name: 'हस्तनिर्मित शॉल', category: 'textiles', price: 4500, quantity: 3, sku: 'TX-SHL-008', lastUpdated: '2025-07-30' },
        { id: 5, name: 'पारंपरिक पुस्तक', category: 'books', price: 1600, quantity: 25, sku: 'BK-TRD-021', lastUpdated: '2025-08-02' }
      ];
      setInventoryItems(mockItems);
      setStats({
        totalProducts: 5,
        totalStockValue: 124500,
        lowStockItems: 2,
        outOfStockItems: 1
      });
    }
  };

  const handleUpdateStock = async (id, newQuantity) => {
    try {
      await axios.patch(`/vendor/inventory/${id}`, { quantity: newQuantity });
      loadInventoryData();
    } catch (error) {
      console.error("Error updating stock:", error);
      // Simulate update for demo
      setInventoryItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    }
  };

  const getStockBadge = (quantity) => {
    if (quantity === 0) return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">स्टॉक खत्म</span>;
    if (quantity <= 5) return <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">कम स्टॉक ({quantity})</span>;
    return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">उपलब्ध ({quantity})</span>;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('hi-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return <LoadingSpinner message={language === 'hi' ? "इन्वेंट्री लोड हो रही है..." : "Loading inventory..."} />;
  }

  return (
    <React.StrictMode>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 dark:from-gray-900 via-green-50 dark:via-gray-900 to-emerald-100 dark:to-gray-800 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
              इन्वेंट्री प्रबंधन
            </h1>
            <p className="text-emerald-600 dark:text-emerald-400 text-lg">
              अपने स्टॉक और उत्पादों की उपलब्धता की निगरानी करें
            </p>
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block">
              <VendorSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-8">

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-l-4 border-emerald-500">
                  <p className="text-emerald-600 dark:text-emerald-400 text-sm font-bold uppercase tracking-wider">कुल उत्पाद</p>
                  <p className="text-3xl font-black text-emerald-800 dark:text-emerald-100 mt-2">{stats.totalProducts}</p>
                </div>
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-wider">कुल स्टॉक वैल्यू</p>
                  <p className="text-3xl font-black text-emerald-800 dark:text-emerald-100 mt-2">{formatCurrency(stats.totalStockValue)}</p>
                </div>
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-l-4 border-orange-500">
                  <p className="text-orange-600 dark:text-orange-400 text-sm font-bold uppercase tracking-wider">कम स्टॉक</p>
                  <p className="text-3xl font-black text-emerald-800 dark:text-emerald-100 mt-2">{stats.lowStockItems}</p>
                </div>
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
                  <p className="text-red-600 dark:text-red-400 text-sm font-bold uppercase tracking-wider">आउट ऑफ स्टॉक</p>
                  <p className="text-3xl font-black text-emerald-800 dark:text-emerald-100 mt-2">{stats.outOfStockItems}</p>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="SKU या नाम से खोजें..."
                      className="w-full pl-10 pr-4 py-3 border-2 border-emerald-100 dark:border-emerald-700 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-white transition-all"
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />
                    <span className="absolute left-3 top-3.5 text-emerald-400">🔍</span>
                  </div>
                  <select
                    className="w-full px-4 py-3 border-2 border-emerald-100 dark:border-emerald-700 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-white transition-all"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  >
                    <option value="all">सभी श्रेणियां</option>
                    <option value="jewelry">आभूषण</option>
                    <option value="textiles">वस्त्र</option>
                    <option value="handicrafts">हस्तशिल्प</option>
                  </select>
                  <select
                    className="w-full px-4 py-3 border-2 border-emerald-100 dark:border-emerald-700 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-white transition-all"
                    value={filters.stockStatus}
                    onChange={(e) => setFilters({ ...filters, stockStatus: e.target.value })}
                  >
                    <option value="all">सभी स्थिति</option>
                    <option value="in-stock">स्टॉक में</option>
                    <option value="low-stock">कम स्टॉक</option>
                    <option value="out-of-stock">आउट ऑफ स्टॉक</option>
                  </select>
                  <select
                    className="w-full px-4 py-3 border-2 border-emerald-100 dark:border-emerald-700 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-white transition-all"
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  >
                    <option value="stock-low">स्टॉक: कम से अधिक</option>
                    <option value="stock-high">स्टॉक: अधिक से कम</option>
                    <option value="price-high">कीमत: अधिक से कम</option>
                    <option value="price-low">कीमत: कम से अधिक</option>
                  </select>
                </div>
              </div>

              {/* Items Table */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-emerald-600 text-white">
                        <th className="px-6 py-4 text-left">SKU</th>
                        <th className="px-6 py-4 text-left">उत्पाद</th>
                        <th className="px-6 py-4 text-left">श्रेणी</th>
                        <th className="px-6 py-4 text-left">कीमत</th>
                        <th className="px-6 py-4 text-left">मात्रा</th>
                        <th className="px-6 py-4 text-left">स्थिति</th>
                        <th className="px-6 py-4 text-right">कार्रवाई</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-100 dark:divide-emerald-900">
                      {inventoryItems.map((item) => (
                        <tr key={item.id} className="hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="px-6 py-4 font-mono text-xs text-emerald-800 dark:text-emerald-300">{item.sku}</td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-gray-800 dark:text-gray-100">{item.name}</div>
                            <div className="text-xs text-emerald-500">अंत में अपडेट किया गया: {item.lastUpdated}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300 capitalize">{item.category}</td>
                          <td className="px-6 py-4 font-bold text-emerald-700 dark:text-emerald-300">{formatCurrency(item.price)}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleUpdateStock(item.id, Math.max(0, item.quantity - 1))}
                                className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-gray-600 text-emerald-700 dark:text-emerald-300 flex items-center justify-center hover:bg-emerald-200"
                              >
                                -
                              </button>
                              <span className="w-12 text-center font-bold dark:text-white">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateStock(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-gray-600 text-emerald-700 dark:text-emerald-300 flex items-center justify-center hover:bg-emerald-200"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {getStockBadge(item.quantity)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link to={`/vendor/edit-item/${item.id}`} className="text-blue-500 hover:text-blue-700 mr-4">संपादित करें</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {inventoryItems.length === 0 && (
                  <div className="p-12 text-center">
                    <div className="text-6xl mb-4">📭</div>
                    <p className="text-emerald-800 dark:text-emerald-200 text-xl font-bold">कोई उत्पाद नहीं मिला</p>
                    <p className="text-emerald-600 dark:text-emerald-400">अपनी खोज फ़िल्टर बदलें या नए उत्पाद जोड़ें</p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-emerald-800 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-xl">
                <div>
                  <h3 className="text-2xl font-black mb-2">कम स्टॉक अलर्ट? ⚠️</h3>
                  <p className="text-emerald-200">2 उत्पादों में स्टॉक कम है। समय पर रिस्टॉक करें ताकि सेल न छूटे।</p>
                </div>
                <div className="mt-6 md:mt-0 flex gap-4">
                  <Link to="/vendor/items" className="px-6 py-3 bg-white text-emerald-800 rounded-xl font-black hover:bg-emerald-50 transition-all transform hover:scale-105">उत्पाद सूची</Link>
                  <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black hover:bg-emerald-700 transition-all border-2 border-emerald-500">पीडीएफ डाउनलोड करें</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default VendorInventory;
