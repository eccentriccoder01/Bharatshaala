// Book Cafe Component for Commercial Street - Bharatshaala Platform
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAnalytics } from '../../analytics';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import apiService from '../../apiService';
import { useLanguage } from '../../context/LanguageContext';

const BookCafe = () => {
  const { trackEvent, trackPageView } = useAnalytics();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { t } = useLanguage();

  const [books, setBooks] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const cafeInfo = {
    name: t('bookCafeTitle'),
    nameEn: 'Commercial Street Book Cafe',
    description: t('bookCafeDescription'),
    established: '2010s',
    speciality: t('booksCoffeeEvents'),
    location: t('commercialStreetCity'),
    heroImage: '/images/markets/commercial-street-book-cafe.jpg'
  };

  const bookCategories = [
    { id: 'all', name: t('allBooks'), icon: '📚' },
    { id: 'fiction', name: t('fiction'), icon: '📖' },
    { id: 'non-fiction', name: t('nonFiction'), icon: '📋' },
    { id: 'poetry', name: t('poetry'), icon: '🎭' },
    { id: 'regional', name: t('regionalLiterature'), icon: '🌍' },
    { id: 'tech', name: t('technology', 'Technology'), icon: '💻' },
    { id: 'art', name: t('artAndDesign'), icon: '🎨' }
  ];

  const featuredBooks = [
    {
      title: 'Geeta Rahasya',
      author: 'Lokmanya Tilak',
      genre: t('spiritual'),
      price: '₹350',
      language: 'Hindi',
      pages: 456,
      rating: 4.8
    },
    {
      title: 'Shantaram',
      author: 'Gregory David Roberts',
      genre: 'Fiction',
      price: '₹599',
      language: 'English',
      pages: 936,
      rating: 4.7
    },
    {
      title: 'History of Karnataka',
      author: 'Dr. Suryanath Kamath',
      genre: t('history'),
      price: '₹450',
      language: 'Hindi/Kannada',
      pages: 368,
      rating: 4.6
    }
  ];

  const upcomingEvents = [
    {
      title: t('poetrySabha'),
      date: `15 ${t('february', 'February')} 2024`,
      time: `6:00 PM - 8:00 PM`,
      speaker: 'Dr. Ashok Chakradhar',
      topic: t('contemporaryHindiPoetry'),
      entry: t('freeEntry')
    },
    {
      title: t('bookReadingSession'),
      date: `20 ${t('february', 'February')} 2024`,
      time: `11:00 AM - 12:30 PM`,
      speaker: 'Ruskin Bond',
      topic: t('storiesOfTheHills'),
      entry: '₹200'
    },
    {
      title: t('authorTalk'),
      date: `25 ${t('february', 'February')} 2024`,
      time: `7:00 PM - 9:00 PM`,
      speaker: 'Chetan Bhagat',
      topic: t('writingForYouth'),
      entry: '₹150'
    }
  ];

  const cafeMenu = [
    { item: t('filterCoffee'), price: '₹80', description: t('southIndianStyle') },
    { item: t('masalaChai'), price: '₹60', description: t('homelyTaste') },
    { item: t('bookLoversCappuccino'), price: '₹120', description: t('specialBlend') },
    { item: t('poetryPancakes'), price: '₹180', description: t('withHoney') },
    { item: t('literaryLatte'), price: '₹150', description: t('artLatte') },
    { item: t('readingRoomSandwich'), price: '₹250', description: t('grilledVeggie') }
  ];

  const readingSpaces = [
    { name: t('quietCorner'), capacity: `1-2 ${t('people')}`, ambiance: t('quietAmbiance') },
    { name: t('discussionTable'), capacity: `4-6 ${t('people')}`, ambiance: t('groupStudy') },
    { name: t('windowSeat'), capacity: `1-2 ${t('people')}`, ambiance: t('naturalLight') },
    { name: t('cozyCorner'), capacity: `2-3 ${t('people')}`, ambiance: t('comfortable') }
  ];

  useEffect(() => {
    trackPageView('commercial_street_book_cafe');
    loadCafeData();
  }, []);

  const loadCafeData = async () => {
    try {
      setLoading(true);

      const [booksResponse, eventsResponse] = await Promise.all([
        apiService.get('/markets/commercial-street/book-cafe/books'),
        apiService.get('/markets/commercial-street/book-cafe/events')
      ]);

      if (booksResponse.success) {
        setBooks(booksResponse.data);
      }

      if (eventsResponse.success) {
        setEvents(eventsResponse.data);
      }
    } catch (error) {
      console.error('Failed to load cafe data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    trackEvent('book_category_selected', {
      market: 'commercial_street',
      category
    });
  };

  const handleAddToCart = async (product) => {
    const result = await addToCart(product, 1);
    if (result.success) {
      trackEvent('add_to_cart_book_cafe', {
        productId: product.id,
        market: 'commercial_street',
        type: 'book'
      });
    }
  };

  const handleAddToWishlist = async (product) => {
    const result = await addToWishlist(product);
    if (result.success) {
      trackEvent('add_to_wishlist_book_cafe', {
        productId: product.id,
        market: 'commercial_street'
      });
    }
  };

  const filteredBooks = activeCategory === 'all'
    ? books
    : books.filter(book => book.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>{cafeInfo.name} - {t('bharatshaala')} | {t('bangalore')} {t('bookCafeDescription')}</title>
        <meta name="description" content={cafeInfo.description} />
        <meta name="keywords" content="book cafe, commercial street, bangalore books, literary events, coffee and books" />
        <link rel="canonical" href="https://bharatshaala.com/markets/commercial-street/book-cafe" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
          <div className="absolute inset-0 bg-black/40"></div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${cafeInfo.heroImage})` }}
          ></div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-6xl">📚</span>
                <div>
                  <h1 className="text-5xl font-bold mb-2">{cafeInfo.name}</h1>
                  <p className="text-xl opacity-90">{cafeInfo.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('established')}</h3>
                  <p className="text-orange-200">{cafeInfo.established}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('speciality', 'Speciality')}</h3>
                  <p className="text-orange-200">{cafeInfo.speciality}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{t('location')}</h3>
                  <p className="text-orange-200">{cafeInfo.location}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Navigation Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-6 py-4">
            <nav className="text-sm text-gray-600">
              <Link to="/" className="hover:text-emerald-600">{t('home')}</Link>
              <span className="mx-2">›</span>
              <Link to="/markets" className="hover:text-emerald-600">{t('markets')}</Link>
              <span className="mx-2">›</span>
              <Link to="/markets/commercial-street" className="hover:text-emerald-600">{t('commercialStreetTitle')}</Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900">{t('bookCafeTitle')}</span>
            </nav>
          </div>
        </div>

        {/* Featured Books */}
        <section className="py-12 bg-amber-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('featuredBooksTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredBooks.map((book, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-2"><strong>{t('author', 'Author')}:</strong> {book.author}</p>
                  <p className="text-gray-600 mb-2"><strong>{t('genre', 'Genre')}:</strong> {book.genre}</p>
                  <p className="text-gray-600 mb-2"><strong>{t('language', 'Language')}:</strong> {book.language}</p>
                  <p className="text-gray-600 mb-3"><strong>{t('pages', 'Pages')}:</strong> {book.pages}</p>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl font-bold text-amber-600">{book.price}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-gray-600 ml-1">{book.rating}</span>
                    </div>
                  </div>
                  <button className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200">
                    {t('addToCart')}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('upcomingEventsTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><strong>{t('date', 'Date')}:</strong> {event.date}</p>
                    <p><strong>{t('time', 'Time')}:</strong> {event.time}</p>
                    <p><strong>{t('speaker', 'Speaker')}:</strong> {event.speaker}</p>
                    <p><strong>{t('topic', 'Topic')}:</strong> {event.topic}</p>
                    <p><strong>{t('entry', 'Entry')}:</strong> {event.entry}</p>
                  </div>
                  <button className="w-full bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200">
                    {t('register')}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('bookCategoriesTitle')}</h2>
            <div className="flex flex-wrap gap-4">
              {bookCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ${activeCategory === category.id
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border'
                    }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Books Section */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" text={`${t('loading')} ${t('books', 'books')}...`} />
          </div>
        ) : (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {activeCategory === 'all' ? t('allBooks', 'All Books') : bookCategories.find(cat => cat.id === activeCategory)?.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                  <ProductCard
                    key={book.id}
                    product={book}
                    onAddToCart={() => handleAddToCart(book)}
                    onAddToWishlist={() => handleAddToWishlist(book)}
                    showLanguageBadge={true}
                    showGenreBadge={true}
                    showRatingBadge={true}
                  />
                ))}
              </div>

              {filteredBooks.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noItemsFound')}</h3>
                  <p className="text-gray-600">{t('tryDifferentCategory', 'Please selecting a different category')}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Cafe Menu */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('cafeMenuTitle')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cafeMenu.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{item.item}</h3>
                    <span className="text-lg font-bold text-amber-600">{item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reading Spaces */}
        <section className="py-16 bg-amber-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('readingSpacesTitle')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {readingSpaces.map((space, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">📖</div>
                  <h3 className="text-xl font-semibold mb-2">{space.name}</h3>
                  <p className="text-gray-600 mb-1">{space.capacity}</p>
                  <p className="text-gray-600">{space.ambiance}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Book Cafe Experience */}
        <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">{t('bookCafeExperienceTitle')}</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl leading-relaxed mb-8">
                {t('bookCafeExpDesc')}
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="text-xl font-semibold mb-2">{t('location')}</h3>
                  <p>{t('commercialStreetCity')}</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">🕒</div>
                  <h3 className="text-xl font-semibold mb-2">{t('timing')}</h3>
                  <p>{t('timingDesc', '9 AM - 10 PM')}</p>
                </div>
                <div>
                  <div className="text-4xl mb-4">☕</div>
                  <h3 className="text-xl font-semibold mb-2">{t('speciality', 'Speciality')}</h3>
                  <p>{t('booksCoffeeEvents')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BookCafe;