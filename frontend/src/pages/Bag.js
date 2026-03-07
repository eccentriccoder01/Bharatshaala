import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
// import PaymentGateway from "../components/PaymentGateway";
import { useLanguage } from "../context/LanguageContext"
import "../App.css";

/*
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
    document.body.removeChild(script);
  });
}
*/

const Bag = () => {
  const { t, language } = useLanguage();
  const [profileData, setProfileData] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [_shipCost, setShipCost] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [_order_details, setOrderDetails] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [notification, setNotification] = useState(null);

  const deliveryOptions = [
    { id: 'standard', name: language === 'hi' ? 'मानक डिलीवरी' : t('standardDelivery'), time: language === 'hi' ? '5-7 दिन' : `5-7 ${t('days')}`, cost: 0, description: language === 'hi' ? '999 रुपये से ऊपर के ऑर्डर पर मुफ्त' : t('freeDeliveryMsg') },
    { id: 'express', name: language === 'hi' ? 'एक्सप्रेस डिलीवरी' : t('expressDelivery'), time: language === 'hi' ? '2-3 दिन' : `2-3 ${t('days')}`, cost: 150, description: language === 'hi' ? 'तेज और सुरक्षित डिलीवरी' : t('fastDeliveryMsg') },
    { id: 'overnight', name: language === 'hi' ? 'ओवरनाइट डिलीवरी' : t('overnightDelivery'), time: language === 'hi' ? '1 दिन' : `1 ${t('days').slice(0, -1)}`, cost: 300, description: language === 'hi' ? 'अगले दिन डिलीवरी गारंटी' : t('nextDayDeliveryMsg') }
  ];

  const coupons = [
    { code: 'BHARATSHAALA10', discount: 10, minOrder: 1000, description: '10% OFF' },
    { code: 'FIRST25', discount: 25, minOrder: 500, description: '25% OFF' },
    { code: 'HERITAGE15', discount: 15, minOrder: 1500, description: '15% OFF' }
  ];

  useEffect(() => {
    Promise.all([
      getAmount(),
      makeOrder(),
      getShippingCost(),
      getData()
    ]).finally(() => {
      setTimeout(() => setLoading(false), 1000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  function getAmount() {
    return axios({
      method: "GET",
      url: "/getTotalAmount",
    })
      .then((response) => {
        setSubtotal(response.data.totalAmount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setSubtotal(5000); // Mock data
      });
  }

  function handleChange(event, item) {
    const selectedValue = event.target.value;
    axios
      .post("/ChangeQuantity", { item, selectedValue })
      .then((response) => {
        getData();
        getAmount();
        showNotification(language === 'hi' ? 'मात्रा अपडेट की गई' : t('quantityUpdated'), 'success');
      })
      .catch((error) => {
        showNotification(language === 'hi' ? 'मात्रा अपडेट करने में त्रुटि' : t('quantityUpdateError'), 'error');
      });
  }

  function removeItem(item) {
    axios
      .post("/RemoveFromCart", { item })
      .then((response) => {
        getData();
        getAmount();
        showNotification(language === 'hi' ? 'आइटम हटा दिया गया' : t('itemRemoved'), 'success');
      })
      .catch((error) => {
        showNotification(language === 'hi' ? 'आइटम हटाने में त्रुटि' : t('itemRemoveError'), 'error');
      });
  }

  function getShippingCost() {
    return axios({
      method: "GET",
      url: "/getShippingCost",
    })
      .then((response) => {
        setShipCost(response.data.shippingCost);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function getData() {
    return axios({
      method: "GET",
      url: "/profile",
    })
      .then((response) => {
        setProfileData(response.data.cart);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Mock data
        setProfileData([
          {
            id: 1,
            name: 'कुंदन पर्ल नेकलेस सेट',
            image: '/images/items/kundan-necklace-1.jpg',
            price: 15999,
            quantity: 1,
            seller: 'राजस्थानी जेम्स'
          }
        ]);
      });
  }

  function makeOrder() {
    return axios({
      method: "GET",
      url: "/makeOrder",
    })
      .then((response) => {
        setOrderDetails(response.data.order);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function showNotification(message, type) {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }

  function applyCoupon() {
    const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      if (subtotal >= coupon.minOrder) {
        const discountAmount = (subtotal * coupon.discount) / 100;
        setDiscount(discountAmount);
        showNotification(language === 'hi' ? `कूपन लागू: ₹${discountAmount} की बचत` : `Coupon applied: ₹${discountAmount} saved`, 'success');
      } else {
        showNotification(language === 'hi' ? `न्यूनतम ऑर्डर ₹${coupon.minOrder} होना चाहिए` : `Minimum order of ₹${coupon.minOrder} required`, 'error');
      }
    } else {
      showNotification(language === 'hi' ? 'अमान्य कूपन कोड' : 'Invalid coupon code', 'error');
    }
  }

  function getDeliveryCost() {
    const option = deliveryOptions.find(opt => opt.id === deliveryOption);
    return subtotal >= 999 && deliveryOption === 'standard' ? 0 : option?.cost || 0;
  }

  const finalTotal = subtotal - discount + getDeliveryCost();

  if (loading) {
    return <LoadingSpinner message={t('loading')} />;
  }

  return (
    <React.StrictMode>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 dark:from-gray-900 via-green-50 dark:via-gray-900 to-emerald-100 dark:to-gray-800 pt-20">

        {/* Notification */}
        {notification && (
          <div className={`fixed top-24 right-6 z-50 p-4 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white animate-fade-in`}>
            {notification.message}
          </div>
        )}

        {/* Header */}
        <div className='max-w-7xl mx-auto px-6 py-8'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-emerald-800 dark:text-emerald-200 mb-4'>
              {language === 'hi' ? 'शॉपिंग बैग' : t('shoppingBag')}
            </h1>
            <p className='text-xl text-emerald-600 dark:text-emerald-400 max-w-2xl mx-auto'>
              {language === 'hi'
                ? 'आपकी यात्रा से चुने गए आइटम्स देखें और जो चाहिए उन्हें चेकआउट के लिए तैयार करें'
                : t('bagSubtitle')}
            </p>
          </div>

          {profileData && profileData.length > 0 ? (
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

              {/* Cart Items */}
              <div className='lg:col-span-2 space-y-6'>
                <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg'>
                  <h2 className='text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-6 flex items-center space-x-3'>
                    <span>🛍️</span>
                    <span>{language === 'hi' ? 'आपके आइटम्स' : t('yourItems')} ({profileData.length})</span>
                  </h2>

                  <div className='space-y-4'>
                    {profileData.map((item, index) => (
                      <CartItem
                        key={index}
                        item={item}
                        onQuantityChange={handleChange}
                        onRemove={removeItem}
                      />
                    ))}
                  </div>
                </div>

                {/* Delivery Options */}
                <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg'>
                  <h3 className='text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-4 flex items-center space-x-2'>
                    <span>🚚</span>
                    <span>{language === 'hi' ? 'डिलीवरी विकल्प' : t('deliveryOptions')}</span>
                  </h3>

                  <div className='space-y-3'>
                    {deliveryOptions.map((option) => (
                      <label key={option.id} className='flex items-center space-x-3 p-4 border border-emerald-200 dark:border-emerald-700 rounded-xl cursor-pointer hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors duration-200'>
                        <input
                          type="radio"
                          name="delivery"
                          value={option.id}
                          checked={deliveryOption === option.id}
                          onChange={(e) => setDeliveryOption(e.target.value)}
                          className="text-emerald-600 dark:text-emerald-400"
                        />
                        <div className='flex-1'>
                          <div className='flex justify-between items-center'>
                            <span className='font-semibold text-emerald-800 dark:text-emerald-200'>{option.name}</span>
                            <span className='font-bold text-emerald-600 dark:text-emerald-400'>
                              {option.cost === 0 ? (language === 'hi' ? 'मुफ्त' : t('free')) : `₹${option.cost}`}
                            </span>
                          </div>
                          <div className='text-emerald-600 dark:text-emerald-400 text-sm'>{option.time} • {option.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Coupon Section */}
                <div className='bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg'>
                  <h3 className='text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-4 flex items-center space-x-2'>
                    <span>🎫</span>
                    <span>{language === 'hi' ? 'कूपन कोड' : t('couponCode')}</span>
                  </h3>

                  <div className='flex gap-3 mb-4'>
                    <input
                      type="text"
                      placeholder={language === 'hi' ? 'कूपन कोड दर्ज करें' : t('enterCouponCode')}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-4 py-3 border border-emerald-200 dark:border-emerald-700 rounded-xl focus:border-emerald-500 dark:bg-gray-700 dark:text-white focus:outline-none"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      {language === 'hi' ? 'लागू करें' : t('apply')}
                    </button>
                  </div>

                  <div className='space-y-2'>
                    <p className='text-emerald-600 dark:text-emerald-400 text-sm font-medium'>
                      {language === 'hi' ? 'उपलब्ध कूपन:' : t('availableCoupons')}
                    </p>
                    {coupons.map((coupon, index) => (
                      <div key={index} className='text-emerald-600 dark:text-emerald-400 text-sm bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-lg border border-emerald-200 dark:border-emerald-700'>
                        <span className='font-semibold'>{coupon.code}</span> - {coupon.description}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className='lg:col-span-1'>
                <OrderSummary
                  subtotal={subtotal}
                  discount={discount}
                  deliveryCost={getDeliveryCost()}
                  total={finalTotal}
                  onCheckout={() => document.getElementById("checkout-button").click()}
                />
              </div>
            </div>
          ) : (
            /* Empty Cart */
            <div className='text-center py-20'>
              <div className='text-8xl mb-6'>🛒</div>
              <h2 className='text-3xl font-bold text-emerald-800 dark:text-emerald-200 mb-4'>
                {language === 'hi' ? 'आपका बैग खाली है' : t('emptyBag')}
              </h2>
              <p className='text-xl text-emerald-600 dark:text-emerald-400 mb-8'>
                {language === 'hi' ? 'भारतशाला में कुछ खूबसूरत चीजें खोजें' : t('emptyBagDesc')}
              </p>
              <a
                href="/markets"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <span>🛍️</span>
                <span>{language === 'hi' ? 'शॉपिंग शुरू करें' : t('startShopping')}</span>
              </a>
            </div>
          )}
        </div>

        {/* Hidden Checkout Button for Razorpay */}
        <button id="checkout-button" className="hidden"></button>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </React.StrictMode>
  );
};

export default Bag;