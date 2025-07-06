import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, AlertTriangle, Calculator, BarChart3, Zap } from 'lucide-react';
import { TradingCalculatorState, TradingCalculatorActions } from './types';

interface TradingCalculatorUIProps extends TradingCalculatorState, TradingCalculatorActions {}

export const TradingCalculatorUI: React.FC<TradingCalculatorUIProps> = ({
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
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl mb-6 shadow-lg">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            Trading Risk-Reward Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Calculate your potential loss and 2:1 reward targets with precision and confidence
          </p>
          <div className="flex items-center justify-center mt-6 space-x-6 text-sm text-gray-400">
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2 text-yellow-400" />
              Real-time calculations
            </div>
            <div className="flex items-center">
              <Calculator className="w-4 h-4 mr-2 text-cyan-400" />
              Professional formulas
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <section className="space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Trade Parameters</h2>
              </div>
              
              <div className="space-y-6">
                {/* Current Price Input */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    Current Stock Price ($)
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <DollarSign className="w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      type="number"
                      value={currentPrice}
                      onChange={(e) => setCurrentPrice(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 text-lg font-medium"
                      placeholder="120.00"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Stop Loss Input */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    Stop-Loss Price ($)
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <AlertTriangle className="w-5 h-5 text-gray-400 group-focus-within:text-red-400 transition-colors" />
                    </div>
                    <input
                      type="number"
                      value={stopLossPrice}
                      onChange={(e) => setStopLossPrice(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-red-400 focus:ring-4 focus:ring-red-400/20 transition-all duration-300 text-lg font-medium"
                      placeholder="110.00"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Investment Method Toggle */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-4">
                    Investment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3 p-1 bg-white/5 rounded-2xl border border-white/20">
                    <button
                      onClick={() => setInputMode('investment')}
                      className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        inputMode === 'investment'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      By Amount
                    </button>
                    <button
                      onClick={() => setInputMode('shares')}
                      className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        inputMode === 'shares'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      By Shares
                    </button>
                  </div>
                </div>
                
                {/* Dynamic Input Based on Mode */}
                {inputMode === 'investment' ? (
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-200 mb-3">
                      Investment Amount ($)
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <DollarSign className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
                      </div>
                      <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all duration-300 text-lg font-medium"
                        placeholder="5000.00"
                        step="0.01"
                      />
                    </div>
                    {results && (
                      <p className="text-sm text-emerald-400 mt-2 font-medium">
                        = {results.shares} shares
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-200 mb-3">
                      Number of Shares
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Target className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
                      </div>
                      <input
                        type="number"
                        value={shares}
                        onChange={(e) => setShares(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 transition-all duration-300 text-lg font-medium"
                        placeholder="45.45"
                        step="0.01"
                      />
                    </div>
                    {results && (
                      <p className="text-sm text-emerald-400 mt-2 font-medium">
                        = ${results.investment} investment
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Validation Warning */}
              {!isValidInput && (
                <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                  <p className="text-amber-300 text-sm font-medium">
                    ⚠️ Please ensure current price is greater than stop-loss price and all values are positive.
                    {inputMode === 'investment' ? ' Enter a valid investment amount.' : ' Enter a valid number of shares.'}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Results Section */}
          <section className="space-y-6">
            {results && isValidInput ? (
              <>
                {/* Trade Summary Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg flex items-center justify-center mr-3">
                      <Calculator className="w-4 h-4 text-white" />
                    </div>
                    Trade Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Investment</p>
                      <p className="text-white font-bold text-lg">${results.investment}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Shares</p>
                      <p className="text-white font-bold text-lg">{results.shares}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Risk/Share</p>
                      <p className="text-red-400 font-bold text-lg">${results.riskPerShare}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Reward/Share</p>
                      <p className="text-emerald-400 font-bold text-lg">${results.rewardPerShare}</p>
                    </div>
                  </div>
                </div>

                {/* Risk & Reward Cards */}
                <div className="grid gap-6">
                  {/* Potential Loss Card */}
                  <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-lg rounded-3xl p-6 border border-red-500/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                        <TrendingDown className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Potential Loss</h3>
                        <p className="text-red-300 text-sm">Risk at stop-loss</p>
                      </div>
                    </div>
                    <p className="text-4xl font-bold text-red-400 mb-2">${results.potentialLoss}</p>
                    <p className="text-red-300 text-sm font-medium">({results.stopLossPercent}% decline)</p>
                  </div>

                  {/* Target Price Card */}
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-lg rounded-3xl p-6 border border-blue-500/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">2:1 Target Price</h3>
                        <p className="text-blue-300 text-sm">Price to achieve 2:1 ratio</p>
                      </div>
                    </div>
                    <p className="text-4xl font-bold text-blue-400 mb-2">${results.targetPrice}</p>
                    <p className="text-blue-300 text-sm font-medium">({results.targetPercent}% gain required)</p>
                  </div>

                  {/* Profit Card */}
                  <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 backdrop-blur-lg rounded-3xl p-6 border border-emerald-500/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Profit at Target</h3>
                        <p className="text-emerald-300 text-sm">Reward at 2:1 ratio</p>
                      </div>
                    </div>
                    <p className="text-4xl font-bold text-emerald-400 mb-2">${results.profitAtTarget}</p>
                    <p className="text-emerald-300 text-sm font-medium">2:1 Risk-Reward Ratio</p>
                  </div>
                </div>

                {/* Risk-Reward Visualization */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
                  <h3 className="text-lg font-bold text-white mb-6">Risk-Reward Visualization</h3>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-8">
                      <div className="text-center">
                        <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mb-3 shadow-lg animate-pulse"></div>
                        <p className="text-red-400 text-sm font-semibold">Stop Loss</p>
                        <p className="text-white font-bold text-lg">${stopLossPrice}</p>
                      </div>
                      <div className="flex-1 mx-8">
                        <div className="h-2 bg-gradient-to-r from-red-500 via-gray-400 to-emerald-500 rounded-full relative">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-4 border-gray-400 shadow-lg"></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="w-4 h-4 bg-gray-400 rounded-full mx-auto mb-3"></div>
                        <p className="text-gray-300 text-sm font-semibold">Current</p>
                        <p className="text-white font-bold text-lg">${currentPrice}</p>
                      </div>
                      <div className="flex-1 mx-8">
                        <div className="h-2 bg-gradient-to-r from-gray-400 to-emerald-500 rounded-full"></div>
                      </div>
                      <div className="text-center">
                        <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mx-auto mb-3 shadow-lg animate-pulse"></div>
                        <p className="text-emerald-400 text-sm font-semibold">Target</p>
                        <p className="text-white font-bold text-lg">${results.targetPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-500 to-gray-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Ready to Calculate</h3>
                <p className="text-gray-300">Enter valid trade parameters to see your risk-reward analysis</p>
              </div>
            )}
          </section>
        </div>

        {/* Formula Section */}
        <section className="mt-12 bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Calculation Formulas</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3">Number of Shares</h4>
              <p className="text-gray-300 text-sm font-mono bg-black/20 p-3 rounded-lg">
                Investment Amount ÷ Current Price
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3">Potential Loss</h4>
              <p className="text-gray-300 text-sm font-mono bg-black/20 p-3 rounded-lg">
                Shares × (Current Price - Stop Loss)
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3">Target Price (2:1)</h4>
              <p className="text-gray-300 text-sm font-mono bg-black/20 p-3 rounded-lg">
                Current Price + (2 × Risk per Share)
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <h4 className="font-bold text-white mb-3">Profit at Target</h4>
              <p className="text-gray-300 text-sm font-mono bg-black/20 p-3 rounded-lg">
                Shares × (Target Price - Current Price)
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};