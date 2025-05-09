import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './VendingMachine.css';
import Display from './Display';
import CoinButton from './CoinButton';
import ProductButton from './ProductButton';
import DispensedItems from './DispensedItems';
import AdminPanel from './AdminPanel';
import Notifications from './Notifications';
import ProductImage from './ProductImage';
import { 
  COIN_VALUES, 
  PRODUCTS, 
  initialInventory, 
  calculateChange,
  calculateTotalCoins
} from '../utils/vendingMachineUtils';
import { handleSound as handleSoundEffect } from '../utils/sounds';

function VendingMachine() {
  const [insertedCoins, setInsertedCoins] = useState({ NICKEL: 0, DIME: 0, QUARTER: 0 });
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState('Insert coins and select a product');
  const [dispensedProduct, setDispensedProduct] = useState(null);
  const [dispensedChange, setDispensedChange] = useState({ NICKEL: 0, DIME: 0, QUARTER: 0 });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [inventory, setInventory] = useLocalStorage('vending-inventory', initialInventory);
  const [stats, setStats] = useLocalStorage('vending-stats', {
    productsSold: { COLA: 0, DIETCOLA: 0, LIMESODA: 0, WATER: 0 },
    totalRevenue: 0,
    cancelledTransactions: 0
  });


  const handleSound = (soundName) => {
    if (soundEnabled) {
      handleSoundEffect(soundName);
    }
  };

  // Calc total inserted amount
  useEffect(() => {
    setBalance(calculateTotalCoins(insertedCoins));
  }, [insertedCoins]);

  // handle coin deposit
  const depositCoin = (coinType) => {
    handleSound('coinInsert');
    setInsertedCoins(prev => ({
      ...prev,
      [coinType]: prev[coinType] + 1
    }));
    setInventory(prev => ({
      ...prev,
      coins: {
        ...prev.coins,
        [coinType]: prev.coins[coinType] + 1
      }
    }));
    setMessage(`Inserted ${COIN_VALUES[coinType]}¢`);
  };

  // handle product selection
  const selectProduct = (productId) => {
    const product = PRODUCTS[productId];
    
    // Check product is in stock
    if (inventory.products[productId] <= 0) {
        handleSound('error');
        setMessage(`${product.name} is out of stock`);
        return;
    }
    
    // Check if theres enough money inserted
    if (balance < product.price) {
        handleSound('error');
        setMessage(`Insufficient funds. ${product.name} costs ${product.price}¢. Please insert ${product.price - balance}¢ more.`);
        return;
    }
    
    // Calculate change
    const changeAmount = balance - product.price;
    const change = calculateChange(changeAmount, inventory.coins);
    
    // If we can't make change, display an error
    if (changeAmount > 0 && change === null) {
        handleSound('error');
        setMessage("Unable to provide exact change. Please select another product or cancel.");
        return;
    }
    
    // Dispense product and change
    handleSound('productDispense');
    setDispensedProduct(product);
    
    // update inventory
    setInventory(prev => ({
      ...prev,
      products: {
        ...prev.products,
        [productId]: prev.products[productId] - 1
      },
      coins: {
        NICKEL: prev.coins.NICKEL - (change?.NICKEL || 0),
        DIME: prev.coins.DIME - (change?.DIME || 0),
        QUARTER: prev.coins.QUARTER - (change?.QUARTER || 0)
      }
    }));
    
    // update stats
    setStats(prev => ({
      ...prev,
      productsSold: {
        ...prev.productsSold,
        [productId]: prev.productsSold[productId] + 1
      },
      totalRevenue: prev.totalRevenue + product.price
    }));
    
    // reset inserted coins
    setInsertedCoins({ NICKEL: 0, DIME: 0, QUARTER: 0 });
    
    // display change if any
    if (changeAmount > 0) {
      setDispensedChange(change);
      setMessage(`Dispensed ${product.name} and ${changeAmount}¢ in change.`);
    } else {
      setMessage(`Dispensed ${product.name}. Thank you!`);
    }
  };

  // Handle cancel transaction
  const cancelTransaction = () => {
    // only count as cancelled if there's a balance
    if (balance > 0) {
        handleSound('changeReturn');
        setStats(prev => ({
            ...prev,
            cancelledTransactions: prev.cancelledTransactions + 1
      }));

      // calc total amount to return
      const returnAmount = balance;
      
      // calc coins to return (preferably giving back same denominations that were inserted)
      const change = { ...insertedCoins };
      
      // update inventory
      setInventory(prev => ({
        ...prev,
        coins: {
          NICKEL: prev.coins.NICKEL - change.NICKEL,
          DIME: prev.coins.DIME - change.DIME,
          QUARTER: prev.coins.QUARTER - change.QUARTER
        }
      }));
      
      // return coins and reset state
      setDispensedChange(change);
      setInsertedCoins({ NICKEL: 0, DIME: 0, QUARTER: 0 });
      setMessage(`Transaction cancelled. Returned ${returnAmount}¢.`);
    } else {
        handleSound('error');
        setMessage('Insert coins and select a product');
    }
  };

  // reset after purchase for next transaction
  const resetMachine = () => {
    setInventory(initialInventory);
    setStats({
      productsSold: { COLA: 0, DIETCOLA: 0, LIMESODA: 0, WATER: 0 },
      totalRevenue: 0,
      cancelledTransactions: 0
    });
    setInsertedCoins({ NICKEL: 0, DIME: 0, QUARTER: 0 });
    setBalance(0);
    setMessage('Machine reset to initial state.');

    setDispensedProduct(null);
    setDispensedChange({ NICKEL: 0, DIME: 0, QUARTER: 0 });
    
    handleSound('buttonPress');
  };

  // Admin functions
  const handleRestock = (productAmounts) => {
    handleSound('buttonPress');
    setInventory(prev => ({
      ...prev,
      products: {
        COLA: prev.products.COLA + productAmounts.COLA,
        DIETCOLA: prev.products.DIETCOLA + productAmounts.DIETCOLA,
        LIMESODA: prev.products.LIMESODA + productAmounts.LIMESODA,
        WATER: prev.products.WATER + productAmounts.WATER
      }
    }));
    setMessage('Products restocked successfully.');
  };

  const handleRefillCoins = (coinAmounts) => {
    handleSound('buttonPress');
    setInventory(prev => ({
      ...prev,
      coins: {
        NICKEL: prev.coins.NICKEL + coinAmounts.NICKEL,
        DIME: prev.coins.DIME + coinAmounts.DIME,
        QUARTER: prev.coins.QUARTER + coinAmounts.QUARTER
      }
    }));
    setMessage('Coins refilled successfully.');
  };

  return (
    <div className="vending-machine">
        <button 
            className="sound-toggle" 
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? "Mute Sounds" : "Enable Sounds"}
        >
            {soundEnabled ? "🔊" : "🔇"}
        </button>

      <h1>Vending Machine</h1>
      
      <Display message={message} balance={balance} />
      
      <Notifications inventory={inventory} />
      
      <div className="vending-machine-body">
        <div className="product-display">
            {Object.entries(PRODUCTS).map(([id, product]) => (
                <div key={id} className={`product-slot ${inventory.products[id] <= 0 ? 'out-of-stock' : ''}`}>
                <ProductImage 
                    productName={product.name} 
                    isOutOfStock={inventory.products[id] <= 0} 
                />
                <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">{product.price}¢</div>
                    <div className="product-stock">
                    {inventory.products[id] <= 0 
                        ? 'OUT OF STOCK' 
                        : `${inventory.products[id]} available`}
                    </div>
                </div>
                </div>
            ))}
        </div>
        
        <div className="controls">
          <div className="coin-buttons">
            <h2>Insert Coin</h2>
            <div className="coin-button-group">
              {Object.keys(COIN_VALUES).map(coinType => (
                <CoinButton
                  key={coinType}
                  coinType={coinType}
                  onDeposit={depositCoin}
                />
              ))}
            </div>
          </div>
          
          <div className="product-buttons">
            <h2>Select Product</h2>
            <div className="product-button-group">
              {Object.entries(PRODUCTS).map(([id, product]) => (
                <ProductButton
                  key={id}
                  product={product}
                  inventory={inventory.products[id]}
                  onSelect={selectProduct}
                />
              ))}
            </div>
          </div>
          
          <button className="cancel-button" onClick={cancelTransaction}>
            Cancel
          </button>
        </div>
      </div>
      
      <DispensedItems
        product={dispensedProduct}
        change={dispensedChange}
        onReset={resetMachine}
      />
      
      <div className="machine-stats">
        <h3>Machine Stats</h3>
        <div className="stats-grid">
          <div>
            <h4>Products Sold</h4>
            <ul>
              {Object.entries(stats.productsSold).map(([id, count]) => (
                <li key={id}>{PRODUCTS[id].name}: {count}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Other Stats</h4>
            <ul>
              <li>Total Revenue: {stats.totalRevenue}¢</li>
              <li>Cancelled Transactions: {stats.cancelledTransactions}</li>
            </ul>
          </div>
        </div>
      </div>
      
      <AdminPanel 
        inventory={inventory}
        onRestock={handleRestock}
        onRefillCoins={handleRefillCoins}
        resetMachine={resetMachine}
      />
    </div>
  );
}

export default VendingMachine;