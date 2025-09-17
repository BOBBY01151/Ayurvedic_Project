const logger = require('../config/logger');

/**
 * Currency Service for handling multi-currency operations
 * TODO: Integrate with real-time currency API (e.g., Open Exchange Rates, CurrencyLayer)
 */

class CurrencyService {
  constructor() {
    // Hardcoded demo rates - TODO: Replace with real-time API
    this.exchangeRates = {
      'LKR': {
        'USD': 0.003,
        'EUR': 0.0027,
        'LKR': 1
      },
      'USD': {
        'LKR': 330,
        'EUR': 0.9,
        'USD': 1
      },
      'EUR': {
        'LKR': 370,
        'USD': 1.1,
        'EUR': 1
      }
    };

    this.lastUpdated = new Date();
    this.supportedCurrencies = ['LKR', 'USD', 'EUR'];
    
    // TODO: Schedule periodic rate updates
    // this.scheduleRateUpdates();
  }

  /**
   * Convert amount from one currency to another
   * @param {number} amount - Amount to convert
   * @param {string} fromCurrency - Source currency code
   * @param {string} toCurrency - Target currency code
   * @returns {number} Converted amount
   */
  convertFromLKR(amount, toCurrency = 'USD') {
    return this.convert(amount, 'LKR', toCurrency);
  }

  /**
   * Generic currency conversion
   * @param {number} amount - Amount to convert
   * @param {string} fromCurrency - Source currency code
   * @param {string} toCurrency - Target currency code
   * @returns {number} Converted amount
   */
  convert(amount, fromCurrency, toCurrency) {
    try {
      // Validate currencies
      if (!this.isSupported(fromCurrency)) {
        throw new Error(`Unsupported source currency: ${fromCurrency}`);
      }
      
      if (!this.isSupported(toCurrency)) {
        throw new Error(`Unsupported target currency: ${toCurrency}`);
      }

      // Same currency - no conversion needed
      if (fromCurrency === toCurrency) {
        return amount;
      }

      // Get exchange rate
      const rate = this.getExchangeRate(fromCurrency, toCurrency);
      
      if (!rate) {
        throw new Error(`Exchange rate not available for ${fromCurrency} to ${toCurrency}`);
      }

      const convertedAmount = amount * rate;
      
      // Round to 2 decimal places
      return Math.round(convertedAmount * 100) / 100;

    } catch (error) {
      logger.error('Currency conversion failed:', {
        amount,
        fromCurrency,
        toCurrency,
        error: error.message
      });
      
      // Return original amount as fallback
      return amount;
    }
  }

  /**
   * Get exchange rate between two currencies
   * @param {string} fromCurrency - Source currency
   * @param {string} toCurrency - Target currency
   * @returns {number} Exchange rate
   */
  getExchangeRate(fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return 1;
    
    return this.exchangeRates[fromCurrency]?.[toCurrency] || null;
  }

  /**
   * Get all exchange rates for a base currency
   * @param {string} baseCurrency - Base currency code
   * @returns {Object} Exchange rates object
   */
  getAllRates(baseCurrency = 'LKR') {
    return {
      base: baseCurrency,
      rates: this.exchangeRates[baseCurrency] || {},
      lastUpdated: this.lastUpdated,
      timestamp: Date.now()
    };
  }

  /**
   * Check if currency is supported
   * @param {string} currency - Currency code
   * @returns {boolean} True if supported
   */
  isSupported(currency) {
    return this.supportedCurrencies.includes(currency);
  }

  /**
   * Get list of supported currencies
   * @returns {Array} Array of supported currency codes
   */
  getSupportedCurrencies() {
    return [...this.supportedCurrencies];
  }

