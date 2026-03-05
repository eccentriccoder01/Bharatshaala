import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useAPI } from '../hooks/useAPI';
import { useNotification } from '../hooks/useNotification';
import { useGeolocation } from '../hooks/useGeolocation';
import PaymentGateway from '../components/PaymentGateway';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLanguage } from '../context/LanguageContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartSummary, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { post } = useAPI();
  const { showSuccess, showError } = useNotification();
  const { deliveryAddress, setDeliveryFromCurrentLocation } = useGeolocation();
  const { language, t } = useLanguage();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    type: 'home'
  });
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const steps = [
    { id: 1, name: t('address'), icon: '📍' },
    { id: 2, name: t('delivery'), icon: '🚚' },
    { id: 3, name: t('payment'), icon: '💳' },
    { id: 4, name: t('confirmation'), icon: '✅' }
  ];

  const deliveryOptions = [
    {
      id: 'standard',
      name: t('standardDelivery'),
      description: `5-7 ${t('days')}`,
      price: 0,
      icon: '📦'
    },
    {
      id: 'express',
      name: t('expressDelivery'),
      description: `2-3 ${t('days')}`,
      price: 99,
      icon: '⚡'
    },
    {
      id: 'same_day',
      name: t('sameDayDelivery'),
      description: t('today'),
      price: 199,
      icon: '🏃'
    }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
      return;
    }

    if (items.length === 0) {
      navigate('/bag');
      return;
    }

    loadAddresses();
  }, [isAuthenticated, items.length, navigate]);

  const loadAddresses = async () => {
    try {
      const savedAddresses = JSON.parse(localStorage.getItem('user_addresses') || '[]');
      setAddresses(savedAddresses);

      if (savedAddresses.length > 0) {
        setSelectedAddress(savedAddresses[0]);
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
    }
  };

  const handleAddAddress = async () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.addressLine1 || !newAddress.city || !newAddress.pincode) {
      showError(t('fillAllFields'));
      return;
    }

    const addressToAdd = {
      id: Date.now(),
      ...newAddress,
      userId: user.id
    };

    const updatedAddresses = [...addresses, addressToAdd];
    setAddresses(updatedAddresses);
    setSelectedAddress(addressToAdd);
    localStorage.setItem('user_addresses', JSON.stringify(updatedAddresses));

    setShowAddAddress(false);
    setNewAddress({
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      type: 'home'
    });

    showSuccess(t('addressAdded'));
  };

  const handleStepComplete = () => {
    if (currentStep === 1 && !selectedAddress) {
      showError(t('selectAddressError'));
      return;
    }

    if (currentStep === 2 && !deliveryOption) {
      showError(t('selectDeliveryError'));
      return;
    }

    if (currentStep === 3) {
      prepareOrder();
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const prepareOrder = () => {
    const cartSummary = getCartSummary();
    const selectedDelivery = deliveryOptions.find(opt => opt.id === deliveryOption);

    const order = {
      userId: user.id,
      items: items.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        seller: item.seller
      })),
      address: selectedAddress,
      delivery: {
        option: deliveryOption,
        cost: selectedDelivery.price
      },
      summary: {
        subtotal: cartSummary.subtotal,
        shipping: selectedDelivery.price,
        discount: cartSummary.discount,
        total: cartSummary.subtotal + selectedDelivery.price - cartSummary.discount
      }
    };

    setOrderData(order);
    setShowPaymentGateway(true);
  };

  const handlePaymentSuccess = async (paymentData) => {
    setLoading(true);
    try {
      const orderWithPayment = {
        ...orderData,
        payment: paymentData,
        status: 'confirmed',
        orderDate: new Date().toISOString()
      };

      const response = await post('/orders', orderWithPayment);

      if (response.success) {
        clearCart();
        showSuccess(t('orderPlaced'));
        navigate(`/order-confirmation/${response.orderId}`);
      }
    } catch (error) {
      showError(t('orderError'));
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentFailure = (error) => {
    showError(t('paymentError'));
    setShowPaymentGateway(false);
  };

  if (loading) {
    return <LoadingSpinner message={t('processingOrder')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 dark:text-emerald-200 mb-4">{t('checkout')}</h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${currentStep >= step.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                  }`}>
                  {currentStep > step.id ? '✓' : step.icon}
                </div>
                <div className="ml-3">
                  <p className={`font-medium ${currentStep >= step.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${currentStep > step.id ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-600'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Step 1: Address Selection */}
            {currentStep === 1 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-6">{t('deliveryAddress')}</h2>

                {/* Existing Addresses */}
                {addresses.length > 0 && (
                  <div className="space-y-4 mb-6">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${selectedAddress?.id === address.id
                            ? 'border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30'
                            : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                          }`}
                        onClick={() => setSelectedAddress(address)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-emerald-800 dark:text-emerald-200">{address.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{address.phone}</p>
                            <p className="text-gray-700 dark:text-gray-300 mt-1">
                              {address.addressLine1}, {address.addressLine2 && `${address.addressLine2}, `}
                              {address.city}, {address.state} - {address.pincode}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${address.type === 'home' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400'
                            }`}>
                            {address.type === 'home' ? `🏠 ${t('home')}` : `🏢 ${t('office')}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add New Address */}
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="w-full p-4 border-2 border-dashed border-emerald-300 dark:border-emerald-700 rounded-xl text-emerald-600 dark:text-emerald-400 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  + {t('addNewAddress')}
                </button>

                {showAddAddress && (
                  <div className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                    <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-4">{t('newAddress')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder={`${t('name')} *`}
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                        className="px-4 py-3 border border-emerald-200 dark:border-emerald-700 rounded-lg focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="tel"
                        placeholder={`${t('phone')} *`}
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        className="px-4 py-3 border border-emerald-200 dark:border-emerald-700 rounded-lg focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder={`${t('addressLine1')} *`}
                        value={newAddress.addressLine1}
                        onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                        className="md:col-span-2 px-4 py-3 border border-emerald-200 dark:border-emerald-700 rounded-lg focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder={t('addressLine2')}
                        value={newAddress.addressLine2}
                        onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                        className="md:col-span-2 px-4 py-3 border border-emerald-200 dark:border-emerald-700 rounded-lg focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder={`${t('city')} *`}
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="px-4 py-3 border border-emerald-200 dark:border-emerald-700 rounded-lg focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder={t('state')}
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="px-4 py-3 border border-emerald-200 dark:border-emerald-700 rounded-lg focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder={`${t('pincode')} *`}
                        value={newAddress.pincode}
                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                        className="px-4 py-3 border border-emerald-200 dark:border-emerald-700 rounded-lg focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                      />
                      <select
                        value={newAddress.type}
                        onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                        className="px-4 py-3 border border-emerald-200 dark:border-emerald-700 rounded-lg focus:border-emerald-500 focus:outline-none dark:bg-gray-700 dark:text-white"
                      >
                        <option value="home">{t('home')}</option>
                        <option value="office">{t('office')}</option>
                      </select>
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={handleAddAddress}
                        className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors duration-200"
                      >
                        {t('save')}
                      </button>
                      <button
                        onClick={() => setShowAddAddress(false)}
                        className="border border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 px-6 py-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        {t('cancel')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Delivery Options */}
            {currentStep === 2 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-6">{t('deliveryOptions')}</h2>

                <div className="space-y-4">
                  {deliveryOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${deliveryOption === option.id
                          ? 'border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                        }`}
                      onClick={() => setDeliveryOption(option.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl">{option.icon}</span>
                          <div>
                            <h3 className="font-semibold text-emerald-800 dark:text-emerald-200">{option.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{option.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-800 dark:text-emerald-200">
                            {option.price === 0 ? t('free') : `₹${option.price}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-6">{t('paymentMethod')}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('paymentRedirectMsg')}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['UPI', t('cards'), t('netBanking'), t('wallets')].map((method) => (
                    <div key={method} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
                      <div className="text-2xl mb-2">
                        {method === 'UPI' ? '📱' :
                          method === t('cards') ? '💳' :
                            method === t('netBanking') ? '🏦' : '💰'}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{method}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  {t('previous')}
                </button>
              )}

              <button
                onClick={handleStepComplete}
                className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors duration-200 ml-auto"
              >
                {currentStep === 3 ? t('payNow') : t('next')}
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-fit">
            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-6">{t('orderSummary')}</h3>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-emerald-800 dark:text-emerald-200 line-clamp-2">{item.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{t('quantity')}: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-emerald-800 dark:text-emerald-200">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between">
                <span>{t('productTotal')}:</span>
                <span>₹{getCartSummary().subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('delivery')}:</span>
                <span>
                  {deliveryOption ?
                    (deliveryOptions.find(opt => opt.id === deliveryOption)?.price === 0 ?
                      t('free') :
                      `₹${deliveryOptions.find(opt => opt.id === deliveryOption)?.price}`
                    ) :
                    '₹0'
                  }
                </span>
              </div>
              {getCartSummary().discount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>{t('discount')}:</span>
                  <span>-₹{getCartSummary().discount.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between text-lg font-bold text-emerald-800 dark:text-emerald-200">
                <span>{t('totalAmount')}:</span>
                <span>
                  ₹{(
                    getCartSummary().total +
                    (deliveryOption ? deliveryOptions.find(opt => opt.id === deliveryOption)?.price || 0 : 0)
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Modal */}
      {showPaymentGateway && orderData && (
        <PaymentGateway
          orderDetails={orderData.summary}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentFailure={handlePaymentFailure}
          onCancel={() => setShowPaymentGateway(false)}
          isOpen={showPaymentGateway}
        />
      )}
    </div>
  );
};

export default Checkout;
