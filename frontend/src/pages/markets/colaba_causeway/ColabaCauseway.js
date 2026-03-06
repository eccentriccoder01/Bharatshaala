import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ShopCard from '../../../components/ShopCard';
import '../../../App.css';
import { useLanguage } from '../../../context/LanguageContext';
import map from '../../../images/markets/colaba_map.jpg';

const ColabaCauseway = () => {
  const [loading, setLoading] = useState(true);
  const [hoveredShop, setHoveredShop] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  // const navigate = useNavigate();
  const { t, language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const shops = [
    {
      id: 'fashion-street-boutique',
      name: 'मुंबई फैशन स्ट्रीट',
      nameEn: 'Mumbai Fashion Street',
      specialty: 'ट्रेंडी कपड़े, एक्सेसरीज़ और बॉलीवुड स्टाइल फैशन का अनूठा संग्रह',
      specialtyEn: 'Trendy clothes, accessories and unique Bollywood style fashion collection',
      rating: 4.6,
      reviews: 892,
      established: '1980',
      products: 650,
      owner: 'श्री राजेश जैन',
      ownerEn: 'Mr. Rajesh Jain',
      experience: '25 साल',
      experienceEn: '25 years',
      category: 'fashion',
      specialty_items: ['बॉलीवुड ड्रेसेस', 'डिज़ाइनर कुर्ते', 'वेस्टर्न वियर', 'पार्टी आउटफिट्स', 'एक्सेसरीज़'],
      specialtyItemsEn: ['Bollywood Dresses', 'Designer Kurtas', 'Western Wear', 'Party Outfits', 'Fashion Accessories'],
      href: '/markets/colaba_causeway/fashion-street-boutique',
      image: '/images/shops/fashion-street.jpg',
      badge: '👗 ट्रेंडी फैशन',
      badgeEn: '👗 Trendy Fashion',
      timings: 'सुबह 10:00 - रात 11:00',
      timingsEn: '10:00 AM - 11:00 PM',
      languages: ['हिंदी', 'अंग्रेजी', 'मराठी', 'गुजराती'],
      languagesEn: ['Hindi', 'English', 'Marathi', 'Gujarati'],
      payment_methods: ['नकद', 'UPI', 'कार्ड'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card'],
      delivery_available: true,
      wholesale_available: false,
      certifications: ['Fashion Design Council Member']
    },
    {
      id: 'antique-collectors',
      name: 'कॉलाबा एंटीक्स',
      nameEn: 'Colaba Antiques',
      specialty: 'दुर्लभ प्राचीन वस्तुएं, विंटेज सामान और कलेक्टिबल आइटम्स',
      specialtyEn: 'Rare antiques, vintage items and collectible pieces',
      rating: 4.8,
      reviews: 234,
      established: '1965',
      products: 480,
      owner: 'श्री फ़रीद अली',
      ownerEn: 'Mr. Farid Ali',
      experience: '40 साल',
      experienceEn: '40 years',
      category: 'antiques',
      specialty_items: ['विंटेज घड़ियां', 'प्राचीन सिक्के', 'कलाकृतियां', 'पुराने कैमरे', 'एंटीक फर्नीचर'],
      specialtyItemsEn: ['Vintage Watches', 'Ancient Coins', 'Artifacts', 'Old Cameras', 'Antique Furniture'],
      href: '/markets/colaba_causeway/antique-collectors',
      image: '/images/shops/antiques.jpg',
      badge: '🏺 दुर्लभ संग्रह',
      badgeEn: '🏺 Rare Collection',
      timings: 'सुबह 11:00 - रात 8:00',
      timingsEn: '11:00 AM - 8:00 PM',
      languages: ['हिंदी', 'अंग्रेजी', 'उर्दू'],
      languagesEn: ['Hindi', 'English', 'Urdu'],
      payment_methods: ['नकद', 'UPI', 'कार्ड', 'चेक'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card', 'Cheque'],
      delivery_available: false,
      wholesale_available: false,
      certifications: ['Antique Dealers Association']
    },
    {
      id: 'street-food-corner',
      name: 'कॉलाबा चाट कार्नर',
      nameEn: 'Colaba Chaat Corner',
      specialty: 'प्रसिद्ध मुंबई स्ट्रीट फूड, चाट और स्नैक्स का लाजवाब स्वाद',
      specialtyEn: 'Famous Mumbai street food, chaat and delicious snacks',
      rating: 4.7,
      reviews: 1245,
      established: '1975',
      products: 75,
      owner: 'श्री अशोक शर्मा',
      ownerEn: 'Mr. Ashok Sharma',
      experience: '30 साल',
      experienceEn: '30 years',
      category: 'food',
      specialty_items: ['पाव भाजी', 'भेल पुरी', 'सेव पुरी', 'वड़ा पाव', 'दही पुरी'],
      specialtyItemsEn: ['Pav Bhaji', 'Bhel Puri', 'Sev Puri', 'Vada Pav', 'Dahi Puri'],
      href: '/markets/colaba_causeway/street-food-corner',
      image: '/images/shops/street-food.jpg',
      badge: '🍛 मुंबई का स्वाद',
      badgeEn: '🍛 Taste of Mumbai',
      timings: 'सुबह 8:00 - रात 12:00',
      timingsEn: '8:00 AM - 12:00 AM',
      languages: ['हिंदी', 'मराठी', 'अंग्रेजी'],
      languagesEn: ['Hindi', 'Marathi', 'English'],
      payment_methods: ['नकद', 'UPI'],
      paymentMethodsEn: ['Cash', 'UPI'],
      delivery_available: true,
      wholesale_available: false,
      certifications: ['FSSAI Certified', 'Hygiene Rated']
    },
    {
      id: 'jewelry-bazaar',
      name: 'मुंबई ज्वेलरी बाज़ार',
      nameEn: 'Mumbai Jewelry Bazaar',
      specialty: 'इमिटेशन ज्वेलरी, फैशन एक्सेसरीज़ और ट्रेंडी आभूषण',
      specialtyEn: 'Imitation jewelry, fashion accessories and trendy ornaments',
      rating: 4.5,
      reviews: 567,
      established: '1985',
      products: 890,
      owner: 'श्रीमती प्रिया मेहता',
      ownerEn: 'Mrs. Priya Mehta',
      experience: '20 साल',
      experienceEn: '20 years',
      category: 'jewelry',
      specialty_items: ['इमिटेशन नेकलेस', 'फैशन ईयरिंग्स', 'ब्रेसलेट्स', 'हेयर एक्सेसरीज़', 'रिंग्स'],
      specialtyItemsEn: ['Imitation Necklace', 'Fashion Earrings', 'Bracelets', 'Hair Accessories', 'Rings'],
      href: '/markets/colaba_causeway/jewelry-bazaar',
      image: '/images/shops/jewelry-bazaar.jpg',
      badge: '💎 फैशन ज्वेलरी',
      badgeEn: '💎 Fashion Jewelry',
      timings: 'सुबह 10:30 - रात 10:00',
      timingsEn: '10:30 AM - 10:00 PM',
      languages: ['हिंदी', 'अंग्रेजी', 'गुजराती'],
      languagesEn: ['Hindi', 'English', 'Gujarati'],
      payment_methods: ['नकद', 'UPI', 'कार्ड'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['Fashion Jewelry Association']
    },
    {
      id: 'book-cafe',
      name: 'कॉलाबा बुक कैफे',
      nameEn: 'Colaba Book Cafe',
      specialty: 'किताबों का विशाल संग्रह, कॉफी और शांत पढ़ने का माहौल',
      specialtyEn: 'Vast book collection, coffee and peaceful reading environment',
      rating: 4.9,
      reviews: 378,
      established: '1990',
      products: 520,
      owner: 'श्री अनिल वर्मा',
      ownerEn: 'Mr. Anil Verma',
      experience: '35 साल',
      experienceEn: '35 years',
      category: 'books',
      specialty_items: ['उपन्यास', 'कविता संग्रह', 'इतिहास की किताबें', 'फिल्म पत्रिकाएं', 'कॉमिक्स'],
      specialtyItemsEn: ['Novels', 'Poetry Collections', 'History Books', 'Film Magazines', 'Comics'],
      href: '/markets/colaba_causeway/book-cafe',
      image: '/images/shops/book-cafe.jpg',
      badge: '📚 बुक लवर्स',
      badgeEn: '📚 Book Lovers',
      timings: 'सुबह 9:00 - रात 11:00',
      timingsEn: '9:00 AM - 11:00 PM',
      languages: ['हिंदी', 'अंग्रेजी', 'मराठी'],
      languagesEn: ['Hindi', 'English', 'Marathi'],
      payment_methods: ['नकद', 'UPI', 'कार्ड'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card'],
      delivery_available: false,
      wholesale_available: false,
      certifications: ['Bestseller Partner', 'Literary Society Member']
    },
    {
      id: 'tourist-souvenirs',
      name: 'गेटवे ऑफ इंडिया गिफ्ट्स',
      nameEn: 'Gateway of India Gifts',
      specialty: 'मुंबई और भारत की यादगार, सुवेनिर्स और टूरिस्ट गिफ्ट्स',
      specialtyEn: 'Mumbai and India memorabilia, souvenirs and tourist gifts',
      rating: 4.4,
      reviews: 689,
      established: '1995',
      products: 340,
      owner: 'श्री सुनील कुमार',
      ownerEn: 'Mr. Sunil Kumar',
      experience: '18 साल',
      experienceEn: '18 years',
      category: 'souvenirs',
      specialty_items: ['गेटवे ऑफ इंडिया मॉडल', 'मुंबई टी-शर्ट्स', 'इंडियन हैंडीक्राफ्ट्स', 'की चेन्स', 'पोस्टकार्ड्स'],
      specialtyItemsEn: ['Gateway of India Model', 'Mumbai T-shirts', 'Indian Handicrafts', 'Key Chains', 'Postcards'],
      href: '/markets/colaba_causeway/tourist-souvenirs',
      image: '/images/shops/souvenirs.jpg',
      badge: '🗽 मुंबई यादें',
      badgeEn: '🗽 Mumbai Memories',
      timings: 'सुबह 8:00 - रात 10:00',
      timingsEn: '8:00 AM - 10:00 PM',
      languages: ['हिंदी', 'अंग्रेजी', 'मराठी'],
      languagesEn: ['Hindi', 'English', 'Marathi'],
      payment_methods: ['नकद', 'UPI', 'कार्ड'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['Tourism Board Approved']
    }
  ];

  const marketInfo = {
    name: 'Colaba Causeway',
    nameHindi: 'कॉलाबा कॉज़वे',
    city: 'Mumbai',
    cityHindi: 'मुंबई',
    established: '1860',
    totalShops: 800,
    totalVendors: 120,
    specialties: language === 'hi'
      ? ['फैशन', 'एंटीक्स', 'स्ट्रीट फूड', 'ज्वेलरी', 'किताबें', 'सुवेनिर्स']
      : ['Fashion', 'Antiques', 'Street Food', 'Jewelry', 'Books', 'Souvenirs'],
    openingHours: language === 'hi' ? 'सुबह 9:00 - रात 11:00' : '9:00 AM - 11:00 PM',
    bestTime: language === 'hi' ? 'नवंबर से फरवरी' : 'November to February',
    nearbyAttractions: language === 'hi'
      ? ['गेटवे ऑफ इंडिया', 'ताज होटल', 'रीगल सिनेमा', 'अफगान चर्च']
      : ['Gateway of India', 'Taj Hotel', 'Regal Cinema', 'Afghan Church'],
    transport: language === 'hi'
      ? ['मेट्रो: चर्चगेट', 'BEST बस', 'टैक्सी', 'कैब']
      : ['Metro: Churchgate', 'BEST Bus', 'Taxi', 'Cab'],
    parkingAvailable: false,
    history: language === 'hi'
      ? 'गेटवे ऑफ इंडिया के पास स्थित यह बाजार मुंबई का प्रसिद्ध शॉपिंग डेस्टिनेशन है।'
      : 'Located near Gateway of India, this market is a famous shopping destination in Mumbai.'
  };

  const categories = [
    { id: 'all', name: language === 'hi' ? 'सभी दुकानें' : t('allShops'), icon: '🏪', count: shops.length },
    { id: 'fashion', name: language === 'hi' ? 'फैशन' : t('fashion'), icon: '👗', count: shops.filter(s => s.category === 'fashion').length },
    { id: 'antiques', name: language === 'hi' ? 'एंटीक्स' : t('antiques'), icon: '🏺', count: shops.filter(s => s.category === 'antiques').length },
    { id: 'food', name: language === 'hi' ? 'फूड' : t('food'), icon: '🍛', count: shops.filter(s => s.category === 'food').length },
    { id: 'jewelry', name: language === 'hi' ? 'ज्वेलरी' : t('jewelry'), icon: '💎', count: shops.filter(s => s.category === 'jewelry').length },
    { id: 'books', name: language === 'hi' ? 'किताबें' : t('books'), icon: '📚', count: shops.filter(s => s.category === 'books').length },
    { id: 'souvenirs', name: language === 'hi' ? 'सुवेनिर्स' : t('souvenirs'), icon: '🗽', count: shops.filter(s => s.category === 'souvenirs').length }
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
              <div className='inline-flex items-center space-x-3 bg-gradient-to-r from-blue-100 dark:from-blue-900/30 to-indigo-100 dark:to-indigo-900/30 rounded-full px-6 py-3 mb-6 shadow-lg border border-blue-200 dark:border-blue-700'>
                <span className='text-2xl'>🌊</span>
                <span className='text-blue-800 dark:text-blue-200 font-bold'>
                  {language === 'hi' ? 'मुंबई की आत्मा' : t('mumbaiSpiritBadge') || 'Spirit of Mumbai'}
                </span>
              </div>

              <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 bg-clip-text text-transparent mb-4 leading-tight'>
                {language === 'hi' ? marketInfo.nameHindi : marketInfo.name}
              </h1>
              <h2 className='text-2xl md:text-3xl text-emerald-700 dark:text-emerald-300 font-semibold mb-6'>
                Colaba Causeway, {language === 'hi' ? marketInfo.cityHindi : marketInfo.city}
              </h2>

              <p className='text-xl text-emerald-600 dark:text-emerald-400 max-w-4xl mx-auto leading-relaxed mb-8'>
                {language === 'hi'
                  ? 'गेटवे ऑफ इंडिया के बगल में स्थित यह बाजार मुंबई का दिल है। यहाँ आपको फैशन से लेकर एंटीक्स तक, स्ट्रीट फूड से लेकर हैंडीक्राफ्ट्स तक सब कुछ मिलेगा। मुंबई की स्पिरिट को जानना है तो कॉलाबा कॉज़वे आना ज़रूरी है। यहाँ की हर गली में कुछ नया और दिलचस्प छुपा हुआ है।'
                  : 'Located next to the Gateway of India, this market is the heart of Mumbai. Here you will find everything from fashion to antiques, street food to handicrafts. To know the spirit of Mumbai, coming to Colaba Causeway is essential. In every street here, something new and interesting is hidden.'
                }
              </p>

              {/* Market Stats */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12'>
                <div className='text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200 dark:border-blue-700'>
                  <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>{marketInfo.established}</div>
                  <div className='text-blue-600 dark:text-blue-400 text-sm font-medium'>
                    {language === 'hi' ? 'स्थापना' : t('established')}
                  </div>
                </div>
                <div className='text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200 dark:border-blue-700'>
                  <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>{marketInfo.totalShops.toLocaleString()}+</div>
                  <div className='text-blue-600 dark:text-blue-400 text-sm font-medium'>
                    {language === 'hi' ? 'कुल दुकानें' : t('totalShops')}
                  </div>
                </div>
                <div className='text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200 dark:border-blue-700'>
                  <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>{marketInfo.totalVendors}+</div>
                  <div className='text-blue-600 dark:text-blue-400 text-sm font-medium'>
                    {language === 'hi' ? 'विक्रेता' : t('vendors') || 'Vendors'}
                  </div>
                </div>
                <div className='text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200 dark:border-blue-700'>
                  <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>165</div>
                  <div className='text-blue-600 dark:text-blue-400 text-sm font-medium'>
                    {language === 'hi' ? 'साल पुराना' : t('yearsOld')}
                  </div>
                </div>
              </div>

              {/* Special Features */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
                <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200 dark:border-blue-700'>
                  <div className='text-3xl mb-3'>👗</div>
                  <h3 className='font-bold text-blue-800 dark:text-blue-200 mb-2'>
                    {language === 'hi' ? 'फैशन हब' : t('fashionHub')}
                  </h3>
                  <p className='text-blue-600 dark:text-blue-400 text-sm'>
                    {language === 'hi' ? 'ट्रेंडी कपड़े और एक्सेसरीज़' : 'Trendy clothes and accessories'}
                  </p>
                </div>
                <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200 dark:border-blue-700'>
                  <div className='text-3xl mb-3'>🍛</div>
                  <h3 className='font-bold text-blue-800 dark:text-blue-200 mb-2'>
                    {language === 'hi' ? 'स्ट्रीट फूड' : t('streetFood')}
                  </h3>
                  <p className='text-blue-600 dark:text-blue-400 text-sm'>
                    {language === 'hi' ? 'मुंबई का असली स्वाद' : 'Real taste of Mumbai'}
                  </p>
                </div>
                <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200 dark:border-blue-700'>
                  <div className='text-3xl mb-3'>🏺</div>
                  <h3 className='font-bold text-blue-800 dark:text-blue-200 mb-2'>
                    {language === 'hi' ? 'एंटीक्स' : t('antiques')}
                  </h3>
                  <p className='text-blue-600 dark:text-blue-400 text-sm'>
                    {language === 'hi' ? 'दुर्लभ पुरानी वस्तुएं' : 'Rare old items'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gateway of India Connection */}
        <div className='max-w-7xl mx-auto px-6 mb-16'>
          <div className='bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white'>
            <div className='text-center mb-8'>
              <h3 className='text-3xl font-bold mb-4'>
                {language === 'hi' ? 'गेटवे ऑफ इंडिया से जुड़ाव' : t('gatewayConnection') || 'Gateway of India Connection'}
              </h3>
              <p className='text-xl text-blue-100 max-w-3xl mx-auto'>
                {language === 'hi'
                  ? 'भारत के प्रवेश द्वार से सिर्फ 200 मीटर की दूरी पर स्थित यह बाजार मुंबई का गौरव है'
                  : 'Located just 200 meters from the Gateway of India, this market is the pride of Mumbai'}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🗽</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'गेटवे व्यू' : t('gatewayView') || 'Gateway View'}
                </h4>
                <p className='text-blue-100 text-sm'>
                  {language === 'hi' ? '200 मीटर की दूरी' : '200 meters distance'}
                </p>
              </div>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🚢</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'हार्बर व्यू' : t('harbourView') || 'Harbour View'}
                </h4>
                <p className='text-blue-100 text-sm'>
                  {language === 'hi' ? 'अरब सागर का नज़ारा' : 'View of Arabian Sea'}
                </p>
              </div>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🏨</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'ताज होटल' : t('tajHotel') || 'Taj Hotel'}
                </h4>
                <p className='text-blue-100 text-sm'>
                  {language === 'hi' ? 'विश्व प्रसिद्ध होटल' : 'World famous hotel'}
                </p>
              </div>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🎬</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'फिल्म लोकेशन' : t('filmLocation') || 'Film Location'}
                </h4>
                <p className='text-blue-100 text-sm'>
                  {language === 'hi' ? 'बॉलीवुड की पसंद' : 'Choice of Bollywood'}
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
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg scale-105'
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
                ? (language === 'hi' ? 'कॉलाबा कॉज़वे की सभी प्रसिद्ध दुकानें' : 'All famous shops of Colaba Causeway')
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
                  marketTheme="colaba"
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

          {/* Mumbai Spirit Section */}
          <div className='mt-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-12 text-white'>
            <div className='text-center mb-8'>
              <h3 className='text-3xl font-bold mb-4'>
                {language === 'hi' ? 'मुंबई की स्पिरिट' : t('mumbaiSpirit') || 'Spirit of Mumbai'}
              </h3>
              <p className='text-xl text-orange-100 max-w-3xl mx-auto'>
                {language === 'hi'
                  ? 'कॉलाबा कॉज़वे सिर्फ एक बाज़ार नहीं, यह मुंबई की आत्मा है - जहाँ सपने मिलते हैं और यादें बनती हैं'
                  : 'Colaba Causeway is not just a market, it is the soul of Mumbai - where dreams meet and memories are made'}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🎭</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'कल्चरल हब' : t('culturalHub') || 'Cultural Hub'}
                </h4>
                <p className='text-orange-100 text-sm'>
                  {language === 'hi' ? 'कला, संस्कृति और विविधता का केंद्र' : 'Center of art, culture and diversity'}
                </p>
              </div>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>💝</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'शॉपिंग पैराडाइज़' : t('shoppingParadise') || 'Shopping Paradise'}
                </h4>
                <p className='text-orange-100 text-sm'>
                  {language === 'hi' ? 'हर बजट में कुछ न कुछ खास' : 'Something special for every budget'}
                </p>
              </div>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🌟</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'टूरिस्ट फेवरेट' : t('touristFavorite') || 'Tourist Favorite'}
                </h4>
                <p className='text-orange-100 text-sm'>
                  {language === 'hi' ? 'दुनिया भर के सैलानियों की पसंद' : 'Choice of tourists from around the world'}
                </p>
              </div>
            </div>

            <div className='text-center mt-8'>
              <button className='bg-white dark:bg-gray-800 text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105'>
                {language === 'hi' ? 'मुंबई एक्सप्लोर करें' : t('exploreMumbai') || 'Explore Mumbai'}
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Map Section */}
        <div className='max-w-7xl mx-auto px-6 mb-16'>
          <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg'>
            <h3 className='text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-6 text-center flex items-center justify-center space-x-3'>
              <span>🗺️</span>
              <span>{language === 'hi' ? 'कॉलाबा कॉज़वे का नक्शा' : t('marketMap')}</span>
            </h3>
            <div className='relative flex justify-center'>
              <img
                src={map}
                alt='Colaba Causeway Map'
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
