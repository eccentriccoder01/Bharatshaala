import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const ShopCard = ({
  shop,
  index,
  isHovered,
  onHover,
  marketTheme = 'default',
  onClick
}) => {
  const { language, t } = useLanguage();

  const getThemeColors = (theme) => {
    const themes = {
      default: { primary: 'from-emerald-500 to-green-500', secondary: 'emerald' },
      chandni: { primary: 'from-red-500 to-orange-500', secondary: 'red' },
      pinkcity: { primary: 'from-pink-500 to-rose-500', secondary: 'pink' },
      laad: { primary: 'from-purple-500 to-indigo-500', secondary: 'purple' },
      devaraja: { primary: 'from-amber-500 to-yellow-500', secondary: 'amber' },
      colaba: { primary: 'from-blue-500 to-indigo-500', secondary: 'blue' },
      commercial: { primary: 'from-gray-500 to-slate-500', secondary: 'gray' }
    };
    return themes[theme] || themes.default;
  };

  const themeColors = getThemeColors(marketTheme);

  // Dynamic Content Styling
  const displayName = language === 'hi' ? shop.name : (shop.nameEn || shop.name);
  const displaySubtitle = language === 'hi' ? (shop.nameEn || '') : shop.name;
  const displaySpecialty = language === 'hi' ? shop.specialty : (shop.specialtyEn || shop.specialty);
  const displayBadge = language === 'hi' ? shop.badge : (shop.badgeEn || shop.badge);
  const displayItems = language === 'hi' ? shop.specialty_items : (shop.specialtyItemsEn || shop.specialty_items);
  const displayOwner = language === 'hi' ? shop.owner : (shop.ownerEn || shop.owner);
  const displayExperience = language === 'hi' ? shop.experience : (shop.experienceEn || shop.experience);
  const displayTimings = language === 'hi' ? shop.timings : (shop.timingsEn || shop.timings);
  const displayLanguages = language === 'hi' ? shop.languages : (shop.languagesEn || shop.languages);
  const displayPayment = language === 'hi' ? shop.payment_methods : (shop.paymentMethodsEn || shop.payment_methods);

  return (
    <a
      href={shop.href}
      className='group block'
      onMouseEnter={() => onHover(shop.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      <div className={`relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isHovered ? 'scale-[1.02]' : ''
        }`}>

        {/* Header Section */}
        <div className={`bg-gradient-to-br ${themeColors.primary} p-6 text-white relative overflow-hidden`}>
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

          <div className='relative z-10'>
            <div className='flex items-start justify-between mb-4'>
              <div className='flex-1'>
                <h2 className='text-2xl font-bold mb-1 leading-tight'>{displayName}</h2>
                {displaySubtitle && <p className='text-white/90 text-lg'>{displaySubtitle}</p>}
              </div>
              <div className='bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 ml-4'>
                <span className='text-sm font-medium'>{displayBadge}</span>
              </div>
            </div>

            {/* Shop Stats */}
            <div className='flex items-center space-x-4 text-white/90 text-sm'>
              <div className='flex items-center space-x-1'>
                <span>⭐</span>
                <span className='font-medium'>{shop.rating}</span>
                <span>({shop.reviews} {t('reviews')})</span>
              </div>
              <div className='flex items-center space-x-1'>
                <span>📅</span>
                <span>{t('established')} {shop.established}</span>
              </div>
              <div className='flex items-center space-x-1'>
                <span>📦</span>
                <span>{shop.products}+ {t('products', 'Products')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className='p-8'>
          {/* Specialty Description */}
          <p className='text-gray-600 leading-relaxed mb-6 text-lg'>
            {displaySpecialty}
          </p>

          {/* Shop Details Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            {/* Owner Info */}
            <div className='bg-emerald-50 rounded-xl p-4 border border-emerald-200'>
              <div className='text-emerald-600 text-sm font-medium mb-1'>{t('shopOwner')}</div>
              <div className='text-emerald-800 font-semibold'>{displayOwner}</div>
              <div className='text-emerald-600 text-sm'>{displayExperience} {t('experience')}</div>
            </div>

            {/* Timing Info */}
            <div className={`bg-${themeColors.secondary}-50 rounded-xl p-4 border border-${themeColors.secondary}-200`}>
              <div className={`text-${themeColors.secondary}-600 text-sm font-medium mb-1`}>{t('openingHours')}</div>
              <div className={`text-${themeColors.secondary}-800 font-semibold`}>{displayTimings}</div>
              <div className={`text-${themeColors.secondary}-600 text-sm`}>{t('openDaily')}</div>
            </div>
          </div>

          {/* Specialty Items */}
          <div className='mb-6'>
            <h4 className='text-sm font-semibold text-gray-700 mb-3'>{t('specialtyItems')}:</h4>
            <div className='flex flex-wrap gap-2'>
              {displayItems?.slice(0, 5).map((item, idx) => (
                <span key={idx} className='bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm border border-orange-200 flex items-center space-x-1'>
                  <span>✨</span>
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className='grid grid-cols-2 gap-4 mb-6'>
            {/* Languages */}
            <div>
              <h5 className='text-xs font-semibold text-gray-600 mb-2'>{t('languages')}:</h5>
              <div className='flex flex-wrap gap-1'>
                {displayLanguages?.map((lang, idx) => (
                  <span key={idx} className='bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs'>
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h5 className='text-xs font-semibold text-gray-600 mb-2'>{t('payment')}:</h5>
              <div className='flex flex-wrap gap-1'>
                {displayPayment?.map((method, idx) => (
                  <span key={idx} className='bg-green-100 text-green-700 px-2 py-1 rounded text-xs'>
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div className='flex flex-wrap gap-3 mb-6'>
            {shop.delivery_available && (
              <div className='flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-2 rounded-full border border-green-200'>
                <span>🚚</span>
                <span className='text-sm font-medium'>{t('homeDelivery')}</span>
              </div>
            )}
            {shop.wholesale_available && (
              <div className='flex items-center space-x-2 bg-purple-50 text-purple-700 px-3 py-2 rounded-full border border-purple-200'>
                <span>📦</span>
                <span className='text-sm font-medium'>{t('wholesale')}</span>
              </div>
            )}
          </div>

          {/* Action Section */}
          <div className={`flex items-center justify-between transition-all duration-300 ${isHovered ? 'transform translate-x-2' : ''
            }`}>
            <div className='flex items-center space-x-3'>
              <span className='text-emerald-600 font-semibold group-hover:text-emerald-700'>
                {t('visitShop')}
              </span>
              <div className='flex items-center space-x-1'>
                <div className={`w-2 h-2 bg-${themeColors.secondary}-400 rounded-full animate-pulse`}></div>
                <div className={`w-2 h-2 bg-${themeColors.secondary}-400 rounded-full animate-pulse delay-75`}></div>
                <div className={`w-2 h-2 bg-${themeColors.secondary}-500 rounded-full animate-pulse delay-150`}></div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className='flex items-center space-x-2'>
              <button
                className={`p-2 bg-${themeColors.secondary}-100 text-${themeColors.secondary}-600 rounded-lg hover:bg-${themeColors.secondary}-200 transition-colors duration-200`}
                title={language === 'hi' ? "फोन करें" : "Call"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Handle phone call
                }}
              >
                📞
              </button>
              <button
                className={`p-2 bg-${themeColors.secondary}-100 text-${themeColors.secondary}-600 rounded-lg hover:bg-${themeColors.secondary}-200 transition-colors duration-200`}
                title={language === 'hi' ? "दिशा" : "Direction"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Handle directions
                }}
              >
                📍
              </button>
              <button
                className={`p-2 bg-${themeColors.secondary}-100 text-${themeColors.secondary}-600 rounded-lg hover:bg-${themeColors.secondary}-200 transition-colors duration-200`}
                title={language === 'hi' ? "शेयर करें" : "Share"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Handle share
                }}
              >
                📤
              </button>
            </div>
          </div>
        </div>

        {/* Corner Decoration */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 bg-white/10 rounded-full"></div>
      </div>
    </a>
  );
};

export default ShopCard;