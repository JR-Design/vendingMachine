import React from 'react';


function ProductImage({ productName, isOutOfStock, small = false }) {
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
          opacity: isOutOfStock ? 0.7 : 1,
          width: small ? '20px' : '60px',
          height: small ? '45px' : '90px'
        }}
      >
        <div 
          className="product-icon" 
          style={{ 
            color: isOutOfStock ? '#666' : '#fff',
            fontSize: small ? '20px' : '30px'
          }}
        >
          {productName.charAt(0)}
        </div>
        {isOutOfStock && (
          <div className="out-of-stock-overlay">
            <span style={{ fontSize: small ? '10px' : '16px' }}>OUT</span>
          </div>
        )}
      </div>
    );
  }

export default ProductImage;