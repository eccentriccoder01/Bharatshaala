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
  const { theme, changeTheme } = useTheme();
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
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const tabs = [
    { id: 'profile', name: t('profileInfo'), icon: '👤' },
    { id: 'addresses', name: t('addresses'), icon: '📍' },
    { id: 'security', name: t('security'), icon: '🔒' },
    { id: 'appearance', name: t('appearance'), icon: '🎨' }
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
      setProfileData({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        avatar: user?.avatar || '',
        preferences: { categories: [], priceRange: { min: 0, max: 100000 }, brands: [] }
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

  const handleAvatarUpload = async (files) => {
    if (files.length === 0) return;
    setUploadingAvatar(true);
    try {
      const response = await uploadFile('/user/avatar', files[0]);
      if (response.success) {
        setProfileData(prev => ({ ...prev, avatar: response.avatarUrl }));
        showSuccess(t('photoUpdated'));
      }
    } catch (error) {
      showError(t('photoUploadError'));
    }
    setUploadingAvatar(false);
  };

  if (loading) return <LoadingSpinner message={t('loading')} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 dark:from-gray-900 via-green-50 dark:via-gray-900 to-emerald-100 dark:to-gray-800 pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">{t('myProfile')}</h1>
          <p className="text-emerald-600 dark:text-emerald-400 text-lg">{t('manageProfile')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-fit">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${activeTab === tab.id ? 'bg-emerald-500 text-white' : 'text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-gray-700'}`}>
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-6">{t('profileInfo')}</h2>
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img src={profileData.avatar || '/images/default-avatar.jpg'} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-emerald-200 dark:border-emerald-700" />
                    {uploadingAvatar && <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center animate-spin"></div>}
                  </div>
                  <ImageUploader onImagesChange={handleAvatarUpload} maxImages={1} buttonText={t('changePhoto')} buttonClassName="bg-emerald-500 text-white px-4 py-2 rounded-lg" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-emerald-800 dark:text-emerald-200 font-semibold mb-2">{t('name')} *</label>
                    <input type="text" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} className="w-full px-4 py-3 border-2 border-emerald-200 dark:border-emerald-700 rounded-lg dark:bg-gray-700 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-emerald-800 dark:text-emerald-200 font-semibold mb-2">{t('emailAddress')} *</label>
                    <input type="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} className="w-full px-4 py-3 border-2 border-emerald-200 dark:border-emerald-700 rounded-lg dark:bg-gray-700 dark:text-white" />
                  </div>
                </div>
                <button onClick={handleProfileUpdate} disabled={saving} className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition-colors">
                  {saving ? t('saving') : t('saveProfile')}
                </button>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">{t('appearanceSettings')}</h2>
                <div>
                  <h3 className="font-bold text-emerald-800 dark:text-emerald-200 mb-4">{t('chooseTheme')}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['light', 'dark', 'system'].map(opt => (
                      <button key={opt} onClick={() => changeTheme(opt)} className={`p-4 border-2 rounded-xl transition-all ${theme === opt ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' : 'border-gray-200 dark:border-gray-700'}`}>
                        <div className="text-center">
                          <div className="text-2xl mb-2">{opt === 'light' ? '☀️' : opt === 'dark' ? '🌙' : '🔄'}</div>
                          <span className="font-medium">{t(opt)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-emerald-800 dark:text-emerald-200 mb-4">{t('chooseLanguage')}</h3>
                  <select value={language} onChange={(e) => changeLanguage(e.target.value)} className="w-full px-4 py-3 border-2 border-emerald-200 dark:border-emerald-700 rounded-lg dark:bg-gray-700 dark:text-white">
                    {languages.map(lang => <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>)}
                  </select>
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