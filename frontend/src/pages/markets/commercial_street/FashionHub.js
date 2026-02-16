// Fashion Hub Component for Commercial Street - Bharatshaala Platform
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

const FashionHub = () => {
  const { trackEvent, trackPageView } = useAnalytics();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { t } = useLanguage();

  const [fashionItems, setFashionItems] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const hubInfo = {
    name: t('fashionHubTitle'),
    nameEn: 'Commercial Street Fashion Hub',
    description: t('fashionHubDescription'),
    established: '1980s',
    speciality: t('multiBrandStore'),
    location: t('commercialStreetCity'),
    heroImage: '/images/markets/commercial-street-fashion.jpg'
  };

  const fashionCategories = [
    { id: 'all', name: t('allFashion'), icon: '👗' },
    { id: 'western-wear', name: t('westernWear'), icon: '👚' },
    { id: 'ethnic-wear', name: t('ethnicWear'), icon: '🥻' },
    { id: 'casual-wear', name: t('casualWear'), icon: '👕' },
    { id: 'formal-wear', name: t('formalWear'), icon: '👔' },
    { id: 'footwear', name: t('footwear'), icon: '👠' },
    { id: 'accessories', name: t('accessories'), icon: '👜' }
  ];

  const featuredBrands = [
    {
      name: 'Fabindia',
      specialty: t('ethnicHandloom'),
      priceRange: '₹500 - ₹5,000',
      style: t('traditional'),
      items: 250,
      discount: 'Up to 30% OFF'
    },
    {
      name: 'AND',
      specialty: t('westernWear'),
      priceRange: '₹800 - ₹4,000',
      style: t('contemporary'),
      items: 180,
      discount: 'Buy 2 Get 1 Free'
    },
    {
      name: 'W for Woman',
      specialty: t('indoWestern'),
      priceRange: '₹600 - ₹3,500',
      style: t('fusion'),
      items: 220,
      discount: 'Flat 40% OFF'
    }
  ];

  const seasonCollections = [
    {
      season: t('springCollection'),
      theme: t('floralPastel'),
      items: 150,
      brands: 8,
      highlights: [t('floralPrints'), t('pastelColors'), t('lightFabrics')]
    },
    {
      season: t('summerEssentials'),
      theme: t('coolComfort'),
      items: 120,
      brands: 6,
      highlights: [t('cottonFabric'), t('breathableMaterial'), t('uvProtection')]
    },
    {
      season: t('festivalSpecial'),
      theme: t('traditionalGlam'),
      items: 200,
      brands: 10,
      highlights: [t('ethnicWear'), t('heavyEmbroidery'), t('festivalColors')]
    }
  ];

  const fashionTrends = [
    { trend: t('sustainableFashion'), popularity: '78%', description: t('ecoFriendlyMaterials') },
    { trend: t('minimalistStyle'), popularity: '85%', description: t('simpleElegantLooks') },
    { trend: t('boldPrints'), popularity: '72%', description: t('statementPatterns') },
    { trend: t('comfortWear'), popularity: '90%', description: t('wfhFashion') }
  ];

  const shoppingTips = [
    { tip: t('sizeGuide'), description: t('sizeGuideDesc') },
    { tip: t('fabricCare'), description: t('fabricCareDesc') },
    { tip: t('mixAndMatch'), description: t('mixAndMatchDesc') },
    { tip: t('investmentPieces'), description: t('investmentPiecesDesc') }
  ];

  useEffect(() => {
    trackPageView('commercial_street_fashion_hub');
    loadHubData();
  }, []);

  const loadHubData = async () => {
    try {
      setLoading(true);

      const [itemsResponse, brandsResponse] = await Promise.all([
        apiService.get('/markets/commercial-street/fashion-hub/items'),
        apiService.get('/markets/commercial-street/fashion-hub/brands')
      ]);

      if (itemsResponse.success) {
        setFashionItems(itemsResponse.data);
      }

      if (brandsResponse.success) {
        setBrands(brandsResponse.data);
      }
    } catch (error) {
      console.error('Failed to load hub data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    trackEvent('fashion_category_selected', {
      market: 'commercial_street',
      category
    });
  };

  const handleAddToCart = async (product) => {
    const result = await addToCart(product, 1);
    if (result.success) {
      trackEvent('add_to_cart_fashion_hub', {
        productId: product.id,
        market: 'commercial_street',
        brand: product.brand
      });
    }
  };

  const handleAddToWishlist = async (product) => {
    const result = await addToWishlist(product);
    if (result.success) {
      trackEvent('add_to_wishlist_fashion_hub', {
        productId: product.id,
        market: 'commercial_street'
      });
    }
  };

  const filteredItems = activeCategory === 'all'
    ? fashionItems
    : fashionItems.filter(item => item.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>{hubInfo.name} - {t('bharatshaala')} | {t('bangalore')} {t('famous')} {t('fashion')} {t('hub')}</title>
        <meta name="description" content={hubInfo.description} />
        <meta name="keywords" content="commercial street fashion, bangalore shopping, multi-brand fashion, trendy clothes, ethnic wear" />
        <link rel="canonical" href="https://bharatshaala.com/markets/commercial-street/fashion-hub" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-rose-600 to-pink-600 text-white py-16">
          <div className="absolute inset-0 bg-black/40"></div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${hubInfo.heroImage})` }}
          ></div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-6xl">👗</span>
                <div>
                  <h1 className="text-5xl font-bold mb-2">{hubInfo.name}</h1>
                  <p className="text-xl opacity-90">{hubInfo.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('established')}</h3>
                  <p className="text-pink-200">{hubInfo.established}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('speciality', 'Speciality')}</h3>
                  <p className="text-pink-200">{hubInfo.speciality}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('location')}</h3>
                  <p className="text-pink-200">{hubInfo.location}</p>
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
              <Link to="/markets/commercial-street" className="hover:text-emerald-600">{t('commercialStreetTitle')}</Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900">{t('fashionHubTitle')}</span>
            </nav>
          </div>
        </div>

        {/* Featured Brands */}
        <section className="py-12 bg-rose-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('featuredBrandsTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredBrands.map((brand, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{brand.name}</h3>
                  <p className="text-gray-600 mb-2"><strong>{t('speciality', 'Speciality')}:</strong> {brand.specialty}</p>
                  <p className="text-gray-600 mb-2"><strong>{t('style', 'Style')}:</strong> {brand.style}</p>
                  <p className="text-gray-600 mb-2"><strong>{t('priceRange', 'Price Range')}:</strong> {brand.priceRange}</p>
                  <p className="text-gray-600 mb-3"><strong>{t('items', 'Items')}:</strong> {brand.items}</p>
                  <div className="mb-4">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {brand.discount}
                    </span>
                  </div>
                  <button className="w-full bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors duration-200">
                    {t('viewBrand')}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('fashionCategoriesTitle')}</h2>
            <div className="flex flex-wrap gap-4">
              {fashionCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ${activeCategory === category.id
                      ? 'bg-rose-600 text-white'
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

        {/* Seasonal Collections */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('seasonalCollectionsTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {seasonCollections.map((collection, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{collection.season}</h3>
                  <p className="text-gray-600 mb-3">{collection.theme}</p>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><strong>{t('items', 'Items')}:</strong> {collection.items}</p>
                    <p><strong>{t('brands', 'Brands')}:</strong> {collection.brands}</p>
                  </div>
                  <div className="space-y-1 mb-4">
                    {collection.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="bg-white rounded-lg p-2 text-sm text-gray-700">
                        • {highlight}
                      </div>
                    ))}
                  </div>
                  <button className="w-full bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors duration-200">
                    {t('viewCollection')}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fashion Trends */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('trendingFashionTitle')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {fashionTrends.map((trend, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{trend.trend}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{trend.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-rose-600 h-2 rounded-full"
                      style={{ width: trend.popularity }}
                    ></div>
                  </div>
                  <p className="text-rose-700 font-medium text-sm">{trend.popularity} {t('popular')}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" text={`${t('loading')} ${t('fashion')}...`} />
          </div>
        ) : (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {activeCategory === 'all' ? t('allFashion') : fashionCategories.find(cat => cat.id === activeCategory)?.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    onAddToCart={() => handleAddToCart(item)}
                    onAddToWishlist={() => handleAddToWishlist(item)}
                    showBrandBadge={true}
                    showTrendingBadge={true}
                    showSizeBadge={true}
                  />
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👗</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noItemsFound')}</h3>
                  <p className="text-gray-600">{t('tryDifferentCategory', 'Please selecting a different category')}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Shopping Tips */}
        <section className="py-16 bg-rose-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('fashionTipsTitle')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {shoppingTips.map((tip, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">💡</div>
                  <h3 className="text-xl font-semibold mb-2">{tip.tip}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fashion Hub Experience */}
        <section className="py-16 bg-gradient-to-r from-rose-600 to-pink-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">{t('fashionHubExperienceTitle')}</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl leading-relaxed mb-8">
                {t('fashionHubExpDesc')}
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="text-xl font-semibold mb-2">{t('location')}</h3>
                  <p>{hubInfo.location}</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🕒</div>
                  <h3 className="text-xl font-semibold mb-2">{t('timing')}</h3>
                  <p>{t('timingDesc', '10 AM - 9 PM')}</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🛍️</div>
                  <h3 className="text-xl font-semibold mb-2">{t('speciality', 'Speciality')}</h3>
                  <p>{hubInfo.speciality}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FashionHub;