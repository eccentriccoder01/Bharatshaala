
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ShopCard from '../../../components/ShopCard';
import '../../../App.css';
import { useLanguage } from '../../../context/LanguageContext';

import map from '../../../images/markets/colaba_map.jpg';

const ColabaCauseway = () => {
  const [loading, setLoading] = useState(true);
  const [selectedShop, setSelectedShop] = useState(null);
  const [hoveredShop, setHoveredShop] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const shops = [
    {
      id: 'fashion-street-boutique',
      name: t('fashionStreetBoutique'),
      nameEn: 'Mumbai Fashion Street',
      specialty: t('fashionStreetSpecialty'),
      specialtyEn: 'Trendy clothes, accessories and unique Bollywood style fashion collection',
      rating: 4.6,
      reviews: 892,
      established: '1980',
      products: 650,
      owner: t('mrRajeshJain'),
      experience: `25 ${t('yearsOld', 'years')}`,
      category: 'fashion',
      specialty_items: [t('bollywoodDresses'), t('designerKurtas'), t('westernWear'), t('partyOutfits'), t('fashionAccessories')],
      href: '/markets/colaba_causeway/fashion-street-boutique',
      image: '/images/shops/fashion-street.jpg',
      badge: `👗 ${t('trendyFashionBadge')}`,
      timings: t('timingDesc', '10 AM - 11 PM'),
      languages: [t('hindi'), t('english'), t('marathi'), t('gujarati')],
      payment_methods: [t('cash'), 'UPI', t('card')],
      delivery_available: true,
      wholesale_available: false,
      certifications: [t('fashionDesignCouncil')]
    },
    {
      id: 'antique-collectors',
      name: t('colabaAntiques'),
      nameEn: 'Colaba Antiques',
      specialty: t('colabaAntiquesSpecialty'),
      specialtyEn: 'Rare antiques, vintage items and collectible pieces',
      rating: 4.8,
      reviews: 234,
      established: '1965',
      products: 480,
      owner: t('mrFaridAli'),
      experience: `40 ${t('yearsOld', 'years')}`,
      category: 'antiques',
      specialty_items: [t('vintageWatches'), t('ancientCoins'), t('artifacts'), t('oldCameras'), t('antiqueFurniture')],
      href: '/markets/colaba_causeway/antique-collectors',
      image: '/images/shops/antiques.jpg',
      badge: `🏺 ${t('rareCollectionBadge')}`,
      timings: t('timingDesc', '11 AM - 8 PM'),
      languages: [t('hindi'), t('english'), t('urdu')],
      payment_methods: [t('cash'), 'UPI', t('card'), t('cheque')],
      delivery_available: false,
      wholesale_available: false,
      certifications: [t('antiqueDealersAssoc')]
    },
    {
      id: 'street-food-corner',
      name: t('colabaChaatCorner'),
      nameEn: 'Colaba Chaat Corner',
      specialty: t('colabaChaatSpecialty'),
      specialtyEn: 'Famous Mumbai street food, chaat and delicious snacks',
      rating: 4.7,
      reviews: 1245,
      established: '1975',
      products: 75,
      owner: t('mrAshokSharma'),
      experience: `30 ${t('yearsOld', 'years')}`,
      category: 'food',
      specialty_items: [t('pavBhaji'), t('bhelPuri'), t('sevPuri'), t('vadaPav'), t('dahiPuri')],
      href: '/markets/colaba_causeway/street-food-corner',
      image: '/images/shops/street-food.jpg',
      badge: `🍛 ${t('tasteOfMumbaiBadge')}`,
      timings: t('timingDesc', '8 AM - 12 AM'),
      languages: [t('hindi'), t('marathi'), t('english')],
      payment_methods: [t('cash'), 'UPI'],
      delivery_available: true,
      wholesale_available: false,
      certifications: [t('fssaiCertified'), t('hygieneRated')]
    },
    {
      id: 'jewelry-bazaar',
      name: t('mumbaiJewelryBazaar'),
      nameEn: 'Mumbai Jewelry Bazaar',
      specialty: t('mumbaiJewelrySpecialty'),
      specialtyEn: 'Imitation jewelry, fashion accessories and trendy ornaments',
      rating: 4.5,
      reviews: 567,
      established: '1985',
      products: 890,
      owner: t('mrsPriyaMehta'),
      experience: `20 ${t('yearsOld', 'years')}`,
      category: 'jewelry',
      specialty_items: [t('imitationNecklace'), t('fashionEarrings'), t('bracelets'), t('hairAccessories'), t('rings')],
      href: '/markets/colaba_causeway/jewelry-bazaar',
      image: '/images/shops/jewelry-bazaar.jpg',
      badge: `💎 ${t('fashionJewelryBadge')}`,
      timings: t('timingDesc', '10:30 AM - 10 PM'),
      languages: [t('hindi'), t('english'), t('gujarati')],
      payment_methods: [t('cash'), 'UPI', t('card')],
      delivery_available: true,
      wholesale_available: true,
      certifications: [t('fashionJewelryAssoc')]
    },
    {
      id: 'book-cafe',
      name: t('colabaBookCafe'),
      nameEn: 'Colaba Book Cafe',
      specialty: t('colabaBookCafeSpecialty'),
      specialtyEn: 'Vast book collection, coffee and peaceful reading environment',
      rating: 4.9,
      reviews: 378,
      established: '1990',
      products: 520,
      owner: t('mrAnilVerma'),
      experience: `35 ${t('yearsOld', 'years')}`,
      category: 'books',
      specialty_items: [t('novels'), t('poetryCollections'), t('historyBooks'), t('filmMagazines'), t('comics')],
      href: '/markets/colaba_causeway/book-cafe',
      image: '/images/shops/book-cafe.jpg',
      badge: `📚 ${t('bookLoversBadge')}`,
      timings: t('timingDesc', '9 AM - 11 PM'),
      languages: [t('hindi'), t('english'), t('marathi')],
      payment_methods: [t('cash'), 'UPI', t('card')],
      delivery_available: false,
      wholesale_available: false,
      certifications: [t('bestsellerPartner'), t('literarySocietyMember')]
    },
    {
      id: 'tourist-souvenirs',
      name: t('gatewayGifts'),
      nameEn: 'Gateway of India Gifts',
      specialty: t('gatewayGiftsSpecialty'),
      specialtyEn: 'Mumbai and India memorabilia, souvenirs and tourist gifts',
      rating: 4.4,
      reviews: 689,
      established: '1995',
      products: 340,
      owner: t('mrSunilKumar'),
      experience: `18 ${t('yearsOld', 'years')}`,
      category: 'souvenirs',
      specialty_items: [t('gatewayModel'), t('mumbaiTshirts'), t('indianHandicrafts'), t('keyChains'), t('postcards')],
      href: '/markets/colaba_causeway/tourist-souvenirs',
      image: '/images/shops/souvenirs.jpg',
      badge: `🗽 ${t('mumbaiMemoriesBadge')}`,
      timings: t('timingDesc', '8 AM - 10 PM'),
      languages: [t('hindi'), t('english'), t('marathi')],
      payment_methods: [t('cash'), 'UPI', t('card')],
      delivery_available: true,
      wholesale_available: true,
      certifications: [t('tourismBoardApproved')]
    }
  ];

  const marketInfo = {
    name: t('colabaCausewayTitle'),
    nameHindi: t('colabaCausewayTitle'),
    city: 'Mumbai',
    cityHindi: t('mumbai'),
    established: t('ccEstablished'),
    totalShops: t('ccTotalShops'),
    totalVendors: t('ccTotalVendors'),
    specialties: [t('fashion'), t('antiques'), t('streetFood'), t('jewelry'), t('books'), t('souvenirs')],
    openingHours: t('timingDesc', '9 AM - 11 PM'),
    bestTime: t('bestTimeDesc', 'November to February'),
    nearbyAttractions: [t('gatewayOfIndia', 'Gateway of India'), t('tajHotel'), t('regalCinema', 'Regal Cinema'), t('afghanChurch', 'Afghan Church')],
    transport: [t('metroChurchgate'), t('bestBus'), t('taxi'), t('cab')],
    parkingAvailable: false,
    history: t('colabaHistory')
  };

  const categories = [
    { id: 'all', name: t('allShops'), icon: '🏪', count: shops.length },
    { id: 'fashion', name: t('fashion'), icon: '👗', count: shops.filter(s => s.category === 'fashion').length },
    { id: 'antiques', name: t('antiques'), icon: '🏺', count: shops.filter(s => s.category === 'antiques').length },
    { id: 'food', name: t('food'), icon: '🍛', count: shops.filter(s => s.category === 'food').length },
    { id: 'jewelry', name: t('jewelry'), icon: '💎', count: shops.filter(s => s.category === 'jewelry').length },
    { id: 'books', name: t('books'), icon: '📚', count: shops.filter(s => s.category === 'books').length },
    { id: 'souvenirs', name: t('souvenirs'), icon: '🗽', count: shops.filter(s => s.category === 'souvenirs').length }
  ];

  const filteredShops = activeFilter === 'all'
    ? shops
    : shops.filter(shop => shop.category === activeFilter);

  if (loading) {
    return <LoadingSpinner message={`${t('colabaCausewayTitle')} ${t('loading')}...`} />;
  }

  return (
    <React.StrictMode>
      <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 pt-20'>

        {/* Hero Section */}
        <div className='relative overflow-hidden'>
          {/* Floating Mumbai Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 text-4xl opacity-10 animate-float">🗽</div>
            <div className="absolute top-40 right-20 text-3xl opacity-15 animate-float delay-1000">👗</div>
            <div className="absolute bottom-40 left-20 text-5xl opacity-10 animate-float delay-2000">🍛</div>
            <div className="absolute bottom-20 right-10 text-4xl opacity-25 animate-float delay-3000">📚</div>
          </div>

          <div className='max-w-6xl mx-auto px-6 py-16 relative z-10'>
            <div className='text-center mb-16'>
              {/* Mumbai Spirit Badge */}
              <div className='inline-flex items-center space-x-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-3 mb-6 shadow-lg border border-blue-200'>
                <span className='text-2xl'>🌊</span>
                <span className='text-blue-800 font-bold'>{t('mumbaiSpiritBadge')}</span>
              </div>

              <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 bg-clip-text text-transparent mb-4 leading-tight'>
                {marketInfo.name}
              </h1>
              <h2 className='text-2xl md:text-3xl text-emerald-700 font-semibold mb-6'>
                {marketInfo.cityHindi}
              </h2>

              <p className='text-xl text-emerald-600 max-w-4xl mx-auto leading-relaxed mb-8'>
                {t('colabaCausewayDescription')}
              </p>

              {/* Market Stats */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12'>
                <div className='text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200'>
                  <div className='text-2xl font-bold text-blue-600'>{marketInfo.established}</div>
                  <div className='text-blue-600 text-sm font-medium'>{t('established')}</div>
                </div>
                <div className='text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200'>
                  <div className='text-2xl font-bold text-blue-600'>{marketInfo.totalShops}</div>
                  <div className='text-blue-600 text-sm font-medium'>{t('totalShops')}</div>
                </div>
                <div className='text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200'>
                  <div className='text-2xl font-bold text-blue-600'>{marketInfo.totalVendors}</div>
                  <div className='text-blue-600 text-sm font-medium'>{t('vendors')}</div>
                </div>
                <div className='text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200'>
                  <div className='text-2xl font-bold text-blue-600'>{marketInfo.established === '1860' ? marketInfo.history ? '160+' : t('ccYearsOld') : t('ccYearsOld')}</div>
                  <div className='text-blue-600 text-sm font-medium'>{t('ccYearsOldLabel')}</div>
                </div>
              </div>

              {/* Special Features */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
                <div className='bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200'>
                  <div className='text-3xl mb-3'>👗</div>
                  <h3 className='font-bold text-blue-800 mb-2'>{t('fashionHub')}</h3>
                  <p className='text-blue-600 text-sm'>{t('fashionHubDesc')}</p>
                </div>
                <div className='bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200'>
                  <div className='text-3xl mb-3'>🍛</div>
                  <h3 className='font-bold text-blue-800 mb-2'>{t('streetFood')}</h3>
                  <p className='text-blue-600 text-sm'>{t('streetFoodDesc')}</p>
                </div>
                <div className='bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200'>
                  <div className='text-3xl mb-3'>🏺</div>
                  <h3 className='font-bold text-blue-800 mb-2'>{t('antiques')}</h3>
                  <p className='text-blue-600 text-sm'>{t('antiquesDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gateway of India Connection */}
        <div className='max-w-7xl mx-auto px-6 mb-16'>
          <div className='bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white'>
            <div className='text-center mb-8'>
              <h3 className='text-3xl font-bold mb-4'>{t('gatewayConnection')}</h3>
              <p className='text-xl text-blue-100 max-w-3xl mx-auto'>
                {t('gatewayConnectionDesc')}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              <div className='text-center bg-white/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🗽</div>
                <h4 className='text-lg font-semibold mb-2'>{t('gatewayView')}</h4>
                <p className='text-blue-100 text-sm'>{t('gatewayViewDesc')}</p>
              </div>
              <div className='text-center bg-white/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🚢</div>
                <h4 className='text-lg font-semibold mb-2'>{t('harbourView')}</h4>
                <p className='text-blue-100 text-sm'>{t('harbourViewDesc')}</p>
              </div>
              <div className='text-center bg-white/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🏨</div>
                <h4 className='text-lg font-semibold mb-2'>{t('tajHotel')}</h4>
                <p className='text-blue-100 text-sm'>{t('tajHotelDesc')}</p>
              </div>
              <div className='text-center bg-white/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🎬</div>
                <h4 className='text-lg font-semibold mb-2'>{t('filmLocation')}</h4>
                <p className='text-blue-100 text-sm'>{t('filmLocationDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className='max-w-7xl mx-auto px-6 mb-12'>
          <div className='bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg'>
            <h3 className='text-xl font-bold text-emerald-800 mb-4 text-center'>{t('shopCategories')}</h3>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3'>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-300 ${activeFilter === category.id
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg scale-105'
                    : 'bg-white text-emerald-600 hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-300'
                    }`}
                >
                  <span className='text-2xl'>{category.icon}</span>
                  <span className='font-medium text-sm text-center leading-tight'>{category.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${activeFilter === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-100 text-emerald-600'
                    }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Shops Grid */}
        <div className='max-w-7xl mx-auto px-6 pb-20'>
          <div className='text-center mb-12'>
            <h3 className='text-3xl md:text-4xl font-bold text-emerald-800 mb-4'>{t('featuredShops')}</h3>
            <p className='text-xl text-emerald-600'>
              {activeFilter === 'all'
                ? t('allFamousShops')
                : `${categories.find(c => c.id === activeFilter)?.name} ${t('shopsOfCategory')}`
              }
            </p>
          </div>

          {filteredShops.length > 0 ? (
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              {filteredShops.map((shop, index) => (
                <ShopCard
                  key={shop.id}
                  shop={shop}
                  index={index}
                  isHovered={hoveredShop === shop.id}
                  onHover={setHoveredShop}
                  marketTheme="colaba"
                />
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <div className='text-6xl mb-4'>🔍</div>
              <h3 className='text-2xl font-bold text-emerald-800 mb-2'>{t('noShopsFound')}</h3>
              <p className='text-emerald-600'>{t('noShopsFoundDesc')}</p>
            </div>
          )}

          {/* Mumbai Spirit Section */}
          <div className='mt-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-12 text-white'>
            <div className='text-center mb-8'>
              <h3 className='text-3xl font-bold mb-4'>{t('mumbaiSpirit')}</h3>
              <p className='text-xl text-orange-100 max-w-3xl mx-auto'>
                {t('mumbaiSpiritDesc')}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center bg-white/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🎭</div>
                <h4 className='text-lg font-semibold mb-2'>{t('culturalHub')}</h4>
                <p className='text-orange-100 text-sm'>{t('culturalHubDesc')}</p>
              </div>
              <div className='text-center bg-white/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>💝</div>
                <h4 className='text-lg font-semibold mb-2'>{t('shoppingParadise')}</h4>
                <p className='text-orange-100 text-sm'>{t('shoppingParadiseDesc')}</p>
              </div>
              <div className='text-center bg-white/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🌟</div>
                <h4 className='text-lg font-semibold mb-2'>{t('touristFavorite')}</h4>
                <p className='text-orange-100 text-sm'>{t('touristFavoriteDesc')}</p>
              </div>
            </div>

            <div className='text-center mt-8'>
              <button className='bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-colors duration-300 transform hover:scale-105'>
                {t('exploreMumbai')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(3deg); }
          66% { transform: translateY(8px) rotate(-2deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </React.StrictMode>
  );
};

export default ColabaCauseway;
