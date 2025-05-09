import React from 'react';

function Display({ message, balance }) {
  return (
    <div className="display">
      <div className="message">{message}</div>
      <div className="balance">Current Balance: {balance}¢</div>
    </div>
  );
}

export default Display;