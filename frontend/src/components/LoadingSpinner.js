import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LoadingSpinner = ({ message }) => {
  const { t } = useLanguage();

  // Use provided message or default to translated 'loading'
  const displayMessage = message || t('loading');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 flex items-center justify-center">
      <div className="text-center">
        {/* Main Spinner */}
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-600 mx-auto"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-transparent rounded-full animate-ping border-t-emerald-400 mx-auto"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-3xl animate-bounce">🏛️</div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">{displayMessage}</h2>
        <p className="text-emerald-600">{t('pleaseWait')}</p>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce delay-75"></div>
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce delay-150"></div>
        </div>

        {/* Cultural Touch */}
        <div className="mt-8 text-emerald-600 text-sm">
          {t('patienceQuote')}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;