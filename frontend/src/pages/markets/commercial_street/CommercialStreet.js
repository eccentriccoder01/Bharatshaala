import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ShopCard from '../../../components/ShopCard';
import '../../../App.css';
import { useLanguage } from '../../../context/LanguageContext';
import map from '../../../images/markets/commercial_map.jpeg';

const CommercialStreet = () => {
  const [loading, setLoading] = useState(true);
  const [hoveredShop, setHoveredShop] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const shops = [
    {
      id: 'silk-weaving-house',
      name: 'बेंगलुरु सिल्क वीविंग हाउस',
      nameEn: 'Bangalore Silk Weaving House',
      specialty: 'हैंडलूम सिल्क साड़ी, कांचीपुरम साड़ी और साउथ इंडियन ट्रेडिशनल वेयर',
      specialtyEn: 'Handloom silk sarees, Kanchipuram sarees and South Indian traditional wear',
      rating: 4.8,
      reviews: 645,
      established: '1952',
      products: 420,
      owner: 'श्री नागराज अय्यर',
      ownerEn: 'Mr. Nagaraj Iyer',
      experience: '35 साल',
      experienceEn: '35 years',
      category: 'textiles',
      specialty_items: ['कांचीपुरम साड़ी', 'मैसूर सिल्क', 'हैंडलूम साड़ी', 'सिल्क ब्लाउज', 'धोती'],
      specialtyItemsEn: ['Kanchipuram Saree', 'Mysore Silk', 'Handloom Saree', 'Silk Blouse', 'Dhoti'],
      href: '/markets/commercial_street/silk-weaving-house',
      image: '/images/shops/silk-house.jpg',
      badge: '🧵 हैंडलूम सर्टिफाइड',
      badgeEn: '🧵 Handloom Certified',
      timings: 'सुबह 10:00 - रात 9:00',
      timingsEn: '10:00 AM - 9:00 PM',
      languages: ['कन्नड़', 'हिंदी', 'अंग्रेजी', 'तमिल'],
      languagesEn: ['Kannada', 'Hindi', 'English', 'Tamil'],
      payment_methods: ['नकद', 'UPI', 'कार्ड', 'EMI'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card', 'EMI'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['Silk Mark Authority', 'Handloom Development Board']
    },
    {
      id: 'modern-fashion-boutique',
      name: 'ट्रेंड सेटर्स बुटीक',
      nameEn: 'Trend Setters Boutique',
      specialty: 'मॉडर्न फैशन, डिज़ाइनर कपड़े और कॉन्टेम्परेरी एक्सेसरीज़',
      specialtyEn: 'Modern fashion, designer clothes and contemporary accessories',
      rating: 4.6,
      reviews: 423,
      established: '1985',
      products: 680,
      owner: 'श्रीमती प्रिया सिंह',
      ownerEn: 'Mrs. Priya Singh',
      experience: '28 साल',
      experienceEn: '28 years',
      category: 'fashion',
      specialty_items: ['डिज़ाइनर कुर्ते', 'पार्टी वेयर', 'ऑफिस वेयर', 'जींस कलेक्शन', 'हैंडबैग्स'],
      specialtyItemsEn: ['Designer Kurtas', 'Party Wear', 'Office Wear', 'Jeans Collection', 'Handbags'],
      href: '/markets/commercial_street/modern-fashion-boutique',
      image: '/images/shops/fashion-boutique.jpg',
      badge: '👗 ट्रेंडी कलेक्शन',
      badgeEn: '👗 Trendy Collection',
      timings: 'सुबह 10:30 - रात 9:30',
      timingsEn: '10:30 AM - 9:30 PM',
      languages: ['अंग्रेजी', 'हिंदी', 'कन्नड़'],
      languagesEn: ['English', 'Hindi', 'Kannada'],
      payment_methods: ['नकद', 'UPI', 'कार्ड', 'EMI'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card', 'EMI'],
      delivery_available: true,
      wholesale_available: false,
      certifications: ['Fashion Design Council Member']
    },
    {
      id: 'traditional-jewelry',
      name: 'कर्नाटक ज्वेलर्स',
      nameEn: 'Karnataka Jewellers',
      specialty: 'दक्षिण भारतीय ज्वेलरी, टेम्पल ज्वेलरी और गोल्ड ऑर्नामेंट्स',
      specialtyEn: 'South Indian jewelry, temple jewelry and gold ornaments',
      rating: 4.9,
      reviews: 567,
      established: '1945',
      products: 350,
      owner: 'श्री रमेश चेट्टी',
      ownerEn: 'Mr. Ramesh Chetty',
      experience: '40 साल',
      experienceEn: '40 years',
      category: 'jewelry',
      specialty_items: ['टेम्पल ज्वेलरी', 'गोल्ड नेकलेस', 'कुंदन सेट्स', 'डायमंड रिंग्स', 'सिल्वर आइटम्स'],
      specialtyItemsEn: ['Temple Jewelry', 'Gold Necklace', 'Kundan Sets', 'Diamond Rings', 'Silver Items'],
      href: '/markets/commercial_street/traditional-jewelry',
      image: '/images/shops/jewelry-store.jpg',
      badge: '💎 BIS हॉलमार्क',
      badgeEn: '💎 BIS Hallmark',
      timings: 'सुबह 10:00 - रात 8:30',
      timingsEn: '10:00 AM - 8:30 PM',
      languages: ['कन्नड़', 'हिंदी', 'अंग्रेजी', 'तेलुगु'],
      languagesEn: ['Kannada', 'Hindi', 'English', 'Telugu'],
      payment_methods: ['नकद', 'UPI', 'कार्ड', 'चेक', 'गोल्ड लोन'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card', 'Cheque', 'Gold Loan'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['BIS Hallmark', 'Jewellers Association']
    },
    {
      id: 'footwear-paradise',
      name: 'बेंगलुरु फुटवेयर पैराडाइज़',
      nameEn: 'Bangalore Footwear Paradise',
      specialty: 'चमड़े के जूते, स्पोर्ट्स शूज़ और सभी प्रकार के फुटवेयर',
      specialtyEn: 'Leather shoes, sports shoes and all types of footwear',
      rating: 4.5,
      reviews: 389,
      established: '1978',
      products: 890,
      owner: 'श्री राजू गुप्ता',
      ownerEn: 'Mr. Raju Gupta',
      experience: '30 साल',
      experienceEn: '30 years',
      category: 'footwear',
      specialty_items: ['लेदर शूज़', 'स्पोर्ट्स शूज़', 'फॉर्मल शूज़', 'सैंडल्स', 'बूट्स'],
      specialtyItemsEn: ['Leather Shoes', 'Sports Shoes', 'Formal Shoes', 'Sandals', 'Boots'],
      href: '/markets/commercial_street/footwear-paradise',
      image: '/images/shops/footwear.jpg',
      badge: '👠 लेदर स्पेशलिस्ट',
      badgeEn: '👠 Leather Specialist',
      timings: 'सुबह 10:00 - रात 9:00',
      timingsEn: '10:00 AM - 9:00 PM',
      languages: ['हिंदी', 'अंग्रेजी', 'कन्नड़'],
      languagesEn: ['Hindi', 'English', 'Kannada'],
      payment_methods: ['नकद', 'UPI', 'कार्ड', 'EMI'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card', 'EMI'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['Leather Export Council', 'ISI Mark']
    },
    {
      id: 'electronic-zone',
      name: 'कमर्शियल इलेक्ट्रॉनिक्स हब',
      nameEn: 'Commercial Electronics Hub',
      specialty: 'मोबाइल, लैपटॉप, इलेक्ट्रॉनिक्स और टेक एक्सेसरीज़',
      specialtyEn: 'Mobiles, laptops, electronics and tech accessories',
      rating: 4.4,
      reviews: 756,
      established: '1995',
      products: 1200,
      owner: 'श्री अनिल कुमार',
      ownerEn: 'Mr. Anil Kumar',
      experience: '25 साल',
      experienceEn: '25 years',
      category: 'electronics',
      specialty_items: ['स्मार्टफोन', 'लैपटॉप', 'टैबलेट', 'हेडफोन', 'चार्जर'],
      specialtyItemsEn: ['Smartphones', 'Laptops', 'Tablets', 'Headphones', 'Chargers'],
      href: '/markets/commercial_street/electronic-zone',
      image: '/images/shops/electronics-hub.jpg',
      badge: '📱 लेटेस्ट टेक',
      badgeEn: '📱 Latest Tech',
      timings: 'सुबह 10:00 - रात 9:30',
      timingsEn: '10:00 AM - 9:30 PM',
      languages: ['अंग्रेजी', 'हिंदी', 'कन्नड़'],
      languagesEn: ['English', 'Hindi', 'Kannada'],
      payment_methods: ['नकद', 'UPI', 'कार्ड', 'EMI', 'क्रेडिट'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card', 'EMI', 'Credit'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['Authorized Dealer', 'Service Center']
    },
    {
      id: 'book-world',
      name: 'नॉलेज वर्ल्ड बुकस्टोर',
      nameEn: 'Knowledge World Bookstore',
      specialty: 'किताबों का विशाल संग्रह, एजुकेशनल मटेरियल और स्टेशनरी',
      specialtyEn: 'Vast book collection, educational material and stationery',
      rating: 4.7,
      reviews: 234,
      established: '1988',
      products: 680,
      owner: 'श्री विजय शर्मा',
      ownerEn: 'Mr. Vijay Sharma',
      experience: '32 साल',
      experienceEn: '32 years',
      category: 'books',
      specialty_items: ['टेक्स्टबुक्स', 'कॉम्पिटिटिव एग्जाम बुक्स', 'नोवेल्स', 'मैगज़ीन्स', 'स्टेशनरी'],
      specialtyItemsEn: ['Textbooks', 'Competitive Exam Books', 'Novels', 'Magazines', 'Stationery'],
      href: '/markets/commercial_street/book-world',
      image: '/images/shops/bookstore.jpg',
      badge: '📚 नॉलेज सेंटर',
      badgeEn: '📚 Knowledge Center',
      timings: 'सुबह 9:00 - रात 9:00',
      timingsEn: '9:00 AM - 9:00 PM',
      languages: ['अंग्रेजी', 'हिंदी', 'कन्नड़'],
      languagesEn: ['English', 'Hindi', 'Kannada'],
      payment_methods: ['नकद', 'UPI', 'कार्ड'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['Educational Board Approved', 'Publisher Partner']
    }
  ];

  const marketInfo = {
    name: 'Commercial Street',
    nameHindi: 'कमर्शियल स्ट्रीट',
    city: 'Bangalore',
    cityHindi: 'बेंगलुरु',
    established: '1884',
    totalShops: 1500,
    totalVendors: 200,
    specialties: language === 'hi'
      ? ['सिल्क', 'फैशन', 'ज्वेलरी', 'फुटवेयर', 'इलेक्ट्रॉनिक्स', 'किताबें']
      : ['Silk', 'Fashion', 'Jewelry', 'Footwear', 'Electronics', 'Books'],
    openingHours: language === 'hi' ? 'सुबह 10:00 - रात 9:30' : '10:00 AM - 9:30 PM',
    bestTime: language === 'hi' ? 'अक्टूबर से मार्च' : 'October to March',
    nearbyAttractions: ['UB City Mall', 'Cubbon Park', 'Vidhana Soudha', 'Lalbagh Gardens'],
    transport: language === 'hi'
      ? ['मेट्रो: MG Road', 'BMTC बस', 'ऑटो रिक्शा', 'Ola/Uber']
      : ['Metro: MG Road', 'BMTC Bus', 'Auto Rickshaw', 'Ola/Uber'],
    parkingAvailable: true,
    history: language === 'hi'
      ? 'ब्रिटिश काल से चला आ रहा यह बाजार बेंगलुरु का प्रमुख शॉपिंग डेस्टिनेशन है।'
      : 'Dating back to the British era, this market is a major shopping destination in Bangalore.'
  };

  const categories = [
    { id: 'all', name: language === 'hi' ? 'सभी दुकानें' : t('allShops'), icon: '🏪', count: shops.length },
    { id: 'textiles', name: language === 'hi' ? 'कपड़े' : t('textiles'), icon: '🧵', count: shops.filter(s => s.category === 'textiles').length },
    { id: 'fashion', name: language === 'hi' ? 'फैशन' : t('fashion'), icon: '👗', count: shops.filter(s => s.category === 'fashion').length },
    { id: 'jewelry', name: language === 'hi' ? 'ज्वेलरी' : t('jewelry'), icon: '💎', count: shops.filter(s => s.category === 'jewelry').length },
    { id: 'footwear', name: language === 'hi' ? 'फुटवेयर' : t('footwear'), icon: '👠', count: shops.filter(s => s.category === 'footwear').length },
    { id: 'electronics', name: language === 'hi' ? 'इलेक्ट्रॉनिक्स' : t('electronics'), icon: '📱', count: shops.filter(s => s.category === 'electronics').length },
    { id: 'books', name: language === 'hi' ? 'किताबें' : t('books'), icon: '📚', count: shops.filter(s => s.category === 'books').length }
  ];

  const filteredShops = activeFilter === 'all'
    ? shops
    : shops.filter(shop => shop.category === activeFilter);

  if (loading) {
    return <LoadingSpinner message={`${language === 'hi' ? marketInfo.nameHindi : marketInfo.name} ${t('loading')}...`} />;
  }

  return (
    <React.StrictMode>
      <div className='min-h-screen bg-gradient-to-br from-emerald-50 dark:from-gray-900 via-green-50 dark:via-gray-900 to-emerald-100 dark:to-gray-800 pt-20'>

        {/* Hero Section */}
        <div className='relative overflow-hidden'>
          <div className='max-w-6xl mx-auto px-6 py-16 relative z-10'>
            <div className='text-center mb-16'>
              <div className='inline-flex items-center space-x-3 bg-gradient-to-r from-gray-100 dark:from-gray-800 to-slate-100 dark:to-gray-800 rounded-full px-6 py-3 mb-6 shadow-lg border border-gray-200 dark:border-gray-700'>
                <span className='text-2xl'>🏙️</span>
                <span className='text-gray-800 dark:text-gray-100 font-bold'>
                  {language === 'hi' ? 'IT शहर का दिल' : t('itCityHeart') || 'Heart of IT City'}
                </span>
              </div>

              <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-600 via-slate-500 to-gray-700 bg-clip-text text-transparent mb-4 leading-tight'>
                {language === 'hi' ? marketInfo.nameHindi : marketInfo.name}
              </h1>
              <h2 className='text-2xl md:text-3xl text-emerald-700 dark:text-emerald-300 font-semibold mb-6'>
                Commercial Street, {language === 'hi' ? marketInfo.cityHindi : marketInfo.city}
              </h2>

              <p className='text-xl text-emerald-600 dark:text-emerald-400 max-w-4xl mx-auto leading-relaxed mb-8'>
                {language === 'hi'
                  ? 'भारत की IT राजधानी बेंगलुरु का यह प्रसिद्ध शॉपिंग स्ट्रीट पुराने और नए का संगम है। यहाँ आपको पारंपरिक कांचीपुरम सिल्क से लेकर मॉडर्न फैशन तक, हर चीज़ मिलेगी। MG Road के पास स्थित यह बाजार टेक सिटी के युवाओं और पारंपरिक खरीदारों दोनों की पसंद है।'
                  : 'This famous shopping street in Bangalore, India\'s IT capital, is a blend of old and new. Here you will find everything from traditional Kanchipuram silk to modern fashion. Located near MG Road, this market is a favorite for both the tech city\'s youth and traditional shoppers.'
                }
              </p>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12'>
                <div className='text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700'>
                  <div className='text-2xl font-bold text-gray-600 dark:text-gray-300'>{marketInfo.established}</div>
                  <div className='text-gray-600 dark:text-gray-300 text-sm font-medium'>
                    {language === 'hi' ? 'स्थापना' : t('established')}
                  </div>
                </div>
                <div className='text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700'>
                  <div className='text-2xl font-bold text-gray-600 dark:text-gray-300'>{marketInfo.totalShops.toLocaleString()}+</div>
                  <div className='text-gray-600 dark:text-gray-300 text-sm font-medium'>
                    {language === 'hi' ? 'कुल दुकानें' : t('totalShops')}
                  </div>
                </div>
                <div className='text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700'>
                  <div className='text-2xl font-bold text-gray-600 dark:text-gray-300'>{marketInfo.totalVendors}+</div>
                  <div className='text-gray-600 dark:text-gray-300 text-sm font-medium'>
                    {language === 'hi' ? 'विक्रेता' : t('vendors') || 'Vendors'}
                  </div>
                </div>
                <div className='text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700'>
                  <div className='text-2xl font-bold text-gray-600 dark:text-gray-300'>141</div>
                  <div className='text-gray-600 dark:text-gray-300 text-sm font-medium'>
                    {language === 'hi' ? 'साल पुराना' : t('yearsOld')}
                  </div>
                </div>
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
                      ? 'bg-gradient-to-br from-gray-500 to-slate-500 text-white shadow-lg scale-105'
                      : 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-700 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 hover:border-emerald-300'
                    }`}
                >
                  <span className='text-2xl'>{category.icon}</span>
                  <span className='font-medium text-sm text-center leading-tight'>{category.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${activeFilter === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-emerald-100 dark:bg-gray-800 text-emerald-600 dark:text-emerald-400'
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
              {language === 'hi' ? 'प्रमुख दुकानें' : t('featuredShops') || 'Major Shops'}
            </h3>
            <p className='text-xl text-emerald-600 dark:text-emerald-400'>
              {activeFilter === 'all'
                ? (language === 'hi' ? 'कमर्शियल स्ट्रीट की सभी प्रसिद्ध दुकानें' : 'All famous shops of Commercial Street')
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
                  marketTheme="commercial"
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
        </div>

        {/* Interactive Map Section */}
        <div className='max-w-7xl mx-auto px-6 mb-16'>
          <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg'>
            <h3 className='text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-6 text-center flex items-center justify-center space-x-3'>
              <span>🗺️</span>
              <span>{language === 'hi' ? 'कमर्शियल स्ट्रीट का नक्शा' : t('marketMap')}</span>
            </h3>
            <div className='relative flex justify-center'>
              <img
                src={map}
                alt='Commercial Street Map'
                className='rounded-2xl w-full max-w-4xl shadow-lg hover:scale-105 transition-transform duration-500'
              />
            </div>
            <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='text-center bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700'>
                <h4 className='font-semibold text-emerald-800 dark:text-emerald-200 mb-2'>
                  ⏰ {language === 'hi' ? 'समय' : t('openingHours')}
                </h4>
                <p className='text-emerald-700 dark:text-emerald-300'>{marketInfo.openingHours}</p>
              </div>
              <div className='text-center bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700'>
                <h4 className='font-semibold text-emerald-800 dark:text-emerald-200 mb-2'>
                  🌤️ {language === 'hi' ? 'बेस्ट टाइम' : t('bestTime')}
                </h4>
                <p className='text-emerald-700 dark:text-emerald-300'>{marketInfo.bestTime}</p>
              </div>
              <div className='text-center bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700'>
                <h4 className='font-semibold text-emerald-800 dark:text-emerald-200 mb-2'>
                  🚈 {language === 'hi' ? 'परिवहन' : 'Transport'}
                </h4>
                <p className='text-emerald-700 dark:text-emerald-300'>{marketInfo.transport[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default CommercialStreet;
