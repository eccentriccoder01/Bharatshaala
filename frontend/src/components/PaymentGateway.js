import React, { useState, useEffect } from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { useCart } from '../hooks/useCart';
import { useNotification } from '../hooks/useNotification';
import LoadingSpinner from './LoadingSpinner';
import { useLanguage } from '../context/LanguageContext';

const PaymentGateway = ({
  orderDetails,
  onPaymentSuccess,
  onPaymentFailure,
  onCancel,
  isOpen = false
}) => {
  const { t, language } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState('method'); // method, processing, success, failure
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [transactionId, setTransactionId] = useState('');

  // const { user } = useAuth();
  // const { getCartSummary } = useCart();
  const { showSuccess, showError } = useNotification();

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI',
      icon: '/images/icons/payment/upi-icon.svg',
      description: 'Google Pay, PhonePe, Paytm',
      processingTime: `2-3 ${t('seconds')}`,
      fees: 0,
      popular: true
    },
    {
      id: 'card',
      name: t('creditDebitCard'),
      icon: '/images/icons/payment/credit-card.svg',
      description: 'Visa, Mastercard, RuPay',
      processingTime: `30-60 ${t('seconds')}`,
      fees: 0,
      popular: false
    },
    {
      id: 'netbanking',
      name: t('netBanking'),
      icon: '/images/icons/payment/net-banking.svg',
      description: t('allMajorBanks'),
      processingTime: `1-2 ${t('minutes')}`,
      fees: 0,
      popular: false
    },
    {
      id: 'wallet',
      name: t('digitalWallet'),
      icon: '/images/icons/payment/paytm-icon.svg',
      description: 'Paytm, Mobikwik, Freecharge',
      processingTime: `5-10 ${t('seconds')}`,
      fees: 0,
      popular: false
    },
    {
      id: 'cod',
      name: t('cashOnDelivery'),
      icon: '/images/icons/payment/cod-icon.svg',
      description: t('codDesc'),
      processingTime: t('instant'),
      fees: 25,
      popular: false
    }
  ];

  const upiApps = [
    { id: 'gpay', name: 'Google Pay', icon: '/images/icons/payment/gpay-icon.svg' },
    { id: 'phonepe', name: 'PhonePe', icon: '/images/icons/payment/phonepe-icon.svg' },
    { id: 'paytm', name: 'Paytm', icon: '/images/icons/payment/paytm-icon.svg' },
    { id: 'other', name: t('otherUPIApps'), icon: '/images/icons/payment/upi-icon.svg' }
  ];

  useEffect(() => {
    if (isOpen) {
      setPaymentStep('method');
      setErrors({});
      generateTransactionId();
    }
  }, [isOpen]);

  const generateTransactionId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setTransactionId(`TXN${timestamp}${random}`);
  };

  const validateUPI = (upiId) => {
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    return upiRegex.test(upiId);
  };

  const validateCard = (cardDetails) => {
    const errors = {};

    // Card number validation (simplified)
    if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length < 16) {
      errors.number = t('enterValidCardNumber');
    }

    // Expiry validation
    if (!cardDetails.expiry || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(cardDetails.expiry)) {
      errors.expiry = t('enterExpiryFormat');
    }

    // CVV validation
    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      errors.cvv = t('enterValidCVV');
    }

    // Name validation
    if (!cardDetails.name || cardDetails.name.trim().length < 2) {
      errors.name = t('enterCardName');
    }

    return errors;
  };

  const processPayment = async () => {
    setIsProcessing(true);
    setPaymentStep('processing');
    setErrors({});

    try {
      let validationErrors = {};

      // Validate based on payment method
      switch (selectedMethod) {
        case 'upi':
          if (!validateUPI(upiId)) {
            validationErrors.upi = t('enterValidUPIID');
          }
          break;
        case 'card':
          validationErrors = validateCard(cardDetails);
          break;
        case 'cod':
          // No validation needed for COD
          break;
        default:
          break;
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setPaymentStep('method');
        setIsProcessing(false);
        return;
      }

      // Simulate payment processing
      const processingTime = selectedMethod === 'upi' ? 3000 :
        selectedMethod === 'card' ? 5000 :
          selectedMethod === 'cod' ? 1000 : 4000;

      await new Promise(resolve => setTimeout(resolve, processingTime));

      // Simulate payment success/failure (90% success rate)
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        setPaymentStep('success');
        const paymentData = {
          transactionId,
          method: selectedMethod,
          amount: orderDetails.total,
          timestamp: new Date().toISOString(),
          status: selectedMethod === 'cod' ? 'pending' : 'completed'
        };

        showSuccess(`${t('paymentSuccess')}! Transaction ID: ${transactionId}`);
        onPaymentSuccess?.(paymentData);
      } else {
        setPaymentStep('failure');
        const errorData = {
          transactionId,
          method: selectedMethod,
          error: 'Payment failed due to insufficient funds or network error',
          timestamp: new Date().toISOString()
        };

        showError(t('paymentFailure'));
        onPaymentFailure?.(errorData);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      setPaymentStep('failure');
      showError(t('paymentTechError'));
      onPaymentFailure?.({ error: error.message });
    }

    setIsProcessing(false);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;

    if (field === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substr(0, 5);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substr(0, 4);
    }

    setCardDetails(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">💳 {t('paymentGateway')}</h2>
              <p className="text-emerald-100">{t('securePaymentProcess')}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-emerald-100">Transaction ID</div>
              <div className="font-mono text-lg">{transactionId}</div>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        {paymentStep === 'method' && (
          <div className="p-8">

            {/* Order Summary */}
            <div className="mb-8 p-6 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl border border-emerald-200 dark:border-emerald-700">
              <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-200 mb-4">{t('orderSummary')}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-emerald-700 dark:text-emerald-300">{t('productTotal')}:</span>
                  <span className="font-semibold text-emerald-800 dark:text-emerald-200">₹{orderDetails?.subtotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-700 dark:text-emerald-300">{t('shipping')}:</span>
                  <span className="font-semibold text-emerald-800 dark:text-emerald-200">₹{orderDetails?.shipping?.toLocaleString()}</span>
                </div>
                {orderDetails?.discount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>{t('discount')}:</span>
                    <span className="font-semibold">-₹{orderDetails?.discount?.toLocaleString()}</span>
                  </div>
                )}
                {selectedMethod === 'cod' && (
                  <div className="flex justify-between text-orange-600 dark:text-orange-400">
                    <span>{t('codFees')}:</span>
                    <span className="font-semibold">₹25</span>
                  </div>
                )}
                <div className="border-t border-emerald-200 dark:border-emerald-700 pt-2 flex justify-between text-lg font-bold text-emerald-800 dark:text-emerald-200">
                  <span>{t('totalAmount')}:</span>
                  <span>₹{(orderDetails?.total + (selectedMethod === 'cod' ? 25 : 0))?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-6">{t('selectPaymentMethod')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`relative p-6 border-2 rounded-2xl transition-all duration-300 text-left ${selectedMethod === method.id
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 shadow-lg scale-105'
                      : 'border-emerald-200 dark:border-emerald-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-emerald-25'
                      }`}
                  >
                    {method.popular && (
                      <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {t('popular')}
                      </div>
                    )}

                    <div className="flex items-center space-x-4 mb-3">
                      <img src={method.icon} alt={method.name} className="w-8 h-8" />
                      <div>
                        <h4 className="font-bold text-emerald-800 dark:text-emerald-200">{method.name}</h4>
                        <p className="text-sm text-emerald-600 dark:text-emerald-400">{method.description}</p>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <div>⏱️ {t('processingTime')}: {method.processingTime}</div>
                      <div>💰 {t('fees')}: {method.fees > 0 ? `₹${method.fees}` : t('free')}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Details */}
            {selectedMethod === 'upi' && (
              <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-700">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-4">{t('upiPayment')}</h4>

                {/* UPI Apps */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {upiApps.map((app) => (
                    <button
                      key={app.id}
                      className="flex flex-col items-center p-4 border border-blue-200 dark:border-blue-700 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                    >
                      <img src={app.icon} alt={app.name} className="w-8 h-8 mb-2" />
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-300">{app.name}</span>
                    </button>
                  ))}
                </div>

                {/* UPI ID Input */}
                <div>
                  <label className="block text-blue-800 dark:text-blue-300 font-semibold mb-2">
                    {t('enterUPIID')}
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="example@paytm"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none ${errors.upi ? 'border-red-300 dark:border-red-600' : 'border-blue-200 dark:border-blue-700 focus:border-blue-500'
                      }`}
                  />
                  {errors.upi && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.upi}</p>}
                </div>
              </div>
            )}

            {selectedMethod === 'card' && (
              <div className="mb-8 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-200 dark:border-purple-700">
                <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-4">{t('cardDetails')}</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-purple-800 dark:text-purple-300 font-semibold mb-2">
                      {t('cardNumber')}
                    </label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => handleCardInputChange('number', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-mono ${errors.number ? 'border-red-300 dark:border-red-600' : 'border-purple-200 dark:border-purple-700 focus:border-purple-500'
                        }`}
                    />
                    {errors.number && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.number}</p>}
                  </div>

                  <div>
                    <label className="block text-purple-800 dark:text-purple-300 font-semibold mb-2">
                      {t('expiryDate')}
                    </label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                      placeholder="MM/YY"
                      maxLength="5"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-mono ${errors.expiry ? 'border-red-300 dark:border-red-600' : 'border-purple-200 dark:border-purple-700 focus:border-purple-500'
                        }`}
                    />
                    {errors.expiry && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.expiry}</p>}
                  </div>

                  <div>
                    <label className="block text-purple-800 dark:text-purple-300 font-semibold mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                      placeholder="123"
                      maxLength="4"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-mono ${errors.cvv ? 'border-red-300 dark:border-red-600' : 'border-purple-200 dark:border-purple-700 focus:border-purple-500'
                        }`}
                    />
                    {errors.cvv && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.cvv}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-purple-800 dark:text-purple-300 font-semibold mb-2">
                      {t('cardHolderName')}
                    </label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) => handleCardInputChange('name', e.target.value)}
                      placeholder={t('nameOnCard')}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none ${errors.name ? 'border-red-300 dark:border-red-600' : 'border-purple-200 dark:border-purple-700 focus:border-purple-500'
                        }`}
                    />
                    {errors.name && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === 'cod' && (
              <div className="mb-8 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-200 dark:border-orange-700">
                <h4 className="font-bold text-orange-800 dark:text-orange-300 mb-4">{t('cashOnDelivery')}</h4>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">💵</span>
                  </div>
                  <div>
                    <p className="text-orange-800 dark:text-orange-300 font-medium">{t('codPayAtDelivery')}</p>
                    <p className="text-orange-600 dark:text-orange-400 text-sm">{t('extraFees')}: ₹25</p>
                  </div>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-600 rounded-xl p-4">
                  <h5 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">📋 {t('codRules')}:</h5>
                  <ul className="text-sm text-orange-700 dark:text-orange-400 space-y-1">
                    <li>• {t('codRule1')}</li>
                    <li>• {t('codRule2')}</li>
                    <li>• {t('codRule3')}</li>
                    <li>• {t('codRule4')}</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Security Info */}
            <div className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-700">
              <h4 className="font-bold text-green-800 dark:text-green-400 mb-3 flex items-center space-x-2">
                <span>🔒</span>
                <span>{t('securityGuarantee')}</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-700 dark:text-green-400">
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>256-bit SSL {t('encryption')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>PCI DSS {t('compliant')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>100% {t('securePayment')}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={onCancel}
                className="px-8 py-3 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 rounded-xl hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                {t('cancel')}
              </button>

              <button
                onClick={processPayment}
                disabled={isProcessing}
                className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>₹{(orderDetails?.total + (selectedMethod === 'cod' ? 25 : 0))?.toLocaleString()} {t('payNow')}</span>
                <span>🔒</span>
              </button>
            </div>
          </div>
        )}

        {/* Processing State */}
        {paymentStep === 'processing' && (
          <div className="p-8 text-center">
            <LoadingSpinner />
            <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mt-6 mb-4">
              {t('paymentProcessingMsg')}
            </h3>
            <p className="text-emerald-600 dark:text-emerald-400 mb-8">
              {t('pleaseWaitMsg')}
            </p>

            <div className="bg-yellow-50 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6">
              <div className="flex items-center justify-center space-x-2 text-yellow-800 dark:text-yellow-300">
                <span>⚠️</span>
                <span className="font-semibold">{t('important')}:</span>
              </div>
              <p className="text-yellow-700 dark:text-yellow-400 mt-2">
                {t('noCloseRefreshMsg')}
              </p>
            </div>
          </div>
        )}

        {/* Success State */}
        {paymentStep === 'success' && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-3xl">✅</span>
            </div>

            <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-4">
              {t('paymentSuccess')}!
            </h3>
            <p className="text-green-600 dark:text-green-400 mb-6">
              {t('paymentCompleteMsg')}
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-600 dark:text-green-400">Transaction ID:</span>
                  <div className="font-mono font-bold text-green-800 dark:text-green-400">{transactionId}</div>
                </div>
                <div>
                  <span className="text-green-600 dark:text-green-400">{t('amount')}:</span>
                  <div className="font-bold text-green-800 dark:text-green-400">₹{(orderDetails?.total + (selectedMethod === 'cod' ? 25 : 0))?.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-green-600 dark:text-green-400">{t('paymentMethod')}:</span>
                  <div className="font-bold text-green-800 dark:text-green-400">{paymentMethods.find(m => m.id === selectedMethod)?.name}</div>
                </div>
                <div>
                  <span className="text-green-600 dark:text-green-400">{t('time')}:</span>
                  <div className="font-bold text-green-800 dark:text-green-400">{new Date().toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onPaymentSuccess?.()}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              {t('viewOrders')}
            </button>
          </div>
        )}

        {/* Failure State */}
        {paymentStep === 'failure' && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-3xl">❌</span>
            </div>

            <h3 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-4">
              {t('paymentFailure')}
            </h3>
            <p className="text-red-600 dark:text-red-400 mb-6">
              {t('paymentFailedTryAgain')}
            </p>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setPaymentStep('method')}
                className="bg-emerald-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                {t('tryAgain')}
              </button>
              <button
                onClick={onCancel}
                className="border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 px-8 py-3 rounded-xl hover:bg-emerald-50 transition-colors duration-300"
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentGateway;
