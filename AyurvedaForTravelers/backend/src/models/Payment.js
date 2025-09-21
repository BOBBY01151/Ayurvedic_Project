const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
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
      enum: ['treatment', 'package', 'consultation'],
      required: true
    },
    reference: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'items.referenceModel'
    },
    referenceModel: {
      type: String,
      enum: ['Treatment', 'Package']
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
    }
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
paymentSchema.index({ orderNumber: 1 });
paymentSchema.index({ user: 1, createdAt: -1 });
paymentSchema.index({ booking: 1 });
paymentSchema.index({ status: 1, createdAt: -1 });
paymentSchema.index({ 'payment.status': 1 });
paymentSchema.index({ 'payment.stripePaymentIntentId': 1 });
paymentSchema.index({ createdAt: -1 });

// Virtual for total refunded amount
paymentSchema.virtual('totalRefunded').get(function() {
  return this.refunds
    .filter(refund => refund.status === 'succeeded')
    .reduce((total, refund) => total + refund.amount, 0);
});

// Virtual for remaining refundable amount
paymentSchema.virtual('refundableAmount').get(function() {
  return Math.max(0, this.totals.total.amount - this.totalRefunded);
});

// Pre-save middleware to generate order number
paymentSchema.pre('save', async function(next) {
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
    
    this.orderNumber = `AFT${year}${month}${day}${sequence.toString().padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);
