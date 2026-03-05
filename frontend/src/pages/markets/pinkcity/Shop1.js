import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useLanguage } from '../../../context/LanguageContext';
import '../../../App.css';

const Shop1 = () => {
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { t, language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const shopInfo = {
    name: 'राजस्थानी जेम्स',
    nameEn: 'Rajasthani Gems',
    description: 'जयपुर के शाही हस्तशिल्प और पारंपरिक कुंदन आभूषणों का 50 साल पुराना प्रतिष्ठित केंद्र। हम अपनी शुद्धता और कलात्मकता के लिए जाने जाते हैं।',
    rating: 4.8,
    reviews: 1250,
    established: '1974',
    location: 'जोहरी बाज़ार, जयपुर',
    openingHours: '10:00 AM - 8:00 PM',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    specialties: ['कुंदन ज्वेलरी', 'हाथी दांत नक्काशी', 'ब्लू पॉटरी'],
    awards: ['Best Heritage Shop 2022', 'Craftsmanship Excellence Award'],
    certifications: ['Hallmarked Jewelry', 'Handicraft Board Certified']
  };

  const categories = [
    { id: 'all', name: 'सभी', icon: '💎' },
    { id: 'jewelry', name: 'आभूषण', icon: '💍' },
    { id: 'decor', name: 'सजावट', icon: '🏺' },
    { id: 'souvenirs', name: 'उपहार', icon: '🎁' }
  ];

  const products = [
    {
      id: 1,
      name: 'शाही कुंदन नेकलेस',
      description: 'शुद्ध सोने और कीमती रत्नों से बना पारंपरिक कुंदन नेकलेस सेट।',
      price: 45000,
      originalPrice: 50000,
      discount: 10,
      category: 'jewelry',
      image: '/images/items/kundan-necklace.jpg',
      inStock: true
    },
    {
      id: 2,
      name: 'मैजेस्टिक ब्लू पॉटरी',
      description: 'जयपुर की प्रसिद्ध हैंडपेंटेड ब्लू पॉटरी फूलदान।',
      price: 2500,
      originalPrice: 3000,
      discount: 16,
      category: 'decor',
      image: '/images/items/blue-pottery.jpg',
      inStock: true
    },
    {
      id: 3,
      name: 'राजस्थानी शोपीस',
      description: 'लकड़ी पर हाथ से नक्काशी किया गया सजे हुए हाथी का सेट।',
      price: 1200,
      originalPrice: 1500,
      discount: 20,
      category: 'souvenirs',
      image: '/images/items/elephant-showpiece.jpg',
      inStock: false
    }
  ];

  const filteredData = selectedCategory === 'all'
    ? products
    : products.filter(item => item.category === selectedCategory);

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const SendData = (item) => {
    axios.post("/Bag", { item })
      .then(() => showNotification(language === 'hi' ? 'कार्ट में जोड़ा गया' : 'Added to cart', 'success'))
      .catch(() => showNotification(language === 'hi' ? 'त्रुटि! फिर से प्रयास करें' : 'Error! Try again', 'error'));
  };

  if (loading) {
    return <LoadingSpinner message={language === 'hi' ? "दुकान लोड हो रही है..." : "Shop is loading..."} />;
  }

  return (
    <React.StrictMode>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 dark:from-gray-900 via-green-50 dark:via-gray-900 to-emerald-100 dark:to-gray-800 pt-20">

        {/* Notification */}
        {notification && (
          <div className={`fixed top-24 right-6 z-50 p-4 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white animate-fade-in`}>
            {notification.message}
          </div>
        )}

        {/* Shop Header */}
        <div className='bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 dark:from-yellow-600 dark:via-orange-600 dark:to-yellow-700 py-16'>
          <div className='max-w-7xl mx-auto px-6'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-center'>

              {/* Shop Info */}
              <div className='lg:col-span-2'>

                <div className='bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center space-x-2 mb-4'>
                  <span className='text-yellow-900 dark:text-yellow-200'>🏆</span>
                  <span className='text-yellow-900 dark:text-yellow-200 font-medium text-sm'>
                    {language === 'hi' ? 'प्रमाणित विक्रेता' : 'Certified Seller'}
                  </span>
                </div>

                <h1 className='text-4xl md:text-5xl font-bold text-yellow-900 dark:text-yellow-50 mb-2'>
                  {shopInfo.name}
                </h1>
                <h2 className='text-xl text-yellow-800 dark:text-yellow-200 mb-4'>{shopInfo.nameEn}</h2>

                <p className='text-lg text-yellow-800 dark:text-yellow-100 mb-6 leading-relaxed'>
                  {shopInfo.description}
                </p>

                <div className='flex flex-wrap gap-4 mb-6'>
                  <div className='bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2'>
                    <span>⭐</span>
                    <span className='font-semibold'>{shopInfo.rating}</span>
                    <span className='text-sm'>({shopInfo.reviews} {language === 'hi' ? 'समीक्षाएं' : 'reviews'})</span>
                  </div>
                  <div className='bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2'>
                    <span>📅</span>
                    <span className='text-sm'>{language === 'hi' ? 'स्थापना' : 'Established'} {shopInfo.established}</span>
                  </div>
                  <div className='bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2'>
                    <span>📍</span>
                    <span className='text-sm'>{shopInfo.location}</span>
                  </div>
                </div>

                <div className='flex flex-wrap gap-3'>
                  <button className='bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center space-x-2'>
                    <span>📞</span>
                    <span>{language === 'hi' ? 'कॉल करें' : 'Call'}</span>
                  </button>
                  <button className='bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors duration-300 flex items-center space-x-2'>
                    <span>💬</span>
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Shop Image/Logo */}
              <div className='text-center'>
                <div className='relative'>
                  <div className='w-48 h-48 mx-auto bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/50'>
                    <span className='text-6xl'>💎</span>
                  </div>
                  <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white px-4 py-1 rounded-full text-sm font-medium'>
                    {shopInfo.openingHours}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className='max-w-7xl mx-auto px-6 py-8'>
          <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>

              {/* Categories */}
              <div>
                <h3 className='text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-4'>
                  {language === 'hi' ? 'श्रेणी चुनें' : 'Select Category'}
                </h3>
                <div className='flex flex-wrap gap-3'>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${selectedCategory === category.id
                          ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg scale-105'
                          : 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-600 border border-emerald-200 dark:border-emerald-700'
                        }`}
                    >
                      <span>{category.icon}</span>
                      <span className='font-medium'>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className='text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-4'>
                  {language === 'hi' ? 'क्रमबद्ध करें' : 'Sort By'}
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className='px-4 py-2 rounded-lg border border-emerald-200 dark:border-emerald-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:outline-none bg-white dark:bg-gray-700 dark:text-white'
                >
                  <option value="name">{language === 'hi' ? 'नाम के अनुसार' : 'By Name'}</option>
                  <option value="price-low">{language === 'hi' ? 'कम कीमत पहले' : 'Price: Low to High'}</option>
                  <option value="price-high">{language === 'hi' ? 'ज्यादा कीमत पहले' : 'Price: High to Low'}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {sortedData.map((item, index) => (
              <div key={item.id} className='group'>
                <div className='bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2'>

                  {/* Product Image */}
                  <div className='relative h-64 overflow-hidden'>
                    <img
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                      src={item.image}
                      alt={item.name}
                    />

                    {/* Discount Badge */}
                    {item.discount > 0 && (
                      <div className='absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium'>
                        -{item.discount}%
                      </div>
                    )}

                    {/* Stock Status */}
                    <div className='absolute top-4 right-4'>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${item.inStock
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                        }`}>
                        {item.inStock ? (language === 'hi' ? 'उपलब्ध' : 'In Stock') : (language === 'hi' ? 'स्टॉक खत्म' : 'Out of Stock')}
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className='p-6'>
                    <h3 className='font-bold text-xl text-gray-800 dark:text-gray-100 mb-2 group-hover:text-emerald-600 dark:text-emerald-400 transition-colors duration-300'>
                      {item.name}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2'>
                      {item.description}
                    </p>

                    {/* Price Section */}
                    <div className='flex items-center space-x-3 mb-4'>
                      <span className='text-2xl font-bold text-emerald-600 dark:text-emerald-400'>
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.discount > 0 && (
                        <span className='text-lg text-gray-400 line-through'>
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => SendData(item)}
                      disabled={!item.inStock}
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${item.inStock
                          ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:shadow-lg transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      {item.inStock ? (language === 'hi' ? 'कार्ट में जोड़ें' : 'Add to Cart') : (language === 'hi' ? 'स्टॉक में नहीं' : 'Out of Stock')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {sortedData.length === 0 && (
            <div className='text-center py-20'>
              <div className='text-6xl mb-4'>🔍</div>
              <h3 className='text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-2'>
                {language === 'hi' ? 'कोई उत्पाद नहीं मिला' : 'No products found'}
              </h3>
              <p className='text-emerald-600 dark:text-emerald-400'>
                {language === 'hi' ? 'कृपया अपना फ़िल्टर बदलें या बाद में कोशिश करें' : 'Please change your filter or try again later'}
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </React.StrictMode>
  );
};

export default Shop1;