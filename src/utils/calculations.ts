/**
 * Pure calculation functions for trading risk-reward analysis
 */

export interface RiskRewardCalculation {
  shares: number;
  investment: number;
  riskPerShare: number;
  rewardPerShare: number;
  potentialLoss: number;
  targetPrice: number;
  profitAtTarget: number;
  stopLossPercentage: number;
  targetPercentage: number;
  riskRewardRatio: number;
}

/**
 * Calculate risk-reward metrics based on input parameters
 */
export function calculateRiskReward(
  currentPrice: number,
  stopLossPrice: number,
  investmentAmount?: number,
  shareCount?: number,
  riskRewardRatio: number = 2
): RiskRewardCalculation {
  // Determine shares and investment amount
  let shares: number;
  let investment: number;
  
  if (investmentAmount !== undefined) {
    shares = investmentAmount / currentPrice;
    investment = investmentAmount;
  } else if (shareCount !== undefined) {
    shares = shareCount;
    investment = shareCount * currentPrice;
  } else {
    throw new Error('Either investmentAmount or shareCount must be provided');
  }
  
  // Core calculations
  const riskPerShare = currentPrice - stopLossPrice;
  const rewardPerShare = riskPerShare * riskRewardRatio;
  const targetPrice = currentPrice + rewardPerShare;
  
  const potentialLoss = shares * riskPerShare;
  const profitAtTarget = shares * rewardPerShare;
  
  // Percentage calculations
  const stopLossPercentage = ((stopLossPrice - currentPrice) / currentPrice) * 100;
  const targetPercentage = ((targetPrice - currentPrice) / currentPrice) * 100;
  
  return {
    shares,
    investment,
    riskPerShare,
    rewardPerShare,
    potentialLoss,
    targetPrice,
    profitAtTarget,
    stopLossPercentage,
    targetPercentage,
    riskRewardRatio,
  };
}

/**
 * Calculate percentage change between two values
 */
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
}

/**
 * Calculate position size based on risk tolerance
 */
export function calculatePositionSize(
  accountBalance: number,
  riskPercentage: number,
  currentPrice: number,
  stopLossPrice: number
): number {
  const riskAmount = accountBalance * (riskPercentage / 100);
  const riskPerShare = currentPrice - stopLossPrice;
  return Math.floor(riskAmount / riskPerShare);
}

/**
 * Calculate break-even price considering fees
 */
export function calculateBreakEven(
  entryPrice: number,
  feePercentage: number = 0
): number {
  const totalFeePercentage = feePercentage * 2; // Entry + exit fees
  return entryPrice * (1 + totalFeePercentage / 100);
}

/**
 * Calculate maximum acceptable risk for a given account size
 */
export function calculateMaxRisk(
  accountBalance: number,
  maxRiskPercentage: number = 2
): number {
  return accountBalance * (maxRiskPercentage / 100);
}