import React from 'react';

function Notifications({ inventory }) {
  const createNotificationSummary = () => {
    const outOfStock = [];
    const lowStock = [];
    const lowCoins = [];
    
    // Check for product inventory issues
    Object.entries(inventory.products).forEach(([id, count]) => {
      const productName = id.charAt(0) + id.slice(1).toLowerCase();
      if (count === 0) {
        outOfStock.push(productName);
      } else if (count === 1) {
        lowStock.push(productName);
      }
    });
    
    // Check for low coin inventory
    Object.entries(inventory.coins).forEach(([coinType, count]) => {
      if (count <= 2) {
        lowCoins.push(`${coinType.toLowerCase()}s`);
      }
    });
    
    // Build notification parts
    const notificationParts = [];
    
    if (outOfStock.length > 0) {
      notificationParts.push(`Out of stock: ${outOfStock.join(', ')}`);
    }
    
    if (lowStock.length > 0) {
      notificationParts.push(`Low stock: ${lowStock.join(', ')}`);
    }
    
    if (lowCoins.length > 0) {
      notificationParts.push(`Low on: ${lowCoins.join(', ')}`);
    }
    
    return notificationParts.join(' | ');
  };
  
  const notificationSummary = createNotificationSummary();
  
  if (!notificationSummary) {
    return null;
  }
  
  return (
    <div className="notifications-compact">
        <div 
            className="notification-text" 
            tabIndex={0} 
            role="alert"
        >{notificationSummary}</div>
    </div>
  );
}

export default Notifications;