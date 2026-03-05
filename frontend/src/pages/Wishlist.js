import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useAPI } from '../hooks/useAPI';
import { useNotification } from '../hooks/useNotification';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLanguage } from '../context/LanguageContext';

const Wishlist = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { get, post, delete: deleteItem } = useAPI();
  const { showSuccess, showError, showInfo } = useNotification();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  const sortOptions = [
    { id: 'recent', name: language === 'hi' ? 'हाल ही में जोड़े गए' : 'Recently Added' },
    { id: 'oldest', name: language === 'hi' ? 'पुराने पहले' : 'Oldest First' },
    { id: 'price-low', name: language === 'hi' ? 'कम कीमत पहले' : 'Price: Low to High' },
    { id: 'price-high', name: language === 'hi' ? 'ज्यादा कीमत पहले' : 'Price: High to Low' },
    { id: 'name', name: language === 'hi' ? 'नाम के अनुसार' : 'By Name' },
    { id: 'rating', name: language === 'hi' ? 'रेटिंग के अनुसार' : 'By Rating' }
  ];

  const filterOptions = [
    { id: 'all', name: language === 'hi' ? 'सभी आइटम' : 'All Items', count: 0 },
    { id: 'available', name: language === 'hi' ? 'उपलब्ध' : 'Available', count: 0 },
    { id: 'price_dropped', name: language === 'hi' ? 'कीमत घटी' : 'Price Dropped', count: 0 },
    { id: 'out_of_stock', name: language === 'hi' ? 'स्टॉक में नहीं' : 'Out of Stock', count: 0 }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/wishlist');
      return;
    }
    loadWishlist();
  }, [isAuthenticated]);

  useEffect(() => {
    filterAndSortItems();
  }, [wishlistItems, sortBy, filterBy]);

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const response = await get('/wishlist');
      if (response.success) {
        setWishlistItems(response.items);
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
      // Mock data for demo
      const mockWishlist = [
        {
          id: 1,
          productId: 123,
          name: language === 'hi' ? 'कुंदन पर्ल नेकलेस सेट' : 'Kundan Pearl Necklace Set',
          image: '/images/items/kundan-necklace-1.jpg',
          price: 15999,
          originalPrice: 19999,
          discount: 20,
          rating: 4.6,
          reviewCount: 89,
          inStock: true,
          seller: 'राजस्थानी जेम्स',
          category: 'jewelry',
          addedDate: '2024-01-20T10:30:00Z',
          notifications: { priceAlert: true, stockAlert: true }
        }
      ];
      setWishlistItems(mockWishlist);
    }
    setLoading(false);
  };

  const filterAndSortItems = () => {
    let filtered = [...wishlistItems];

    switch (filterBy) {
      case 'available': filtered = filtered.filter(item => item.inStock); break;
      case 'price_dropped': filtered = filtered.filter(item => item.discount > 0); break;
      case 'out_of_stock': filtered = filtered.filter(item => !item.inStock); break;
      default: break;
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent': return new Date(b.addedDate) - new Date(a.addedDate);
        case 'oldest': return new Date(a.addedDate) - new Date(b.addedDate);
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

    filterOptions[0].count = wishlistItems.length;
    filterOptions[1].count = wishlistItems.filter(item => item.inStock).length;
    filterOptions[2].count = wishlistItems.filter(item => item.discount > 0).length;
    filterOptions[3].count = wishlistItems.filter(item => !item.inStock).length;

    return filtered;
  };

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      const response = await deleteItem(`/wishlist/${itemId}`);
      if (response.success) {
        setWishlistItems(prev => prev.filter(item => item.id !== itemId));
        setSelectedItems(prev => prev.filter(id => id !== itemId));
        showSuccess(t('removedFromWishlist'));
      }
    } catch (error) {
      showError(t('removeError'));
    }
  };

  const handleMoveToCart = async (item) => {
    if (!item.inStock) {
      showError(t('outOfStock'));
      return;
    }
    const result = await addToCart(item, 1);
    if (result.success) {
      showSuccess(t('movedToCart'));
      await handleRemoveFromWishlist(item.id);
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedItems.length === 0) {
      showInfo(t('selectItemsFirst'));
      return;
    }
    // Implementation for bulk actions
  };

  const shareWishlist = () => {
    const wishlistUrl = `${window.location.origin}/shared-wishlist/${user.id}`;
    navigator.clipboard.writeText(wishlistUrl);
    showSuccess(t('linkCopied'));
  };

  const filteredItems = filterAndSortItems();

  if (loading) {
    return <LoadingSpinner message={t('loading')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 text-gray-900 dark:text-gray-100">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">{t('myWishlist')} ❤️</h1>
            <p className="text-emerald-600 dark:text-emerald-400">{t('wishlistDescription', { count: wishlistItems.length })}</p>
          </div>
          <button onClick={shareWishlist} className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 transition-colors flex items-center space-x-2">
            <span>📤</span> <span>{t('share')}</span>
          </button>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🛍️</div>
            <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mb-4">{t('wishlistEmpty')}</h2>
            <button onClick={() => navigate('/markets')} className="bg-emerald-500 text-white px-8 py-4 rounded-xl hover:bg-emerald-600 font-semibold">
              {t('startShopping')}
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-emerald-800 dark:text-emerald-200 font-semibold mb-2">{t('filter')}</label>
                <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)} className="w-full px-4 py-3 border-2 border-emerald-200 dark:border-emerald-700 rounded-lg focus:border-emerald-500 focus:outline-none dark:bg-gray-700">
                  {filterOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name} ({opt.count})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-emerald-800 dark:text-emerald-200 font-semibold mb-2">{t('sort')}</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-4 py-3 border-2 border-emerald-200 dark:border-emerald-700 rounded-lg focus:border-emerald-500 focus:outline-none dark:bg-gray-700">
                  {sortOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-emerald-800 dark:text-emerald-200 font-semibold mb-2">{t('viewMode')}</label>
                <div className="flex bg-emerald-100 dark:bg-gray-700 rounded-lg p-1">
                  <button onClick={() => setViewMode('grid')} className={`flex-1 py-2 rounded-lg text-sm transition-all ${viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-emerald-600 dark:text-emerald-400'}`}>⊞ {t('grid')}</button>
                  <button onClick={() => setViewMode('list')} className={`flex-1 py-2 rounded-lg text-sm transition-all ${viewMode === 'list' ? 'bg-emerald-500 text-white' : 'text-emerald-600 dark:text-emerald-400'}`}>☰ {t('list')}</button>
                </div>
              </div>
              <div>
                <label className="block text-emerald-800 dark:text-emerald-200 font-semibold mb-2">{t('bulkActions')}</label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" checked={selectedItems.length === filteredItems.length} onChange={() => setSelectedItems(selectedItems.length === filteredItems.length ? [] : filteredItems.map(i => i.id))} className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm">{t('selectAll')} ({selectedItems.length})</span>
                </div>
              </div>
            </div>

            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
              {filteredItems.map(item => (
                <div key={item.id} className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all relative ${viewMode === 'list' ? 'flex' : ''}`}>
                  <div className="absolute top-3 left-3 z-10">
                    <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => setSelectedItems(prev => prev.includes(item.id) ? prev.filter(id => id !== item.id) : [...prev, item.id])} className="w-5 h-5 text-emerald-500" />
                  </div>
                  <button onClick={() => handleRemoveFromWishlist(item.id)} className="absolute top-3 right-3 z-10 w-10 h-10 bg-white/90 dark:bg-gray-700/90 rounded-full flex items-center justify-center text-red-500">❤️</button>

                  <div className={viewMode === 'list' ? "w-48 h-full" : "h-64 h-full"}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-4 flex-1">
                    <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2 line-clamp-1">{item.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{t('seller')}: {item.seller}</p>
                    <div className="flex items-baseline space-x-2 mb-4">
                      <span className="text-lg font-bold text-emerald-800 dark:text-emerald-200">₹{item.price.toLocaleString()}</span>
                      {item.originalPrice > item.price && <span className="text-sm text-gray-400 line-through">₹{item.originalPrice.toLocaleString()}</span>}
                    </div>
                    <button onClick={() => handleMoveToCart(item)} disabled={!item.inStock} className="w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 disabled:bg-gray-300 font-medium transition-colors">
                      {item.inStock ? t('moveToCart') : t('outOfStock')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
