export const COIN_VALUES = {
    NICKEL: 5,
    DIME: 10,
    QUARTER: 25
};
  
export const PRODUCTS = {
    COLA: { name: 'Cola', price: 25, id: 'COLA' },
    DIETCOLA: { name: 'Diet Cola', price: 35, id: 'DIETCOLA' },
    LIMESODA: { name: 'Lime Soda', price: 25, id: 'LIMESODA' },
    WATER: { name: 'Water', price: 45, id: 'WATER' }
};
  
// inventory setup per requirements
export const initialInventory = {
    coins: {
        NICKEL: 5,
        DIME: 5,
        QUARTER: 5
    },
    products: {
        COLA: 10,
        DIETCOLA: 8,
        LIMESODA: 0,
        WATER: 2
    }
};
  
export const calculateChange = (amount, coinInventory) => {
    const change = { NICKEL: 0, DIME: 0, QUARTER: 0 };
    let remaining = amount;

    // Try to give quarters first
    while (remaining >= COIN_VALUES.QUARTER && coinInventory.QUARTER > change.QUARTER) {
        change.QUARTER++;
        remaining -= COIN_VALUES.QUARTER;
    }

    // Then dimes
    while (remaining >= COIN_VALUES.DIME && coinInventory.DIME > change.DIME) {
        change.DIME++;
        remaining -= COIN_VALUES.DIME;
    }

    // Then nickels
    while (remaining >= COIN_VALUES.NICKEL && coinInventory.NICKEL > change.NICKEL) {
        change.NICKEL++;
        remaining -= COIN_VALUES.NICKEL;
    }

    // If we can't make exact change, return null
    if (remaining > 0) {
        return null;
    }

    return change;
};
  

export const formatChangeDisplay = (change) => {
    const parts = [];
    if (change.QUARTER > 0) {
        parts.push(`${change.QUARTER} quarter${change.QUARTER !== 1 ? 's' : ''}`);
    }
    if (change.DIME > 0) {
        parts.push(`${change.DIME} dime${change.DIME !== 1 ? 's' : ''}`);
    }
    if (change.NICKEL > 0) {
        parts.push(`${change.NICKEL} nickel${change.NICKEL !== 1 ? 's' : ''}`);
    }

    return parts.join(', ');
};


export const calculateTotalCoins = (coins) => {
    return (
        coins.NICKEL * COIN_VALUES.NICKEL +
        coins.DIME * COIN_VALUES.DIME +
        coins.QUARTER * COIN_VALUES.QUARTER
    );
};