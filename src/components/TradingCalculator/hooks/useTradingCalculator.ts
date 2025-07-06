import { useState, useEffect, useCallback } from 'react';
import { CalculationResults, InputMode, TradingCalculatorState, TradingCalculatorActions } from '../types';

export const useTradingCalculator = (): TradingCalculatorState & TradingCalculatorActions => {
  const [currentPrice, setCurrentPrice] = useState<string>('120');
  const [stopLossPrice, setStopLossPrice] = useState<string>('110');
  const [investmentAmount, setInvestmentAmount] = useState<string>('5000');
  const [shares, setShares] = useState<string>('');
  const [inputMode, setInputMode] = useState<InputMode>('investment');
  const [results, setResults] = useState<CalculationResults | null>(null);

  const calculateRiskReward = useCallback((): void => {
    const current = parseFloat(currentPrice);
    const stopLoss = parseFloat(stopLossPrice);
    let investment = parseFloat(investmentAmount);
    let numShares = parseFloat(shares);

    if (!current || !stopLoss || current <= 0 || stopLoss <= 0) {
      setResults(null);
      return;
    }

    if (inputMode === 'investment') {
      if (!investment || investment <= 0) {
        setResults(null);
        return;
      }
      numShares = investment / current;
    } else {
      if (!numShares || numShares <= 0) {
        setResults(null);
        return;
      }
      investment = numShares * current;
    }
    
    const lossPerShare = current - stopLoss;
    const potentialLoss = numShares * lossPerShare;
    const targetGainPerShare = lossPerShare * 2;
    const targetPrice = current + targetGainPerShare;
    const profitAtTarget = numShares * targetGainPerShare;
    const stopLossPercent = ((stopLoss - current) / current) * 100;
    const targetPercent = ((targetPrice - current) / current) * 100;

    setResults({
      shares: numShares.toFixed(2),
      investment: investment.toFixed(2),
      potentialLoss: potentialLoss.toFixed(2),
      targetPrice: targetPrice.toFixed(2),
      profitAtTarget: profitAtTarget.toFixed(2),
      stopLossPercent: stopLossPercent.toFixed(2),
      targetPercent: targetPercent.toFixed(2),
      riskPerShare: lossPerShare.toFixed(2),
      rewardPerShare: targetGainPerShare.toFixed(2)
    });
  }, [currentPrice, stopLossPrice, investmentAmount, shares, inputMode]);

  // Fix: Ensure isValidInput returns a boolean
  const isValidInput = Boolean(
    currentPrice && 
    stopLossPrice && 
    parseFloat(currentPrice) > 0 && 
    parseFloat(stopLossPrice) > 0 && 
    parseFloat(currentPrice) > parseFloat(stopLossPrice) &&
    ((inputMode === 'investment' && investmentAmount && parseFloat(investmentAmount) > 0) ||
     (inputMode === 'shares' && shares && parseFloat(shares) > 0))
  );

  useEffect(() => {
    calculateRiskReward();
  }, [calculateRiskReward]);

  return {
    // State
    currentPrice,
    stopLossPrice,
    investmentAmount,
    shares,
    inputMode,
    results,
    isValidInput,
    
    // Actions
    setCurrentPrice,
    setStopLossPrice,
    setInvestmentAmount,
    setShares,
    setInputMode,
  };
};