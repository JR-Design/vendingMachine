import React from 'react';

function CoinImage({ coinType, count }) {
  const coinProperties = {
    'NICKEL': { color: '#a0a0a0', size: 30, value: '5¢' },
    'DIME': { color: '#c0c0c0', size: 25, value: '10¢' },
    'QUARTER': { color: '#daa520', size: 35, value: '25¢' }
  };
  
  const { color, size, value } = coinProperties[coinType] || { color: '#ccc', size: 30, value: '' };
  
  // Create an array of counts to render multiple coins
  const coins = Array.from({ length: count }, (_, i) => i);
  
  return (
    <div className="coin-stack">
      {coins.map((idx) => (
        <div 
          key={idx}
          className="coin"
          style={{
            backgroundColor: color,
            width: `${size}px`,
            height: `${size}px`,
            marginTop: idx > 0 ? `-${size / 3}px` : '0',
            zIndex: 10 - idx
          }}
        >
          <span className="coin-value">{value}</span>
        </div>
      ))}
    </div>
  );
}

export default CoinImage;