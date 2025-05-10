# Vending Machine React Application

This project is a React implementation of a vending machine interface that allows users to deposit coins, select products, and receive change.

## Live Demo

View the live demo: [Vending Machine (2025)](https://vending-machine-2025.netlify.app/)

## Application Features

- **Coin Deposits**: Users can deposit nickels (5¢), dimes (10¢), and quarters (25¢)
- **Product Selection**: Choose from Cola (25¢), Diet Cola (35¢), Lime Soda (25¢), and Water (45¢)
- **Change Calculation**: Automatically calculates and returns appropriate change
- **Transaction Cancellation**: Cancel a transaction and receive all deposited funds back
- **Inventory Management**: Tracks product inventory and coin availability
- **Admin Panel**: Restock products, refill coins, and view machine statistics
- **Accessibility Features**: Keyboard navigation with full tab support and screen reader compatibility
- **Sound Effects**: Optional sound effects for coin deposits, product dispensing, and more
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Remembers machine state between sessions
- **Visual Coin & Product Display**: Visual representations of coins and products

## Initial State

On startup, the machine is initialized with:
- 5 of each type of coin (nickels, dimes, quarters)
- Product inventory:
  - 10 Cola (25¢)
  - 8 Diet Cola (35¢)
  - 0 Lime Soda (25¢) - Out of stock
  - 2 Water (45¢)

## Running the Application Locally

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/JR-Design/vendingMachine.git
   cd vendingMachine/vending-machine-2025
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```
   or whatever the terminal recommends to you 

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Implementation Details

### Technology Stack

- **React**: Front-end library for building the user interface
- **Vite**: Build tool for faster development
- **CSS**: Custom styling with responsive design
- **Local Storage API**: For persisting machine state

### Core Components

- **VendingMachine**: Main component managing the overall state and logic
- **Display**: Shows status messages and current balance
- **CoinButton/ProductButton**: Interactive buttons for depositing coins and selecting products
- **DispensedItems**: Shows dispensed products and change
- **AdminPanel**: Interface for restocking and machine maintenance
- **CoinImage/ProductImage**: Visual representations of coins and products

### Key Features Implementation

- **Change Algorithm**: Calculates optimal change using the available coins
- **Inventory Management**: Tracks product and coin inventory with lowstock notifications
- **Sound System**: Provides audio feedback for user actions
- **Accessibility**: Keyboard navigation with ARIA attributes for screen readers

## Command Support (Per Assignment Requirements)

The application supports the following commands through its UI:

- `CANCEL`: Cancel the current transaction
- `DEPOSIT,QUARTER`: Deposit a quarter (25¢)
- `DEPOSIT,DIME`: Deposit a dime (10¢)
- `DEPOSIT,NICKEL`: Deposit a nickel (5¢)
- `SELECT,COLA`: Select Cola product
- `SELECT,DIETCOLA`: Select Diet Cola product
- `SELECT,LIMESODA`: Select Lime Soda product
- `SELECT,WATER`: Select Water product

## Testing the Application

The application includes comprehensive error handling for various scenarios:

1. **Insufficient Funds**: Attempting to purchase a product without enough money
2. **Out of Stock**: Attempting to purchase a product that's out of stock
3. **Change Availability**: Handling situations where exact change cannot be provided
4. **Edge Cases**: Empty inventory, maximum coin capacity, etc.

## Code Repository

GitHub Repository: [https://github.com/JR-Design/vendingMachine/tree/main/vending-machine-2025](https://github.com/JR-Design/vendingMachine/tree/main/vending-machine-2025)

Google Drive as requested: [https://drive.google.com/drive/folders/1XPE2fm7zxQbBhXnSQZd2ch8Iq0SEy80X](https://drive.google.com/drive/folders/1XPE2fm7zxQbBhXnSQZd2ch8Iq0SEy80X)

If possible, use Github.

## Author

James Ross

## License

This project is for demonstration purposes as part of a technical assessment. 

## General info

I only had 5 hours after work to put this together, I enjoyed exploring and the size of the scope. I hope you enjoy!
