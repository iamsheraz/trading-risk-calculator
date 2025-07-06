/**
 * Validation utility functions for trading calculator
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate stock price input
 */
export function validatePrice(price: string): ValidationResult {
  const numPrice = parseFloat(price);
  
  if (!price || price.trim() === '') {
    return { isValid: false, error: 'Price is required' };
  }
  
  if (isNaN(numPrice)) {
    return { isValid: false, error: 'Price must be a valid number' };
  }
  
  if (numPrice <= 0) {
    return { isValid: false, error: 'Price must be greater than 0' };
  }
  
  if (numPrice > 1000000) {
    return { isValid: false, error: 'Price seems unreasonably high' };
  }
  
  return { isValid: true };
}

/**
 * Validate investment amount
 */
export function validateAmount(amount: string): ValidationResult {
  const numAmount = parseFloat(amount);
  
  if (!amount || amount.trim() === '') {
    return { isValid: false, error: 'Amount is required' };
  }
  
  if (isNaN(numAmount)) {
    return { isValid: false, error: 'Amount must be a valid number' };
  }
  
  if (numAmount <= 0) {
    return { isValid: false, error: 'Amount must be greater than 0' };
  }
  
  if (numAmount < 1) {
    return { isValid: false, error: 'Minimum investment amount is $1' };
  }
  
  return { isValid: true };
}

/**
 * Validate shares input
 */
export function validateShares(shares: string): ValidationResult {
  const numShares = parseFloat(shares);
  
  if (!shares || shares.trim() === '') {
    return { isValid: false, error: 'Number of shares is required' };
  }
  
  if (isNaN(numShares)) {
    return { isValid: false, error: 'Shares must be a valid number' };
  }
  
  if (numShares <= 0) {
    return { isValid: false, error: 'Number of shares must be greater than 0' };
  }
  
  return { isValid: true };
}

/**
 * Validate stop loss vs current price
 */
export function validateStopLoss(currentPrice: string, stopLoss: string): ValidationResult {
  const current = parseFloat(currentPrice);
  const stop = parseFloat(stopLoss);
  
  if (isNaN(current) || isNaN(stop)) {
    return { isValid: false, error: 'Both prices must be valid numbers' };
  }
  
  if (stop >= current) {
    return { isValid: false, error: 'Stop loss must be less than current price' };
  }
  
  const riskPercentage = ((current - stop) / current) * 100;
  if (riskPercentage > 50) {
    return { 
      isValid: false, 
      error: `Risk of ${riskPercentage.toFixed(1)}% seems too high. Consider a higher stop loss.` 
    };
  }
  
  return { isValid: true };
}

/**
 * Generic input validation
 */
export function validateInput(value: string, type: 'price' | 'amount' | 'shares'): ValidationResult {
  switch (type) {
    case 'price':
      return validatePrice(value);
    case 'amount':
      return validateAmount(value);
    case 'shares':
      return validateShares(value);
    default:
      return { isValid: false, error: 'Unknown validation type' };
  }
}