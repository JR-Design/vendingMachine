import React from 'react';
import ProductImage from './ProductImage';

function ProductButton({ product, inventory, onSelect }) {
    const isOutOfStock = inventory <= 0;
    
    return (
      <button 
        className={`product-button ${isOutOfStock ? 'out-of-stock' : ''}`}
        onClick={() => onSelect(product.id)}
        disabled={isOutOfStock}
      >
        <div className="product-button-content">
          <ProductImage 
            productName={product.name} 
            isOutOfStock={isOutOfStock} 
            small={true}
          />
          <span>
            {product.name} ({product.price}¢) 
            {isOutOfStock ? ' - Out of Stock' : ` - ${inventory} left`}
          </span>
        </div>
      </button>
    );
}

export default ProductButton;