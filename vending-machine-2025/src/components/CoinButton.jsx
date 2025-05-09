import React from 'react';
import { COIN_VALUES } from '../utils/vendingMachineUtils';
import CoinImage from './CoinImage';

function CoinButton({ coinType, onDeposit }) {
    const coinName = coinType.charAt(0) + coinType.slice(1).toLowerCase();
    const value = COIN_VALUES[coinType];
    
    return (
      <button 
        className="coin-button"
        onClick={() => onDeposit(coinType)}
      >
        <div className="coin-button-content">
          <CoinImage coinType={coinType} count={1} />
          <span>{coinName} ({value}¢)</span>
        </div>
      </button>
    );
  }

export default CoinButton;