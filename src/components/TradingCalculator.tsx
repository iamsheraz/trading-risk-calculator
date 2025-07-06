import React, { useState, useEffect, useCallback } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, AlertTriangle } from 'lucide-react';

interface CalculationResults {
  shares: string;
  investment: string;
  potentialLoss: string;
  targetPrice: string;
  profitAtTarget: string;
  stopLossPercent: string;
  targetPercent: string;
  riskPerShare: string;
  rewardPerShare: string;
}

type InputMode = 'investment' | 'shares';

const TradingCalculator: React.FC = () => {
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

    // Calculate based on input mode
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
    
    // Calculate potential loss
    const lossPerShare = current - stopLoss;
    const potentialLoss = numShares * lossPerShare;
    
    // Calculate target price for 2:1 ratio
    const targetGainPerShare = lossPerShare * 2;
    const targetPrice = current + targetGainPerShare;
    
    // Calculate profit at target
    const profitAtTarget = numShares * targetGainPerShare;
    
    // Calculate percentages
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

  useEffect(() => {
    calculateRiskReward();
  }, [calculateRiskReward]);

  const isValidInput = currentPrice && stopLossPrice && 
                      parseFloat(currentPrice) > 0 && parseFloat(stopLossPrice) > 0 && 
                      parseFloat(currentPrice) > parseFloat(stopLossPrice) &&
                      ((inputMode === 'investment' && investmentAmount && parseFloat(investmentAmount) > 0) ||
                       (inputMode === 'shares' && shares && parseFloat(shares) > 0));

  const handleInputModeChange = (mode: InputMode): void => {
    setInputMode(mode);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Trading Risk-Reward Calculator</h1>
          <p className="text-gray-600">Calculate your potential loss and 2:1 reward targets</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Trade Parameters</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Stock Price ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="120.00"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stop-Loss Price ($)
                </label>
                <div className="relative">
                  <AlertTriangle className="absolute left-3 top-3 h-5 w-5 text-red-400" />
                  <input
                    type="number"
                    value={stopLossPrice}
                    onChange={(e) => setStopLossPrice(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="110.00"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Method
                </label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    onClick={() => handleInputModeChange('investment')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      inputMode === 'investment'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    By Amount
                  </button>
                  <button
                    onClick={() => handleInputModeChange('shares')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      inputMode === 'shares'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    By Shares
                  </button>
                </div>
                
                {inputMode === 'investment' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount ($)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="5000.00"
                        step="0.01"
                      />
                    </div>
                    {results && (
                      <p className="text-sm text-gray-600 mt-1">
                        = {results.shares} shares
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Shares
                    </label>
                    <div className="relative">
                      <Target className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        value={shares}
                        onChange={(e) => setShares(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="45.45"
                        step="0.01"
                      />
                    </div>
                    {results && (
                      <p className="text-sm text-gray-600 mt-1">
                        = ${results.investment} investment
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {!isValidInput && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  Please ensure current price is greater than stop-loss price and all values are positive.
                  {inputMode === 'investment' ? ' Enter a valid investment amount.' : ' Enter a valid number of shares.'}
                </p>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Calculation Results</h2>
            
            {results && isValidInput ? (
              <div className="space-y-4">
                {/* Trade Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-2">Trade Summary</h3>
                  <p className="text-sm text-gray-600">Investment: ${results.investment}</p>
                  <p className="text-sm text-gray-600">Shares: {results.shares}</p>
                  <p className="text-sm text-gray-600">Risk per share: ${results.riskPerShare}</p>
                  <p className="text-sm text-gray-600">Reward per share: ${results.rewardPerShare}</p>
                </div>

                {/* Potential Loss */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                    <h3 className="font-medium text-red-700">Potential Loss</h3>
                  </div>
                  <p className="text-2xl font-bold text-red-600">${results.potentialLoss}</p>
                  <p className="text-sm text-red-500">({results.stopLossPercent}% decline)</p>
                </div>

                {/* Target Price */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Target className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="font-medium text-blue-700">2:1 Target Price</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">${results.targetPrice}</p>
                  <p className="text-sm text-blue-500">({results.targetPercent}% gain required)</p>
                </div>

                {/* Profit at Target */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                    <h3 className="font-medium text-green-700">Profit at Target</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-600">${results.profitAtTarget}</p>
                  <p className="text-sm text-green-500">2:1 Risk-Reward Ratio</p>
                </div>

                {/* Risk-Reward Visualization */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-3">Risk-Reward Visualization</h3>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
                      <p className="text-red-600">Stop Loss</p>
                      <p className="font-medium">${stopLossPrice}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-3 h-3 bg-gray-400 rounded-full mx-auto mb-1"></div>
                      <p className="text-gray-600">Current</p>
                      <p className="font-medium">${currentPrice}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                      <p className="text-green-600">Target</p>
                      <p className="font-medium">${results.targetPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Enter valid trade parameters to see results</p>
              </div>
            )}
          </div>
        </div>

        {/* Formula Section */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Calculation Formulas</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-700">Number of Shares:</p>
              <p className="text-gray-600 font-mono">Investment Amount ÷ Current Price</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Potential Loss:</p>
              <p className="text-gray-600 font-mono">Shares × (Current Price - Stop Loss)</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Target Price (2:1):</p>
              <p className="text-gray-600 font-mono">Current Price + (2 × Risk per Share)</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Profit at Target:</p>
              <p className="text-gray-600 font-mono">Shares × (Target Price - Current Price)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingCalculator;