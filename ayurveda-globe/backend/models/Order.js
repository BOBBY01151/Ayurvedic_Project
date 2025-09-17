const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: [true, 'Order number is required']
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: [true, 'Booking reference is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  items: [{
    type: {
      type: String,
      enum: ['treatment', 'consultation', 'package', 'addon'],
      required: true
    },
    reference: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'items.referenceModel'
    },
    referenceModel: {
      type: String,
      enum: ['Treatment', 'Practitioner', 'Package', 'Addon']
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: String,
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    unitPrice: {
      amount: {
        type: Number,
        required: true,
        min: 0
      },
      currency: {
        type: String,
        enum: ['LKR', 'USD', 'EUR'],
        required: true
      }
    },
    totalPrice: {
      amount: {
        type: Number,
        required: true,
        min: 0
      },
      currency: {
        type: String,
        enum: ['LKR', 'USD', 'EUR'],
        required: true
      }
    },
    taxes: [{
      name: String,
      rate: Number,
      amount: Number
    }],
    discounts: [{
      name: String,
      type: {
        type: String,
        enum: ['percentage', 'fixed']
      },
      value: Number,
      amount: Number
    }]
  }],
  totals: {
    subtotal: {
      amount: {
        type: Number,
        required: true,
        min: 0
      },
      currency: {
        type: String,
        enum: ['LKR', 'USD', 'EUR'],
        required: true
      }
    },
    taxes: {
      amount: {
        type: Number,
        default: 0,
        min: 0
      },
      currency: {
        type: String,
        enum: ['LKR', 'USD', 'EUR']
      }
    },
    discounts: {
      amount: {
        type: Number,
        default: 0,
        min: 0
      },
      currency: {
        type: String,
        enum: ['LKR', 'USD', 'EUR']
      }
    },
    total: {
      amount: {
        type: Number,
        required: true,
        min: 0
      },
      currency: {
        type: String,
        enum: ['LKR', 'USD', 'EUR'],
        required: true
      }
    }
  },
  payment: {
    method: {
      type: String,
      enum: ['stripe', 'paypal', 'bank_transfer', 'cash', 'card'],
      required: [true, 'Payment method is required']
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded', 'partially_refunded'],
      default: 'pending'
    },
    stripePaymentIntentId: String,
    stripeChargeId: String,
    paypalOrderId: String,
    transactionId: String,
    processorFee: {
      amount: Number,
      currency: String
    },
    paidAt: Date,
    failureReason: String
  },
  billing: {
    name: {
      type: String,
      required: [true, 'Billing name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Billing email is required'],
      lowercase: true,
      trim: true
    },
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String
    }
  },
  currency: {
    primary: {
      type: String,
      enum: ['LKR', 'USD', 'EUR'],
      required: true
    },
    exchangeRates: {
      LKR: { type: Number, default: 1 },
      USD: Number,
      EUR: Number
    },
    ratesUpdatedAt: Date
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'confirmed', 'processing', 'completed', 'cancelled', 'refunded'],
    default: 'draft'
  },
  notes: {
    customer: String,
    internal: String,
    payment: String
  },
  refunds: [{
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      enum: ['LKR', 'USD', 'EUR'],
      required: true
    },
    reason: {
      type: String,
      required: true,
      trim: true
    },
    stripeRefundId: String,
    processedAt: {
      type: Date,
      default: Date.now
    },
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'succeeded', 'failed', 'cancelled'],
      default: 'pending'
    }
  }],
  timeline: [{
    event: {
      type: String,
      required: true,
      enum: [
        'order_created',
        'payment_initiated',
        'payment_completed',
        'payment_failed',
        'order_confirmed',
        'order_cancelled',
        'refund_initiated',
        'refund_completed'
      ]
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    description: String,
    metadata: mongoose.Schema.Types.Mixed
  }],
  metadata: {
    userAgent: String,
    ipAddress: String,
    source: {
      type: String,
      enum: ['web', 'mobile', 'admin', 'api'],
      default: 'web'
    },
    utm: {
      source: String,
      medium: String,
      campaign: String,
      content: String,
      term: String
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ booking: 1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ 'payment.status': 1 });
orderSchema.index({ 'payment.stripePaymentIntentId': 1 });
orderSchema.index({ createdAt: -1 });

// Virtual for total refunded amount
orderSchema.virtual('totalRefunded').get(function() {
  return this.refunds
    .filter(refund => refund.status === 'succeeded')
    .reduce((total, refund) => total + refund.amount, 0);
});

// Virtual for remaining refundable amount
orderSchema.virtual('refundableAmount').get(function() {
  return Math.max(0, this.totals.total.amount - this.totalRefunded);
});

// Virtual for order age in hours
orderSchema.virtual('ageInHours').get(function() {
  return Math.floor((new Date() - this.createdAt) / (1000 * 60 * 60));
});

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    // Find the last order of the day
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
    
    const lastOrder = await this.constructor.findOne({
      createdAt: { $gte: startOfDay, $lt: endOfDay }
    }).sort({ createdAt: -1 });
    
    let sequence = 1;
    if (lastOrder && lastOrder.orderNumber) {
      const lastSequence = parseInt(lastOrder.orderNumber.slice(-4));
      sequence = lastSequence + 1;
    }
    
    this.orderNumber = `AG${year}${month}${day}${sequence.toString().padStart(4, '0')}`;
  }
  next();
});