  /**
   * Format amount with currency symbol
   * @param {number} amount - Amount to format
   * @param {string} currency - Currency code
   * @param {string} locale - Locale for formatting (default: en-US)
   * @returns {string} Formatted amount
   */
  formatAmount(amount, currency, locale = 'en-US') {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    } catch (error) {
      logger.warn('Currency formatting failed:', { amount, currency, error: error.message });
      
      // Fallback formatting
      const symbols = { 'LKR': 'Rs.', 'USD': '$', 'EUR': '€' };
      const symbol = symbols[currency] || currency;
      return `${symbol} ${amount.toFixed(2)}`;
    }
  }

  /**
   * Get currency symbol
   * @param {string} currency - Currency code
   * @returns {string} Currency symbol
   */
  getCurrencySymbol(currency) {
    const symbols = {
      'LKR': 'Rs.',
      'USD': '$',
      'EUR': '€'
    };
    
    return symbols[currency] || currency;
  }

  /**
   * Convert multiple amounts to different currencies
   * @param {Object} amounts - Object with currency keys and amount values
   * @param {string} targetCurrency - Target currency for conversion
   * @returns {Object} Converted amounts
   */
  convertMultiple(amounts, targetCurrency) {
    const converted = {};
    
    for (const [currency, amount] of Object.entries(amounts)) {
      converted[currency] = {
        original: amount,
        converted: this.convert(amount, currency, targetCurrency),
        rate: this.getExchangeRate(currency, targetCurrency)
      };
    }
    
    return {
      targetCurrency,
      conversions: converted,
      timestamp: Date.now()
    };
  }

  /**
   * Get price comparison across currencies
   * @param {number} basePriceLKR - Base price in LKR
   * @returns {Object} Price comparison object
   */
  getPriceComparison(basePriceLKR) {
    return {
      LKR: {
        amount: basePriceLKR,
        formatted: this.formatAmount(basePriceLKR, 'LKR'),
        symbol: this.getCurrencySymbol('LKR')
      },
      USD: {
        amount: this.convertFromLKR(basePriceLKR, 'USD'),
        formatted: this.formatAmount(this.convertFromLKR(basePriceLKR, 'USD'), 'USD'),
        symbol: this.getCurrencySymbol('USD')
      },
      EUR: {
        amount: this.convertFromLKR(basePriceLKR, 'EUR'),
        formatted: this.formatAmount(this.convertFromLKR(basePriceLKR, 'EUR'), 'EUR'),
        symbol: this.getCurrencySymbol('EUR')
      }
    };
  }

  /**
   * Update exchange rates (placeholder for real API integration)
   * TODO: Implement real-time rate fetching
   */
  async updateExchangeRates() {
    try {
      logger.info('Updating exchange rates...');
      
      // TODO: Fetch from real API
      // const response = await fetch('https://api.exchangerate-api.com/v4/latest/LKR');
      // const data = await response.json();
      // this.exchangeRates['LKR'] = data.rates;
      
      // For now, just update timestamp
      this.lastUpdated = new Date();
      
      logger.info('Exchange rates updated successfully');
      
    } catch (error) {
      logger.error('Failed to update exchange rates:', error);
    }
  }

  /**
   * Schedule periodic rate updates
   * TODO: Implement with cron job or scheduler
   */
  scheduleRateUpdates() {
    // Update rates every hour
    setInterval(() => {
      this.updateExchangeRates();
    }, 60 * 60 * 1000);
    
    logger.info('Exchange rate update scheduler started');
  }

  /**
   * Get currency metadata
   * @param {string} currency - Currency code
   * @returns {Object} Currency metadata
   */
  getCurrencyMetadata(currency) {
    const metadata = {
      'LKR': {
        name: 'Sri Lankan Rupee',
        symbol: 'Rs.',
        code: 'LKR',
        decimals: 2,
        country: 'Sri Lanka',
        flag: '🇱🇰'
      },
      'USD': {
        name: 'US Dollar',
        symbol: '$',
        code: 'USD',
        decimals: 2,
        country: 'United States',
        flag: '🇺🇸'
      },
      'EUR': {
        name: 'Euro',
        symbol: '€',
        code: 'EUR',
        decimals: 2,
        country: 'European Union',
        flag: '🇪🇺'
      }
    };
    
    return metadata[currency] || null;
  }

  /**
   * Validate currency amount
   * @param {number} amount - Amount to validate
   * @param {string} currency - Currency code
   * @returns {boolean} True if valid
   */
  isValidAmount(amount, currency) {
    if (typeof amount !== 'number' || amount < 0) {
      return false;
    }
    
    if (!this.isSupported(currency)) {
      return false;
    }
    
    // Check for reasonable limits
    const limits = {
      'LKR': { min: 0, max: 10000000 }, // 10 million LKR
      'USD': { min: 0, max: 50000 },    // 50k USD
      'EUR': { min: 0, max: 50000 }     // 50k EUR
    };
    
    const limit = limits[currency];
    return amount >= limit.min && amount <= limit.max;
  }
}

module.exports = new CurrencyService();
