import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAPI } from '../hooks/useAPI';
import { useNotification } from '../context/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLanguage } from '../context/LanguageContext';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { get } = useAPI();
  const { showSuccess } = useNotification();
  const { language } = useLanguage();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      loadOrderDetails();
      showSuccess(language === 'hi' ? 'ऑर्डर सफलतापूर्वक प्लेस हो गया!' : 'Order placed successfully!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, language]);

  const loadOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await get(`/orders/${orderId}`);
      if (response.success) {
        setOrder(response.order);
      }
    } catch (error) {
      console.error('Error loading order:', error);
      // Mock data for demo
      setOrder({
        id: orderId,
        orderNumber: `ORD-${orderId}`,
        status: 'confirmed',
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        items: [
          {
            id: 1,
            name: 'कुंदन पर्ल नेकलेस सेट',
            image: '/images/items/kundan-necklace-1.jpg',
            price: 15999,
            quantity: 1,
            seller: 'राजस्थानी जेम्स'
          }
        ],
        address: {
          name: 'राम शर्मा',
          phone: '+91 9876543210',
          addressLine1: '123, मेन स्ट्रीट',
          city: 'जयपुर',
          state: 'राजस्थान',
          pincode: '302001'
        },
        payment: {
          method: 'UPI',
          transactionId: 'TXN1234567890',
          amount: 16098,
          status: 'completed'
        },
        summary: {
          subtotal: 15999,
          shipping: 99,
          discount: 0,
          total: 16098
        }
      });
    }
    setLoading(false);
  };

  const downloadInvoice = () => {
    window.open(`/api/orders/${orderId}/invoice`, '_blank');
  };

  const shareOrder = () => {
    if (navigator.share) {
      navigator.share({
        title: language === 'hi' ? 'मेरा ऑर्डर' : 'My Order',
        text: language === 'hi'
          ? `मैंने भारतशाला से ऑर्डर किया है! ऑर्डर नंबर: ${order.orderNumber}`
          : `I ordered from Bharatshaala! Order Number: ${order.orderNumber}`,
        url: window.location.href
      });
    }
  };

  if (loading) {
    return <LoadingSpinner message={language === 'hi' ? "ऑर्डर विवरण लोड हो रहा है..." : "Loading order details..."} />;
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {language === 'hi' ? 'ऑर्डर नहीं मिला' : 'Order not found'}
          </h2>
          <button
            onClick={() => navigate('/user/orders')}
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600"
          >
            {language === 'hi' ? 'मेरे ऑर्डर्स देखें' : 'View My Orders'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-4xl">✅</span>
          </div>
          <h1 className="text-4xl font-bold text-emerald-800 dark:text-emerald-200 mb-4">
            {language === 'hi' ? 'ऑर्डर कन्फर्म हो गया!' : 'Order Confirmed!'}
          </h1>
          <p className="text-xl text-emerald-600 dark:text-emerald-400 mb-2">
            {language === 'hi' ? 'धन्यवाद! आपका ऑर्डर सफलतापूर्वक प्लेस हो गया है।' : 'Thank you! Your order has been placed successfully.'}
          </p>
          <p className="text-emerald-500 dark:text-emerald-400">
            {language === 'hi' ? 'ऑर्डर नंबर: ' : 'Order Number: '}
            <span className="font-bold text-emerald-700 dark:text-emerald-300">{order.orderNumber}</span>
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">

          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">{language === 'hi' ? 'ऑर्डर विवरण' : 'Order Details'}</h2>
                <p>{language === 'hi' ? 'ऑर्डर दिनांक: ' : 'Order Date: '} {new Date(order.orderDate).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN')}</p>
              </div>
              <div className="text-right">
                <p className="text-emerald-100 dark:text-emerald-300">{language === 'hi' ? 'स्थिति' : 'Status'}</p>
                <span className="bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-sm font-semibold">
                  {order.status === 'confirmed' ? (language === 'hi' ? 'कन्फर्म' : 'Confirmed') : order.status}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-emerald-800 dark:text-emerald-200 mb-4">{language === 'hi' ? 'ऑर्डर ट्रैकिंग' : 'Order Tracking'}</h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-xs mt-2 text-center">{language === 'hi' ? 'ऑर्डर प्लेसड' : 'Order Placed'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{language === 'hi' ? 'आज' : 'Today'}</p>
              </div>

              <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-600 mx-2">
                <div className="h-1 bg-green-500 w-0"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">📦</span>
                </div>
                <p className="text-xs mt-2 text-center">{language === 'hi' ? 'पैकेजिंग' : 'Packaging'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">1-2 {language === 'hi' ? 'दिन' : 'days'}</p>
              </div>

              <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-600 mx-2"></div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">🚚</span>
                </div>
                <p className="text-xs mt-2 text-center">{language === 'hi' ? 'शिप्ड' : 'Shipped'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2-3 {language === 'hi' ? 'दिन' : 'days'}</p>
              </div>

              <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-600 mx-2"></div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">🏠</span>
                </div>
                <p className="text-xs mt-2 text-center">{language === 'hi' ? 'डिलीवर्ड' : 'Delivered'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(order.estimatedDelivery).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN')}
                </p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-emerald-800 dark:text-emerald-200 mb-4">{language === 'hi' ? 'ऑर्डर किए गए आइटम' : 'Ordered Items'}</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-emerald-800 dark:text-emerald-200">{item.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{language === 'hi' ? 'विक्रेता: ' : 'Seller: '} {item.seller}</p>
                    <p className="text-gray-600 dark:text-gray-300">{language === 'hi' ? 'मात्रा: ' : 'Quantity: '} {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-800 dark:text-emerald-200">₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-emerald-800 dark:text-emerald-200 mb-4">{language === 'hi' ? 'भुगतान विवरण' : 'Payment Details'}</h3>
            <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{language === 'hi' ? 'उत्पाद राशि:' : 'Subtotal:'}</span>
                  <span>₹{order.summary.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'hi' ? 'डिलीवरी चार्ज:' : 'Delivery Charges:'}</span>
                  <span>₹{order.summary.shipping.toLocaleString()}</span>
                </div>
                {order.summary.discount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>{language === 'hi' ? 'छूट:' : 'Discount:'}</span>
                    <span>-₹{order.summary.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-emerald-200 dark:border-emerald-700 pt-2 flex justify-between text-lg font-bold text-emerald-800 dark:text-emerald-200">
                  <span>{language === 'hi' ? 'कुल राशि:' : 'Total Amount:'}</span>
                  <span>₹{order.summary.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-700">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{language === 'hi' ? 'भुगतान विधि:' : 'Payment Method:'}</span>
                  <span>{order.payment.method}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="font-semibold">Transaction ID:</span>
                  <span className="font-mono text-sm">{order.payment.transactionId}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="font-semibold">{language === 'hi' ? 'भुगतान स्थिति:' : 'Payment Status:'}</span>
                  <span className="text-green-600 dark:text-green-400">{language === 'hi' ? '✅ सफल' : '✅ Successful'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="p-6">
            <h3 className="font-bold text-emerald-800 dark:text-emerald-200 mb-4">{language === 'hi' ? 'डिलीवरी पता' : 'Delivery Address'}</h3>
            <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4">
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-200">{order.address.name}</h4>
              <p className="text-gray-700 dark:text-gray-300 mt-1">{order.address.phone}</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                {order.address.addressLine1}<br />
                {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => navigate(`/track-order/${orderId}`)}
            className="bg-emerald-500 text-white py-3 px-6 rounded-xl hover:bg-emerald-600 transition-colors duration-200 text-center"
          >
            {language === 'hi' ? '📍 ऑर्डर ट्रैक करें' : '📍 Track Order'}
          </button>

          <button
            onClick={downloadInvoice}
            className="bg-blue-500 text-white py-3 px-6 rounded-xl hover:bg-blue-600 transition-colors duration-200 text-center"
          >
            {language === 'hi' ? '📄 इनवॉइस डाउनलोड करें' : '📄 Download Invoice'}
          </button>

          <button
            onClick={shareOrder}
            className="bg-purple-500 text-white py-3 px-6 rounded-xl hover:bg-purple-600 transition-colors duration-200 text-center"
          >
            {language === 'hi' ? '📤 शेयर करें' : '📤 Share'}
          </button>

          <button
            onClick={() => navigate('/user/orders')}
            className="bg-gray-500 text-white py-3 px-6 rounded-xl hover:bg-gray-600 transition-colors duration-200 text-center"
          >
            {language === 'hi' ? '📋 सभी ऑर्डर्स देखें' : '📋 View All Orders'}
          </button>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
          <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-3">📱 {language === 'hi' ? 'अगले स्टेप्स' : 'Next Steps'}</h3>
          <ul className="space-y-2 text-blue-700 dark:text-blue-400">
            <li className="flex items-center space-x-2">
              <span>✓</span>
              <span>{language === 'hi' ? 'आपको ऑर्डर कन्फर्मेशन का SMS/Email मिलेगा' : 'You will receive an order confirmation SMS/Email'}</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>✓</span>
              <span>{language === 'hi' ? 'विक्रेता आपके ऑर्डर को प्रोसेस करेगा' : 'Seller will process your order'}</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>✓</span>
              <span>{language === 'hi' ? 'शिपमेंट का ट्रैकिंग लिंक मिलेगा' : 'You will receive a shipment tracking link'}</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>✓</span>
              <span>{language === 'hi' ? 'डिलीवरी के बाद प्रोडक्ट को रेट करना न भूलें' : 'Do not forget to rate the product after delivery'}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
