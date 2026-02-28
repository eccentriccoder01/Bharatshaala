
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ShopCard from '../../../components/ShopCard';
import '../../../App.css';
import { useLanguage } from '../../../context/LanguageContext';

import map from '../../../images/markets/commercial_map.jpeg';

const CommercialStreet = () => {
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
      id: 'silk-weaving-house',
      name: t('silkWeavingHouse'),
      nameEn: 'Bangalore Silk Weaving House',
      specialty: t('silkWeavingSpecialty'),
      specialtyEn: 'Handloom silk sarees, Kanchipuram sarees and South Indian traditional wear',
      rating: 4.8,
      reviews: 645,
      established: '1952',
      products: 420,
      owner: t('mrNagarajIyer'),
      experience: `35 ${t('yearsOld', 'years')}`,
      category: 'textiles',
      specialty_items: [t('kanchipuramSaree'), t('mysoreSilk'), t('handloomSaree'), t('silkBlouse'), t('dhoti')],
      href: '/markets/commercial_street/silk-weaving-house',
      image: '/images/shops/silk-house.jpg',
      badge: `🧵 ${t('handloomCertified')}`,
      timings: t('timingDesc', '10 AM - 9 PM'),
      languages: [t('kannada', 'Kannada'), t('hindi'), t('english'), t('tamil', 'Tamil')],
      payment_methods: [t('cash'), 'UPI', t('card'), t('emi', 'EMI')],
      delivery_available: true,
      wholesale_available: true,
      certifications: [t('silkMark'), t('handloomBoard')]
    },
    {
      id: 'modern-fashion-boutique',
      name: t('trendSetters'),
      nameEn: 'Trend Setters Boutique',
      specialty: t('trendSettersSpecialty'),
      specialtyEn: 'Modern fashion, designer clothes and contemporary accessories',
      rating: 4.6,
      reviews: 423,
      established: '1985',
      products: 680,
      owner: t('mrsPriyaSingh'),
      experience: `28 ${t('yearsOld', 'years')}`,
      category: 'fashion',
      specialty_items: [t('designerKurtas'), t('partyOutfits'), t('officeWear'), t('jeansCollection'), t('handbags')],
      href: '/markets/commercial_street/modern-fashion-boutique',
      image: '/images/shops/fashion-boutique.jpg',
      badge: `👗 ${t('trendyCollection')}`,
      timings: t('timingDesc', '10:30 AM - 9:30 PM'),
      languages: [t('english'), t('hindi'), t('kannada', 'Kannada')],
      payment_methods: [t('cash'), 'UPI', t('card'), t('emi', 'EMI')],
      delivery_available: true,
      wholesale_available: false,
      certifications: [t('fashionDesignCouncil')]
    },
    {
      id: 'traditional-jewelry',
      name: t('karnatakaJewellers'),
      nameEn: 'Karnataka Jewellers',
      specialty: t('karnatakaJewellersSpecialty'),
      specialtyEn: 'South Indian jewelry, temple jewelry and gold ornaments',
      rating: 4.9,
      reviews: 567,
      established: '1945',
      products: 350,
      owner: t('mrRameshChetty'),
      experience: `40 ${t('yearsOld', 'years')}`,
      category: 'jewelry',
      specialty_items: [t('templeJewelry'), t('goldNecklace'), t('kundanSets'), t('diamondRings'), t('silverItems')],
      href: '/markets/commercial_street/traditional-jewelry',
      image: '/images/shops/jewelry-store.jpg',
      badge: `💎 ${t('bisHallmark')}`,
      timings: t('timingDesc', '10 AM - 8:30 PM'),
      languages: [t('kannada', 'Kannada'), t('hindi'), t('english'), t('telugu', 'Telugu')],
      payment_methods: [t('cash'), 'UPI', t('card'), t('cheque'), t('goldLoan', 'Gold Loan')],
      delivery_available: true,
      wholesale_available: true,
      certifications: ['BIS Hallmark', t('jewellersAssoc', 'Jewellers Association')]
    },
    {
      id: 'footwear-paradise',
      name: t('footwearParadise'),
      nameEn: 'Bangalore Footwear Paradise',
      specialty: t('footwearParadiseSpecialty'),
      specialtyEn: 'Leather shoes, sports shoes and all types of footwear',
      rating: 4.5,
      reviews: 389,
      established: '1978',
      products: 890,
      owner: t('mrRajuGupta'),
      experience: `30 ${t('yearsOld', 'years')}`,
      category: 'footwear',
      specialty_items: [t('leatherShoes'), t('sportsShoes'), t('formalShoes'), t('sandals'), t('boots')],
      href: '/markets/commercial_street/footwear-paradise',
      image: '/images/shops/footwear.jpg',
      badge: `👠 ${t('leatherSpecialist')}`,
      timings: t('timingDesc', '10 AM - 9 PM'),
      languages: [t('hindi'), t('english'), t('kannada', 'Kannada')],
      payment_methods: [t('cash'), 'UPI', t('card'), t('emi', 'EMI')],
      delivery_available: true,
      wholesale_available: true,
      certifications: [t('leatherExportCouncil'), t('isiMark')]
    },
    {
      id: 'electronic-zone',
      name: t('electronicsHub'),
      nameEn: 'Commercial Electronics Hub',
      specialty: t('electronicsHubSpecialty'),
      specialtyEn: 'Mobiles, laptops, electronics and tech accessories',
      rating: 4.4,
      reviews: 756,
      established: '1995',
      products: 1200,
      owner: t('mrAnilKumar'),
      experience: `25 ${t('yearsOld', 'years')}`,
      category: 'electronics',
      specialty_items: [t('smartphones'), t('laptops'), t('tablets'), t('headphones'), t('chargers')],
      href: '/markets/commercial_street/electronic-zone',
      image: '/images/shops/electronics-hub.jpg',
      badge: `📱 ${t('latestTech')}`,
      timings: t('timingDesc', '10 AM - 9:30 PM'),
      languages: [t('english'), t('hindi'), t('kannada', 'Kannada')],
      payment_methods: [t('cash'), 'UPI', t('card'), t('emi', 'EMI'), t('credit', 'Credit')],
      delivery_available: true,
      wholesale_available: true,
      certifications: [t('authorizedDealer'), t('serviceCenter')]
    },
    {
      id: 'book-world',
      name: t('knowledgeWorld'),
      nameEn: 'Knowledge World Bookstore',
      specialty: t('knowledgeWorldSpecialty'),
      specialtyEn: 'Vast book collection, educational material and stationery',
      rating: 4.7,
      reviews: 234,
      established: '1988',
      products: 680,
      owner: t('mrVijaySharma'),
      experience: `32 ${t('yearsOld', 'years')}`,
      category: 'books',
      specialty_items: [t('textbooks'), t('examBooks'), t('novels'), t('filmMagazines'), t('stationery')],
      href: '/markets/commercial_street/book-world',
      image: '/images/shops/bookstore.jpg',
      badge: `📚 ${t('knowledgeCenter')}`,
      timings: t('timingDesc', '9 AM - 9 PM'),
      languages: [t('english'), t('hindi'), t('kannada', 'Kannada')],
      payment_methods: [t('cash'), 'UPI', t('card')],
      delivery_available: true,
      wholesale_available: true,
      certifications: [t('eduBoardApproved'), t('publisherPartner')]
    }
  ];

  const marketInfo = {
    name: t('commercialStreetTitle'),
    nameHindi: t('commercialStreetTitle'),
    city: 'Bangalore',
    cityHindi: t('bangalore', 'Bangalore'),
    established: '1884',
    totalShops: 1500,
    totalVendors: 200,
    specialties: [t('textiles'), t('fashion'), t('jewelry'), t('footwear'), t('electronics'), t('books')],
    openingHours: t('timingDesc', '10 AM - 9:30 PM'),
    bestTime: t('bestTimeDesc', 'October to March'),
    nearbyAttractions: ['UB City Mall', 'Cubbon Park', 'Vidhana Soudha', 'Lalbagh Gardens'],
    transport: [t('metroMGRoad'), t('bmtcBus'), t('autoRickshaw'), t('olaUber')],
    parkingAvailable: true,
    history: t('csHistory')
  };

  const categories = [
    { id: 'all', name: t('allShops'), icon: '🏪', count: shops.length },
    { id: 'textiles', name: t('textiles'), icon: '🧵', count: shops.filter(s => s.category === 'textiles').length },
    { id: 'fashion', name: t('fashion'), icon: '👗', count: shops.filter(s => s.category === 'fashion').length },
    { id: 'jewelry', name: t('jewelry'), icon: '💎', count: shops.filter(s => s.category === 'jewelry').length },
    { id: 'footwear', name: t('footwear'), icon: '👠', count: shops.filter(s => s.category === 'footwear').length },
    { id: 'electronics', name: t('electronics'), icon: '📱', count: shops.filter(s => s.category === 'electronics').length },
    { id: 'books', name: t('books'), icon: '📚', count: shops.filter(s => s.category === 'books').length }
  ];

  const filteredShops = activeFilter === 'all'
    ? shops
    : shops.filter(shop => shop.category === activeFilter);

  if (loading) {
    return <LoadingSpinner message={`${t('commercialStreetTitle')} ${t('loading')}...`} />;
  }

  return (
    <React.StrictMode>
      <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 pt-20'>

        {/* Hero Section */}
        <div className='relative overflow-hidden'>
          <div className='max-w-6xl mx-auto px-6 py-16 relative z-10'>
            <div className='text-center mb-16'>
              <div className='inline-flex items-center space-x-3 bg-gradient-to-r from-gray-100 to-slate-100 rounded-full px-6 py-3 mb-6 shadow-lg border border-gray-200'>
                <span className='text-2xl'>🏙️</span>
                <span className='text-gray-800 font-bold'>{t('itCityHeart')}</span>
              </div>

              <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-600 via-slate-500 to-gray-700 bg-clip-text text-transparent mb-4 leading-tight'>
                {marketInfo.nameHindi}
              </h1>
              <h2 className='text-2xl md:text-3xl text-emerald-700 font-semibold mb-6'>
                {t('commercialStreetCity')}
              </h2>

              <p className='text-xl text-emerald-600 max-w-4xl mx-auto leading-relaxed mb-8'>
                {t('csDescription')}
              </p>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12'>
                <div className='text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200'>
                  <div className='text-2xl font-bold text-gray-600'>{marketInfo.established}</div>
                  <div className='text-gray-600 text-sm font-medium'>{t('established')}</div>
                </div>
                <div className='text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200'>
                  <div className='text-2xl font-bold text-gray-600'>{marketInfo.totalShops.toLocaleString()}+</div>
                  <div className='text-gray-600 text-sm font-medium'>{t('totalShops')}</div>
                </div>
                <div className='text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200'>
                  <div className='text-2xl font-bold text-gray-600'>{marketInfo.totalVendors}+</div>
                  <div className='text-gray-600 text-sm font-medium'>{t('vendors')}</div>
                </div>
                <div className='text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200'>
                  <div className='text-2xl font-bold text-gray-600'>141</div>
                  <div className='text-gray-600 text-sm font-medium'>{t('yearsOld')}</div>
                </div>
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
                      ? 'bg-gradient-to-br from-gray-500 to-slate-500 text-white shadow-lg scale-105'
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
                  marketTheme="commercial"
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
        </div>
      </div>
    </React.StrictMode>
  );
};
