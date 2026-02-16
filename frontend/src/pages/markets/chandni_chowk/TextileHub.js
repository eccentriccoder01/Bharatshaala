// Textile Hub Component for Chandni Chowk - Bharatshaala Platform
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

const TextileHub = () => {
  const { trackEvent, trackPageView } = useAnalytics();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { t } = useLanguage();

  const [textiles, setTextiles] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const hubInfo = {
    name: t('textileHubTitle'),
    description: t('textileHubDescription'),
    established: '1650s',
    speciality: t('sareeLehenga'),
    location: t('kinariBazar'),
    heroImage: '/images/markets/chandni-chowk-textile.jpg'
  };

  const textileCategories = [
    { id: 'all', name: t('allTextiles'), icon: '👗' },
    { id: 'sarees', name: t('sarees'), icon: '🥻' },
    { id: 'lehengas', name: t('lehengas'), icon: '👑' },
    { id: 'suits', name: t('suits'), icon: '👘' },
    { id: 'fabrics', name: t('fabrics'), icon: '🧵' },
    { id: 'accessories', name: t('accessories', 'Accessories'), icon: '💎' },
    { id: 'men-wear', name: t('menWear'), icon: '👔' }
  ];

  const featuredTextiles = [
    {
      name: t('banarasiSaree'),
      description: t('banarasiDesc'),
      price: '₹15,000 - ₹50,000',
      specialty: t('pureSilkZari'),
      vendor: t('agrawalSareeHouse')
    },
    {
      name: t('rajasthaniLehenga'),
      description: t('rajasthaniDesc'),
      price: '₹25,000 - ₹1,00,000',
      specialty: t('mirrorWork'),
      vendor: t('maharaniCollection')
    },
    {
      name: t('chanderiSuit'),
      description: t('chanderiDesc'),
      price: '₹3,500 - ₹8,000',
      specialty: t('handwovenLight'),
      vendor: t('chanderiPalace')
    }
  ];

  const famousVendors = [
    {
      name: t('agrawalSareeHouse'),
      established: '1942',
      specialty: t('banarasiSaree'),
      rating: 4.9,
      experience: `80+ ${t('yearsOld', 'years')}`
    },
    {
      name: t('maharaniCollection'),
      established: '1955',
      specialty: t('bridalWear'),
      rating: 4.8,
      experience: `68+ ${t('yearsOld', 'years')}`
    },
    {
      name: t('chanderiPalace'),
      established: '1960',
      specialty: t('chanderiKotaSilk'),
      rating: 4.7,
      experience: `63+ ${t('yearsOld', 'years')}`
    }
  ];

  const fabricTypes = [
    { name: t('banarasiSilk'), origin: t('varanasi'), feature: t('zariWork') },
    { name: t('chanderi'), origin: t('madhyaPradesh'), feature: t('lightTransparent') },
    { name: t('kanjivaram'), origin: t('tamilNadu'), feature: t('pureSilk') },
    { name: t('mulmul'), origin: t('bengal'), feature: t('softCotton') },
    { name: t('ikat'), origin: t('odisha'), feature: t('bandhaniPattern') },
    { name: t('patola'), origin: t('gujarat'), feature: t('doubleIkat') }
  ];

  useEffect(() => {
    trackPageView('chandni_chowk_textile_hub');
    loadHubData();
  }, []);

  const loadHubData = async () => {
    try {
      setLoading(true);

      const [textilesResponse, vendorsResponse] = await Promise.all([
        apiService.get('/markets/chandni-chowk/textile-hub/products'),
        apiService.get('/markets/chandni-chowk/textile-hub/vendors')
      ]);

      if (textilesResponse.success) {
        setTextiles(textilesResponse.data);
      }

      if (vendorsResponse.success) {
        setVendors(vendorsResponse.data);
      }
    } catch (error) {
      console.error('Failed to load hub data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    trackEvent('textile_category_selected', {
      market: 'chandni_chowk',
      category
    });
  };

  const handleAddToCart = async (product) => {
    const result = await addToCart(product, 1);
    if (result.success) {
      trackEvent('add_to_cart_textile_hub', {
        productId: product.id,
        market: 'chandni_chowk',
        vendor: product.vendor
      });
    }
  };

  const handleAddToWishlist = async (product) => {
    const result = await addToWishlist(product);
    if (result.success) {
      trackEvent('add_to_wishlist_textile_hub', {
        productId: product.id,
        market: 'chandni_chowk'
      });
    }
  };

  const filteredTextiles = activeCategory === 'all'
    ? textiles
    : textiles.filter(textile => textile.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>{hubInfo.name} - {t('welcome')} | {t('textileHubDescription')}</title>
        <meta name="description" content={t('textileHubDescription')} />
        <meta name="keywords" content="chandni chowk textiles, banarasi saree, lehenga, salwar suits, kinari bazar" />
        <link rel="canonical" href="https://bharatshaala.com/markets/chandni-chowk/textile-hub" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
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
                  <h3 className="font-semibold mb-2">{t('specialityLabel')}</h3>
                  <p className="text-pink-200">{hubInfo.speciality}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('locationLabel')}</h3>
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
              <Link to="/markets/chandni-chowk" className="hover:text-emerald-600">{t('market_chandni_chowk')}</Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900">{t('textileHubTitle')}</span>
            </nav>
          </div>
        </div>

        {/* Categories Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('textileCategories')}</h2>
            <div className="flex flex-wrap gap-4">
              {textileCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ${activeCategory === category.id
                      ? 'bg-purple-500 text-white'
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

        {/* Featured Textiles */}
        <section className="py-12 bg-purple-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('featuredTextiles')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredTextiles.map((textile, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{textile.name}</h3>
                  <p className="text-gray-600 mb-3">{textile.description}</p>
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-purple-600">{textile.price}</span>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      {textile.specialty}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{textile.vendor}</span>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200">
                      {t('view', 'View')}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fabric Types */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('fabricTypes')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fabricTypes.map((fabric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{fabric.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>{t('origin')}:</strong> {fabric.origin}</p>
                    <p><strong>{t('feature')}:</strong> {fabric.feature}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" text={t('loading')} />
          </div>
        ) : (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {activeCategory === 'all' ? t('allTextiles') : textileCategories.find(cat => cat.id === activeCategory)?.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredTextiles.map((textile) => (
                  <ProductCard
                    key={textile.id}
                    product={textile}
                    onAddToCart={() => handleAddToCart(textile)}
                    onAddToWishlist={() => handleAddToWishlist(textile)}
                    showFabricBadge={true}
                    showHandmadeBadge={true}
                  />
                ))}
              </div>

              {filteredTextiles.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👗</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noTextilesFound')}</h3>
                  <p className="text-gray-600">{t('chooseOtherCategory')}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Famous Vendors */}
        <section className="py-16 bg-gradient-to-r from-purple-100 to-pink-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('famousTextileVendors')}</h2>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{vendor.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><strong>{t('established')}:</strong> {vendor.established}</p>
                    <p><strong>{t('specialityLabel')}:</strong> {vendor.specialty}</p>
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
                  <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200">
                    {t('viewShop', 'View Shop')}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Shopping Tips */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('shoppingTips')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-2">{t('bargaining')}</h3>
                <p className="text-gray-600">{t('bargainingDesc')}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">{t('qualityCheck')}</h3>
                <p className="text-gray-600">{t('qualityCheckDesc')}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📏</div>
                <h3 className="text-xl font-semibold mb-2">{t('measurements')}</h3>
                <p className="text-gray-600">{t('measurementsDesc')}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-semibold mb-2">{t('delivery')}</h3>
                <p className="text-gray-600">{t('deliveryHomeDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Market Experience */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">{t('textileHubExperience')}</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl leading-relaxed mb-8">
                {t('textileHubExpDesc')}
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="text-xl font-semibold mb-2">{t('locationLabel')}</h3>
                  <p>{hubInfo.location}</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🕒</div>
                  <h3 className="text-xl font-semibold mb-2">{t('timingLabel')}</h3>
                  <p>{t('timingDesc')}</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-2">{t('specialityLabel')}</h3>
                  <p>{t('bridalWear')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TextileHub;