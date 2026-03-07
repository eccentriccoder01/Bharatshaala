// Antique Bazaar Component for Colaba Causeway - Bharatshaala Platform
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

const AntiqueBazaar = () => {
  const { trackEvent, trackPageView } = useAnalytics();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { t } = useLanguage();

  const [antiques, setAntiques] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const bazaarInfo = {
    name: t('antiqueBazaarTitle'),
    nameEn: 'Colaba Antique Bazaar',
    description: t('antiqueBazaarDescription'),
    established: '1920s',
    speciality: t('antiqueBazaarSpecialty'),
    location: t('antiqueBazaarLocation'),
    heroImage: '/images/markets/colaba-antique.jpg'
  };

  const antiqueCategories = [
    { id: 'all', name: t('allAntiques'), icon: '🏺' },
    { id: 'coins', name: t('coins'), icon: '🪙' },
    { id: 'paintings', name: t('paintings'), icon: '🎨' },
    { id: 'sculptures', name: t('sculptures'), icon: '🗿' },
    { id: 'jewelry', name: t('vintageJewelry'), icon: '💍' },
    { id: 'books', name: t('oldBooks'), icon: '📚' },
    { id: 'artifacts', name: t('artifacts'), icon: '🏛️' }
  ];

  const featuredAntiques = [
    {
      name: t('mughalCoin'),
      description: t('mughalCoinDesc'),
      price: '₹45,000',
      age: `400+ ${t('yearsOld', 'years')}`,
      authenticity: t('verified'),
      dealer: t('heritageCoins')
    },
    {
      name: t('rajaRaviVarma'),
      description: t('rajaRaviVarmaDesc'),
      price: '₹2,50,000',
      age: `120+ ${t('yearsOld', 'years')}`,
      authenticity: t('certified'),
      dealer: t('artHeritageGallery')
    },
    {
      name: t('cholaBronze'),
      description: t('cholaBronzeDesc'),
      price: '₹1,80,000',
      age: `800+ ${t('yearsOld', 'years')}`,
      authenticity: t('asiCertified'),
      dealer: t('bronzeAntiques')
    }
  ];

  const expertDealers = [
    {
      name: t('heritageCoins'),
      established: '1965',
      specialty: t('ancientCoinsCurrency'),
      rating: 4.9,
      experience: `58+ ${t('yearsOld', 'years')}`,
      expertise: t('numismatics')
    },
    {
      name: t('artHeritageGallery'),
      established: '1958',
      specialty: t('paintingsArtPieces'),
      rating: 4.8,
      experience: `65+ ${t('yearsOld', 'years')}`,
      expertise: t('indianArt')
    },
    {
      name: t('bronzeAntiques'),
      established: '1972',
      specialty: t('bronzeStatuesCrafts'),
      rating: 4.7,
      experience: `51+ ${t('yearsOld', 'years')}`,
      expertise: t('metalArtifacts')
    }
  ];

  const antiqueEras = [
    { era: t('harappanCivilization'), period: '3300-1300 BCE', items: t('potterySealsJewelry').split(', ') },
    { era: t('mauryaEra'), period: '322-185 BCE', items: t('coinsInscriptionsStatues').split(', ') },
    { era: t('guptaEra'), period: '320-550 CE', items: t('goldCoinsArtifactsScriptures').split(', ') },
    { era: t('mughalEra'), period: '1526-1857 CE', items: t('royalCoinsWeaponsJewelry').split(', ') }
  ];

  useEffect(() => {
    trackPageView('colaba_antique_bazaar');
    loadBazaarData();
  }, []);

  const loadBazaarData = async () => {
    try {
      setLoading(true);

      const [antiquesResponse, dealersResponse] = await Promise.all([
        apiService.get('/markets/colaba-causeway/antique-bazaar/products'),
        apiService.get('/markets/colaba-causeway/antique-bazaar/dealers')
      ]);

      if (antiquesResponse.success) {
        setAntiques(antiquesResponse.data);
      }

      if (dealersResponse.success) {
        setDealers(dealersResponse.data);
      }
    } catch (error) {
      console.error('Failed to load bazaar data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    trackEvent('antique_category_selected', {
      market: 'colaba_causeway',
      category
    });
  };

  const handleAddToCart = async (product) => {
    const result = await addToCart(product, 1);
    if (result.success) {
      trackEvent('add_to_cart_antique_bazaar', {
        productId: product.id,
        market: 'colaba_causeway',
        dealer: product.dealer
      });
    }
  };

  const handleAddToWishlist = async (product) => {
    const result = await addToWishlist(product);
    if (result.success) {
      trackEvent('add_to_wishlist_antique_bazaar', {
        productId: product.id,
        market: 'colaba_causeway'
      });
    }
  };

  const filteredAntiques = activeCategory === 'all'
    ? antiques
    : antiques.filter(antique => antique.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>{bazaarInfo.name} - {t('welcome')} | {t('antiqueBazaarDescription')}</title>
        <meta name="description" content={t('antiqueBazaarDescription')} />
        <meta name="keywords" content="colaba antiques, vintage coins, old paintings, antique jewelry, mumbai antiques" />
        <link rel="canonical" href="https://bharatshaala.com/markets/colaba-causeway/antique-bazaar" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-amber-700 to-orange-700 text-white py-16">
          <div className="absolute inset-0 bg-black/50"></div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${bazaarInfo.heroImage})` }}
          ></div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-6xl">🏺</span>
                <div>
                  <h1 className="text-5xl font-bold mb-2">{bazaarInfo.name}</h1>
                  <p className="text-xl opacity-90">{bazaarInfo.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('established')}</h3>
                  <p className="text-amber-200">{bazaarInfo.established}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('specialityLabel')}</h3>
                  <p className="text-amber-200">{bazaarInfo.speciality}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('locationLabel')}</h3>
                  <p className="text-amber-200">{bazaarInfo.location}</p>
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
              <Link to="/markets/colaba-causeway" className="hover:text-emerald-600">{t('colabaCausewayTitle')}</Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900">{t('antiqueBazaarTitle')}</span>
            </nav>
          </div>
        </div>

        {/* Categories Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('antiqueCategories')}</h2>
            <div className="flex flex-wrap gap-4">
              {antiqueCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ${activeCategory === category.id
                      ? 'bg-amber-600 text-white'
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

        {/* Featured Antiques */}
        <section className="py-12 bg-amber-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('featuredAntiques')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredAntiques.map((antique, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{antique.name}</h3>
                  <p className="text-gray-600 mb-3">{antique.description}</p>
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-amber-600">{antique.price}</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{t('age')}:</span>
                      <span className="font-medium">{antique.age}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{t('authenticity')}:</span>
                      <span className="text-green-600 font-medium">{antique.authenticity}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{antique.dealer}</span>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200">
                      {t('view')}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Historical Eras */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('historicalEras')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {antiqueEras.map((era, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{era.era}</h3>
                  <p className="text-amber-700 font-medium mb-4">{era.period}</p>
                  <div className="space-y-2">
                    {era.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-white rounded-lg p-2 text-sm text-gray-700">
                        {item}
                      </div>
                    ))}
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
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {activeCategory === 'all' ? t('allAntiques') : antiqueCategories.find(cat => cat.id === activeCategory)?.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredAntiques.map((antique) => (
                  <ProductCard
                    key={antique.id}
                    product={antique}
                    onAddToCart={() => handleAddToCart(antique)}
                    onAddToWishlist={() => handleAddToWishlist(antique)}
                    showAuthenticityBadge={true}
                    showAgeBadge={true}
                    showRarityBadge={true}
                  />
                ))}
              </div>

              {filteredAntiques.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏺</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noAntiquesFound')}</h3>
                  <p className="text-gray-600">{t('chooseOtherCategory')}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Expert Dealers */}
        <section className="py-16 bg-gradient-to-r from-amber-100 to-orange-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('expertDealers')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {expertDealers.map((dealer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="text-4xl mb-4">🏪</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{dealer.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><strong>{t('established')}:</strong> {dealer.established}</p>
                    <p><strong>{t('specialityLabel')}:</strong> {dealer.specialty}</p>
                    <p><strong>{t('expertLabel', 'Expertise')}:</strong> {dealer.expertise}</p>
                    <p><strong>{t('experience')}:</strong> {dealer.experience}</p>
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < Math.floor(dealer.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ⭐
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">{dealer.rating}</span>
                  </div>
                  <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200">
                    {t('viewShop', 'View Shop')}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Authentication Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('authenticationProcess')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">{t('expertCheck')}</h3>
                <p className="text-gray-600">{t('expertCheckDesc')}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📜</div>
                <h3 className="text-xl font-semibold mb-2">{t('certificate')}</h3>
                <p className="text-gray-600">{t('certificateDesc')}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-xl font-semibold mb-2">{t('scientificTesting')}</h3>
                <p className="text-gray-600">{t('scientificTestingDesc')}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold mb-2">{t('guarantee')}</h3>
                <p className="text-gray-600">{t('guaranteeDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Market Experience */}
        <section className="py-16 bg-gradient-to-r from-amber-700 to-orange-700 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">{t('antiqueExperience')}</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl leading-relaxed mb-8">
                {t('antiqueExpDesc')}
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="text-xl font-semibold mb-2">{t('locationLabel')}</h3>
                  <p>{t('causewayStreet')}</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🕒</div>
                  <h3 className="text-xl font-semibold mb-2">{t('timingLabel')}</h3>
                  <p>{t('timingDesc', '10 AM - 8 PM (Closed on Monday)')}</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">💎</div>
                  <h3 className="text-xl font-semibold mb-2">{t('specialityLabel')}</h3>
                  <p>{t('rareAndCertified')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AntiqueBazaar;