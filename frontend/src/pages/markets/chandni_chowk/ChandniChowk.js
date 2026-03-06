import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ShopCard from '../../../components/ShopCard';
import '../../../App.css';
import { useLanguage } from '../../../context/LanguageContext';
import map from '../../../images/markets/chandni_map.jpeg';

const ChandniChowk = () => {
  const { language, t } = useLanguage();
  const [loading, setLoading] = useState(true);
  // const [selectedShop, setSelectedShop] = useState(null);
  // const [selectedShop] = useState(null);
  const [hoveredShop, setHoveredShop] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  // const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const shops = [
    {
      id: 'spice-market',
      name: language === 'hi' ? 'खादी राम मसाला भंडार' : 'Khari Ram Spice Emporium',
      specialty: language === 'hi' ? 'प्रामाणिक भारतीय मसाले, हर्बल चाय और आयुर्वेदिक सामग्री' : 'Authentic Indian spices, herbal teas and Ayurvedic ingredients',
      rating: 4.9,
      reviews: 487,
      established: '1923',
      products: 280,
      owner: language === 'hi' ? 'श्री रामेश्वर गुप्ता' : 'Mr. Rameshwar Gupta',
      experience: language === 'hi' ? '35 साल' : '35 Years',
      category: 'spices',
      specialty_items: language === 'hi'
        ? ['गरम मसाला', 'केसर', 'इलायची', 'दालचीनी', 'काली मिर्च']
        : ['Garam Masala', 'Saffron', 'Cardamom', 'Cinnamon', 'Black Pepper'],
      href: '/markets/chandni_chowk/spice-market',
      image: '/images/shops/spice-market.jpg',
      badge: language === 'hi' ? '🌶️ मसाला राजा' : '🌶️ Spice King',
      timings: language === 'hi' ? 'सुबह 8:00 - रात 8:00' : '8:00 AM - 8:00 PM',
      languages: language === 'hi' ? ['हिंदी', 'अंग्रेजी', 'उर्दू'] : ['Hindi', 'English', 'Urdu'],
      payment_methods: language === 'hi' ? ['नकद', 'UPI', 'कार्ड'] : ['Cash', 'UPI', 'Card'],
      delivery_available: true,
      wholesale_available: true
    },
    {
      id: 'silver-jewelry',
      name: language === 'hi' ? 'पुराना क्विल्ला ज्वेलर्स' : 'Purana Qila Jewellers',
      specialty: language === 'hi' ? 'हस्तनिर्मित चांदी के गहने, पारंपरिक डिज़ाइन और कुंदन का काम' : 'Handcrafted silver jewelry, traditional designs and Kundan work',
      rating: 4.8,
      reviews: 342,
      established: '1947',
      products: 450,
      owner: language === 'hi' ? 'श्री मुकेश सोनी' : 'Mr. Mukesh Soni',
      experience: language === 'hi' ? '42 साल' : '42 Years',
      category: 'jewelry',
      specialty_items: language === 'hi'
        ? ['चांदी के हार', 'कुंदन झुमके', 'पायल', 'कड़े', 'अंगूठियां']
        : ['Silver Necklaces', 'Kundan Earrings', 'Anklets', 'Bangles', 'Rings'],
      href: '/markets/chandni_chowk/silver-jewelry',
      image: '/images/shops/silver-jewelry.jpg',
      badge: language === 'hi' ? '💎 बानगी प्रमाणित' : '💎 HallMark Certified',
      timings: language === 'hi' ? 'सुबह 10:00 - रात 8:30' : '10:00 AM - 8:30 PM',
      languages: language === 'hi' ? ['हिंदी', 'अंग्रेजी', 'पंजाबी'] : ['Hindi', 'English', 'Punjabi'],
      payment_methods: language === 'hi' ? ['नकद', 'UPI', 'कार्ड', 'चेक'] : ['Cash', 'UPI', 'Card', 'Cheque'],
      delivery_available: true,
      wholesale_available: false
    },
    {
      id: 'textile-hub',
      name: language === 'hi' ? 'बनारसी साड़ी पैलेस' : 'Banarasi Saree Palace',
      specialty: language === 'hi' ? 'बनारसी साड़ी, सिल्क फैब्रिक और पारंपरिक भारतीय वस्त्र' : 'Banarasi sarees, silk fabrics and traditional Indian textiles',
      rating: 4.7,
      reviews: 298,
      established: '1965',
      products: 320,
      owner: language === 'hi' ? 'श्री विजय कुमार अग्रवाल' : 'Mr. Vijay Kumar Agarwal',
      experience: language === 'hi' ? '38 साल' : '38 Years',
      category: 'textiles',
      specialty_items: language === 'hi'
        ? ['बनारसी साड़ी', 'सिल्क दुपट्टा', 'कांजीवरम साड़ी', 'लहंगा', 'शॉल']
        : ['Banarasi Saree', 'Silk Dupatta', 'Kanjivaram Saree', 'Lehenga', 'Shawl'],
      href: '/markets/chandni_chowk/textile-hub',
      image: '/images/shops/textile-hub.jpg',
      badge: language === 'hi' ? '🧵 प्योर सिल्क' : '🧵 Pure Silk',
      timings: language === 'hi' ? 'सुबह 10:00 - रात 9:00' : '10:00 AM - 9:00 PM',
      languages: language === 'hi' ? ['हिंदी', 'अंग्रेजी', 'बंगाली'] : ['Hindi', 'English', 'Bengali'],
      payment_methods: language === 'hi' ? ['नकद', 'UPI', 'कार्ड'] : ['Cash', 'UPI', 'Card'],
      delivery_available: true,
      wholesale_available: true
    },
    {
      id: 'traditional-sweets',
      name: language === 'hi' ? 'घंटेवाला हलवाई' : 'Ghantewala Halwai',
      specialty: language === 'hi' ? 'पारंपरिक भारतीय मिठाइयां, नमकीन और त्योहारी व्यंजन' : 'Traditional Indian sweets, savories and festival delicacies',
      rating: 4.9,
      reviews: 612,
      established: '1790',
      products: 85,
      owner: language === 'hi' ? 'श्री संजय गोयल' : 'Mr. Sanjay Goyal',
      experience: language === 'hi' ? '45 साल' : '45 Years',
      category: 'food',
      specialty_items: language === 'hi'
        ? ['सोहन हलवा', 'गाजर हलवा', 'रबड़ी', 'जलेबी', 'समोसा']
        : ['Sohan Halwa', 'Gajar Halwa', 'Rabri', 'Jalebi', 'Samosa'],
      href: '/markets/chandni_chowk/traditional-sweets',
      image: '/images/shops/sweets.jpg',
      badge: language === 'hi' ? '🍯 230+ साल पुराना' : '🍯 230+ Years Old',
      timings: language === 'hi' ? 'सुबह 7:00 - रात 10:00' : '7:00 AM - 10:00 PM',
      languages: language === 'hi' ? ['हिंदी', 'अंग्रेजी'] : ['Hindi', 'English'],
      payment_methods: language === 'hi' ? ['नकद', 'UPI'] : ['Cash', 'UPI'],
      delivery_available: true,
      wholesale_available: true
    },
    {
      id: 'books-stationery',
      name: language === 'hi' ? 'गीता प्रेस बुक डिपो' : 'Gita Press Book Depot',
      specialty: language === 'hi' ? 'धार्मिक पुस्तकें, उर्दू साहित्य और पारंपरिक लेखन सामग्री' : 'Religious books, Urdu literature and traditional writing materials',
      rating: 4.6,
      reviews: 189,
      established: '1955',
      products: 520,
      owner: language === 'hi' ? 'श्री आनंद प्रकाश शर्मा' : 'Mr. Anand Prakash Sharma',
      experience: language === 'hi' ? '40 साल' : '40 Years',
      category: 'books',
      specialty_items: language === 'hi'
        ? ['गीता', 'रामायण', 'उर्दू शायरी', 'हस्तलिखित कॉपी', 'कलम']
        : ['Gita', 'Ramayana', 'Urdu Poetry', 'Handwritten Copy', 'Pen'],
      href: '/markets/chandni_chowk/books-stationery',
      image: '/images/shops/books.jpg',
      badge: language === 'hi' ? '📚 दुर्लभ संग्रह' : '📚 Rare Collection',
      timings: language === 'hi' ? 'सुबह 9:00 - रात 8:00' : '9:00 AM - 8:00 PM',
      languages: language === 'hi' ? ['हिंदी', 'उर्दू', 'संस्कृत', 'अंग्रेजी'] : ['Hindi', 'Urdu', 'Sanskrit', 'English'],
      payment_methods: language === 'hi' ? ['नकद', 'UPI'] : ['Cash', 'UPI'],
      delivery_available: false,
      wholesale_available: true
    },
    {
      id: 'electronics-gadgets',
      name: language === 'hi' ? 'गफ्फार मार्केट इलेक्ट्रॉनिक्स' : 'Gaffar Market Electronics',
      specialty: language === 'hi' ? 'इलेक्ट्रॉनिक सामान, मोबाइल एक्सेसरीज और तकनीकी उपकरण' : 'Electronic goods, mobile accessories and technical equipment',
      rating: 4.4,
      reviews: 234,
      established: '1980',
      products: 680,
      owner: language === 'hi' ? 'श्री मोहम्मद अली' : 'Mr. Mohammed Ali',
      experience: language === 'hi' ? '30 साल' : '30 Years',
      category: 'electronics',
      specialty_items: language === 'hi'
        ? ['मोबाइल केस', 'चार्जर', 'हेडफोन', 'स्पीकर', 'पावर बैंक']
        : ['Mobile Case', 'Charger', 'Headphone', 'Speaker', 'Power Bank'],
      href: '/markets/chandni_chowk/electronics-gadgets',
      image: '/images/shops/electronics.jpg',
      badge: language === 'hi' ? '📱 लेटेस्ट टेक' : '📱 Latest Tech',
      timings: language === 'hi' ? 'सुबह 10:00 - रात 9:00' : '10:00 AM - 9:00 PM',
      languages: language === 'hi' ? ['हिंदी', 'अंग्रेजी', 'उर्दू'] : ['Hindi', 'English', 'Urdu'],
      payment_methods: language === 'hi' ? ['नकद', 'UPI', 'कार्ड', 'EMI'] : ['Cash', 'UPI', 'Card', 'EMI'],
      delivery_available: true,
      wholesale_available: true
    }
  ];

  const marketInfo = {
    name: 'Chandni Chowk',
    nameHindi: 'चांदनी चौक',
    city: 'Delhi',
    cityHindi: 'नई दिल्ली',
    established: '1650',
    totalShops: 9000,
    totalVendors: 350,
    specialties: [t('spices'), t('silverJewelry'), t('textiles'), t('sweets'), t('books'), t('electronics')],
    openingHours: '8:00 AM - 9:00 PM',
    bestTime: t('market.info.bestTime', 'October to March'),
    nearbyAttractions: language === 'hi'
      ? ['लाल किला', 'जामा मस्जिद', 'राज घाट', 'इंडिया गेट']
      : ['Red Fort', 'Jama Masjid', 'Raj Ghat', 'India Gate'],
    transport: language === 'hi'
      ? ['मेट्रो: चांदनी चौक', 'बस स्टैंड', 'रिक्शा', 'ऑटो']
      : ['Metro: Chandni Chowk', 'Bus Stand', 'Rickshaw', 'Auto'],
    parkingAvailable: true
  };

  const categories = [
    { id: 'all', name: t('allCategories'), icon: '🏪', count: shops.length },
    { id: 'spices', name: t('spices'), icon: '🌶️', count: shops.filter(s => s.category === 'spices').length },
    { id: 'jewelry', name: t('silverJewelry'), icon: '💎', count: shops.filter(s => s.category === 'jewelry').length },
    { id: 'textiles', name: t('textiles'), icon: '🧵', count: shops.filter(s => s.category === 'textiles').length },
    { id: 'food', name: t('sweets'), icon: '🍯', count: shops.filter(s => s.category === 'food').length },
    { id: 'books', name: t('books', 'Books'), icon: '📚', count: shops.filter(s => s.category === 'books').length },
    { id: 'electronics', name: t('electronics', 'Electronics'), icon: '📱', count: shops.filter(s => s.category === 'electronics').length }
  ];

  const filteredShops = activeFilter === 'all'
    ? shops
    : shops.filter(shop => shop.category === activeFilter);

  if (loading) {
    return <LoadingSpinner message={`${t('market_chandni_chowk')} ${t('loading')}...`} />;
  }

  return (
    <React.StrictMode>
      <div className='min-h-screen bg-gradient-to-br from-emerald-50 dark:from-gray-900 via-green-50 dark:via-gray-900 to-emerald-100 dark:to-gray-800 pt-20'>

        {/* Hero Section */}
        <div className='relative overflow-hidden'>
          {/* Floating Historical Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 text-4xl opacity-10 animate-float">🏛️</div>
            <div className="absolute top-40 right-20 text-3xl opacity-15 animate-float delay-1000">🌶️</div>
            <div className="absolute bottom-40 left-20 text-5xl opacity-10 animate-float delay-2000">💎</div>
            <div className="absolute bottom-20 right-10 text-4xl opacity-25 animate-float delay-3000">🕌</div>
          </div>

          <div className='max-w-6xl mx-auto px-6 py-16 relative z-10'>
            <div className='text-center mb-16'>
              {/* Historical Badge */}
              <div className='inline-flex items-center space-x-3 bg-gradient-to-r from-amber-100 dark:from-amber-900/30 to-orange-100 dark:to-orange-900/30 rounded-full px-6 py-3 mb-6 shadow-lg border border-amber-200 dark:border-amber-700'>
                <span className='text-2xl'>🏛️</span>
                <span className='text-amber-800 dark:text-amber-200 font-bold'>
                  {language === 'hi' ? 'मुगल काल से' : t('market_chandni_chowk_hero_title')}
                </span>
              </div>

              <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-red-700 bg-clip-text text-transparent mb-4 leading-tight'>
                {language === 'hi' ? marketInfo.nameHindi : t('market_chandni_chowk')}
              </h1>
              <h2 className='text-2xl md:text-3xl text-emerald-700 dark:text-emerald-300 font-semibold mb-6'>
                {language === 'hi' ? `Chandni Chowk, ${marketInfo.cityHindi}` : t('market_chandni_chowk_subtitle')}
              </h2>

              <p className='text-xl text-emerald-600 dark:text-emerald-400 max-w-4xl mx-auto leading-relaxed mb-8'>
                {language === 'hi'
                  ? 'भारत के सबसे पुराने और व्यस्त बाजारों में से एक, इसकी संकरी गलियों और भीड़भाड़ के माहौल की खोज करें। मुगल सम्राट शाहजहाँ द्वारा बसाया गया यह बाजार आज भी अपनी पुरानी रौनक बनाए हुए है। यहाँ आपको मसालों की सुगंध, चांदी के गहनों की चमक और पारंपरिक मिठाइयों का स्वाद मिलेगा।'
                  : t('market_chandni_chowk_desc')
                }
              </p>

              {/* Market Stats */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12'>
                <div className='text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-red-200 dark:border-red-700'>
                  <div className='text-2xl font-bold text-red-600 dark:text-red-400'>{marketInfo.established}</div>
                  <div className='text-red-600 dark:text-red-400 text-sm font-medium'>
                    {language === 'hi' ? 'स्थापना' : t('established')}
                  </div>
                </div>
                <div className='text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-red-200 dark:border-red-700'>
                  <div className='text-2xl font-bold text-red-600 dark:text-red-400'>{marketInfo.totalShops.toLocaleString()}+</div>
                  <div className='text-red-600 dark:text-red-400 text-sm font-medium'>
                    {language === 'hi' ? 'कुल दुकानें' : t('totalShops')}
                  </div>
                </div>
                <div className='text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-red-200 dark:border-red-700'>
                  <div className='text-2xl font-bold text-red-600 dark:text-red-400'>{marketInfo.totalVendors}+</div>
                  <div className='text-red-600 dark:text-red-400 text-sm font-medium'>
                    {language === 'hi' ? 'विक्रेता' : t('totalVendors')}
                  </div>
                </div>
                <div className='text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-red-200 dark:border-red-700'>
                  <div className='text-2xl font-bold text-red-600 dark:text-red-400'>375</div>
                  <div className='text-red-600 dark:text-red-400 text-sm font-medium'>
                    {language === 'hi' ? 'साल पुराना' : t('yearsOld')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map Section */}
        <div className='max-w-7xl mx-auto px-6 mb-16'>
          <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg'>
            <h3 className='text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-6 text-center flex items-center justify-center space-x-3'>
              <span>🗺️</span>
              <span>{language === 'hi' ? 'चांदनी चौक का नक्शा' : t('market_map_title')}</span>
            </h3>
            <div className='relative flex justify-center'>
              <img
                src={map}
                alt='Chandni Chowk Map'
                className='rounded-2xl w-full max-w-4xl shadow-lg hover:scale-105 transition-transform duration-500'
              />
              <div className='absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium'>
                {language === 'hi' ? '🚇 मेट्रो: चांदनी चौक' : '🚇 Metro: Chandni Chowk'}
              </div>
            </div>

            {/* Market Info */}
            <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='text-center bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700'>
                <h4 className='font-semibold text-emerald-800 dark:text-emerald-200 mb-2'>
                  ⏰ {language === 'hi' ? 'समय' : t('openingHours')}
                </h4>
                <p className='text-emerald-700 dark:text-emerald-300'>{marketInfo.openingHours}</p>
                <p className='text-emerald-600 dark:text-emerald-400 text-sm mt-1'>
                  {language === 'hi' ? 'सोमवार से रविवार' : (t('openDaily') || 'Open Daily')}
                </p>
              </div>
              <div className='text-center bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700'>
                <h4 className='font-semibold text-emerald-800 dark:text-emerald-200 mb-2'>
                  🌤️ {language === 'hi' ? 'बेस्ट टाइम' : t('bestTime')}
                </h4>
                <p className='text-emerald-700 dark:text-emerald-300'>
                  {language === 'hi' ? marketInfo.bestTime : t('bestTimeValue')}
                </p>
                <p className='text-emerald-600 dark:text-emerald-400 text-sm mt-1'>
                  {language === 'hi' ? 'ठंडा मौसम' : t('weatherDesc')}
                </p>
              </div>
              <div className='text-center bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700'>
                <h4 className='font-semibold text-emerald-800 dark:text-emerald-200 mb-2'>
                  🅿️ {language === 'hi' ? 'पार्किंग' : t('parking')}
                </h4>
                <p className='text-emerald-700 dark:text-emerald-300'>
                  {language === 'hi' ? 'उपलब्ध' : (t('parkingAvailable') || 'Available')}
                </p>
                <p className='text-emerald-600 dark:text-emerald-400 text-sm mt-1'>
                  {language === 'hi' ? 'मेट्रो पार्किंग' : (t('parkingType') || 'Metro Parking')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className='max-w-7xl mx-auto px-6 mb-12'>
          <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg'>
            <h3 className='text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-4 text-center'>
              {language === 'hi' ? 'दुकान श्रेणियां' : t('shopCategories')}
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3'>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-300 ${activeFilter === category.id
                    ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-700 border border-emerald-200 dark:border-emerald-700 hover:border-emerald-300'
                    }`}
                >
                  <span className='text-2xl'>{category.icon}</span>
                  <span className='font-medium text-sm text-center leading-tight'>{category.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${activeFilter === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
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
            <h3 className='text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-200 mb-4'>
              {language === 'hi' ? 'प्रमुख दुकानें' : t('featuredShops')}
            </h3>
            <p className='text-xl text-emerald-600 dark:text-emerald-400'>
              {activeFilter === 'all'
                ? (language === 'hi' ? 'चांदनी चौक की सभी प्रसिद्ध दुकानें' : t('allShopsDesc', 'All famous shops of Chandni Chowk'))
                : `${categories.find(c => c.id === activeFilter)?.name} ${language === 'hi' ? 'की दुकानें' : 'Shops'}`
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
                  marketTheme="chandni"
                />
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <div className='text-6xl mb-4'>🔍</div>
              <h3 className='text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-2'>
                {language === 'hi' ? 'कोई दुकान नहीं मिली' : t('noShopsFound')}
              </h3>
              <p className='text-emerald-600 dark:text-emerald-400'>
                {language === 'hi' ? 'इस श्रेणी में कोई दुकान उपलब्ध नहीं है' : t('noShopsFoundDesc')}
              </p>
            </div>
          )}

          {/* Historical Information */}
          <div className='mt-20 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-12 text-white'>
            <div className='text-center mb-8'>
              <h3 className='text-3xl font-bold mb-4'>
                {language === 'hi' ? 'चांदनी चौक का इतिहास' : t('market_history_title')}
              </h3>
              <p className='text-xl text-red-100 max-w-3xl mx-auto'>
                {language === 'hi'
                  ? 'मुगल सम्राट शाहजहाँ की बेटी जहांआरा बेगम द्वारा डिज़ाइन किया गया यह बाजार विश्व प्रसिद्ध है।'
                  : t('market_history_desc')
                }
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🏛️</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'मुगल विरासत' : (t('heritage') || 'Mughal Heritage')}
                </h4>
                <p className='text-red-100 text-sm'>
                  {language === 'hi' ? '375 साल का समृद्ध इतिहास' : `375 ${t('yearsOld')}`}
                </p>
              </div>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🕌</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'लाल किला' : t('redFort')}
                </h4>
                <p className='text-red-100 text-sm'>
                  {language === 'hi' ? '500 मीटर की दूरी पर' : t('nearDistance')}
                </p>
              </div>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🚇</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'मेट्रो कनेक्टिविटी' : t('metroConnectivity')}
                </h4>
                <p className='text-red-100 text-sm'>
                  {language === 'hi' ? 'रेड लाइन और यलो लाइन' : t('metroLines')}
                </p>
              </div>
            </div>

            <div className='text-center mt-8'>
              <button className='bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 px-8 py-4 rounded-full font-semibold hover:bg-red-50 dark:hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105'>
                {language === 'hi' ? 'और जानें' : t('knowMore')}
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

export default ChandniChowk;
