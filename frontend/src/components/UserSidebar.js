import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

const UserSidebar = ({ user }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { t } = useLanguage();


    const menuItems = [
        { id: 'dashboard', name: t('dashboard'), icon: '🏠', href: '/user/dashboard' },
        { id: 'orders', name: t('myOrders'), icon: '📦', href: '/user/orders', badge: '3' },
        { id: 'wishlist', name: t('wishlist'), icon: '❤️', href: '/user/wishlist', badge: '12' },
        { id: 'addresses', name: t('addresses'), icon: '📍', href: '/user/addresses' },
        { id: 'payments', name: t('paymentMethods'), icon: '💳', href: '/user/payments' },
        { id: 'rewards', name: t('rewards'), icon: '🎁', href: '/user/rewards' },
        { id: 'notifications', name: t('notifications'), icon: '🔔', href: '/user/notifications' },
        { id: 'settings', name: t('settings'), icon: '⚙️', href: '/user/settings' },
        { id: 'support', name: t('support'), icon: '💬', href: '/user/support' }
    ];

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-200 dark:border-emerald-700 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-80'
            }`}>
            {/* Header */}
            <div className='p-6 border-b border-emerald-200 dark:border-emerald-700'>
                <div className='flex items-center justify-between'>
                    {!isCollapsed && (
                        <div className='flex items-center space-x-3'>
                            <div className='w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg'>
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <h3 className='font-bold text-emerald-800 dark:text-emerald-200'>{user?.name || t('user')}</h3>
                                <p className='text-emerald-600 dark:text-emerald-400 text-sm'>{user?.email}</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className='p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200'
                    >
                        {isCollapsed ? '→' : '←'}
                    </button>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className='p-4'>
                <ul className='space-y-2'>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <li key={item.id}>
                                <a
                                    href={item.href}
                                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md'
                                        : 'text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    <span className='text-xl'>{item.icon}</span>
                                    {!isCollapsed && (
                                        <>
                                            <span className='font-medium flex-1'>{item.name}</span>
                                            {item.badge && (
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${isActive
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-emerald-500 text-white'
                                                    }`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </>
                                    )}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Actions */}
            {!isCollapsed && (
                <div className='p-4 border-t border-emerald-200 dark:border-emerald-700'>
                    <div className='space-y-3'>
                        {/* Quick Stats */}
                        <div className='bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4 border border-emerald-200 dark:border-emerald-700'>
                            <h4 className='font-semibold text-emerald-800 dark:text-emerald-200 mb-3 text-sm'>{t('yourActivity')}</h4>
                            <div className='grid grid-cols-2 gap-3 text-center'>
                                <div>
                                    <div className='text-lg font-bold text-emerald-600 dark:text-emerald-400'>8</div>
                                    <div className='text-xs text-emerald-600 dark:text-emerald-400'>{t('totalOrders')}</div>
                                </div>
                                <div>
                                    <div className='text-lg font-bold text-emerald-600 dark:text-emerald-400'>₹15,420</div>
                                    <div className='text-xs text-emerald-600 dark:text-emerald-400'>{t('totalSpend')}</div>
                                </div>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className='w-full flex items-center justify-center space-x-2 p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors duration-200'
                        >
                            <span>🚪</span>
                            <span className='font-medium'>{t('logout')}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserSidebar;