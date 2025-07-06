/**
 * Global TypeScript type definitions
 */

// Common utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = 
  Pick<T, Exclude<keyof T, Keys>> & 
  { [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>> }[Keys];

// Theme and styling types
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// API related types
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface ApiError {
  message: string;
  code?: number;
  details?: any;
}

// Form types
export interface FormField<T = string> {
  value: T;
  error?: string;
  touched: boolean;
  required?: boolean;
}

export interface FormState<T extends Record<string, any>> {
  fields: { [K in keyof T]: FormField<T[K]> };
  isValid: boolean;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

// Trading specific types
export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD';

export interface TradingSymbol {
  symbol: string;
  name: string;
  exchange: string;
  currency: Currency;
  sector?: string;
}

export interface PriceData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: Date;
}

// Application specific types
export interface AppConfig {
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  version: string;
  features: {
    enableAnalytics: boolean;
    enableErrorReporting: boolean;
    enableNotifications: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  currency: Currency;
  notifications: {
    email: boolean;
    push: boolean;
    priceAlerts: boolean;
  };
  trading: {
    defaultRiskRewardRatio: number;
    defaultRiskPercentage: number;
    preferredExchanges: string[];
  };
}

// Event types
export interface AppEvent {
  type: string;
  timestamp: Date;
  data?: any;
  userId?: string;
}

// Component prop types that are commonly reused
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'data-testid'?: string;
}

export interface ClickableProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface InputProps extends BaseComponentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}

// Layout types
export interface LayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
  active?: boolean;
  disabled?: boolean;
  children?: NavItem[];
}

// Modal and overlay types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: Size;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

// Notification types
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  handler: () => void;
  style?: 'primary' | 'secondary';
}

// Error boundary types
export interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
  eventId?: string;
}

export interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
  errorInfo?: ErrorInfo;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastFetch?: Date;
}

// Pagination types
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
}

// Search and filter types
export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  page?: number;
  limit?: number;
}

// Generic CRUD operations
export interface CrudOperations<T, CreateInput = Partial<T>, UpdateInput = Partial<T>> {
  create: (data: CreateInput) => Promise<T>;
  read: (id: string) => Promise<T>;
  update: (id: string, data: UpdateInput) => Promise<T>;
  delete: (id: string) => Promise<void>;
  list: (params?: SearchParams) => Promise<PaginatedResponse<T>>;
}

// Export commonly used React types
export type { 
  ReactNode, 
  ReactElement, 
  ComponentType, 
  FC, 
  PropsWithChildren 
} from 'react';