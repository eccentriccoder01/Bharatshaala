// Spice Market Component for Chandni Chowk - Bharatshaala Platform
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAnalytics } from '../../analytics';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import apiService from '../../apiService';
import { useLanguage } from '../../context/LanguageContext';

const SpiceMarket = () => {
  const { trackEvent, trackPageView } = useAnalytics();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { language, t } = useLanguage();

  const [spices, setSpices] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const marketInfo = {
    name: t('spices_hero_title', 'Chandni Chowk Spice Market'),
    description: t('spices_hero_desc', '400 year old spice hub'),
    established: '1600s',
    speciality: t('spices_featured_title', 'Authentic Indian Spices'),
    location: t('market_chandni_chowk_subtitle', 'Chandni Chowk, Delhi'),
    heroImage: '/images/markets/chandni-chowk-spice.jpg'
  };

  const spiceCategories = [
    { id: 'all', name: t('allCategories', 'All Spices'), icon: '🌶️' },
    { id: 'whole-spices', name: t('wholeSpices', 'Whole Spices'), icon: '🌰' },
    { id: 'ground-spices', name: t('groundSpices', 'Ground Spices'), icon: '🥄' },
    { id: 'blends', name: t('masalaBlends', 'Masala Blends'), icon: '🍛' },
    { id: 'premium', name: t('premiumSpices', 'Premium Spices'), icon: '⭐' },
    { id: 'medicinal', name: t('medicinalSpices', 'Medicinal Spices'), icon: '🌿' },
    { id: 'international', name: t('internationalSpices', 'International Spices'), icon: '🌍' }
  ];

  const featuredSpices = [
    {
      name: language === 'hi' ? 'कश्मीरी लाल मिर्च' : 'Kashmiri Red Chilli',
      description: language === 'hi' ? 'प्रामाणिक कश्मीरी लाल मिर्च - रंग और स्वाद के लिए' : 'Authentic Kashmiri Red Chilli - For color and taste',
      price: '₹450/100g',
      specialty: language === 'hi' ? 'कम तीखा, बेहतरीन रंग' : 'Low heat, vibrant color',
      vendor: language === 'hi' ? 'जगदीश मसाला स्टोर' : 'Jagdish Spicy Store'
    },
    {
      name: language === 'hi' ? 'केरल इलायची' : 'Kerala Cardamom',
      description: language === 'hi' ? 'ताजी हरी इलायची - सुगंध की रानी' : 'Fresh Green Cardamom - Queen of Aromas',
      price: '₹1200/100g',
      specialty: language === 'hi' ? 'प्राकृतिक तेल भरपूर' : 'Rich in natural oils',
      vendor: language === 'hi' ? 'महाराजा स्पाइसेस' : 'Maharaja Spices'
    },
    {
      name: language === 'hi' ? 'गुजराती गरम मसाला' : 'Gujarati Garam Masala',
      description: language === 'hi' ? 'पारंपरिक गुजराती मिश्रण' : 'Traditional Gujarati Blend',
      price: '₹320/250g',
      specialty: language === 'hi' ? 'मीठा और सुगंधित' : 'Sweet and aromatic',
      vendor: language === 'hi' ? 'शाह मसाला भंडार' : 'Shah Masala Store'
    }
  ];

  const famousVendors = [
    {
      name: language === 'hi' ? 'जगदीश मसाला स्टोर' : 'Jagdish Masala Store',
      established: '1947',
      specialty: language === 'hi' ? 'कश्मीरी मसाले' : 'Kashmiri Spices',
      rating: 4.8,
      experience: language === 'hi' ? '75+ वर्ष' : '75+ Years'
    },
    {
      name: language === 'hi' ? 'महाराजा स्पाइसेस' : 'Maharaja Spices',
      established: '1923',
      specialty: language === 'hi' ? 'दक्षिण भारतीय मसाले' : 'South Indian Spices',
      rating: 4.9,
      experience: language === 'hi' ? '100+ वर्ष' : '100+ Years'
    },
    {
      name: language === 'hi' ? 'शाह मसाला भंडार' : 'Shah Masala Bhandar',
      established: '1935',
      specialty: language === 'hi' ? 'गुजराती मसाला मिश्रण' : 'Gujarati Spice Blends',
      rating: 4.7,
      experience: language === 'hi' ? '88+ वर्ष' : '88+ Years'
    }
  ];

  useEffect(() => {
    trackPageView('chandni_chowk_spice_market');
    loadMarketData();
  }, []);

  const loadMarketData = async () => {
    try {
      setLoading(true);

      const [spicesResponse, vendorsResponse] = await Promise.all([
        apiService.get('/markets/chandni-chowk/spice-market/products'),
        apiService.get('/markets/chandni-chowk/spice-market/vendors')
      ]);

      if (spicesResponse.success) {
        setSpices(spicesResponse.data);
      }

      if (vendorsResponse.success) {
        setVendors(vendorsResponse.data);
      }
    } catch (error) {
      console.error('Failed to load market data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    trackEvent('spice_category_selected', {
      market: 'chandni_chowk',
      category
    });
  };

  const handleAddToCart = async (product) => {
    const result = await addToCart(product, 1);
    if (result.success) {
      trackEvent('add_to_cart_spice_market', {
        productId: product.id,
        market: 'chandni_chowk',
        vendor: product.vendor
      });
    }
  };

  const handleAddToWishlist = async (product) => {
    const result = await addToWishlist(product);
    if (result.success) {
      trackEvent('add_to_wishlist_spice_market', {
        productId: product.id,
        market: 'chandni_chowk'
      });
    }
  };

  const filteredSpices = activeCategory === 'all'
    ? spices
    : spices.filter(spice => spice.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>{marketInfo.name} - Bharatshaala</title>
        <meta name="description" content={marketInfo.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
          <div className="absolute inset-0 bg-black/40"></div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${marketInfo.heroImage})` }}
          ></div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-6xl">🌶️</span>
                <div>
                  <h1 className="text-5xl font-bold mb-2">{marketInfo.name}</h1>
                  <p className="text-xl opacity-90">{marketInfo.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('established')}</h3>
                  <p className="text-orange-200">{marketInfo.established}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('specialty', 'Specialty')}</h3>
                  <p className="text-orange-200">{marketInfo.speciality}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('market.info.location', 'Location')}</h3>
                  <p className="text-orange-200">{marketInfo.location}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Navigation Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-6 py-4">
            <nav className="text-sm text-gray-600">
              <Link to="/" className="hover:text-emerald-600">{t('home')}</Link>
              <span className="mx-2">›</span>
              <Link to="/markets" className="hover:text-emerald-600">{t('markets')}</Link>
              <span className="mx-2">›</span>
              <Link to="/markets/chandni-chowk" className="hover:text-emerald-600">{t('market_chandni_chowk')}</Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900">{t('spiceMarket')}</span>
            </nav>
          </div>
        </div>

        {/* Categories Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('spices_categories_title')}</h2>
            <div className="flex flex-wrap gap-4">
              {spiceCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ${activeCategory === category.id
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Spices */}
        <section className="py-12 bg-red-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('spices_featured_title')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredSpices.map((spice, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {spice.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {spice.description}
                  </p>
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-red-600">{spice.price}</span>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      {spice.specialty}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {spice.vendor}
                    </span>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200">
                      {t('addToCart')}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" text={`${t('loading')}...`} />
          </div>
        ) : (
          <section className="py-12">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {activeCategory === 'all'
                  ? t('allCategories', 'All Spices')
                  : spiceCategories.find(cat => cat.id === activeCategory)?.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredSpices.map((spice) => (
                  <ProductCard
                    key={spice.id}
                    product={spice}
                    onAddToCart={() => handleAddToCart(spice)}
                    onAddToWishlist={() => handleAddToWishlist(spice)}
                    showOriginBadge={true}
                    showFreshnessBadge={true}
                  />
                ))}
              </div>

              {filteredSpices.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🌶️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noShopsFound')}</h3>
                  <p className="text-gray-600">{t('noShopsFoundDesc')}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Famous Vendors */}
        <section className="py-16 bg-gradient-to-r from-orange-100 to-red-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('featuredShops')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {famousVendors.map((vendor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="text-4xl mb-4">🏪</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {vendor.name}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><strong>{t('established')}:</strong> {vendor.established}</p>
                    <p><strong>{t('specialty', 'Specialty')}:</strong> {vendor.specialty}</p>
                    <p><strong>{t('experience')}:</strong> {vendor.experience}</p>
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < Math.floor(vendor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ⭐
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">{vendor.rating}</span>
                  </div>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200">
                    {t('visitShop')}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Spice Knowledge */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('spices_knowledge_title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🌿</div>
                <h3 className="text-xl font-semibold mb-2">{t('spices_health_benefits')}</h3>
                <p className="text-gray-600">{language === 'hi' ? 'मसालों के औषधीय गुण और स्वास्थ्य पर प्रभाव' : 'Medicinal properties and health benefits of spices'}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">👩‍🍳</div>
                <h3 className="text-xl font-semibold mb-2">{t('spices_usage')}</h3>
                <p className="text-gray-600">{language === 'hi' ? 'विभिन्न व्यंजनों में मसालों का सही उपयोग' : 'Correct usage of spices in various dishes'}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-xl font-semibold mb-2">{t('spices_storage')}</h3>
                <p className="text-gray-600">{language === 'hi' ? 'मसालों की ताजगी बनाए रखने के तरीके' : 'Ways to keep spices fresh'}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">{t('spices_quality')}</h3>
                <p className="text-gray-600">{language === 'hi' ? 'प्रामाणिक मसालों की पहचान कैसे करें' : 'How to identify authentic spices'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Market Experience */}
        <section className="py-16 bg-red-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">{t('market_history_title')}</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl leading-relaxed mb-8">
                {language === 'hi'
                  ? '400 साल पुराने इस मसाला बाजार में आपको मिलेगा भारत की हर कोने से आए मसालों का अनूठा संग्रह। यहाँ के अनुभवी व्यापारी पीढ़ियों से चली आ रही परंपरा को आगे बढ़ा रहे हैं।'
                  : 'In this 400-year-old spice market, you will find a unique collection of spices from every corner of India. Experienced merchants here are carrying forward generations of tradition.'}
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="text-xl font-semibold mb-2">{t('market.info.location', 'Location')}</h3>
                  <p>{t('market_chandni_chowk_subtitle')}</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🕒</div>
                  <h3 className="text-xl font-semibold mb-2">{t('openingHours')}</h3>
                  <p>10:00 AM - 8:00 PM ({t('closedOnMonday', 'Closed on Monday')})</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🚇</div>
                  <h3 className="text-xl font-semibold mb-2">{t('connectivity', 'Connectivity')}</h3>
                  <p>{t('nearMetro', '2 mins from Chandni Chowk Metro')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SpiceMarket;
