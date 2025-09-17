const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const logger = require('../config/logger');
const { createError } = require('../utils/httpErrors');

/**
 * Payment Service for handling Stripe payments
 * TODO: Add support for other payment gateways (PayPal, local banks)
 */

class PaymentService {
  constructor() {
    this.isStripeConfigured = !!process.env.STRIPE_SECRET_KEY;
    
    if (!this.isStripeConfigured) {
      logger.warn('Stripe not configured - payment service will use mock responses');
    }
  }

  /**
   * Create a payment intent for booking
   * @param {number} amountLKR - Amount in LKR cents
   * @param {string} currency - Currency code (LKR, USD, EUR)
   * @param {Object} metadata - Additional metadata
   * @returns {Object} Payment intent object
   */
  async createPaymentIntent(amountLKR, currency = 'LKR', metadata = {}) {
    try {
      // Convert amount based on currency
      const amount = this.convertAmount(amountLKR, currency);
      
      if (!this.isStripeConfigured) {
        // Return mock payment intent for development
        return this.createMockPaymentIntent(amount, currency, metadata);
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe expects amount in cents
        currency: currency.toLowerCase(),
        metadata: {
          source: 'ayurveda-globe',
          ...metadata
        },
        automatic_payment_methods: {
          enabled: true,
        },
        description: `Ayurveda Globe - ${metadata.treatmentName || 'Treatment Booking'}`,
      });

      logger.info('Payment intent created:', {
        id: paymentIntent.id,
        amount,
        currency,
        status: paymentIntent.status
      });

      return {
        id: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        amount,
        currency,
        status: paymentIntent.status,
        created: new Date(paymentIntent.created * 1000),
        metadata: paymentIntent.metadata
      };

    } catch (error) {
      logger.error('Payment intent creation failed:', error);
      
      if (error.type === 'StripeCardError') {
        throw createError(400, 'Card was declined', 'CARD_DECLINED');
      }
      
      if (error.type === 'StripeInvalidRequestError') {
        throw createError(400, 'Invalid payment request', 'INVALID_PAYMENT_REQUEST');
      }
      
      throw createError(500, 'Payment processing failed', 'PAYMENT_SERVICE_ERROR');
    }
  }

  /**
   * Confirm a payment intent
   * @param {string} paymentIntentId - Payment intent ID
   * @param {string} paymentMethodId - Payment method ID
   * @returns {Object} Confirmed payment intent
   */
  async confirmPaymentIntent(paymentIntentId, paymentMethodId) {
    try {
      if (!this.isStripeConfigured) {
        return this.createMockConfirmation(paymentIntentId);
      }

      const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
        payment_method: paymentMethodId,
        return_url: `${process.env.FRONTEND_URL}/payment/success`,
      });

      logger.info('Payment confirmed:', {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount
      });

      return {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency.toUpperCase(),
        charges: paymentIntent.charges?.data || []
      };

    } catch (error) {
      logger.error('Payment confirmation failed:', error);
      throw createError(400, 'Payment confirmation failed', 'PAYMENT_CONFIRMATION_FAILED');
    }
  }

  /**
   * Retrieve payment intent details
   * @param {string} paymentIntentId - Payment intent ID
   * @returns {Object} Payment intent details
   */
  async getPaymentIntent(paymentIntentId) {
    try {
      if (!this.isStripeConfigured) {
        return this.createMockPaymentIntent(5000, 'LKR', { id: paymentIntentId });
      }

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency.toUpperCase(),
        status: paymentIntent.status,
        created: new Date(paymentIntent.created * 1000),
        metadata: paymentIntent.metadata
      };

    } catch (error) {
      logger.error('Payment intent retrieval failed:', error);
      throw createError(404, 'Payment intent not found', 'PAYMENT_INTENT_NOT_FOUND');
    }
  }

  /**
   * Process a refund
   * @param {string} chargeId - Charge ID to refund
   * @param {number} amount - Amount to refund (optional, full refund if not specified)
   * @param {string} reason - Refund reason
   * @returns {Object} Refund object
   */
  async processRefund(chargeId, amount = null, reason = 'requested_by_customer') {
    try {
      if (!this.isStripeConfigured) {
        return this.createMockRefund(chargeId, amount);
      }

      const refundData = {
        charge: chargeId,
        reason
      };

      if (amount) {
        refundData.amount = Math.round(amount * 100); // Convert to cents
      }

      const refund = await stripe.refunds.create(refundData);

      logger.info('Refund processed:', {
        id: refund.id,
        amount: refund.amount / 100,
        status: refund.status,
        charge: chargeId
      });

      return {
        id: refund.id,
        amount: refund.amount / 100,
        currency: refund.currency.toUpperCase(),
        status: refund.status,
        created: new Date(refund.created * 1000),
        charge: refund.charge
      };

    } catch (error) {
      logger.error('Refund processing failed:', error);
      throw createError(400, 'Refund processing failed', 'REFUND_FAILED');
    }
  }

  /**
   * Convert amount from LKR to target currency
   * @param {number} amountLKR - Amount in LKR
   * @param {string} targetCurrency - Target currency
   * @returns {number} Converted amount
   */
  convertAmount(amountLKR, targetCurrency) {
    // TODO: Implement real-time currency conversion
    const rates = {
      'LKR': 1,
      'USD': 0.003, // 1 LKR = 0.003 USD (approximate)
      'EUR': 0.0027 // 1 LKR = 0.0027 EUR (approximate)
    };

    const rate = rates[targetCurrency] || 1;
    return Math.round(amountLKR * rate * 100) / 100;
  }

  /**
   * Create mock payment intent for development
   */
  createMockPaymentIntent(amount, currency, metadata) {
    return {
      id: `pi_mock_${Date.now()}`,
      clientSecret: `pi_mock_${Date.now()}_secret_mock`,
      amount,
      currency,
      status: 'requires_payment_method',
      created: new Date(),
      metadata: {
        mock: true,
        ...metadata
      }
    };
  }

  /**
   * Create mock payment confirmation for development
   */
  createMockConfirmation(paymentIntentId) {
    return {
      id: paymentIntentId,
      status: 'succeeded',
      amount: 5000,
      currency: 'LKR',
      charges: [{
        id: `ch_mock_${Date.now()}`,
        amount: 5000,
        currency: 'lkr',
        status: 'succeeded'
      }]
    };
  }

  /**
   * Create mock refund for development
   */
  createMockRefund(chargeId, amount) {
    return {
      id: `re_mock_${Date.now()}`,
      amount: amount || 5000,
      currency: 'LKR',
      status: 'succeeded',
      created: new Date(),
      charge: chargeId
    };
  }

  /**
   * Validate webhook signature
   * @param {string} payload - Request payload
   * @param {string} signature - Stripe signature header
   * @returns {Object} Webhook event
   */
  validateWebhook(payload, signature) {
    try {
      if (!this.isStripeConfigured) {
        logger.warn('Webhook validation skipped - Stripe not configured');
        return JSON.parse(payload);
      }

      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      return event;

    } catch (error) {
      logger.error('Webhook validation failed:', error);
      throw createError(400, 'Invalid webhook signature', 'INVALID_WEBHOOK');
    }
  }
}

module.exports = new PaymentService();
