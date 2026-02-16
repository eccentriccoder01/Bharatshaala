// Silver Jewelry Category Page for Bharatshaala Platform
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import SortDropdown from '../components/SortDropdown';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAnalytics } from '../analytics';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import apiService from '../apiService';
import { useLanguage } from '../../context/LanguageContext';

const SilverJewelry = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { trackEvent, trackPageView } = useAnalytics();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { t } = useLanguage();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    purity: [],
    styles: [],
    occasions: [],
    gemstones: [],
    gender: [],
    inStock: false
  });

  const [sortBy, setSortBy] = useState('featured');

  const categoryInfo = {
    title: t('silverJewelryTitle'),
    description: t('silverJewelryDescription'),
    icon: '💍',
    heroImage: '/images/categories/silver-jewelry-hero.jpg'
  };

  const subcategories = [
    { id: 'rings', name: t('rings'), image: '/images/subcategories/silver-rings.jpg' },
    { id: 'necklaces', name: t('necklaces'), image: '/images/subcategories/silver-necklaces.jpg' },
    { id: 'earrings', name: t('earrings'), image: '/images/subcategories/silver-earrings.jpg' },
    { id: 'bracelets', name: t('bracelets'), image: '/images/subcategories/silver-bracelets.jpg' },
    { id: 'anklets', name: t('anklets'), image: '/images/subcategories/silver-anklets.jpg' },
    { id: 'sets', name: t('sets'), image: '/images/subcategories/silver-sets.jpg' }
  ];

  const filterOptions = {
    purity: [
      { id: '925', name: t('925 Sterling', '925 स्टर्लिंग') },
      { id: '999', name: t('999 Pure Silver', '999 शुद्ध चांदी') },
      { id: 'oxidized', name: t('Oxidized', 'ऑक्सीडाइज्ड') },
      { id: 'antique', name: t('Antique Finish', 'एंटीक फिनिश') }
    ],
    styles: [
      { id: 'traditional', name: t('Traditional', 'पारंपरिक') },
      { id: 'contemporary', name: t('Contemporary', 'आधुनिक') },
      { id: 'ethnic', name: t('Ethnic', 'जातीय') },
      { id: 'minimalist', name: t('Minimalist', 'न्यूनतम') },
      { id: 'statement', name: t('Statement', 'स्टेटमेंट') },
      { id: 'vintage', name: t('Vintage', 'विंटेज') }
    ],
    occasions: [
      { id: 'daily-wear', name: t('Daily Wear', 'दैनिक उपयोग') },
      { id: 'wedding', name: t('Wedding', 'शादी-विवाह') },
      { id: 'festival', name: t('Festival', 'त्योहार') },
      { id: 'party', name: t('Party', 'पार्टी') },
      { id: 'office', name: t('Office', 'ऑफिस') },
      { id: 'casual', name: t('Casual', 'कैजुअल') }
    ],
    gemstones: [
      { id: 'none', name: t('No Gemstone', 'बिना रत्न') },
      { id: 'turquoise', name: t('Turquoise', 'फिरोजा') },
      { id: 'moonstone', name: t('Moonstone', 'चंद्रकांत') },
      { id: 'onyx', name: t('Onyx', 'गोमेद') },
      { id: 'pearl', name: t('Pearl', 'मोती') },
      { id: 'coral', name: t('Coral', 'मूंगा') }
    ],
    gender: [
      { id: 'women', name: t('Women', 'महिला') },
      { id: 'men', name: t('Men', 'पुरुष') },
      { id: 'unisex', name: t('Unisex', 'यूनिसेक्स') },
      { id: 'kids', name: t('Kids', 'बच्चे') }
    ]
  };

  const sortOptions = [
    { value: 'featured', label: t('Featured', 'फीचर्ड') },
    { value: 'price_low_high', label: t('Price: Low to High', 'कीमत: कम से ज्यादा') },
    { value: 'price_high_low', label: t('Price: High to Low', 'कीमत: ज्यादा से कम') },
    { value: 'newest', label: t('Newest', 'नवीनतम') },
    { value: 'rating', label: t('Rating', 'रेटिंग') },
    { value: 'popularity', label: t('Popularity', 'लोकप्रियता') }
  ];

  useEffect(() => {
    trackPageView('silver_jewelry_category');
    loadProducts();
  }, [currentPage, filters, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/products', {
        params: {
          category: 'silver-jewelry',
          page: currentPage,
          limit: 20,
          sort: sortBy,
          ...filters
        }
      });

      if (response.success) {
        setProducts(response.data.products);
        setTotalProducts(response.data.total);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);

    trackEvent('category_filter_applied', {
      category: 'silver-jewelry',
      filters: newFilters
    });
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);

    trackEvent('category_sort_changed', {
      category: 'silver-jewelry',
      sortBy: newSort
    });
  };

  const handleAddToCart = async (product) => {
    const result = await addToCart(product, 1);
    if (result.success) {
      trackEvent('add_to_cart_category', {
        productId: product.id,
        productName: product.name,
        category: 'silver-jewelry',
        price: product.price
      });
    }
  };

  const handleAddToWishlist = async (product) => {
    const result = await addToWishlist(product);
    if (result.success) {
      trackEvent('add_to_wishlist_category', {
        productId: product.id,
        productName: product.name,
        category: 'silver-jewelry'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('silverJewelryTitle')} - {t('welcome')} | {t('silverJewelryDescription')}</title>
        <meta name="description" content={t('silverJewelryDescription')} />
        <meta name="keywords" content="silver jewelry, 925 sterling, handmade jewelry" />
        <link rel="canonical" href="https://bharatshaala.com/categories/silver-jewelry" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-700 to-gray-900 text-white py-16">
          <div className="absolute inset-0 bg-black/40"></div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${categoryInfo.heroImage})` }}
          ></div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-6xl">{categoryInfo.icon}</span>
                <div>
                  <h1 className="text-5xl font-bold mb-2">{t('silverJewelryTitle')}</h1>
                  <p className="text-xl opacity-90">{t('silverJewelryDescription')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-gray-300">
                <div className="flex items-center space-x-2">
                  <span>✨</span>
                  <span>{t('silverQuality')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🎨</span>
                  <span>{t('handmadeDesign')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🛡️</span>
                  <span>{t('lifetimeWarranty')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Subcategories */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('jewelryTypes')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {subcategories.map((subcategory) => (
                <motion.div
                  key={subcategory.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
                  onClick={() => {
                    trackEvent('subcategory_clicked', {
                      category: 'silver-jewelry',
                      subcategory: subcategory.id
                    });
                  }}
                >
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <img
                      src={subcategory.image}
                      alt={subcategory.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 text-center text-sm">{subcategory.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <FilterSidebar
                filters={filters}
                filterOptions={filterOptions}
                onFilterChange={handleFilterChange}
                categorySpecific={{
                  showPurity: true,
                  showStyles: true,
                  showOccasions: true,
                  showGemstones: true,
                  showGender: true
                }}
              />
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              {/* Sort and Results Count */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  <span className="font-semibold">{totalProducts}</span> {t('jewelry', 'jewellery')} {t('found', 'found')}
                </p>
                <SortDropdown
                  value={sortBy}
                  options={sortOptions}
                  onChange={handleSortChange}
                />
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner size="large" text={t('loading')} />
                </div>
              ) : (
                <>
                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {products.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ProductCard
                          product={product}
                          onAddToCart={() => handleAddToCart(product)}
                          onAddToWishlist={() => handleAddToWishlist(product)}
                          showPurityBadge={true}
                          showHandmadeBadge={true}
                          showStyleBadge={true}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                      >
                        {t('previous', 'Previous')}
                      </button>

                      <span className="px-4 py-2 text-gray-600">
                        {t('page', 'Page')} {currentPage} {t('of', 'of')} {totalPages}
                      </span>

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                      >
                        {t('next', 'Next')}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Care Instructions Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('silverCare')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🧽</div>
                <h3 className="text-xl font-semibold mb-2">{t('regularCleaning')}</h3>
                <p className="text-gray-600">{t('cleanWithCloth')}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💧</div>
                <h3 className="text-xl font-semibold mb-2">{t('avoidWater')}</h3>
                <p className="text-gray-600">{t('removeWhileBathing')}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-xl font-semibold mb-2">{t('properStorage')}</h3>
                <p className="text-gray-600">{t('storeSafely')}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-semibold mb-2">{t('maintainShine')}</h3>
                <p className="text-gray-600">{t('useSilverCleaner')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Craftsmanship Section */}
        <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">{t('craftsmanshipArt')}</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl mb-4">👨‍🎨</div>
                <h3 className="text-xl font-semibold mb-2">{t('masterArtisans')}</h3>
                <p className="opacity-90">{t('traditionalTechnique')}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔨</div>
                <h3 className="text-xl font-semibold mb-2">{t('handmade')}</h3>
                <p className="opacity-90">{t('madeByHand')}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-xl font-semibold mb-2">{t('uniqueDesign')}</h3>
                <p className="opacity-90">{t('attractivePatterns')}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SilverJewelry;