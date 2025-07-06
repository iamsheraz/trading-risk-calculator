/**
 * Application constants
 */

// Trading Calculator Constants
export const TRADING_CONSTANTS = {
  DEFAULT_RISK_REWARD_RATIO: 2,
  MIN_PRICE: 0.01,
  MAX_PRICE: 1000000,
  MIN_INVESTMENT: 1,
  MAX_RISK_PERCENTAGE: 50,
  DEFAULT_CURRENT_PRICE: '120',
  DEFAULT_STOP_LOSS: '110',
  DEFAULT_INVESTMENT: '5000',
} as const;

// UI Constants
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
} as const;

// Color scheme
export const COLORS = {
  RISK: {
    PRIMARY: 'text-red-400',
    BACKGROUND: 'from-red-500/20 to-red-600/20',
    BORDER: 'border-red-500/30',
    GRADIENT: 'from-red-500 to-red-600',
  },
  REWARD: {
    PRIMARY: 'text-emerald-400',
    BACKGROUND: 'from-emerald-500/20 to-emerald-600/20',
    BORDER: 'border-emerald-500/30',
    GRADIENT: 'from-emerald-500 to-emerald-600',
  },
  TARGET: {
    PRIMARY: 'text-blue-400',
    BACKGROUND: 'from-blue-500/20 to-purple-600/20',
    BORDER: 'border-blue-500/30',
    GRADIENT: 'from-blue-500 to-purple-600',
  },
  NEUTRAL: {
    PRIMARY: 'text-gray-400',
    BACKGROUND: 'from-gray-500 to-gray-600',
    BORDER: 'border-white/20',
  },
} as const;

// Validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_NUMBER: 'Please enter a valid number',
  POSITIVE_NUMBER: 'Value must be greater than 0',
  PRICE_TOO_HIGH: 'Price seems unreasonably high',
  AMOUNT_TOO_LOW: 'Minimum investment amount is $1',
  STOP_LOSS_INVALID: 'Stop loss must be less than current price',
  HIGH_RISK_WARNING: 'Risk percentage is very high. Consider adjusting your stop loss.',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'trading_calculator_preferences',
  LAST_CALCULATION: 'trading_calculator_last_calculation',
  THEME: 'trading_calculator_theme',
} as const;

// API endpoints (for future use)
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://api.example.com',
  STOCK_PRICES: '/stocks/prices',
  USER_PREFERENCES: '/user/preferences',
} as const;

// Feature flags
export const FEATURES = {
  ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  ENABLE_NOTIFICATIONS: process.env.REACT_APP_ENABLE_NOTIFICATIONS === 'true',
  ENABLE_STOCK_API: process.env.REACT_APP_ENABLE_STOCK_API === 'true',
  ENABLE_USER_ACCOUNTS: process.env.REACT_APP_ENABLE_USER_ACCOUNTS === 'true',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  VALIDATION: 'Please check your input and try again.',
  CALCULATION: 'Error in calculation. Please verify your inputs.',
} as const;