import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ShopCard from '../../../components/ShopCard';
import '../../../App.css';

import map from '../../../images/markets/dilli_haat_map.jpg';

const DilliHaat = () => {
  const [loading, setLoading] = useState(true);
  const [selectedShop, setSelectedShop] = useState(null);
  const [hoveredShop, setHoveredShop] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const shops = [
    {
      id: 'rajasthani-handicrafts',
      name: 'राजस्थान हस्तशिल्प एम्पोरियम',
      nameEn: 'Rajasthan Handicrafts Emporium',
      specialty: 'राजस्थानी हस्तशिल्प, ब्लॉक प्रिंट और ट्रेडिशनल आर्ट',
      specialtyEn: 'Rajasthani handicrafts, block prints and traditional art',
      rating: 4.8,
      reviews: 456,
      established: '1994',
      products: 380,
      owner: 'श्री रामस्वरूप शर्मा',
      ownerEn: 'Mr. Ramswaroop Sharma',
      experience: '30 साल',
      experienceEn: '30 Years',
      category: 'handicrafts',
      specialty_items: ['ब्लॉक प्रिंट', 'पेंटिंग्स', 'मारवाड़ी कला', 'मिरर वर्क', 'कठपुतली'],
      specialtyItemsEn: ['Block Prints', 'Paintings', 'Marwari Art', 'Mirror Work', 'Puppetry'],
      href: '/markets/dilli_haat/rajasthani-handicrafts',
      image: '/images/shops/rajasthani-crafts.jpg',
      badge: '🎨 हस्तनिर्मित',
      badgeEn: '🎨 Handmade',
      timings: 'सुबह 10:30 - रात 9:00',
      timingsEn: '10:30 AM - 9:00 PM',
      languages: ['हिंदी', 'राजस्थानी', 'अंग्रेजी'],
      languagesEn: ['Hindi', 'Rajasthani', 'English'],
      payment_methods: ['नकद', 'UPI', 'कार्ड'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['Geographical Indication', 'Handicraft Board']
    },
    {
      id: 'kashmiri-arts',
      name: 'कश्मीर आर्ट्स पवेलियन',
      nameEn: 'Kashmir Arts Pavilion',
      specialty: 'कश्मीरी शॉल, कारपेट और पश्मीना की दुनिया',
      specialtyEn: 'Kashmiri shawls, carpets and pashmina collection',
      rating: 4.9,
      reviews: 234,
      established: '1994',
      products: 150,
      owner: 'श्री मोहम्मद अली',
      ownerEn: 'Mr. Mohammed Ali',
      experience: '25 साल',
      experienceEn: '25 Years',
      category: 'textiles',
      specialty_items: ['पश्मीना शॉल', 'कश्मीरी कारपेट', 'पेपर माशे', 'अखरोट की लकड़ी', 'केसर'],
      specialtyItemsEn: ['Pashmina Shawls', 'Kashmiri Carpets', 'Paper Mache', 'Walnut Wood', 'Saffron'],
      href: '/markets/dilli_haat/kashmiri-arts',
      image: '/images/shops/kashmiri-arts.jpg',
      badge: '🏔️ कश्मीर से',
      badgeEn: '🏔️ From Kashmir',
      timings: 'सुबह 10:30 - रात 9:00',
      timingsEn: '10:30 AM - 9:00 PM',
      languages: ['उर्दू', 'हिंदी', 'अंग्रेजी', 'कश्मीरी'],
      languagesEn: ['Urdu', 'Hindi', 'English', 'Kashmiri'],
      payment_methods: ['नकद', 'UPI', 'कार्ड'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card'],
      delivery_available: true,
      wholesale_available: false,
      certifications: ['GI Tag', 'Export Quality']
    },
    {
      id: 'northeastern-crafts',
      name: 'नॉर्थ ईस्ट क्राफ्ट्स',
      nameEn: 'North East Crafts',
      specialty: 'नॉर्थ ईस्ट की बांस और कैन से बनी अनूठी वस्तुएं',
      specialtyEn: 'Unique bamboo and cane products from North East',
      rating: 4.6,
      reviews: 189,
      established: '1994',
      products: 220,
      owner: 'श्रीमती मेरी लिंगदोह',
      ownerEn: 'Mrs. Mary Lingdoh',
      experience: '28 साल',
      experienceEn: '28 Years',
      category: 'crafts',
      specialty_items: ['बांस का फर्नीचर', 'हैंडलूम टेक्सटाइल', 'ऑर्गेनिक प्रोडक्ट्स', 'ट्राइबल आर्ट', 'हनी'],
      specialtyItemsEn: ['Bamboo Furniture', 'Handloom Textiles', 'Organic Products', 'Tribal Art', 'Honey'],
      href: '/markets/dilli_haat/northeastern-crafts',
      image: '/images/shops/northeast-crafts.jpg',
      badge: '🎋 इको फ्रेंडली',
      badgeEn: '🎋 Eco Friendly',
      timings: 'सुबह 10:30 - रात 9:00',
      timingsEn: '10:30 AM - 9:00 PM',
      languages: ['हिंदी', 'अंग्रेजी', 'असमिया'],
      languagesEn: ['Hindi', 'English', 'Assamese'],
      payment_methods: ['नकद', 'UPI'],
      paymentMethodsEn: ['Cash', 'UPI'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['Organic Certified', 'Tribal Cooperative']
    },
    {
      id: 'south-indian-pavilion',
      name: 'साउथ इंडियन पवेलियन',
      nameEn: 'South Indian Pavilion',
      specialty: 'दक्षिण भारत की कला, मसाले और पारंपरिक वस्तुएं',
      specialtyEn: 'South Indian art, spices and traditional items',
      rating: 4.7,
      reviews: 345,
      established: '1994',
      products: 290,
      owner: 'श्री वेंकटेश राव',
      ownerEn: 'Mr. Venkatesh Rao',
      experience: '26 साल',
      experienceEn: '26 Years',
      category: 'diverse',
      specialty_items: ['टंजौर पेंटिंग', 'ब्रॉन्ज़ आइडल', 'साउथ मसाले', 'मैसूर सिल्क', 'कॉफी'],
      specialtyItemsEn: ['Tanjore Paintings', 'Bronze Idols', 'South Spices', 'Mysore Silk', 'Coffee'],
      href: '/markets/dilli_haat/south-indian-pavilion',
      image: '/images/shops/south-pavilion.jpg',
      badge: '🌴 साउथ स्पेशल',
      badgeEn: '🌴 South Special',
      timings: 'सुबह 10:30 - रात 9:00',
      timingsEn: '10:30 AM - 9:00 PM',
      languages: ['तमिल', 'तेलुगु', 'कन्नड़', 'हिंदी', 'अंग्रेजी'],
      languagesEn: ['Tamil', 'Telugu', 'Kannada', 'Hindi', 'English'],
      payment_methods: ['नकद', 'UPI', 'कार्ड'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['Spice Board', 'Heritage Craft']
    },
    {
      id: 'food-court',
      name: 'इंडियन फूड कोर्ट',
      nameEn: 'Indian Food Court',
      specialty: 'भारत के हर कोने का अलग-अलग स्वाद एक ही जगह',
      specialtyEn: 'Different flavors from every corner of India in one place',
      rating: 4.5,
      reviews: 892,
      established: '1994',
      products: 120,
      owner: 'मल्टिपल वेंडर्स',
      ownerEn: 'Multiple Vendors',
      experience: 'विविध',
      experienceEn: 'Diverse',
      category: 'food',
      specialty_items: ['चाट', 'दोसा', 'ठाली', 'कबाब', 'मिठाई'],
      specialtyItemsEn: ['Chaat', 'Dosa', 'Thali', 'Kebabs', 'Sweets'],
      href: '/markets/dilli_haat/food-court',
      image: '/images/shops/food-court.jpg',
      badge: '🍛 पैन इंडियन',
      badgeEn: '🍛 Pan Indian',
      timings: 'सुबह 10:30 - रात 10:00',
      timingsEn: '10:30 AM - 10:00 PM',
      languages: ['हिंदी', 'अंग्रेजी', 'स्थानीय'],
      languagesEn: ['Hindi', 'English', 'Local'],
      payment_methods: ['नकद', 'UPI'],
      paymentMethodsEn: ['Cash', 'UPI'],
      delivery_available: false,
      wholesale_available: false,
      certifications: ['FSSAI Certified', 'Clean Food']
    }
  ];

  const marketInfo = {
    name: 'Dilli Haat',
    nameHindi: 'दिल्ली हाट',
    city: 'New Delhi',
    cityHindi: 'नई दिल्ली',
    established: '1994',
    totalShops: 200,
    totalVendors: 200,
    specialties: ['हस्तशिल्प', 'टेक्सटाइल', 'फूड', 'आर्ट', 'इको प्रोडक्ट्स'],
    specialtiesEn: ['Handicrafts', 'Textiles', 'Food', 'Art', 'Eco Products'],
    openingHours: '10:30 AM - 10:00 PM',
    bestTime: language === 'hi' ? 'पूरे साल' : 'All year round',
    nearbyAttractions: ['INA Market', 'Lodhi Gardens', 'India Habitat Centre', 'Safdarjung Tomb'],
    transport: ['मेट्रो: INA', 'DTC बस', 'ऑटो रिक्शा', 'टैक्सी'],
    parkingAvailable: true
  };

  const categories = [
    { id: 'all', name: language === 'hi' ? 'सभी स्टॉल्स' : 'All Stalls', icon: '🏪', count: shops.length },
    { id: 'handicrafts', name: language === 'hi' ? 'हस्तशिल्प' : 'Handicrafts', icon: '🎨', count: shops.filter(s => s.category === 'handicrafts').length },
    { id: 'textiles', name: language === 'hi' ? 'कपड़े' : 'Textiles', icon: '🧵', count: shops.filter(s => s.category === 'textiles').length },
    { id: 'crafts', name: language === 'hi' ? 'क्राफ्ट्स' : 'Crafts', icon: '🎋', count: shops.filter(s => s.category === 'crafts').length },
    { id: 'diverse', name: language === 'hi' ? 'मिश्रित' : 'Diverse', icon: '🌈', count: shops.filter(s => s.category === 'diverse').length },
    { id: 'food', name: language === 'hi' ? 'फूड' : 'Food', icon: '🍛', count: shops.filter(s => s.category === 'food').length }
  ];

  const filteredShops = activeFilter === 'all'
    ? shops
    : shops.filter(shop => shop.category === activeFilter);

  if (loading) {
    return <LoadingSpinner message={language === 'hi' ? "Dilli Haat लोड हो रहा है..." : "Dilli Haat is loading..."} />;
  }

  return (
    <React.StrictMode>
      <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 pt-20'>
        {/* Hero Section with unique Dilli Haat theme */}
        <div className='relative overflow-hidden'>
          <div className='max-w-6xl mx-auto px-6 py-16 relative z-10'>
            <div className='text-center mb-16'>
              <div className='inline-flex items-center space-x-3 bg-gradient-to-r from-orange-100 to-red-100 rounded-full px-6 py-3 mb-6 shadow-lg border border-orange-200'>
                <span className='text-2xl'>🇮🇳</span>
                <span className='text-orange-800 font-bold'>{t('miniIndia')}</span>
              </div>

              <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-orange-700 bg-clip-text text-transparent mb-4 pt-4 leading-tight'>
                {language === 'hi' ? marketInfo.nameHindi : marketInfo.name}
              </h1>
              <h2 className='text-2xl md:text-3xl text-emerald-700 font-semibold mb-6'>
                {language === 'hi' ? `Dilli Haat, ${marketInfo.cityHindi}` : `Dilli Haat, ${marketInfo.city}`}
              </h2>

              <p className='text-xl text-emerald-600 max-w-4xl mx-auto leading-relaxed mb-8'>
                {language === 'hi'
                  ? 'भारत सरकार का एक अनूठा प्रयास - जहाँ पूरे देश की कला, संस्कृति और स्वाद एक ही छत के नीचे मिलते हैं। यहाँ हर राज्य के कारीगर अपने हुनर का प्रदर्शन करते हैं। गुजरात से असम तक, राजस्थान से केरल तक - सभी की अनूठी विरासत यहाँ संजोई गई है।'
                  : 'A unique initiative by the Government of India - where art, culture and taste of the whole country meet under one roof. Here artisans from every state display their skills. From Gujarat to Assam, from Rajasthan to Kerala - everyone\'s unique heritage is preserved here.'
                }
              </p>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12'>
                <div className='text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-orange-200'>
                  <div className='text-2xl font-bold text-orange-600'>{marketInfo.established}</div>
                  <div className='text-orange-600 text-sm font-medium'>{t('established')}</div>
                </div>
                <div className='text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-orange-200'>
                  <div className='text-2xl font-bold text-orange-600'>{marketInfo.totalShops.toLocaleString()}+</div>
                  <div className='text-orange-600 text-sm font-medium'>{t('totalShops')}</div>
                </div>
                <div className='text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-orange-200'>
                  <div className='text-2xl font-bold text-orange-600'>28</div>
                  <div className='text-orange-600 text-sm font-medium'>{t('stateRepresentation')}</div>
                </div>
                <div className='text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-orange-200'>
                  <div className='text-2xl font-bold text-orange-600'>31</div>
                  <div className='text-orange-600 text-sm font-medium'>{t('yearsOld')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Government Initiative Section */}
        <div className='max-w-7xl mx-auto px-6 mb-16'>
          <div className='bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-12 text-white'>
            <div className='text-center mb-8'>
              <h3 className='text-3xl font-bold mb-4'>{t('govtInitiative')}</h3>
              <p className='text-xl text-orange-100 max-w-3xl mx-auto'>
                {language === 'hi'
                  ? 'हस्तशिल्प निकास संवर्धन परिषद (EPCH) द्वारा संचालित यह हाट कारीगरों को सीधे ग्राहकों से जोड़ता है'
                  : 'Operated by the Export Promotion Council for Handicrafts (EPCH), this Haat connects artisans directly with customers'
                }
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              <div className='text-center bg-white/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🎯</div>
                <h4 className='text-lg font-semibold mb-2'>{t('mission')}</h4>
                <p className='text-orange-100 text-sm'>{t('directMarket')}</p>
              </div>
              <div className='text-center bg-white/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🌍</div>
                <h4 className='text-lg font-semibold mb-2'>{t('globalReach')}</h4>
                <p className='text-orange-100 text-sm'>{t('touristHub')}</p>
              </div>
              <div className='text-center bg-white/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>💰</div>
                <h4 className='text-lg font-semibold mb-2'>{t('economicEmpowerment')}</h4>
                <p className='text-orange-100 text-sm'>{t('artisanLivelihood')}</p>
              </div>
              <div className='text-center bg-white/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🏆</div>
                <h4 className='text-lg font-semibold mb-2'>{t('quality')}</h4>
                <p className='text-orange-100 text-sm'>{t('certifiedProducts')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className='max-w-7xl mx-auto px-6 mb-12'>
          <div className='bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg'>
            <h3 className='text-xl font-bold text-emerald-800 mb-4 text-center'>{t('stallCategories')}</h3>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3'>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-300 ${activeFilter === category.id
                    ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg scale-105'
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
            <h3 className='text-3xl md:text-4xl font-bold text-emerald-800 mb-4'>{t('keyStalls')}</h3>
            <p className='text-xl text-emerald-600'>
              {t('artCulture')}
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
                  marketTheme="dilli"
                />
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <div className='text-6xl mb-4'>🔍</div>
              <h3 className='text-2xl font-bold text-emerald-800 mb-2'>{t('noStallsFound')}</h3>
              <p className='text-emerald-600'>{t('noStallsCategory')}</p>
            </div>
          )}
        </div>
      </div>
    </React.StrictMode>
  );
};

export default DilliHaat;