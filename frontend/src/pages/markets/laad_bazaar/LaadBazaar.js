import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ShopCard from '../../../components/ShopCard';
import { useLanguage } from '../../../context/LanguageContext';
import '../../../App.css';
import map from '../../../images/markets/laad_map.jpeg';

const LaadBazaar = () => {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [hoveredShop, setHoveredShop] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  // const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const shops = [
    {
      id: 'pearl-shop',
      name: 'निज़ामी पर्ल्स एम्पोरियम',
      nameEn: 'Nizami Pearls Emporium',
      specialty: 'विश्व प्रसिद्ध हैदराबादी मोती, बेसरा पर्ल्स और प्राकृतिक मोतियों का संग्रह',
      specialtyEn: 'World famous Hyderabadi pearls, Basra pearls and natural pearl collections',
      rating: 4.9,
      reviews: 567,
      established: '1857',
      products: 380,
      owner: 'श्री मोहम्मद हुसैन',
      ownerEn: 'Mr. Mohammad Hussain',
      experience: '45 साल',
      experienceEn: '45 years',
      category: 'pearls',
      specialty_items: ['बेसरा पर्ल्स', 'हैदराबादी हार', 'पर्ल झुमके', 'मोती माला', 'पर्ल रिंग्स'],
      specialtyItemsEn: ['Basra Pearls', 'Hyderabadi Necklace', 'Pearl Earrings', 'Pearl Garland', 'Pearl Rings'],
      href: '/markets/laad_bazaar/pearl-shop',
      image: '/images/shops/pearl-shop.jpg',
      badge: '🐚 असली मोती',
      badgeEn: '🐚 Real Pearls',
      timings: 'सुबह 10:00 - रात 9:00',
      timingsEn: '10:00 AM - 9:00 PM',
      languages: ['हिंदी', 'उर्दू', 'अंग्रेजी', 'तेलुगु'],
      languagesEn: ['Hindi', 'Urdu', 'English', 'Telugu'],
      payment_methods: ['नकद', 'UPI', 'कार्ड', 'चेक'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card', 'Cheque'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['Pearl Testing Certificate', 'Export Quality']
    },
    {
      id: 'bangle-store',
      name: 'चार मीनार बैंगल्स',
      nameEn: 'Char Minar Bangles',
      specialty: 'रंग-बिरंगी लाख की चूड़ियां, ग्लास बैंगल्स और पारंपरिक हैदराबादी डिज़ाइन',
      specialtyEn: 'Colorful lac bangles, glass bangles and traditional Hyderabadi designs',
      rating: 4.8,
      reviews: 423,
      established: '1923',
      products: 650,
      owner: 'श्रीमती फातिमा बेगम',
      ownerEn: 'Mrs. Fatima Begum',
      experience: '38 साल',
      experienceEn: '38 years',
      category: 'bangles',
      specialty_items: ['लाख बैंगल्स', 'कांच की चूड़ियां', 'मेटल बैंगल्स', 'सेट्स', 'ब्राइडल कलेक्शन'],
      specialtyItemsEn: ['Lac Bangles', 'Glass Bangles', 'Metal Bangles', 'Sets', 'Bridal Collection'],
      href: '/markets/laad_bazaar/bangle-store',
      image: '/images/shops/bangle-store.jpg',
      badge: '💍 हस्तनिर्मित',
      badgeEn: '💍 Handmade',
      timings: 'सुबह 9:00 - रात 9:30',
      timingsEn: '9:00 AM - 9:30 PM',
      languages: ['हिंदी', 'उर्दू', 'तेलुगु'],
      languagesEn: ['Hindi', 'Urdu', 'Telugu'],
      payment_methods: ['नकद', 'UPI'],
      paymentMethodsEn: ['Cash', 'UPI'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['Handmade Certified']
    },
    {
      id: 'nizami-crafts',
      name: 'निज़ामी हैंडीक्राफ्ट्स',
      nameEn: 'Nizami Handicrafts',
      specialty: 'बिदरी वर्क, जरी एम्ब्रॉयडरी और हैदराबादी पारंपरिक शिल्पकारी',
      specialtyEn: 'Bidri work, Zari embroidery and traditional Hyderabadi craftsmanship',
      rating: 4.7,
      reviews: 298,
      established: '1890',
      products: 420,
      owner: 'श्री अब्दुल करीम',
      ownerEn: 'Mr. Abdul Karim',
      experience: '42 साल',
      experienceEn: '42 years',
      category: 'crafts',
      specialty_items: ['बिदरी आर्ट', 'जरी वर्क', 'कलमकारी', 'हैंडलूम', 'वॉल हैंगिंग्स'],
      specialtyItemsEn: ['Bidri Art', 'Zari Work', 'Kalamkari', 'Handloom', 'Wall Hangings'],
      href: '/markets/laad_bazaar/nizami-crafts',
      image: '/images/shops/nizami-crafts.jpg',
      badge: '🎨 निज़ामी कला',
      badgeEn: '🎨 Nizami Art',
      timings: 'सुबह 10:00 - रात 8:30',
      timingsEn: '10:00 AM - 8:30 PM',
      languages: ['हिंदी', 'उर्दू', 'अंग्रेजी'],
      languagesEn: ['Hindi', 'Urdu', 'English'],
      payment_methods: ['नकद', 'UPI', 'कार्ड'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card'],
      delivery_available: true,
      wholesale_available: false,
      certifications: ['Heritage Craft Award', 'Geographical Indication']
    },
    {
      id: 'charminar-souvenirs',
      name: 'चार मीनार सुवेनिर शॉप',
      nameEn: 'Char Minar Souvenir Shop',
      specialty: 'हैदराबादी यादगार, मिनी चार मीनार मॉडल्स और पर्यटक स्मृति चिन्ह',
      specialtyEn: 'Hyderabadi memorabilia, mini Char Minar models and tourist souvenirs',
      rating: 4.5,
      reviews: 189,
      established: '1975',
      products: 280,
      owner: 'श्री नसीर अहमद',
      ownerEn: 'Mr. Nasir Ahmed',
      experience: '25 साल',
      experienceEn: '25 years',
      category: 'souvenirs',
      specialty_items: ['चार मीनार मॉडल', 'की चेन्स', 'फ्रिज मैग्नेट्स', 'पोस्टकार्ड्स', 'हैदराबादी कैप्स'],
      specialtyItemsEn: ['Char Minar Model', 'Key Chains', 'Fridge Magnets', 'Postcards', 'Hyderabadi Caps'],
      href: '/markets/laad_bazaar/charminar-souvenirs',
      image: '/images/shops/souvenirs.jpg',
      badge: '🏛️ यादगार',
      badgeEn: '🏛️ Souvenirs',
      timings: 'सुबह 8:00 - रात 10:00',
      timingsEn: '8:00 AM - 10:00 PM',
      languages: ['हिंदी', 'उर्दू', 'अंग्रेजी', 'तेलुगु'],
      languagesEn: ['Hindi', 'Urdu', 'English', 'Telugu'],
      payment_methods: ['नकद', 'UPI'],
      paymentMethodsEn: ['Cash', 'UPI'],
      delivery_available: false,
      wholesale_available: true,
      certifications: ['Tourism Approved']
    },
    {
      id: 'attar-perfumes',
      name: 'हैदराबादी अत्तर हाउस',
      nameEn: 'Hyderabadi Attar House',
      specialty: 'प्राकृतिक अत्तर, इत्र और हैदराबादी परफ्यूम कलेक्शन',
      specialtyEn: 'Natural attars, perfumes and Hyderabadi fragrance collection',
      rating: 4.6,
      reviews: 234,
      established: '1912',
      products: 150,
      owner: 'श्री गुलाम हुसैन',
      ownerEn: 'Mr. Ghulam Hussain',
      experience: '35 साल',
      experienceEn: '35 years',
      category: 'perfumes',
      specialty_items: ['रोज़ अत्तर', 'चमेली इत्र', 'खुस परफ्यूम', 'अगरबत्ती', 'धूप'],
      specialtyItemsEn: ['Rose Attar', 'Jasmine Perfume', 'Khus Perfume', 'Incense Sticks', 'Dhoop'],
      href: '/markets/laad_bazaar/attar-perfumes',
      image: '/images/shops/attar.jpg',
      badge: '🌹 प्राकृतिक',
      badgeEn: '🌹 Natural',
      timings: 'सुबह 10:00 - रात 8:00',
      timingsEn: '10:00 AM - 8:00 PM',
      languages: ['हिंदी', 'उर्दू', 'अंग्रेजी'],
      languagesEn: ['Hindi', 'Urdu', 'English'],
      payment_methods: ['नकद', 'UPI'],
      paymentMethodsEn: ['Cash', 'UPI'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['Natural Products Certified']
    },
    {
      id: 'traditional-textiles',
      name: 'दक्खिनी टेक्सटाइल्स',
      nameEn: 'Dakkhini Textiles',
      specialty: 'हैदराबादी खादी, हैंडलूम साड़ियां और दक्खिनी परंपरा के कपड़े',
      specialtyEn: 'Hyderabadi khadi, handloom sarees and Dakkhini traditional fabrics',
      rating: 4.4,
      reviews: 156,
      established: '1950',
      products: 320,
      owner: 'श्री मोहम्मद रफ़ीक',
      ownerEn: 'Mr. Mohammad Rafiq',
      experience: '30 साल',
      experienceEn: '30 years',
      category: 'textiles',
      specialty_items: ['खादी कुर्ता', 'हैंडलूम साड़ी', 'दक्खिनी ड्रेस', 'कोटा साड़ी', 'तेलुगु बॉर्डर'],
      specialtyItemsEn: ['Khadi Kurta', 'Handloom Saree', 'Dakkhini Dress', 'Kota Saree', 'Telugu Border'],
      href: '/markets/laad_bazaar/traditional-textiles',
      image: '/images/shops/textiles.jpg',
      badge: '🧵 हैंडलूम',
      badgeEn: '🧵 Handloom',
      timings: 'सुबह 10:00 - रात 8:30',
      timingsEn: '10:00 AM - 8:30 PM',
      languages: ['हिंदी', 'उर्दू', 'तेलुगु'],
      languagesEn: ['Hindi', 'Urdu', 'Telugu'],
      payment_methods: ['नकद', 'UPI', 'कार्ड'],
      paymentMethodsEn: ['Cash', 'UPI', 'Card'],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['Handloom Mark', 'Khadi Certificate']
    }
  ];

  const marketInfo = {
    name: t('laadBazaarTitle'),
    nameHindi: 'लाड़ बाजार',
    city: t('laadBazaarCity'),
    cityHindi: 'हैदराबाद',
    established: '1591',
    totalShops: 1200,
    totalVendors: 150,
    specialties: language === 'hi'
      ? ['मोती', 'लाख बैंगल्स', 'बिदरी वर्क', 'अत्तर', 'हैंडलूम', 'सुवेनिर्स']
      : ['Pearls', 'Lac Bangles', 'Bidri Work', 'Attar', 'Handloom', 'Souvenirs'],
    openingHours: language === 'hi' ? 'सुबह 9:00 - रात 9:00' : '9:00 AM - 9:00 PM',
    bestTime: language === 'hi' ? 'नवंबर से फरवरी' : 'November to February',
    nearbyAttractions: language === 'hi'
      ? ['चार मीनार', 'मक्का मस्जिद', 'चौमहल्ला पैलेस', 'सालार जंग म्यूजियम']
      : ['Charminar', 'Mecca Masjid', 'Chowmahalla Palace', 'Salar Jung Museum'],
    transport: language === 'hi'
      ? ['मेट्रो: चार मीनार', 'बस स्टैंड', 'ऑटो', 'टैक्सी']
      : ['Metro: Charminar', 'Bus Stand', 'Auto', 'Taxi'],
    parkingAvailable: true,
    history: language === 'hi'
      ? 'निज़ामों के समय से चली आ रही यह बाजार मोतियों और चूड़ियों के लिए विश्व प्रसिद्ध है।'
      : 'Famous since the time of the Nizams, this market is world-renowned for pearls and bangles.'
  };

  const categories = [
    { id: 'all', name: t('all'), icon: '🏪', count: shops.length },
    { id: 'pearls', name: t('pearls'), icon: '🐚', count: shops.filter(s => s.category === 'pearls').length },
    { id: 'bangles', name: t('lacBangles'), icon: '💍', count: shops.filter(s => s.category === 'bangles').length },
    { id: 'crafts', name: t('crafts'), icon: '🎨', count: shops.filter(s => s.category === 'crafts').length },
    { id: 'souvenirs', name: t('souvenirs'), icon: '🏛️', count: shops.filter(s => s.category === 'souvenirs').length },
    { id: 'perfumes', name: t('perfumes'), icon: '🌹', count: shops.filter(s => s.category === 'perfumes').length },
    { id: 'textiles', name: t('textiles'), icon: '🧵', count: shops.filter(s => s.category === 'textiles').length }
  ];

  const filteredShops = activeFilter === 'all'
    ? shops
    : shops.filter(shop => shop.category === activeFilter);

  if (loading) {
    return <LoadingSpinner message={t('loading') + '...'} />;
  }

  return (
    <React.StrictMode>
      <div className='min-h-screen bg-gradient-to-br from-emerald-50 dark:from-gray-900 via-green-50 dark:via-gray-900 to-emerald-100 dark:to-gray-800 pt-20'>

        {/* Hero Section */}
        <div className='relative overflow-hidden'>
          {/* Floating Nizami Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 text-4xl opacity-10 animate-float">🕌</div>
            <div className="absolute top-40 right-20 text-3xl opacity-15 animate-float delay-1000">🐚</div>
            <div className="absolute bottom-40 left-20 text-5xl opacity-10 animate-float delay-2000">💍</div>
            <div className="absolute bottom-20 right-10 text-4xl opacity-25 animate-float delay-3000">🌹</div>
          </div>

          <div className='max-w-6xl mx-auto px-6 py-16 relative z-10'>
            <div className='text-center mb-16'>
              {/* Nizami Heritage Badge */}
              <div className='inline-flex items-center space-x-3 bg-gradient-to-r from-purple-100 dark:from-purple-900/30 to-indigo-100 dark:to-indigo-900/30 rounded-full px-6 py-3 mb-6 shadow-lg border border-purple-200 dark:border-purple-700'>
                <span className='text-2xl'>👑</span>
                <span className='text-purple-800 dark:text-purple-200 font-bold'>
                  {language === 'hi' ? 'निज़ामी विरासत' : t('nizamiHeritage')}
                </span>
              </div>

              <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-700 bg-clip-text text-transparent mb-4 leading-tight'>
                {language === 'hi' ? marketInfo.nameHindi : marketInfo.name}
              </h1>
              <h2 className='text-2xl md:text-3xl text-emerald-700 dark:text-emerald-300 font-semibold mb-6'>
                Laad Bazaar, {language === 'hi' ? marketInfo.cityHindi : marketInfo.city}
              </h2>

              <p className='text-xl text-emerald-600 dark:text-emerald-400 max-w-4xl mx-auto leading-relaxed mb-8'>
                {language === 'hi'
                  ? 'प्रतिष्ठित चार मीनार के सामने स्थित, यह बाजार चूड़ियों, मोतियों और पारंपरिक हैदराबादी आभूषण डिज़ाइन का शानदार संग्रह प्रस्तुत करता है। निज़ामों के समय से चली आ रही यह परंपरा आज भी जीवंत है। यहाँ आपको विश्व प्रसिद्ध हैदराबादी मोती और लाख की चूड़ियों का अनुपम संग्रह मिलेगा।'
                  : t('laadBazaarDesc')
                }
              </p>

              {/* Market Stats */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12'>
                <div className='text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200 dark:border-purple-700'>
                  <div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>{marketInfo.established}</div>
                  <div className='text-purple-600 dark:text-purple-400 text-sm font-medium'>
                    {language === 'hi' ? 'स्थापना' : t('established')}
                  </div>
                </div>
                <div className='text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200 dark:border-purple-700'>
                  <div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>{marketInfo.totalShops.toLocaleString()}+</div>
                  <div className='text-purple-600 dark:text-purple-400 text-sm font-medium'>
                    {language === 'hi' ? 'कुल दुकानें' : t('totalShops')}
                  </div>
                </div>
                <div className='text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200 dark:border-purple-700'>
                  <div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>{marketInfo.totalVendors}+</div>
                  <div className='text-purple-600 dark:text-purple-400 text-sm font-medium'>
                    {language === 'hi' ? 'विक्रेता' : t('totalVendors')}
                  </div>
                </div>
                <div className='text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-purple-200 dark:border-purple-700'>
                  <div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>433</div>
                  <div className='text-purple-600 dark:text-purple-400 text-sm font-medium'>
                    {language === 'hi' ? 'साल पुराना' : t('yearsOld')}
                  </div>
                </div>
              </div>

              {/* Special Features */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
                <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200 dark:border-purple-700'>
                  <div className='text-3xl mb-3'>🐚</div>
                  <h3 className='font-bold text-purple-800 dark:text-purple-200 mb-2'>
                    {language === 'hi' ? 'हैदराबादी मोती' : t('pearls')}
                  </h3>
                  <p className='text-purple-600 dark:text-purple-400 text-sm'>
                    {language === 'hi' ? 'विश्व प्रसिद्ध बेसरा पर्ल्स और प्राकृतिक मोती' : t('pearlsDesc')}
                  </p>
                </div>
                <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200 dark:border-purple-700'>
                  <div className='text-3xl mb-3'>💍</div>
                  <h3 className='font-bold text-purple-800 dark:text-purple-200 mb-2'>
                    {language === 'hi' ? 'लाख बैंगल्स' : t('lacBangles')}
                  </h3>
                  <p className='text-purple-600 dark:text-purple-400 text-sm'>
                    {language === 'hi' ? 'हस्तनिर्मित रंग-बिरंगी चूड़ियां' : t('lacBanglesDesc')}
                  </p>
                </div>
                <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200 dark:border-purple-700'>
                  <div className='text-3xl mb-3'>🎨</div>
                  <h3 className='font-bold text-purple-800 dark:text-purple-200 mb-2'>
                    {language === 'hi' ? 'बिदरी आर्ट' : t('bidriArt')}
                  </h3>
                  <p className='text-purple-600 dark:text-purple-400 text-sm'>
                    {language === 'hi' ? 'पारंपरिक निज़ामी हस्तशिल्प' : t('bidriArtDesc')}
                  </p>
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
              <span>{language === 'hi' ? 'लाड़ बाजार का नक्शा' : t('laadMapTitle')}</span>
              <span>🕌</span>
            </h3>
            <div className='relative flex justify-center'>
              <img
                src={map}
                alt='Laad Bazaar Map'
                className='rounded-2xl w-full max-w-4xl shadow-lg hover:scale-105 transition-transform duration-500'
              />
              <div className='absolute top-4 right-4 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium'>
                🕌 {language === 'hi' ? 'चार मीनार के सामने' : t('laadMapBadge')}
              </div>
            </div>

            {/* Char Minar Connection */}
            <div className='mt-8 bg-gradient-to-r from-purple-50 dark:from-purple-900/30 to-indigo-50 dark:to-indigo-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-700'>
              <div className='text-center'>
                <h4 className='font-bold text-purple-800 dark:text-purple-200 mb-4 flex items-center justify-center space-x-2'>
                  <span>🕌</span>
                  <span>{language === 'hi' ? 'चार मीनार से दूरी: केवल 50 मीटर' : t('charMinarDistance')}</span>
                </h4>
                <p className='text-purple-700 dark:text-purple-300 max-w-2xl mx-auto'>
                  {language === 'hi'
                    ? 'इस ऐतिहासिक बाजार का मुख्य आकर्षण चार मीनार के ठीक सामने होना है। पर्यटक चार मीनार देखने के साथ-साथ इस प्रसिद्ध बाजार की खरीदारी का भी आनंद ले सकते हैं।'
                    : t('charMinarDesc')}
                </p>
              </div>
            </div>

            {/* Market Info */}
            <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='text-center bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700'>
                <h4 className='font-semibold text-emerald-800 dark:text-emerald-200 mb-2'>
                  ⏰ {language === 'hi' ? 'समय' : t('openingHours')}
                </h4>
                <p className='text-emerald-700 dark:text-emerald-300'>{marketInfo.openingHours}</p>
                <p className='text-emerald-600 dark:text-emerald-400 text-sm mt-1'>
                  {language === 'hi' ? 'रोज़ाना खुला' : t('openDaily')}
                </p>
              </div>
              <div className='text-center bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700'>
                <h4 className='font-semibold text-emerald-800 dark:text-emerald-200 mb-2'>
                  🌤️ {language === 'hi' ? 'बेस्ट टाइम' : t('bestTime')}
                </h4>
                <p className='text-emerald-700 dark:text-emerald-300'>{marketInfo.bestTime}</p>
                <p className='text-emerald-600 dark:text-emerald-400 text-sm mt-1'>
                  {language === 'hi' ? 'सुखद मौसम' : t('weatherDesc') || 'Pleasant Weather'}
                </p>
              </div>
              <div className='text-center bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700'>
                <h4 className='font-semibold text-emerald-800 dark:text-emerald-200 mb-2'>
                  🚇 {language === 'hi' ? 'मेट्रो' : 'Metro'}
                </h4>
                <p className='text-emerald-700 dark:text-emerald-300'>
                  {language === 'hi' ? 'चार मीनार स्टेशन' : 'Charminar Station'}
                </p>
                <p className='text-emerald-600 dark:text-emerald-400 text-sm mt-1'>
                  {language === 'hi' ? '5 मिनट पैदल' : t('minutesWalk') || '5 min walk'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Heritage Information */}
        <div className='max-w-7xl mx-auto px-6 mb-16'>
          <div className='bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-white'>
            <div className='text-center mb-8'>
              <h3 className='text-3xl font-bold mb-4'>
                {language === 'hi' ? 'निज़ामी विरासत' : t('laadHeritageTitle')}
              </h3>
              <p className='text-xl text-purple-100 max-w-3xl mx-auto'>
                {language === 'hi'
                  ? 'हैदराबाद के निज़ामों द्वारा संरक्षित यह बाजार आज भी अपनी मूल परंपरा को जीवित रखे हुए है'
                  : t('laadHeritageDesc')}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>👑</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'निज़ामी काल' : t('nizamiEra')}
                </h4>
                <p className='text-purple-100 text-sm'>
                  {language === 'hi' ? '1591 से चली आ रही परंपरा' : t('nizamiEraDesc')}
                </p>
              </div>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🌍</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'विश्व प्रसिद्ध' : t('worldFamous')}
                </h4>
                <p className='text-purple-100 text-sm'>
                  {language === 'hi' ? 'हैदराबादी मोतियों की वैश्विक पहचान' : t('worldFamousDesc')}
                </p>
              </div>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🎨</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'हस्तकला' : t('craftsmanship')}
                </h4>
                <p className='text-purple-100 text-sm'>
                  {language === 'hi' ? 'पीढ़ियों से चली आ रही कारीगरी' : t('craftsmanshipDesc')}
                </p>
              </div>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🏆</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'यूनेस्को मान्यता' : t('unescoRecog')}
                </h4>
                <p className='text-purple-100 text-sm'>
                  {language === 'hi' ? 'सांस्कृतिक विरासत स्थल' : t('unescoRecogDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className='max-w-7xl mx-auto px-6 mb-12'>
          <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg'>
            <h3 className='text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-4 text-center'>
              {language === 'hi' ? 'दुकान श्रेणियां' : t('shopCategoriesLaad') || t('shopCategories')}
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3'>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-300 ${activeFilter === category.id
                    ? 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-700 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 hover:border-emerald-300'
                    }`}
                >
                  <span className='text-2xl'>{category.icon}</span>
                  <span className='font-medium text-sm text-center leading-tight'>{category.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${activeFilter === category.id
                    ? 'bg-white/20 dark:bg-gray-800/20 text-white'
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
              {language === 'hi' ? 'प्रमुख दुकानें' : t('majorShops')}
            </h3>
            <p className='text-xl text-emerald-600 dark:text-emerald-400'>
              {activeFilter === 'all'
                ? (language === 'hi' ? 'लाड़ बाजार की सभी प्रसिद्ध दुकानें' : 'All famous shops of Laad Bazaar')
                : `${categories.find(c => c.id === activeFilter)?.name} ${language === 'hi' ? 'की दुकानें' : 'shops'}`
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
                  marketTheme="laad"
                />
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <div className='text-6xl mb-4'>🔍</div>
              <h3 className='text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-2'>
                {language === 'hi' ? 'कोई दुकान नहीं मिली' : t('noShopsLaad') || t('noShopsFound')}
              </h3>
              <p className='text-emerald-600 dark:text-emerald-400'>
                {language === 'hi' ? 'इस श्रेणी में कोई दुकान उपलब्ध नहीं है' : t('noShopsLaadDesc') || t('noShopsFoundDesc')}
              </p>
            </div>
          )}

          {/* Pearl Information Section */}
          <div className='mt-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white'>
            <div className='text-center mb-8'>
              <h3 className='text-3xl font-bold mb-4'>
                {language === 'hi' ? 'हैदराबादी मोतियों की विशेषता' : t('pearlInfoTitle')}
              </h3>
              <p className='text-xl text-indigo-100 max-w-3xl mx-auto'>
                {language === 'hi'
                  ? 'लाड़ बाजार के मोती अपनी चमक, आकार और गुणवत्ता के लिए विश्व भर में प्रसिद्ध हैं'
                  : t('pearlInfoDesc')}
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🐚</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'बेसरा पर्ल्स' : t('basraPearls')}
                </h4>
                <p className='text-indigo-100 text-sm'>
                  {language === 'hi' ? 'दुनिया के सबसे महंगे और दुर्लभ मोती' : t('basraPearlsDesc')}
                </p>
              </div>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>✨</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'प्राकृतिक चमक' : t('naturalShine')}
                </h4>
                <p className='text-indigo-100 text-sm'>
                  {language === 'hi' ? 'बिना रसायन के प्राकृतिक रूप से चमकदार' : t('naturalShineDesc')}
                </p>
              </div>
              <div className='text-center bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl p-6'>
                <div className='text-3xl mb-3'>🏆</div>
                <h4 className='text-lg font-semibold mb-2'>
                  {language === 'hi' ? 'प्रमाणिता' : t('authenticity')}
                </h4>
                <p className='text-indigo-100 text-sm'>
                  {language === 'hi' ? 'हर मोती प्रमाणपत्र के साथ' : t('authenticityDesc')}
                </p>
              </div>
            </div>

            <div className='text-center mt-8'>
              <button className='bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105'>
                {language === 'hi' ? 'मोती की जानकारी' : t('pearlInfoBtn') || t('knowMore')}
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

export default LaadBazaar;
