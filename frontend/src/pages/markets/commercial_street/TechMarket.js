// Tech Market Component for Commercial Street - Bharatshaala Platform
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

const TechMarket = () => {
  const { trackEvent, trackPageView } = useAnalytics();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { t } = useLanguage();

  const [techProducts, setTechProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const marketInfo = {
    name: t('techMarketTitle'),
    nameEn: 'Commercial Street Tech Market',
    description: t('techHubDescription'),
    established: '2000s',
    speciality: t('laptopsSmartphonesGadgets'),
    location: t('commercialStreetCity'),
    heroImage: '/images/markets/commercial-street-tech.jpg'
  };

  const techCategories = [
    { id: 'all', name: t('allTechProducts', 'All Tech Products'), icon: '💻' },
    { id: 'laptops', name: t('laptops'), icon: '💻' },
    { id: 'smartphones', name: t('smartphones'), icon: '📱' },
    { id: 'tablets', name: t('tablets'), icon: '📱' },
    { id: 'accessories', name: t('accessories'), icon: '🔌' },
    { id: 'gaming', name: t('gaming'), icon: '🎮' },
    { id: 'smart-devices', name: t('smartDevices'), icon: '🏠' }
  ];

  const featuredProducts = [
    {
      name: 'Dell Inspiron 15 3000',
      category: 'Laptop',
      price: '₹42,990',
      originalPrice: '₹55,000',
      discount: '22% OFF',
      specs: ['Intel Core i5', '8GB RAM', '512GB SSD', 'Windows 11'],
      rating: 4.3,
      vendor: 'TechZone'
    },
    {
      name: 'iPhone 14',
      category: 'Smartphone',
      price: '₹69,900',
      originalPrice: '₹79,900',
      discount: '12% OFF',
      specs: ['A15 Bionic', '128GB Storage', 'Dual Camera', 'iOS 16'],
      rating: 4.7,
      vendor: 'Mobile Hub'
    },
    {
      name: 'Samsung Galaxy Tab S8',
      category: 'Tablet',
      price: '₹45,999',
      originalPrice: '₹54,999',
      discount: '16% OFF',
      specs: ['Snapdragon 8 Gen 1', '8GB RAM', '11 inch Display', 'S Pen'],
      rating: 4.5,
      vendor: 'Gadget World'
    }
  ];

  const topVendors = [
    {
      name: 'TechZone',
      speciality: t('laptopsDesktops'),
      rating: 4.6,
      experience: `12+ ${t('years')}`,
      products: 200,
      services: [t('repair'), t('upgrade'), t('warranty')]
    },
    {
      name: 'Mobile Hub',
      speciality: t('smartphonesTablets'),
      rating: 4.5,
      experience: `8+ ${t('years')}`,
      products: 150,
      services: [t('screenReplacement'), t('unlocking'), t('dataRecovery')]
    },
    {
      name: 'Gadget World',
      speciality: t('gamingAccessories'),
      rating: 4.4,
      experience: `10+ ${t('years')}`,
      products: 300,
      services: [t('customBuild'), t('gamingSetup'), t('techSupport')]
    }
  ];

  const techTrends = [
    { trend: t('aiMlDevices'), description: t('aiEnabledGadgets'), growth: '85%' },
    { trend: t('5gConnectivity'), description: t('highSpeedInternet'), growth: '78%' },
    { trend: t('wearableTech'), description: t('smartWatchesTrackers'), growth: '92%' },
    { trend: t('cloudGaming'), description: t('streamingGaming'), growth: '67%' }
  ];

  const techServices = [
    { service: t('dataRecovery'), description: t('dataRecoveryDesc'), duration: `2-5 ${t('days', 'days')}` },
    { service: t('hardwareUpgrade'), description: t('hardwareUpgradeDesc'), duration: `1-2 ${t('hours', 'hours')}` },
    { service: t('virusRemoval'), description: t('virusRemovalDesc'), duration: `2-4 ${t('hours', 'hours')}` },
    { service: t('screenReplacement'), description: t('screenRepairDesc'), duration: `1-3 ${t('hours', 'hours')}` }
  ];

  useEffect(() => {
    trackPageView('commercial_street_tech_market');
    loadMarketData();
  }, []);

  const loadMarketData = async () => {
    try {
      setLoading(true);

      const [productsResponse, vendorsResponse] = await Promise.all([
        apiService.get('/markets/commercial-street/tech-market/products'),
        apiService.get('/markets/commercial-street/tech-market/vendors')
      ]);

      if (productsResponse.success) {
        setTechProducts(productsResponse.data);
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
    trackEvent('tech_category_selected', {
      market: 'commercial_street',
      category
    });
  };

  const handleAddToCart = async (product) => {
    const result = await addToCart(product, 1);
    if (result.success) {
      trackEvent('add_to_cart_tech_market', {
        productId: product.id,
        market: 'commercial_street',
        vendor: product.vendor
      });
    }
  };

  const handleAddToWishlist = async (product) => {
    const result = await addToWishlist(product);
    if (result.success) {
      trackEvent('add_to_wishlist_tech_market', {
        productId: product.id,
        market: 'commercial_street'
      });
    }
  };

  const filteredProducts = activeCategory === 'all'
    ? techProducts
    : techProducts.filter(product => product.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>{marketInfo.name} - {t('bharatshaala')} | {t('bangalore')} {t('techHubDescription')}</title>
        <meta name="description" content={marketInfo.description} />
        <meta name="keywords" content="bangalore tech market, laptops, smartphones, commercial street, tech gadgets, computer repair" />
        <link rel="canonical" href="https://bharatshaala.com/markets/commercial-street/tech-market" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
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
                <span className="text-6xl">💻</span>
                <div>
                  <h1 className="text-5xl font-bold mb-2">{marketInfo.name}</h1>
                  <p className="text-xl opacity-90">{marketInfo.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('established')}</h3>
                  <p className="text-purple-200">{marketInfo.established}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('speciality', 'Speciality')}</h3>
                  <p className="text-purple-200">{marketInfo.speciality}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('location')}</h3>
                  <p className="text-purple-200">{marketInfo.location}</p>
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
              <span className="text-gray-900">{t('techMarketTitle')}</span>
            </nav>
          </div>
        </div>

        {/* Featured Products */}
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('todaysBestDeals')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{product.category}</p>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                    <span className="text-gray-400 line-through">{product.originalPrice}</span>
                  </div>
                  <div className="mb-3">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {product.discount}
                    </span>
                  </div>
                  <div className="space-y-1 mb-4">
                    {product.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="bg-gray-50 rounded-lg p-2 text-sm text-gray-700">
                        • {spec}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{product.vendor}</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    {t('addToCart')}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('techCategoriesTitle')}</h2>
            <div className="flex flex-wrap gap-4">
              {techCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ${activeCategory === category.id
                      ? 'bg-blue-600 text-white'
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

        {/* Tech Trends */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('techTrendsTitle')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {techTrends.map((trend, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{trend.trend}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{trend.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: trend.growth }}
                    ></div>
                  </div>
                  <p className="text-blue-700 font-medium text-sm">{trend.growth} {t('growth', 'Growth')}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" text={`${t('loading')} ${t('techProducts', 'tech products')}...`} />
          </div>
        ) : (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {activeCategory === 'all' ? t('allTechProducts', 'All Tech Products') : techCategories.find(cat => cat.id === activeCategory)?.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                    onAddToWishlist={() => handleAddToWishlist(product)}
                    showTechSpecsBadge={true}
                    showWarrantyBadge={true}
                    showEMIBadge={true}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💻</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noItemsFound')}</h3>
                  <p className="text-gray-600">{t('tryDifferentCategory', 'Please selecting a different category')}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Top Vendors */}
        <section className="py-16 bg-gradient-to-r from-blue-100 to-purple-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('topTechVendorsTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {topVendors.map((vendor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="text-4xl mb-4">🏪</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{vendor.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><strong>{t('speciality', 'Speciality')}:</strong> {vendor.speciality}</p>
                    <p><strong>{t('experience', 'Experience')}:</strong> {vendor.experience}</p>
                    <p><strong>{t('products', 'Products')}:</strong> {vendor.products}</p>
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < Math.floor(vendor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ⭐
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">{vendor.rating}</span>
                  </div>
                  <div className="space-y-1 mb-4">
                    {vendor.services.map((service, serviceIndex) => (
                      <span key={serviceIndex} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1">
                        {service}
                      </span>
                    ))}
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    {t('viewShop')}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Services */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('techServicesTitle')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {techServices.map((service, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">🔧</div>
                  <h3 className="text-xl font-semibold mb-2">{service.service}</h3>
                  <p className="text-gray-600 mb-2">{service.description}</p>
                  <p className="text-blue-600 font-medium text-sm">{service.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Market Experience */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">{t('techMarketExperienceTitle')}</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl leading-relaxed mb-8">
                {t('techMarketExpDesc')}
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="text-xl font-semibold mb-2">{t('location')}</h3>
                  <p>{marketInfo.location}</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🕒</div>
                  <h3 className="text-xl font-semibold mb-2">{t('timing')}</h3>
                  <p>{t('timingDesc', '10 AM - 9 PM')}</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">💻</div>
                  <h3 className="text-xl font-semibold mb-2">{t('speciality', 'Speciality')}</h3>
                  <p>{t('latestTechBestPrices')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TechMarket;