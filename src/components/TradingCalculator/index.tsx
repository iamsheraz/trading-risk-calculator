import React from 'react';
import { useTradingCalculator } from './hooks/useTradingCalculator';
import { TradingCalculatorUI } from './TradingCalculatorUI';

/**
 * Main Trading Calculator Container Component
 */
const TradingCalculator: React.FC = () => {
  const tradingCalculatorProps = useTradingCalculator();
  return <TradingCalculatorUI {...tradingCalculatorProps} />;
};

export default TradingCalculator;