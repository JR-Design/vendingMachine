import React, { useState } from 'react';
import { PRODUCTS } from '../utils/vendingMachineUtils';

function AdminPanel({ inventory, onRestock, onRefillCoins, resetMachine }) {
  const [showAdmin, setShowAdmin] = useState(false);
  const [productRestockAmount, setProductRestockAmount] = useState({
    COLA: 0,
    DIETCOLA: 0,
    LIMESODA: 0,
    WATER: 0
  });
  const [coinRestockAmount, setCoinRestockAmount] = useState({
    NICKEL: 0,
    DIME: 0,
    QUARTER: 0
  });

  const handleProductAmountChange = (productId, amount) => {
    setProductRestockAmount(prev => ({
      ...prev,
      [productId]: parseInt(amount) || 0
    }));
  };

  const handleCoinAmountChange = (coinType, amount) => {
    setCoinRestockAmount(prev => ({
      ...prev,
      [coinType]: parseInt(amount) || 0
    }));
  };

  const handleRestockProducts = () => {
    onRestock(productRestockAmount);
    setProductRestockAmount({
      COLA: 0,
      DIETCOLA: 0,
      LIMESODA: 0,
      WATER: 0
    });
  };

  const handleRefillCoins = () => {
    onRefillCoins(coinRestockAmount);
    setCoinRestockAmount({
      NICKEL: 0,
      DIME: 0,
      QUARTER: 0
    });
  };

  return (
    <div className="admin-section">
      <button 
        className="admin-toggle" 
        onClick={() => setShowAdmin(!showAdmin)}
      >
        {showAdmin ? 'Hide Admin Panel' : 'Admin Panel'}
      </button>
      
      {showAdmin && (
        <div className="admin-panel">
          <h2>Admin Panel</h2>
          
          <div className="admin-inventory">
            <h3>Current Inventory</h3>
            <div className="inventory-grid">
              <div className="inventory-products">
                <h4>Products</h4>
                {Object.entries(inventory.products).map(([id, count]) => (
                  <div key={id} className="inventory-item">
                    <span>{PRODUCTS[id].name}:</span>
                    <span className={count <= 1 ? 'low-stock' : ''}>{count}</span>
                  </div>
                ))}
              </div>
              
              <div className="inventory-coins">
                <h4>Coins</h4>
                {Object.entries(inventory.coins).map(([coinType, count]) => (
                  <div key={coinType} className="inventory-item">
                    <span>{coinType.charAt(0) + coinType.slice(1).toLowerCase()}s:</span>
                    <span className={count <= 2 ? 'low-stock' : ''}>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="admin-controls">
            <div className="restock-products">
              <h3>Restock Products</h3>
              <div className="restock-grid">
                {Object.keys(inventory.products).map(id => (
                  <div key={id} className="restock-item">
                    <label htmlFor={`restock-${id}`}>{PRODUCTS[id].name}:</label>
                    <input
                      id={`restock-${id}`}
                      type="number"
                      min="0"
                      value={productRestockAmount[id]}
                      onChange={(e) => handleProductAmountChange(id, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <button className="restock-button" onClick={handleRestockProducts}>
                Restock Products
              </button>
            </div>
            
            <div className="refill-coins">
              <h3>Refill Coins</h3>
              <div className="restock-grid">
                {Object.keys(inventory.coins).map(coinType => (
                  <div key={coinType} className="restock-item">
                    <label htmlFor={`refill-${coinType}`}>
                      {coinType.charAt(0) + coinType.slice(1).toLowerCase()}s:
                    </label>
                    <input
                      id={`refill-${coinType}`}
                      type="number"
                      min="0"
                      value={coinRestockAmount[coinType]}
                      onChange={(e) => handleCoinAmountChange(coinType, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <button className="refill-button" onClick={handleRefillCoins}>
                Refill Coins
              </button>
            </div>
          </div>

          <div className="admin-reset">
            <h3>Reset Machine</h3>
            <p>This will reset the machine to its initial state, clearing all statistics and reverting to default inventory.</p>
            <button 
              className="reset-button" 
              onClick={() => {
                if (confirm('Are you sure you want to reset the machine? This action cannot be undone.')) {
                  resetMachine();
                }
              }}
            >
              Reset Machine
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default AdminPanel;