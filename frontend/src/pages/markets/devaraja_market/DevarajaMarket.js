
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ShopCard from '../../../components/ShopCard';
import '../../../App.css';

import map from '../../../images/markets/mysore_map.jpeg';

const DevarajaMarket = () => {
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
      id: 'sandalwood-palace',
      name: 'मैसूर संदालवुड पैलेस',
      nameEn: 'Mysore Sandalwood Palace',
      specialty: 'शुद्ध मैसूर चंदन की लकड़ी, चंदन का तेल और पारंपरिक अगरबत्ती का संग्रह',
      specialtyEn: 'Pure Mysore sandalwood, sandalwood oil and traditional incense collection',
      rating: 4.9,
      reviews: 678,
      established: '1912',
      products: 150,
      owner: 'श्री रामस्वामी अय्यर',
      ownerEn: 'Mr. Ramaswamy Iyer',
      experience: '40 साल',
      experienceEn: '40 Years',
      category: 'sandalwood',
      specialty_items: ['चंदन की लकड़ी', 'चंदन का तेल', 'चंदन साबुन', 'अगरबत्ती', 'चंदन पाउडर'],
      specialtyItemsEn: ['Sandalwood Logs', 'Sandalwood Oil', 'Sandalwood Soap', 'Incense Sticks', 'Sandalwood Powder'],
      href: '/markets/devaraja_market/sandalwood-palace',
      image: '/images/shops/sandalwood-palace.jpg',
      badge: '🌿 प्रमाणित चंदन',
      badgeEn: '🌿 Certified Sandalwood',
      timings: 'सुबह 7:00 - रात 8:00',
      timingsEn: '7:00 AM - 8:00 PM',
      languages: ['कन्नड़', 'हिंदी', 'अंग्रेजी', 'तमिल'],
      languagesEn: ['Kannada', 'Hindi', 'English', 'Tamil'],
      payment_methods: ['नकद', 'UPI', 'कार्ड'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['GI Tag Certified', 'Forest Department Approved']
    },
    {
      id: 'mysore-silk-emporium',
      name: 'मैसूर सिल्क एम्पोरियम',
      nameEn: 'Mysore Silk Emporium',
      specialty: 'प्रामाणिक मैसूर सिल्क साड़ी, पुरे सिल्क और पारंपरिक कन्नड़ वस्त्र',
      specialtyEn: 'Authentic Mysore silk sarees, pure silk and traditional Kannada garments',
      rating: 4.8,
      reviews: 543,
      established: '1924',
      products: 380,
      owner: 'श्रीमती पद्मा देवी',
      ownerEn: 'Mrs. Padma Devi',
      experience: '35 साल',
      experienceEn: '35 Years',
      category: 'silk',
      specialty_items: ['मैसूर सिल्क साड़ी', 'कांचीपुरम साड़ी', 'सिल्क ब्लाउज', 'धोती', 'पवाड़ा'],
      specialtyItemsEn: ['Mysore Silk Saree', 'Kanchipuram Saree', 'Silk Blouse', 'Dhoti', 'Pavada'],
      href: '/markets/devaraja_market/mysore-silk-emporium',
      image: '/images/shops/silk-emporium.jpg',
      badge: '🧵 हैंडलूम सर्टिफाइड',
      badgeEn: '🧵 Handloom Certified',
      timings: 'सुबह 9:00 - रात 8:30',
      timingsEn: '9:00 AM - 8:30 PM',
      languages: ['कन्नड़', 'हिंदी', 'अंग्रेजी'],
      languagesEn: ['Kannada', 'Hindi', 'English'],
      payment_methods: ['नकद', 'UPI', 'कार्ड', 'चेक'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card', 'Check'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['Handloom Mark', 'Silk Mark Authority']
    },
    {
      id: 'flower-garland-shop',
      name: 'श्री चामुंडेश्वरी पुष्प भंडार',
      nameEn: 'Sri Chamundeshwari Flower Store',
      specialty: 'ताजे फूलों की माला, पूजा सामग्री और धार्मिक अनुष्ठान के लिए फूल',
      specialtyEn: 'Fresh flower garlands, pooja items and flowers for religious ceremonies',
      rating: 4.7,
      reviews: 289,
      established: '1945',
      products: 85,
      owner: 'श्री वेंकटेश',
      ownerEn: 'Mr. Venkatesh',
      experience: '30 साल',
      experienceEn: '30 Years',
      category: 'flowers',
      specialty_items: ['जैस्मिन माला', 'गुलाब की पंखुड़ी', 'मारिगोल्ड', 'तुलसी माला', 'कमल के फूल'],
      specialtyItemsEn: ['Jasmine Garland', 'Rose Petals', 'Marigold', 'Tulsi Garland', 'Lotus Flowers'],
      href: '/markets/devaraja_market/flower-garland-shop',
      image: '/images/shops/flower-shop.jpg',
      badge: '🌸 ताजे फूल',
      badgeEn: '🌸 Fresh Flowers',
      timings: 'सुबह 5:00 - रात 10:00',
      timingsEn: '5:00 AM - 10:00 PM',
      languages: ['कन्नड़', 'हिंदी', 'तमिल'],
      languagesEn: ['Kannada', 'Hindi', 'Tamil'],
      payment_methods: ['नकद', 'UPI'],
      paymentMethodsEn: ['Cash', 'UPI'],
      delivery_available: false,
      wholesale_available: true,
      certifications: ['Organic Flowers']
    },
    {
      id: 'spice-corner',
      name: 'कर्नाटक स्पाइस कॉर्नर',
      nameEn: 'Karnataka Spice Corner',
      specialty: 'दक्षिण भारतीय मसाले, कॉफी बीन्स और पारंपरिक मालाबार व्यंजन सामग्री',
      specialtyEn: 'South Indian spices, coffee beans and traditional Malabar cuisine ingredients',
      rating: 4.6,
      reviews: 234,
      established: '1958',
      products: 320,
      owner: 'श्री कृष्णा मूर्ति',
      ownerEn: 'Mr. Krishna Murthy',
      experience: '28 साल',
      experienceEn: '28 Years',
      category: 'spices',
      specialty_items: ['कुर्ग कॉफी', 'काली मिर्च', 'इलायची', 'हल्दी', 'गरम मसाला'],
      specialtyItemsEn: ['Coorg Coffee', 'Black Pepper', 'Cardamom', 'Turmeric', 'Garam Masala'],
      href: '/markets/devaraja_market/spice-corner',
      image: '/images/shops/spice-corner.jpg',
      badge: '☕ कुर्ग कॉफी',
      badgeEn: '☕ Coorg Coffee',
      timings: 'सुबह 8:00 - रात 8:00',
      timingsEn: '8:00 AM - 8:00 PM',
      languages: ['कन्नड़', 'हिंदी', 'अंग्रेजी'],
      languagesEn: ['Kannada', 'Hindi', 'English'],
      payment_methods: ['नकद', 'UPI', 'कार्ड'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['Spice Board Certified', 'Coffee Board Approved']
    },
    {
      id: 'mysore-pak-house',
      name: 'गुरु स्वीट मार्ट',
      nameEn: 'Guru Sweet Mart',
      specialty: 'प्रसिद्ध मैसूर पाक, पारंपरिक कर्नाटक मिठाइयां और त्योहारी व्यंजन',
      specialtyEn: 'Famous Mysore Pak, traditional Karnataka sweets and festival delicacies',
      rating: 4.8,
      reviews: 456,
      established: '1935',
      products: 95,
      owner: 'श्री गुरुमूर्ति',
      ownerEn: 'Mr. Gurumurthy',
      experience: '42 साल',
      experienceEn: '42 Years',
      category: 'sweets',
      specialty_items: ['मैसूर पाक', 'होलिगे', 'चिरोटी', 'हेसरू बेले', 'कारजिकै'],
      specialtyItemsEn: ['Mysore Pak', 'Holige', 'Chiroti', 'Hesaru Bele', 'Karjikayi'],
      href: '/markets/devaraja_market/mysore-pak-house',
      image: '/images/shops/sweet-mart.jpg',
      badge: '🍯 मूल मैसूर पाक',
      badgeEn: '🍯 Original Mysore Pak',
      timings: 'सुबह 7:00 - रात 9:00',
      timingsEn: '7:00 AM - 9:00 PM',
      languages: ['कन्नड़', 'हिंदी'],
      languagesEn: ['Kannada', 'Hindi'],
      payment_methods: ['नकद', 'UPI'],
      paymentMethodsEn: ['Cash', 'UPI'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['FSSAI Certified', 'Heritage Recipe']
    },
    {
      id: 'traditional-crafts',
      name: 'मैसूर हैंडीक्राफ्ट्स',
      nameEn: 'Mysore Handicrafts',
      specialty: 'चंदन की नक्काशी, रोसवुड फर्नीचर और पारंपरिक मैसूर पेंटिंग्स',
      specialtyEn: 'Sandalwood carvings, rosewood furniture and traditional Mysore paintings',
      rating: 4.5,
      reviews: 178,
      established: '1968',
      products: 240,
      owner: 'श्री राजेश वर्मा',
      ownerEn: 'Mr. Rajesh Verma',
      experience: '25 साल',
      experienceEn: '25 Years',
      category: 'handicrafts',
      specialty_items: ['चंदन मूर्तियां', 'मैसूर पेंटिंग', 'रोसवुड आइटम्स', 'इनले वर्क', 'बांस के सामान'],
      specialtyItemsEn: ['Sandalwood Statues', 'Mysore Paintings', 'Rosewood Items', 'Inlay Work', 'Bamboo Items'],
      href: '/markets/devaraja_market/traditional-crafts',
      image: '/images/shops/handicrafts.jpg',
      badge: '🎨 हस्तनिर्मित',
      badgeEn: '🎨 Handmade',
      timings: 'सुबह 10:00 - रात 8:00',
      timingsEn: '10:00 AM - 8:00 PM',
      languages: ['कन्नड़', 'हिंदी', 'अंग्रेजी'],
      languagesEn: ['Kannada', 'Hindi', 'English'],
      payment_methods: ['नकद', 'UPI', 'कार्ड'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card'],
      delivery_available: true,
      wholesale_available: false,
      certifications: ['Handicraft Development Board', 'Artisan Certified']
    }
  ];

  const marketInfo = {
    name: 'Devaraja Market',
    nameHindi: 'देवराज मार्केट',
    city: 'Mysore',
    cityHindi: 'मैसूर',
    established: '1886',
    totalShops: 1200,
    totalVendors: 95,
    specialties: ['चंदन', 'रेशम', 'फूल', 'मसाले', 'मैसूर पाक', 'हस्तशिल्प'],
    specialtiesEn: ['Sandalwood', 'Silk', 'Flowers', 'Spices', 'Mysore Pak', 'Handicrafts'],
    openingHours: '6:00 AM - 8:00 PM',
    bestTime: language === 'hi' ? 'अक्टूबर से मार्च' : 'October to March',
    nearbyAttractions: ['मैसूर पैलेस', 'चामुंडी हिल्स', 'सेंट फिलोमिना चर्च', 'ललिता महल'],
    transport: ['सिटी बस', 'ऑटो रिक्शा', 'टैक्सी', 'प्राइवेट वाहन'],
    parkingAvailable: true,
    history: 'टीपू सुल्तान के समय से चला आ रहा यह बाजार मैसूर की सांस्कृतिक पहचान है।'
  };

  const categories = [
    { id: 'all', name: language === 'hi' ? 'सभी दुकानें' : 'All Shops', icon: '🏪', count: shops.length },
    { id: 'sandalwood', name: language === 'hi' ? 'चंदन' : 'Sandalwood', icon: '🌿', count: shops.filter(s => s.category === 'sandalwood').length },
    { id: 'silk', name: language === 'hi' ? 'सिल्क' : 'Silk', icon: '🧵', count: shops.filter(s => s.category === 'silk').length },
    { id: 'flowers', name: language === 'hi' ? 'फूल' : 'Flowers', icon: '🌸', count: shops.filter(s => s.category === 'flowers').length },
    { id: 'spices', name: language === 'hi' ? 'मसाले' : 'Spices', icon: '🌶️', count: shops.filter(s => s.category === 'spices').length },
    { id: 'sweets', name: language === 'hi' ? 'मिठाइयां' : 'Sweets', icon: '🍯', count: shops.filter(s => s.category === 'sweets').length },
    { id: 'handicrafts', name: language === 'hi' ? 'हस्तशिल्प' : 'Handicrafts', icon: '🎨', count: shops.filter(s => s.category === 'handicrafts').length }
  ];

  const filteredShops = activeFilter === 'all'
    ? shops
    : shops.filter(shop => shop.category === activeFilter);

  if (loading) {
    return <LoadingSpinner message={language === 'hi' ? "Devaraja Market लोड हो रहा है..." : "Devaraja Market is loading..."} />;
  }

  return (
    <React.StrictMode>
      <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 pt-20'>

        {/* Hero Section */}
        <div className='relative overflow-hidden'>
          {/* Floating Royal Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 text-4xl opacity-10 animate-float">👑</div>
            <div className="absolute top-40 right-20 text-3xl opacity-15 animate-float delay-1000">🌿</div>
            <div className="absolute bottom-40 left-20 text-5xl opacity-10 animate-float delay-2000">🧵</div>
            <div className="absolute bottom-20 right-10 text-4xl opacity-25 animate-float delay-3000">🌸</div>
          </div>

          <div className='max-w-6xl mx-auto px-6 py-16 relative z-10'>
            <div className='text-center mb-16'>
              {/* Royal Heritage Badge */}
              <div className='inline-flex items-center space-x-3 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full px-6 py-3 mb-6 shadow-lg border border-amber-200'>
                <span className='text-2xl'>👑</span>
                <span className='text-amber-800 font-bold'>{t('royalHeritage')}</span>
              </div>

              <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent mb-4 leading-tight'>
                {language === 'hi' ? marketInfo.nameHindi : marketInfo.name}
              </h1>
              <h2 className='text-2xl md:text-3xl text-emerald-700 font-semibold mb-6'>
                {language === 'hi' ? `Devaraja Market, ${marketInfo.cityHindi}` : `Devaraja Market, ${marketInfo.city}`}
              </h2>

              <p className='text-xl text-emerald-600 max-w-4xl mx-auto leading-relaxed mb-8'>
                {language === 'hi'
                  ? 'यह रंग-बिरंगा बाजार एक पर्यटक आकर्षण भी है, जहाँ फूलों के गुच्छे, फल और विभिन्न रंगों का कुमकुम पाउडर मिलता है। मैसूर के महाराजाओं के समय से चला आ रहा यह बाजार आज भी अपने मूल स्वरूप में जीवित है। यहाँ आपको विश्व प्रसिद्ध मैसूर चंदन, सिल्क साड़ियां और पारंपरिक मैसूर पाक मिलेगा।'
                  : 'This colorful market is also a tourist attraction, offering bunches of flowers, fruits and kumkum powder of various colors. Dating back to the time of the Maharajas of Mysore, this market is still alive in its original form. Here you will find world famous Mysore Sandalwood, Silk Sarees and traditional Mysore Pak.'
                }
              </p>

              {/* Market Stats */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12'>
                <div className='text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-200'>
                  <div className='text-2xl font-bold text-amber-600'>{marketInfo.established}</div>
                  <div className='text-amber-600 text-sm font-medium'>{t('established')}</div>
                </div>
                <div className='text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-200'>
                  <div className='text-2xl font-bold text-amber-600'>{marketInfo.totalShops.toLocaleString()}+</div>
                  <div className='text-amber-600 text-sm font-medium'>{t('totalShops')}</div>
                </div>
                <div className='text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-200'>
                  <div className='text-2xl font-bold text-amber-600'>{marketInfo.totalVendors}+</div>
                  <div className='text-amber-600 text-sm font-medium'>{t('totalVendors')}</div>
                </div>
                <div className='text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-200'>
                  <div className='text-2xl font-bold text-amber-600'>139</div>
                  <div className='text-amber-600 text-sm font-medium'>{t('yearsOld')}</div>
                </div>
              </div>

              {/* Special Features */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
                <div className='bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-amber-200'>
                  <div className='text-3xl mb-3'>🌿</div>
                  <h3 className='font-bold text-amber-800 mb-2'>{language === 'hi' ? 'मैसूर चंदन' : 'Mysore Sandalwood'}</h3>
                  <p className='text-amber-600 text-sm'>{language === 'hi' ? 'विश्व की सबसे अच्छी चंदन की लकड़ी' : 'World\'s best sandalwood'}</p>
                </div>
                <div className='bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-amber-200'>
                  <div className='text-3xl mb-3'>🧵</div>
                  <h3 className='font-bold text-amber-800 mb-2'>{language === 'hi' ? 'मैसूर सिल्क' : 'Mysore Silk'}</h3>
                  <p className='text-amber-600 text-sm'>{language === 'hi' ? 'प्रामाणिक हैंडलूम सिल्क साड़ियां' : 'Authentic Handloom Silk Sarees'}</p>
                </div>
                <div className='bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-amber-200'>
                  <div className='text-3xl mb-3'>🍯</div>
                  <h3 className='font-bold text-amber-800 mb-2'>{language === 'hi' ? 'मैसूर पाक' : 'Mysore Pak'}</h3>
                  <p className='text-amber-600 text-sm'>{language === 'hi' ? 'मूल रेसिपी की मिठाई' : 'Original recipe sweet'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Palace Connection */}
        <div className='max-w-7xl mx-auto px-6 mb-16'>
          <div className='bg-gradient-to-r from-amber-600 to-yellow-600 rounded-3xl p-12 text-white'>
            <div className='text-center mb-8'>
              <h3 className='text-3xl font-bold mb-4'>{language === 'hi' ? 'मैसूर पैलेस कनेक्शन' : 'Mysore Palace Connection'}</h3>
              <p className='text-xl text-amber-100 max-w-3xl mx-auto'>
                {language === 'hi' ? 'मैसूर पैलेस से केवल 2 किमी दूर स्थित यह बाजार शाही परिवार की पसंदीदा खरीदारी का स्थान था' : 'Located just 2 km from Mysore Palace, this market was a favorite shopping destination for the royal family'}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              <div className='text-center bg-white/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🏰</div>
                <h4 className='text-lg font-semibold mb-2'>{language === 'hi' ? 'शाही संरक्षण' : 'Royal Patronage'}</h4>
                <p className='text-amber-100 text-sm'>{language === 'hi' ? 'महाराजाओं द्वारा संरक्षित' : 'Patronized by Maharajas'}</p>
              </div>
              <div className='text-center bg-white/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🛒</div>
                <h4 className='text-lg font-semibold mb-2'>{language === 'hi' ? 'शाही आपूर्तिकर्ता' : 'Royal Suppliers'}</h4>
                <p className='text-amber-100 text-sm'>{language === 'hi' ? 'पैलेस के लिए सामान' : 'Supplies for Palace'}</p>
              </div>
              <div className='text-center bg-white/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🎨</div>
                <h4 className='text-lg font-semibold mb-2'>{language === 'hi' ? 'पारंपरिक कला' : 'Traditional Art'}</h4>
                <p className='text-amber-100 text-sm'>{language === 'hi' ? 'दरबारी शिल्पकारी' : 'Court Craftsmanship'}</p>
              </div>
              <div className='text-center bg-white/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>📜</div>
                <h4 className='text-lg font-semibold mb-2'>{language === 'hi' ? 'ऐतिहासिक रिकॉर्ड' : 'Historic Record'}</h4>
                <p className='text-amber-100 text-sm'>{language === 'hi' ? '139 साल का इतिहास' : '139 Years of History'}</p>
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
                    ? 'bg-gradient-to-br from-amber-500 to-yellow-500 text-white shadow-lg scale-105'
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
            <h3 className='text-3xl md:text-4xl font-bold text-emerald-800 mb-4'>{t('majorShops')}</h3>
            <p className='text-xl text-emerald-600'>
              {activeFilter === 'all'
                ? (language === 'hi' ? 'देवराज मार्केट की सभी प्रसिद्ध दुकानें' : 'All famous shops of Devaraja Market')
                : (language === 'hi' ? `${categories.find(c => c.id === activeFilter)?.name} की दुकानें` : `${categories.find(c => c.id === activeFilter)?.name} shops`)
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
                  marketTheme="devaraja"
                />
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <div className='text-6xl mb-4'>🔍</div>
              <div className='text-center py-20'>
                <div className='text-6xl mb-4'>🔍</div>
                <h3 className='text-2xl font-bold text-emerald-800 mb-2'>{t('noShopsFound')}</h3>
                <p className='text-emerald-600'>{t('noShopsCategory')}</p>
              </div>
            </div>
          )}
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