// Pre-save middleware to calculate totals
orderSchema.pre('save', function(next) {
  if (this.isModified('items')) {
    let subtotal = 0;
    let totalTaxes = 0;
    let totalDiscounts = 0;
    
    this.items.forEach(item => {
      subtotal += item.totalPrice.amount;
      
      if (item.taxes) {
        totalTaxes += item.taxes.reduce((sum, tax) => sum + tax.amount, 0);
      }
      
      if (item.discounts) {
        totalDiscounts += item.discounts.reduce((sum, discount) => sum + discount.amount, 0);
      }
    });
    
    this.totals.subtotal.amount = subtotal;
    this.totals.taxes.amount = totalTaxes;
    this.totals.discounts.amount = totalDiscounts;
    this.totals.total.amount = subtotal + totalTaxes - totalDiscounts;
    
    // Set currency for all totals
    const primaryCurrency = this.currency.primary;
    this.totals.subtotal.currency = primaryCurrency;
    this.totals.taxes.currency = primaryCurrency;
    this.totals.discounts.currency = primaryCurrency;
    this.totals.total.currency = primaryCurrency;
  }
  next();
});

// Method to add timeline event
orderSchema.methods.addTimelineEvent = function(event, description, metadata = {}) {
  this.timeline.push({
    event,
    description,
    metadata
  });
  return this.save();
};

// Method to process refund
orderSchema.methods.processRefund = function(amount, reason, processedBy) {
  if (amount > this.refundableAmount) {
    throw new Error('Refund amount exceeds refundable amount');
  }
  
  this.refunds.push({
    amount,
    currency: this.totals.total.currency,
    reason,
    processedBy
  });
  
  this.addTimelineEvent('refund_initiated', `Refund of ${amount} ${this.totals.total.currency} initiated`, {
    amount,
    reason
  });
  
  return this.save();
};

// Static method to get orders by date range
orderSchema.statics.getOrdersByDateRange = function(startDate, endDate, status = null) {
  const query = {
    createdAt: {
      $gte: startDate,
      $lte: endDate
    }
  };
  
  if (status) {
    query.status = status;
  }
  
  return this.find(query).sort({ createdAt: -1 });
};

// Static method to get revenue statistics
orderSchema.statics.getRevenueStats = function(startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
        status: { $in: ['completed', 'confirmed'] }
      }
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totals.total.amount' },
        totalOrders: { $sum: 1 },
        averageOrderValue: { $avg: '$totals.total.amount' }
      }
    }
  ]);
};

module.exports = mongoose.model('Order', orderSchema);
