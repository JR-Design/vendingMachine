import React from 'react';

function ProductButton({ product, inventory, onSelect }) {
  const isOutOfStock = inventory <= 0;
  
  return (
    <button 
      className={`product-button ${isOutOfStock ? 'out-of-stock' : ''}`}
      onClick={() => onSelect(product.id)}
      disabled={isOutOfStock}
    >
      {product.name} ({product.price}¢) 
      {isOutOfStock ? ' - Out of Stock' : ` - ${inventory} left`}
    </button>
  );
}

export default ProductButton;