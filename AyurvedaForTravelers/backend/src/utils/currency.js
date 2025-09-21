// LKR↔USD helper (static fx for demo)
const EXCHANGE_RATES = {
  LKR: { USD: 0.003, EUR: 0.0027 },
  USD: { LKR: 330, EUR: 0.9 },
  EUR: { LKR: 370, USD: 1.1 }
};

/**
 * Convert amount from one currency to another
 * @param {number} amount - Amount to convert
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @returns {number} Converted amount
 */
const convertCurrency = (amount, fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  const rate = EXCHANGE_RATES[fromCurrency]?.[toCurrency];
  if (!rate) {
    throw new Error(`Exchange rate not available for ${fromCurrency} to ${toCurrency}`);
  }

  return Math.round(amount * rate * 100) / 100;
};

/**
 * Format price with currency symbol
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted price string
 */
const formatPrice = (amount, currency) => {
  const symbols = {
    LKR: 'Rs.',
    USD: '$',
    EUR: '€'
  };

  const symbol = symbols[currency] || currency;
  return `${symbol}${amount.toFixed(2)}`;
};

/**
 * Get all supported currencies
 * @returns {Array} Array of currency objects
 */
const getSupportedCurrencies = () => {
  return [
    { code: 'LKR', symbol: 'Rs.', name: 'Sri Lankan Rupee', rate: 1 },
    { code: 'USD', symbol: '$', name: 'US Dollar', rate: EXCHANGE_RATES.LKR.USD },
    { code: 'EUR', symbol: '€', name: 'Euro', rate: EXCHANGE_RATES.LKR.EUR }
  ];
};

module.exports = {
  convertCurrency,
  formatPrice,
  getSupportedCurrencies,
  EXCHANGE_RATES
};
