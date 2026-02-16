import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAPI } from '../hooks/useAPI';
import { useNotification } from '../context/NotificationContext';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ImageUploader from '../components/ImageUploader';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser, isAuthenticated } = useAuth();
  const { get, put, uploadFile } = useAPI();
  const { showSuccess, showError } = useNotification();
  const { theme, changeTheme, accentColor, changeAccentColor } = useTheme();
  const { language, changeLanguage, languages, t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bio: '',
    avatar: '',
    preferences: {
      categories: [],
      priceRange: { min: 0, max: 100000 },
      brands: []
    }
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [addresses, setAddresses] = useState([]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'home',
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const tabs = [
    { id: 'profile', name: t('profileInfo'), icon: '👤' },
    { id: 'addresses', name: t('addresses'), icon: '📍' },
    { id: 'preferences', name: t('preferences'), icon: '⚙️' },
    { id: 'security', name: t('security'), icon: '🔒' },
    { id: 'notifications', name: t('notifications'), icon: '🔔' },
    { id: 'appearance', name: t('appearance'), icon: '🎨' }
  ];

  const categories = [
    { id: 'jewelry', name: t('jewellery'), icon: '💎' },
    { id: 'clothing', name: t('clothing'), icon: '👗' },
    { id: 'handicrafts', name: t('handicrafts'), icon: '🎨' },
    { id: 'books', name: t('books'), icon: '📚' },
    { id: 'accessories', name: t('accessories'), icon: '👜' },
    { id: 'houseware', name: t('houseware'), icon: '🏠' }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/profile');
      return;
    }
    loadProfileData();
  }, [isAuthenticated]);

  const loadProfileData = async () => {
    setLoading(true);
    try {
      const response = await get('/user/profile');
      if (response.success) {
        setProfileData(response.profile);
        setAddresses(response.addresses || []);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      // Set default data from auth context
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        preferences: {
          categories: user.preferences?.categories || [],
          priceRange: user.preferences?.priceRange || { min: 0, max: 100000 },
          brands: user.preferences?.brands || []
        }
      });
    }
    setLoading(false);
  };

  const handleProfileUpdate = async () => {
    setSaving(true);
    try {
      const response = await put('/user/profile', profileData);
      if (response.success) {
        updateUser(response.user);
        showSuccess(t('profileUpdated'));
      }
    } catch (error) {
      showError(t('profileUpdateError'));
    }
    setSaving(false);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showError(t('errors.passwordMismatch'));
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showError(t('passwordCriteria.length'));
      return;
    }

    setSaving(true);
    try {
      const response = await put('/user/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      if (response.success) {
        showSuccess(t('passwordChanged'));
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      showError(t('passwordChangeError'));
    }
    setSaving(false);
  };

  const handleAvatarUpload = async (files) => {
    if (files.length === 0) return;

    setUploadingAvatar(true);
    try {
      const response = await uploadFile('/user/avatar', files[0], (progress) => {
        // Handle upload progress if needed
      });

      if (response.success) {
        setProfileData(prev => ({ ...prev, avatar: response.avatarUrl }));
        showSuccess(t('photoUpdated'));
      }
    } catch (error) {
      showError(t('photoUploadError'));
    }
    setUploadingAvatar(false);
  };

  const handleAddAddress = async () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.addressLine1 || !newAddress.city || !newAddress.pincode) {
      showError(t('fillRequiredFields'));
      return;
    }

    setSaving(true);
    try {
      const response = await put('/user/addresses', newAddress);
      if (response.success) {
        setAddresses(prev => [...prev, response.address]);
        setShowAddAddress(false);
        setNewAddress({
          type: 'home',
          name: '',
          phone: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          pincode: '',
          isDefault: false
        });
        showSuccess(t('addressAdded'));
      }
    } catch (error) {
      showError(t('addressAddError'));
    }
    setSaving(false);
  };

  if (loading) {
    return <LoadingSpinner message={t('loading')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">
            {t('myProfile')}
          </h1>
          <p className="text-emerald-600 text-lg">
            {t('manageProfile')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar Tabs */}
          <div className="bg-white rounded-2xl p-6 shadow-lg h-fit">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeTab === tab.id
                    ? 'bg-emerald-500 text-white'
                    : 'text-emerald-700 hover:bg-emerald-50'
                    }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-lg">

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-emerald-800 mb-6">{t('profileInfo')}</h2>

                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      src={profileData.avatar || '/images/default-avatar.jpg'}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-emerald-200"
                    />
                    {uploadingAvatar && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-emerald-800 mb-2">{t('profilePhoto')}</h3>
                    <ImageUploader
                      onImagesChange={handleAvatarUpload}
                      maxImages={1}
                      acceptedFileTypes={['image/jpeg', 'image/png']}
                      maxFileSize={2} // 2MB
                      disabled={uploadingAvatar}
                      buttonText={t('changePhoto')}
                      buttonClassName="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
                    />
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-emerald-800 font-semibold mb-2">{t('name')} *</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-emerald-800 font-semibold mb-2">{t('emailAddress')} *</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-emerald-800 font-semibold mb-2">{t('phoneNumber')}</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-emerald-800 font-semibold mb-2">{t('dateOfBirth')}</label>
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-emerald-800 font-semibold mb-2">{t('gender')}</label>
                    <select
                      value={profileData.gender}
                      onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="">{t('select')}</option>
                      <option value="male">{t('male')}</option>
                      <option value="female">{t('female')}</option>
                      <option value="other">{t('other')}</option>
                    </select>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-emerald-800 font-semibold mb-2">{t('bio')}</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none resize-none"
                    placeholder={t('bioPlaceholder')}
                  ></textarea>
                </div>

                <button
                  onClick={handleProfileUpdate}
                  disabled={saving}
                  className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors duration-200"
                >
                  {saving ? t('saving') : t('saveProfile')}
                </button>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-emerald-800">{t('savedAddresses')}</h2>
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors duration-200"
                  >
                    + {t('addNewAddress')}
                  </button>
                </div>

                {addresses.length > 0 ? (
                  <div className="space-y-4">
                    {addresses.map((address, index) => (
                      <div key={index} className="p-6 border-2 border-emerald-200 rounded-xl">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-emerald-800">{address.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${address.type === 'home' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                }`}>
                                {address.type === 'home' ? `🏠 ${t('home')}` : `🏢 ${t('office')}`}
                              </span>
                              {address.isDefault && (
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                  {t('defaultAddress')}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600">{address.phone}</p>
                            <p className="text-gray-700 mt-1">
                              {address.addressLine1}<br />
                              {address.addressLine2 && `${address.addressLine2}, `}
                              {address.city}, {address.state} - {address.pincode}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-emerald-600 hover:text-emerald-700">✏️</button>
                            <button className="text-red-600 hover:text-red-700">🗑️</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📍</div>
                    <p className="text-gray-600">{t('noSavedAddresses')}</p>
                  </div>
                )}

                {/* Add Address Modal */}
                {showAddAddress && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <h3 className="text-xl font-bold text-emerald-800 mb-6">{t('addNewAddress')}</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <input
                          type="text"
                          placeholder={`${t('name')} *`}
                          value={newAddress.name}
                          onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          className="px-4 py-3 border border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                        />
                        <input
                          type="tel"
                          placeholder={`${t('phoneNumber')} *`}
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          className="px-4 py-3 border border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder={`${t('addressLine1')} *`}
                          value={newAddress.addressLine1}
                          onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                          className="md:col-span-2 px-4 py-3 border border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder={t('addressLine2')}
                          value={newAddress.addressLine2}
                          onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                          className="md:col-span-2 px-4 py-3 border border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder={`${t('city')} *`}
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="px-4 py-3 border border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder={t('state')}
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          className="px-4 py-3 border border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder={`${t('pincode')} *`}
                          value={newAddress.pincode}
                          onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                          className="px-4 py-3 border border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                        />
                        <select
                          value={newAddress.type}
                          onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                          className="px-4 py-3 border border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                        >
                          <option value="home">{t('home')}</option>
                          <option value="office">{t('office')}</option>
                        </select>
                      </div>

                      <div className="flex items-center space-x-2 mb-6">
                        <input
                          type="checkbox"
                          checked={newAddress.isDefault}
                          onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                          className="w-4 h-4 text-emerald-600"
                        />
                        <label className="text-emerald-700">{t('defaultAddressLabel')}</label>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={handleAddAddress}
                          disabled={saving}
                          className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors duration-200"
                        >
                          {saving ? t('saving') : t('save')}
                        </button>
                        <button
                          onClick={() => setShowAddAddress(false)}
                          className="border border-emerald-500 text-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors duration-200"
                        >
                          {t('cancel')}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-emerald-800">{t('securitySettings')}</h2>

                {/* Change Password */}
                <div className="bg-emerald-50 rounded-xl p-6">
                  <h3 className="font-bold text-emerald-800 mb-4">{t('changePassword')}</h3>
                  <div className="space-y-4">
                    <input
                      type="password"
                      placeholder={t('currentPassword')}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                    <input
                      type="password"
                      placeholder={t('newPassword')}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                    <input
                      type="password"
                      placeholder={t('confirmNewPassword')}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    />
                    <button
                      onClick={handlePasswordChange}
                      disabled={saving}
                      className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors duration-200"
                    >
                      {saving ? t('loading') : t('changePassword')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-emerald-800">{t('appearanceSettings')}</h2>

                {/* Theme Selection */}
                <div>
                  <h3 className="font-bold text-emerald-800 mb-4">{t('chooseTheme')}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['light', 'dark', 'system'].map((themeOption) => (
                      <button
                        key={themeOption}
                        onClick={() => changeTheme(themeOption)}
                        className={`p-4 border-2 rounded-xl transition-all duration-200 ${theme === themeOption
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                          }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">
                            {themeOption === 'light' ? '☀️' : themeOption === 'dark' ? '🌙' : '🔄'}
                          </div>
                          <span className="font-medium">
                            {themeOption === 'light' ? t('light') :
                              themeOption === 'dark' ? t('dark') : t('system')}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language Selection */}
                <div>
                  <h3 className="font-bold text-emerald-800 mb-4">{t('chooseLanguage')}</h3>
                  <select
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Accent Color */}
                <div>
                  <h3 className="font-bold text-emerald-800 mb-4">{t('accentColor')}</h3>
                  <div className="grid grid-cols-5 gap-3">
                    {['emerald', 'blue', 'purple', 'orange', 'pink'].map((color) => (
                      <button
                        key={color}
                        onClick={() => changeAccentColor(color)}
                        className={`w-12 h-12 rounded-full border-4 transition-all duration-200 ${accentColor === color ? 'border-gray-800 scale-110' : 'border-gray-200'
                          } bg-${color}-500`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;