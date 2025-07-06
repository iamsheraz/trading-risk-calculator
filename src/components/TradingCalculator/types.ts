export interface CalculationResults {
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

export type InputMode = 'investment' | 'shares';

export interface TradingCalculatorState {
  currentPrice: string;
  stopLossPrice: string;
  investmentAmount: string;
  shares: string;
  inputMode: InputMode;
  results: CalculationResults | null;
  isValidInput: boolean;
}

export interface TradingCalculatorActions {
  setCurrentPrice: (price: string) => void;
  setStopLossPrice: (price: string) => void;
  setInvestmentAmount: (amount: string) => void;
  setShares: (shares: string) => void;
  setInputMode: (mode: InputMode) => void;
}