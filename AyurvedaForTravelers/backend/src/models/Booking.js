const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required for booking']
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapist',
    required: [true, 'Therapist is required for booking']
  },
  treatment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Treatment'
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package'
  },
  dateTime: {
    type: Date,
    required: [true, 'Booking date and time is required'],
    validate: {
      validator: function(date) {
        return date > new Date();
      },
      message: 'Booking date must be in the future'
    }
  },
  duration: {
    type: Number,
    required: [true, 'Booking duration is required'],
    min: [15, 'Duration must be at least 15 minutes']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'],
    default: 'pending'
  },
  price: {
    amount: {
      type: Number,
      required: [true, 'Booking amount is required'],
      min: [0, 'Amount cannot be negative']
    },
    currency: {
      type: String,
      enum: ['LKR', 'USD', 'EUR'],
      default: 'LKR'
    },
    exchangeRate: {
      type: Number,
      default: 1
    }
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  customerInfo: {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Customer email is required'],
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Customer phone is required'],
      trim: true
    },
    age: {
      type: Number,
      min: [1, 'Age must be positive'],
      max: [150, 'Age seems unrealistic']
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer_not_to_say']
    },
    nationality: String,
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    }
  },
  medicalInfo: {
    conditions: [{
      type: String,
      trim: true
    }],
    medications: [{
      name: String,
      dosage: String,
      frequency: String
    }],
    allergies: [{
      type: String,
      trim: true
    }],
    previousTreatments: [{
      treatment: String,
      date: Date,
      therapist: String,
      notes: String
    }],
    specialRequirements: {
      type: String,
      maxlength: [500, 'Special requirements cannot exceed 500 characters']
    }
  },
  notes: {
    customerNotes: {
      type: String,
      maxlength: [1000, 'Customer notes cannot exceed 1000 characters']
    },
    therapistNotes: {
      type: String,
      maxlength: [1000, 'Therapist notes cannot exceed 1000 characters']
    },
    internalNotes: {
      type: String,
      maxlength: [1000, 'Internal notes cannot exceed 1000 characters']
    }
  },
  reminders: [{
    type: {
      type: String,
      enum: ['email', 'sms', 'whatsapp'],
      required: true
    },
    scheduledFor: {
      type: Date,
      required: true
    },
    sent: {
      type: Boolean,
      default: false
    },
    sentAt: Date
  }],
  cancellation: {
    cancelledAt: Date,
    cancelledBy: {
      type: String,
      enum: ['user', 'therapist', 'admin']
    },
    reason: {
      type: String,
      maxlength: [500, 'Cancellation reason cannot exceed 500 characters']
    },
    refundAmount: Number,
    refundStatus: {
      type: String,
      enum: ['pending', 'processed', 'failed', 'not_applicable'],
      default: 'not_applicable'
    }
  },
  rating: {
    score: {
      type: Number,
      min: 1,
      max: 5
    },
    review: {
      type: String,
      maxlength: [1000, 'Review cannot exceed 1000 characters']
    },
    ratedAt: Date
  },
  followUp: {
    scheduled: {
      type: Boolean,
      default: false
    },
    scheduledFor: Date,
    completed: {
      type: Boolean,
      default: false
    },
    notes: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
bookingSchema.index({ user: 1, dateTime: -1 });
bookingSchema.index({ therapist: 1, dateTime: 1 });
bookingSchema.index({ status: 1, dateTime: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ dateTime: 1 });

// Virtual for booking end time
bookingSchema.virtual('endTime').get(function() {
  return new Date(this.dateTime.getTime() + (this.duration * 60 * 1000));
});

// Virtual for formatted date/time in Sri Lanka timezone
bookingSchema.virtual('formattedDateTime').get(function() {
  return this.dateTime.toLocaleString('en-US', {
    timeZone: 'Asia/Colombo',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const hoursUntilBooking = (this.dateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  return this.status === 'pending' || this.status === 'confirmed' && hoursUntilBooking >= 24;
};

// Method to calculate refund amount based on cancellation policy
bookingSchema.methods.calculateRefundAmount = function() {
  if (!this.canBeCancelled()) return 0;
  
  const now = new Date();
  const hoursUntilBooking = (this.dateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  // Refund policy: 100% if cancelled 48+ hours before, 50% if 24-48 hours, 0% if less than 24 hours
  if (hoursUntilBooking >= 48) return this.price.amount;
  if (hoursUntilBooking >= 24) return this.price.amount * 0.5;
  return 0;
};

module.exports = mongoose.model('Booking', bookingSchema);
