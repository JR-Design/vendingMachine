import React from 'react';
import { formatChangeDisplay } from '../utils/vendingMachineUtils';
import CoinImage from './CoinImage'; // Make sure this import is present

function DispensedItems({ product, change, onCollect }) {
  const hasDispensedItems = product || Object.values(change).some(val => val > 0);
  
  if (!hasDispensedItems) {
    return null;
  }
  
  return (
    <div className="dispensed">
      {product && (
        <div 
            className="dispensed-product"
            tabIndex={0}
            aria-label={`Dispensed Product: ${product.name}`}
        >
          <h3>Dispensed Product:</h3>
          <div className="product-image">
            <div className="product-icon">{product.name.charAt(0)}</div>
          </div>
          <p>{product.name}</p>
        </div>
      )}
      
      {Object.values(change).some(val => val > 0) && (
        <div className="dispensed-change">
          <h3>Dispensed Change:</h3>
          <div className="coins-container">
            {change.QUARTER > 0 && <CoinImage coinType="QUARTER" count={change.QUARTER} />}
            {change.DIME > 0 && <CoinImage coinType="DIME" count={change.DIME} />}
            {change.NICKEL > 0 && <CoinImage coinType="NICKEL" count={change.NICKEL} />}
          </div>
          <p>{formatChangeDisplay(change)}</p>
        </div>
      )}
      
      <button 
        className="collect-button" 
        tabIndex={0} 
        onClick={onCollect}
      >
        Collect Items
      </button>
    </div>
  );
}

export default DispensedItems;