import React from 'react';
import { COIN_VALUES } from '../utils/vendingMachineUtils';

function CoinButton({ coinType, onDeposit }) {
  const coinName = coinType.charAt(0) + coinType.slice(1).toLowerCase();
  const value = COIN_VALUES[coinType];
  
  return (
    <button 
      className="coin-button"
      onClick={() => onDeposit(coinType)}
    >
      {coinName} ({value}¢)
    </button>
  );
}

export default CoinButton;