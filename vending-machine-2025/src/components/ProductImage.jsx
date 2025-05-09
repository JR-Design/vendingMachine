import React from 'react';


function ProductImage({ productName, isOutOfStock }) {
  // Generate a background color based on the product name
  const generateColor = (name) => {
    const colors = {
      'Cola': '#8B4513',
      'Diet Cola': '#A0522D',
      'Lime Soda': '#32CD32',
      'Water': '#87CEEB'
    };
    
    return colors[name] || '#6c757d';
  };
  
  const bgColor = generateColor(productName);
  
  return (
    <div 
      className="product-image" 
      style={{ 
        backgroundColor: isOutOfStock ? '#ccc' : bgColor,
        opacity: isOutOfStock ? 0.7 : 1
      }}
    >
      <div className="product-icon" style={{ color: isOutOfStock ? '#666' : '#fff' }}>
        {productName.charAt(0)}
      </div>
      {isOutOfStock && (
        <div className="out-of-stock-overlay">
          <span>OUT</span>
        </div>
      )}
    </div>
  );
}

export default ProductImage;