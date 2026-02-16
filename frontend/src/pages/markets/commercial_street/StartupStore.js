// Startup Store Component for Commercial Street - Bharatshaala Platform
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

const StartupStore = () => {
  const { trackEvent, trackPageView } = useAnalytics();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { t } = useLanguage();

  const [products, setProducts] = useState([]);
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const storeInfo = {
    name: t('startupStoreTitle'),
    nameEn: 'Commercial Street Startup Store',
    description: t('startupStoreDescription'),
    established: '2015',
    speciality: t('innovativeProductsSupport'),
    location: t('commercialStreetCity'),
    heroImage: '/images/markets/commercial-street-startup.jpg'
  };

  const productCategories = [
    { id: 'all', name: t('allProducts'), icon: '🚀' },
    { id: 'tech-gadgets', name: t('techGadgets'), icon: '📱' },
    { id: 'health-wellness', name: t('healthWellness'), icon: '💪' },
    { id: 'home-lifestyle', name: t('homeLifestyle'), icon: '🏠' },
    { id: 'sustainable', name: t('sustainableProducts'), icon: '🌱' },
    { id: 'fashion-accessories', name: t('fashionAccessories'), icon: '👜' },
    { id: 'food-beverages', name: t('foodBeverages'), icon: '🍯' }
  ];

  const featuredStartups = [
    {
      name: 'EcoWrap',
      founder: 'Anupama Ranganathan',
      category: t('sustainablePackaging'),
      founded: '2017',
      products: 12,
      specialty: t('bioDegradableWrap'),
      funding: 'Series A',
      location: t('bangalore')
    },
    {
      name: 'SleepyOwl Coffee',
      founder: 'Arjun Kartik',
      category: t('coffeeBeverages'),
      founded: '2016',
      products: 25,
      specialty: t('coldBrewCoffee'),
      funding: 'Series B',
      location: 'Mumbai/Bangalore'
    },
    {
      name: 'Pee Safe',
      founder: 'Vikas Bagaria',
      category: t('healthHygiene'),
      founded: '2013',
      products: 18,
      specialty: t('personalHygieneProducts'),
      funding: 'Series C',
      location: 'Gurugram/Bangalore'
    }
  ];

  const innovativeProducts = [
    {
      name: t('smartPlantPot'),
      startup: 'GreenTech Solutions',
      description: t('iotPlantSystem'),
      price: '₹2,499',
      category: t('techGadgets'),
      features: [t('autoWatering'), t('smartSensor'), t('mobileApp')]
    },
    {
      name: t('organicSkinCareKit'),
      startup: 'Pure Earth Cosmetics',
      description: t('naturalVegan'),
      price: '₹1,299',
      category: t('healthWellness'),
      features: [t('chemicalFree'), t('veganFormula'), t('ecoPackaging')]
    },
    {
      name: t('bambooDinnerSet'),
      startup: 'Bamboo Innovations',
      description: t('sustainableBiodegradable'),
      price: '₹999',
      category: t('sustainableProducts'),
      features: [t('100Bamboo'), t('microwaveSafe'), t('dishwasherFriendly')]
    }
  ];

  const startupPrograms = [
    { program: t('incubationSupport'), description: t('mentorshipGuidance') },
    { program: t('productLaunchPad'), description: t('launchMarketingSupport') },
    { program: t('investorConnect'), description: t('investorNetworking') },
    { program: t('customerFeedback'), description: t('realTimeInsights') }
  ];

  useEffect(() => {
    trackPageView('commercial_street_startup_store');
    loadStoreData();
  }, []);

  const loadStoreData = async () => {
    try {
      setLoading(true);

      const [productsResponse, startupsResponse] = await Promise.all([
        apiService.get('/markets/commercial-street/startup-store/products'),
        apiService.get('/markets/commercial-street/startup-store/startups')
      ]);

      if (productsResponse.success) {
        setProducts(productsResponse.data);
      }

      if (startupsResponse.success) {
        setStartups(startupsResponse.data);
      }
    } catch (error) {
      console.error('Failed to load store data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    trackEvent('startup_category_selected', {
      market: 'commercial_street',
      category
    });
  };

  const handleAddToCart = async (product) => {
    const result = await addToCart(product, 1);
    if (result.success) {
      trackEvent('add_to_cart_startup_store', {
        productId: product.id,
        market: 'commercial_street',
        startup: product.startup
      });
    }
  };

  const handleAddToWishlist = async (product) => {
    const result = await addToWishlist(product);
    if (result.success) {
      trackEvent('add_to_wishlist_startup_store', {
        productId: product.id,
        market: 'commercial_street'
      });
    }
  };

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>{storeInfo.name} - {t('bharatshaala')} | {t('innovativeIndianProducts')}</title>
        <meta name="description" content={storeInfo.description} />
        <meta name="keywords" content="indian startups, innovative products, tech gadgets, sustainable products, bangalore startup" />
        <link rel="canonical" href="https://bharatshaala.com/markets/commercial-street/startup-store" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
          <div className="absolute inset-0 bg-black/40"></div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${storeInfo.heroImage})` }}
          ></div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-6xl">🚀</span>
                <div>
                  <h1 className="text-5xl font-bold mb-2">{storeInfo.name}</h1>
                  <p className="text-xl opacity-90">{storeInfo.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('established')}</h3>
                  <p className="text-cyan-200">{storeInfo.established}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('speciality')}</h3>
                  <p className="text-cyan-200">{storeInfo.speciality}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('location')}</h3>
                  <p className="text-cyan-200">{storeInfo.location}</p>
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
              <span className="text-gray-900">{t('startupStoreTitle')}</span>
            </nav>
          </div>
        </div>

        {/* Featured Startups */}
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('featuredStartupsTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredStartups.map((startup, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">🚀</div>
                    <h3 className="text-xl font-bold text-gray-900">{startup.name}</h3>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><strong>{t('founder')}:</strong> {startup.founder}</p>
                    <p><strong>{t('category')}:</strong> {startup.category}</p>
                    <p><strong>{t('established')}:</strong> {startup.founded}</p>
                    <p><strong>{t('location')}:</strong> {startup.location}</p>
                    <p><strong>{t('products')}:</strong> {startup.products}</p>
                    <p><strong>{t('speciality')}:</strong> {startup.specialty}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {startup.funding}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      {t('viewProducts')}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Innovative Products */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('innovativeProductsTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {innovativeProducts.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">by {product.startup}</p>
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <div className="space-y-1 mb-4">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="bg-white rounded-lg p-2 text-sm text-gray-700">
                        • {feature}
                      </div>
                    ))}
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
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('productCategoriesTitle')}</h2>
            <div className="flex flex-wrap gap-4">
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ${activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border'
                    }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" text={`${t('loading')} ${t('products', 'products')}...`} />
          </div>
        ) : (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {activeCategory === 'all' ? t('allProducts') : productCategories.find(cat => cat.id === activeCategory)?.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                    onAddToWishlist={() => handleAddToWishlist(product)}
                    showStartupBadge={true}
                    showInnovationBadge={true}
                    showEcoFriendlyBadge={true}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noItemsFound')}</h3>
                  <p className="text-gray-600">{t('tryDifferentCategory')}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Startup Programs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('startupProgramsTitle')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {startupPrograms.map((program, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">💡</div>
                  <h3 className="text-xl font-semibold mb-2">{program.program}</h3>
                  <p className="text-gray-600">{program.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Innovation Stats */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('innovationStatsTitle')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
                <p className="text-gray-600">{t('registeredStartups')}</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <p className="text-gray-600">{t('innovativeProductsStat')}</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">₹50Cr+</div>
                <p className="text-gray-600">{t('totalFunding')}</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
                <p className="text-gray-600">{t('jobsCreated')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Startup Store Experience */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">{t('startupStoreExperienceTitle')}</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl leading-relaxed mb-8">
                {t('startupStoreExpDesc')}
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="text-xl font-semibold mb-2">{t('location')}</h3>
                  <p>{t('commercialStreetCity')}</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🕒</div>
                  <h3 className="text-xl font-semibold mb-2">{t('timing')}</h3>
                  <p>{t('startupStoreTiming')}</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-xl font-semibold mb-2">{t('speciality')}</h3>
                  <p>{t('innovativeIndianProducts')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default StartupStore;