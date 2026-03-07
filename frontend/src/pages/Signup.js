import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from "../components/LoadingSpinner";
import "../App.css";
import axios from "axios";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useLanguage } from '../context/LanguageContext';

const Signup = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    accountType: "",
    phoneNumber: "",
    invitationCode: "",
    repeatPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [validations, setValidations] = useState({
    validPhoneNumber: false,
    validPassword: false
  });

  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    number: false,
    specialChar: false,
    uppercase: false,
    lowercase: false
  });

  const [otp, setOTP] = useState('');
  const [correctOTP, setCorrectOTP] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [, setOtpValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const steps = [
    { id: 1, title: t('accountType'), icon: '👤' },
    { id: 2, title: t('personalInfo'), icon: '📝' },
    { id: 3, title: t('verification'), icon: '✅' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const validateEmail = async (email) => {
    if (!email) {
      return t('errors.required');
    }

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      return t('errors.invalidEmail');
    }

    try {
      const response = await axios.post("/AuthenticateEmail", { email });
      if (response.data.exists) {
        return response.data.message;
      } else {
        return '';
      }
    } catch (error) {
      return t('emailCheckError');
    }
  };

  const validatePassword = (password) => {
    const lengthRegex = /.{8,}/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    const requirements = {
      length: lengthRegex.test(password),
      number: numberRegex.test(password),
      specialChar: specialCharRegex.test(password),
      uppercase: uppercaseRegex.test(password),
      lowercase: lowercaseRegex.test(password)
    };

    setPasswordRequirements(requirements);

    const isPasswordValid = Object.values(requirements).every(req => req);
    setValidations(prev => ({ ...prev, validPassword: isPasswordValid }));

    return isPasswordValid ? '' : t('passwordRequirementsNotMet');
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber || phoneNumber.length < 10) {
      return t('errors.invalidPhone');
    }
    setValidations(prev => ({ ...prev, validPhoneNumber: true }));
    return '';
  };

  const validateInvitationCode = async (code) => {
    if (formData.accountType === "vendor" && !code) {
      return t('errors.required');
    }

    if (code && formData.accountType === "vendor") {
      try {
        const response = await axios.post("/AuthenticateInvitationCode", { value: code });
        return response.data.exists ? "" : response.data.message;
      } catch (error) {
        return "Error checking invitation code"; // Should probably add a key for this too
      }
    }
    return '';
  };

  const handleInputChange = async (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Real-time validation
    let error = '';
    switch (field) {
      case 'email':
        error = await validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'phoneNumber':
        error = validatePhoneNumber(value);
        break;
      case 'name':
        error = !value ? t('errors.required') : '';
        break;
      case 'repeatPassword':
        error = value !== formData.password ? t('errors.passwordMismatch') : '';
        break;
      case 'invitationCode':
        error = await validateInvitationCode(value);
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const sendOTP = async () => {
    const phoneError = validatePhoneNumber(formData.phoneNumber);
    if (phoneError) {
      setErrors(prev => ({ ...prev, phoneNumber: phoneError }));
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/SendOTP", {
        name: formData.name,
        phoneNumber: formData.phoneNumber
      });

      if (response.data.success) {
        setOtpSent(true);
        setCorrectOTP(response.data.otp);
        setErrors(prev => ({ ...prev, phoneNumber: '' }));
      } else {
        setErrors(prev => ({ ...prev, phoneNumber: t('errors.otpError') }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, phoneNumber: t('errors.otpError') }));
    }
    setIsLoading(false);
  };

  const verifyOTP = async () => {
    if (otp === correctOTP) {
      setOtpValid(true);
      setCurrentStep(3);
      await signup();
    } else {
      setErrors(prev => ({ ...prev, otp: t('errors.invalidOtp') }));
    }
  };

  const signup = async () => {
    setIsLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const _response = await axios.post("/Signup", {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        accountType: formData.accountType,
        phoneNumber: formData.phoneNumber,
        invitationCode: formData.invitationCode
      });

      // Success - redirect to success page or login
      navigate('/login?signup=success');
    } catch (error) {
      setErrors(prev => ({ ...prev, general: t('errors.signupError') }));
    }
    setIsLoading(false);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (pageLoading) {
    return <LoadingSpinner message={t('loading')} />;
  }

  return (
    <React.StrictMode>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20">
        <div className="max-w-2xl mx-auto px-6 py-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className='inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-full px-6 py-3 mb-6 shadow-lg border border-emerald-200 dark:border-emerald-700'>
              <span className='text-2xl'>🌟</span>
              <span className='text-emerald-800 dark:text-emerald-300 font-bold'>{t('newMember')}</span>
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent mb-4">
              {t('signUpTitle')}
            </h1>
            <p className="text-emerald-600 dark:text-emerald-400 text-lg whitespace-pre-line">
              {t('signUpSubtitle')}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className={`flex flex-col items-center ${currentStep >= step.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'
                    }`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-all duration-300 ${currentStep >= step.id
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                      }`}>
                      {currentStep > step.id ? '✓' : step.icon}
                    </div>
                    <span className="text-sm font-medium mt-2">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 rounded transition-all duration-300 ${currentStep > step.id ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-emerald-200 dark:border-gray-700">

            {/* Step 1: Account Type */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 text-center mb-6">
                  {t('selectAccountType')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`cursor-pointer border-2 rounded-xl p-6 transition-all duration-300 ${formData.accountType === 'customer'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                    : 'border-emerald-200 dark:border-gray-600 hover:border-emerald-300'
                    }`}>
                    <input
                      type="radio"
                      name="accountType"
                      value="customer"
                      checked={formData.accountType === 'customer'}
                      onChange={(e) => handleInputChange('accountType', e.target.value)}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-4xl mb-3">🛍️</div>
                      <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300 mb-2">{t('customer')}</h4>
                      <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                        {t('customerDesc')}
                      </p>
                    </div>
                  </label>

                  <label className={`cursor-pointer border-2 rounded-xl p-6 transition-all duration-300 ${formData.accountType === 'vendor'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                    : 'border-emerald-200 dark:border-gray-600 hover:border-emerald-300'
                    }`}>
                    <input
                      type="radio"
                      name="accountType"
                      value="vendor"
                      checked={formData.accountType === 'vendor'}
                      onChange={(e) => handleInputChange('accountType', e.target.value)}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-4xl mb-3">🏪</div>
                      <h4 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300 mb-2">{t('vendor')}</h4>
                      <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                        {t('vendorDesc')}
                      </p>
                    </div>
                  </label>
                </div>

                {/* Vendor Invitation Code */}
                {formData.accountType === "vendor" && (
                  <div className="mt-6">
                    <label className="block text-emerald-800 dark:text-emerald-300 font-semibold text-lg mb-2">
                      {t('invitationCode')}
                    </label>
                    <input
                      type="text"
                      value={formData.invitationCode}
                      onChange={(e) => handleInputChange('invitationCode', e.target.value)}
                      className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 ${errors.invitationCode
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-emerald-200 dark:border-gray-600 focus:border-emerald-500'
                        } focus:outline-none bg-white dark:bg-gray-700 dark:text-gray-100 text-lg`}
                      placeholder={t('invitationCodePlaceholder')}
                    />
                    {errors.invitationCode && (
                      <p className="text-red-500 text-sm mt-2">{errors.invitationCode}</p>
                    )}
                  </div>
                )}

                <button
                  onClick={nextStep}
                  disabled={!formData.accountType || (formData.accountType === 'vendor' && errors.invitationCode)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:from-emerald-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('next')}
                </button>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 text-center mb-6">
                  {t('personalInfo')}
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-emerald-800 dark:text-emerald-300 font-semibold text-lg mb-2">
                    {t('fullName')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 ${errors.name
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-emerald-200 dark:border-gray-600 focus:border-emerald-500'
                      } focus:outline-none bg-white dark:bg-gray-700 dark:text-gray-100 text-lg`}
                    placeholder={t('fullNamePlaceholder')}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-emerald-800 dark:text-emerald-300 font-semibold text-lg mb-2">
                    {t('emailAddress')}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 ${errors.email
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-emerald-200 dark:border-gray-600 focus:border-emerald-500'
                      } focus:outline-none bg-white dark:bg-gray-700 dark:text-gray-100 text-lg`}
                    placeholder={t('emailAddressPlaceholder')}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-emerald-800 dark:text-emerald-300 font-semibold text-lg mb-2">
                    {t('phoneNumber')}
                  </label>
                  <PhoneInput
                    country={'in'}
                    value={formData.phoneNumber}
                    onChange={(value) => handleInputChange('phoneNumber', value)}
                    inputStyle={{
                      width: '100%',
                      height: '64px',
                      fontSize: '18px',
                      border: errors.phoneNumber ? '2px solid #fca5a5' : '2px solid #d1fae5',
                      borderRadius: '12px'
                    }}
                    containerStyle={{
                      width: '100%'
                    }}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-2">{errors.phoneNumber}</p>
                  )}

                  <button
                    onClick={sendOTP}
                    disabled={!validations.validPhoneNumber || otpSent}
                    className="mt-3 bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {otpSent ? t('otpSent') : t('sendOtp')}
                  </button>
                </div>

                {/* OTP Verification */}
                {otpSent && (
                  <div>
                    <label className="block text-emerald-800 dark:text-emerald-300 font-semibold text-lg mb-2">
                      {t('otpLabel')}
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOTP(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-emerald-200 dark:border-gray-600 rounded-xl focus:border-emerald-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-gray-100 text-lg text-center tracking-widest"
                      placeholder={t('otpPlaceholder')}
                      maxLength={6}
                    />
                    {errors.otp && (
                      <p className="text-red-500 text-sm mt-2">{errors.otp}</p>
                    )}
                  </div>
                )}

                {/* Password */}
                <div>
                  <label className="block text-emerald-800 dark:text-emerald-300 font-semibold text-lg mb-2">
                    {t('password')}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full px-4 py-4 pr-12 border-2 border-emerald-200 dark:border-gray-600 rounded-xl focus:border-emerald-500 focus:outline-none bg-white dark:bg-gray-700 dark:text-gray-100 text-lg"
                      placeholder={t('passwordPlaceholder')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-400 hover:text-emerald-600"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  <div className="mt-3 space-y-1">
                    {Object.entries({
                      length: t('passwordCriteria.length'),
                      number: t('passwordCriteria.number'),
                      specialChar: t('passwordCriteria.specialChar'),
                      uppercase: t('passwordCriteria.uppercase'),
                      lowercase: t('passwordCriteria.lowercase')
                    }).map(([key, text]) => (
                      <p key={key} className={`text-sm flex items-center ${passwordRequirements[key] ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                        <span className="mr-2">{passwordRequirements[key] ? '✅' : '⭕'}</span>
                        {text}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Repeat Password */}
                <div>
                  <label className="block text-emerald-800 dark:text-emerald-300 font-semibold text-lg mb-2">
                    {t('repeatPassword')}
                  </label>
                  <input
                    type="password"
                    value={formData.repeatPassword}
                    onChange={(e) => handleInputChange('repeatPassword', e.target.value)}
                    className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 ${errors.repeatPassword
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-emerald-200 dark:border-gray-600 focus:border-emerald-500'
                      } focus:outline-none bg-white dark:bg-gray-700 dark:text-gray-100 text-lg`}
                    placeholder={t('repeatPasswordPlaceholder')}
                  />
                  {errors.repeatPassword && (
                    <p className="text-red-500 text-sm mt-2">{errors.repeatPassword}</p>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={prevStep}
                    className="flex-1 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    {t('back')}
                  </button>
                  <button
                    onClick={otpSent ? verifyOTP : sendOTP}
                    disabled={isLoading || !validations.validPassword || !formData.name || !formData.email || errors.repeatPassword}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:from-emerald-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{t('wait')}</span>
                      </div>
                    ) : otpSent ? t('verifyOtp') : t('sendOtp')}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Success */}
            {currentStep === 3 && (
              <div className="text-center space-y-6">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">
                  {t('congrats')}
                </h3>
                <p className="text-xl text-emerald-600 dark:text-emerald-400 mb-8 whitespace-pre-line">
                  {t('accountCreated')}
                </p>

                <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-xl p-6 mb-8">
                  <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-3">{t('yourInfo')}</h4>
                  <div className="space-y-2 text-emerald-700 dark:text-emerald-300">
                    <p><strong>{t('name')}:</strong> {formData.name}</p>
                    <p><strong>{t('emailAddress')}:</strong> {formData.email}</p>
                    <p><strong>{t('accountType')}:</strong> {formData.accountType === 'customer' ? t('customer') : t('vendor')}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/login')}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:from-emerald-600 hover:to-green-600"
                >
                  {t('loginLink')}
                </button>
              </div>
            )}

            {/* General Error */}
            {errors.general && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-red-600 dark:text-red-400 text-center">{errors.general}</p>
              </div>
            )}
          </div>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-emerald-600 dark:text-emerald-400 mb-4">
              {t('alreadyHaveAccount')}
            </p>
            <a
              href="/login"
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold text-lg border-b-2 border-transparent hover:border-emerald-600 transition-all duration-300"
            >
              {t('loginLink')}!
            </a>
          </div>
        </div>
      </div>
    </React.StrictMode >
  );
};

export default Signup;
