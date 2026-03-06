import React, { useState, useEffect } from 'react';
import { useSearchParams /* , useNavigate */ } from 'react-router-dom';
import { useAPI } from '../hooks/useAPI';
import { useDebounce } from '../hooks/useDebounce';
// import { useNotification } from '../context/NotificationContext';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ProductCard';
import FilterPanel from '../components/FilterPanel';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLanguage } from '../context/LanguageContext';

const SearchResults = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  // const navigate = useNavigate();
  const { get } = useAPI();
  // const { showError } = useNotification();
  const { addToCart } = useCart();
  // const { t, language } = useLanguage();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  // const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [currentPage] = useState(parseInt(searchParams.get('page')) || 1);
  // const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'relevance');
  const [sortBy] = useState(searchParams.get('sort') || 'relevance');
  // const [viewMode, setViewMode] = useState('grid');
  const [viewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: {
      min: parseInt(searchParams.get('price_min')) || 0,
      max: parseInt(searchParams.get('price_max')) || 100000
    },
    rating: parseInt(searchParams.get('rating')) || 0,
    inStock: searchParams.get('in_stock') === 'true'
  });

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (debouncedSearchQuery) {
      performSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, currentPage, sortBy, filters]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const response = await get('/search', {
        params: { q: debouncedSearchQuery, page: currentPage, sort: sortBy, ...filters }
      });
      if (response.success) {
        setResults(response.results);
        setTotalResults(response.totalResults);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }
    setLoading(false);
  };

  const handleAddToCart = async (product) => {
    return await addToCart(product, 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full px-6 py-4 pl-12 pr-20 text-lg border-2 border-emerald-200 dark:border-emerald-700 rounded-xl focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-white"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-emerald-800 dark:text-emerald-200">
              <span className="font-bold">{totalResults}</span> {t('resultsFound')} "{searchQuery}"
            </p>
            <div className="flex items-center space-x-4">
              <button onClick={() => setShowFilters(!showFilters)} className={`px-4 py-2 rounded-lg transition-all ${showFilters ? 'bg-emerald-500 text-white' : 'border border-emerald-500 text-emerald-600 dark:text-emerald-400'}`}>
                {t('filters')}
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {showFilters && (
            <div className="w-80 h-fit sticky top-24">
              <FilterPanel filters={filters} onFilterChange={setFilters} />
            </div>
          )}
          <div className="flex-1">
            {loading ? (
              <LoadingSpinner message={t('loading')} />
            ) : results.length > 0 ? (
              <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {results.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-8xl mb-6">🔍</div>
                <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mb-4">{t('noResults')}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
