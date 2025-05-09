import React from 'react';

function Notifications({ inventory }) {
  const notifications = [];
  
  // Check for low product inventory
  Object.entries(inventory.products).forEach(([id, count]) => {
    if (count === 0) {
      notifications.push(`Out of stock: ${id.charAt(0) + id.slice(1).toLowerCase()}`);
    } else if (count === 1) {
      notifications.push(`Low stock: ${id.charAt(0) + id.slice(1).toLowerCase()}`);
    }
  });
  
  // Check for low coin inventory
  Object.entries(inventory.coins).forEach(([coinType, count]) => {
    if (count <= 2) {
      notifications.push(`Low on ${coinType.toLowerCase()}s: ${count} remaining`);
    }
  });
  
  if (notifications.length === 0) {
    return null;
  }
  
  return (
    <div className="notifications">
      <h3>Notifications</h3>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index} className="notification-item">{notification}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;