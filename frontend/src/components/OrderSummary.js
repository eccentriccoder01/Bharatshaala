import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const OrderSummary = ({ subtotal, discount = 0, deliveryCost = 0, total, onCheckout }) => {
  const { t } = useLanguage();

  return (
    <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg sticky top-24'>
      <h3 className='text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-6 flex items-center space-x-2'>
        <span>📋</span>
        <span>{t('orderSummary')}</span>
      </h3>

      {/* Price Breakdown */}
      <div className='space-y-4 mb-6'>
        <div className='flex justify-between items-center py-2 border-b border-emerald-100 dark:border-gray-700'>
          <span className='text-emerald-700 dark:text-emerald-300'>{t('subtotal')}:</span>
          <span className='font-semibold text-emerald-800 dark:text-emerald-200'>₹{subtotal.toLocaleString()}</span>
        </div>

        {discount > 0 && (
          <div className='flex justify-between items-center py-2 border-b border-emerald-100 dark:border-gray-700 text-green-600 dark:text-green-400'>
            <span className='flex items-center space-x-1'>
              <span>🎫</span>
              <span>{t('discount')}:</span>
            </span>
            <span className='font-semibold'>-₹{discount.toLocaleString()}</span>
          </div>
        )}

        <div className='flex justify-between items-center py-2 border-b border-emerald-100 dark:border-gray-700'>
          <span className='text-emerald-700 dark:text-emerald-300 flex items-center space-x-1'>
            <span>🚚</span>
            <span>{t('delivery')}:</span>
          </span>
          <span className='font-semibold text-emerald-800 dark:text-emerald-200'>
            {deliveryCost === 0 ? t('free') : `₹${deliveryCost.toLocaleString()}`}
          </span>
        </div>

        <div className='flex justify-between items-center py-3 border-t-2 border-emerald-200 dark:border-emerald-700'>
          <span className='text-lg font-bold text-emerald-800 dark:text-emerald-200'>{t('totalAmount')}:</span>
          <span className='text-xl font-bold text-emerald-600 dark:text-emerald-400'>₹{total.toLocaleString()}</span>
        </div>
      </div>

      {/* Security Features */}
      <div className='bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4 mb-6 border border-emerald-200 dark:border-emerald-700'>
        <h4 className='font-semibold text-emerald-800 dark:text-emerald-200 mb-3 flex items-center space-x-2'>
          <span>🔒</span>
          <span>{t('securePayment')}</span>
        </h4>
        <div className='space-y-2 text-sm text-emerald-700 dark:text-emerald-300'>
          <div className='flex items-center space-x-2'>
            <span>✅</span>
            <span>{t('sslEncryption')}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>✅</span>
            <span>{t('secureTransaction')}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <span>✅</span>
            <span>{t('refundGuarantee')}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className='mb-6'>
        <h4 className='font-semibold text-emerald-800 dark:text-emerald-200 mb-3'>{t('acceptedPayment')}:</h4>
        <div className='grid grid-cols-3 gap-2'>
          <div className='bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-700 rounded-lg p-2 text-center'>
            <span className='text-blue-600 dark:text-blue-400 font-bold text-xs'>💳 VISA</span>
          </div>
          <div className='bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-700 rounded-lg p-2 text-center'>
            <span className='text-red-600 dark:text-red-400 font-bold text-xs'>💳 MCard</span>
          </div>
          <div className='bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-700 rounded-lg p-2 text-center'>
            <span className='text-purple-600 dark:text-purple-400 font-bold text-xs'>📱 UPI</span>
          </div>
          <div className='bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-700 rounded-lg p-2 text-center'>
            <span className='text-green-600 dark:text-green-400 font-bold text-xs'>🏦 Net</span>
          </div>
          <div className='bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-700 rounded-lg p-2 text-center'>
            <span className='text-blue-700 dark:text-blue-400 font-bold text-xs'>💰 Wallet</span>
          </div>
          <div className='bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-700 rounded-lg p-2 text-center'>
            <span className='text-gray-700 dark:text-gray-300 font-bold text-xs'>💵 COD</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className='w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:from-emerald-600 hover:to-green-600 hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2'
      >
        <span>🛒</span>
        <span>{t('checkout')}</span>
      </button>

      {/* Trust Badges */}
      <div className='mt-6 text-center'>
        <div className='flex justify-center space-x-4 text-xs text-emerald-600 dark:text-emerald-400'>
          <span className='flex items-center space-x-1'>
            <span>🛡️</span>
            <span>{t('secure')}</span>
          </span>
          <span className='flex items-center space-x-1'>
            <span>⚡</span>
            <span>{t('instantProcess')}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;