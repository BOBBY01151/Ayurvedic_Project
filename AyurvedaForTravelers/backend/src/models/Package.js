const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Package name is required'],
    trim: true,
    maxlength: [200, 'Name cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Package description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  type: {
    type: String,
    required: [true, 'Package type is required'],
    enum: [
      'Retreat Package',
      'Wellness Package',
      'Detox Package',
      'Rejuvenation Package',
      'Custom Package'
    ]
  },
  duration: {
    days: {
      type: Number,
      required: [true, 'Package duration in days is required'],
      min: [1, 'Duration must be at least 1 day'],
      max: [90, 'Duration cannot exceed 90 days']
    },
    nights: {
      type: Number,
      required: [true, 'Package duration in nights is required'],
      min: [0, 'Nights cannot be negative'],
      max: [89, 'Nights cannot exceed 89']
    }
  },
  treatments: [{
    treatment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Treatment',
      required: true
    },
    sessions: {
      type: Number,
      required: true,
      min: 1
    },
    frequency: {
      type: String,
      enum: ['daily', 'alternate', 'weekly', 'custom'],
      default: 'daily'
    },
    customSchedule: [{
      day: Number,
      time: String,
      notes: String
    }]
  }],
  accommodation: {
    type: {
      type: String,
      enum: ['Basic', 'Standard', 'Deluxe', 'Premium', 'None'],
      default: 'Standard'
    },
    description: String,
    amenities: [String],
    roomType: {
      type: String,
      enum: ['Single', 'Double', 'Twin', 'Suite', 'Villa'],
      default: 'Single'
    }
  },
  meals: {
    included: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      enum: ['Vegetarian', 'Vegan', 'Ayurvedic', 'Mixed'],
      default: 'Ayurvedic'
    },
    description: String,
    specialDietary: [String]
  },
  price: {
    basePriceLKR: {
      type: Number,
      required: [true, 'Base price in LKR is required'],
      min: [0, 'Price cannot be negative']
    },
    singleOccupancy: {
      type: Number,
      min: 0
    },
    doubleOccupancy: {
      type: Number,
      min: 0
    }
  },
  inclusions: [{
    type: String,
    trim: true,
    maxlength: [200, 'Each inclusion cannot exceed 200 characters']
  }],
  exclusions: [{
    type: String,
    trim: true,
    maxlength: [200, 'Each exclusion cannot exceed 200 characters']
  }],
  location: {
    city: {
      type: String,
      required: [true, 'City is required'],
      enum: [
        'Colombo', 'Kandy', 'Galle', 'Negombo', 'Ella', 'Nuwara Eliya',
        'Anuradhapura', 'Polonnaruwa', 'Sigiriya', 'Bentota', 'Hikkaduwa',
        'Mirissa', 'Unawatuna', 'Trincomalee', 'Batticaloa', 'Jaffna',
        'Matara', 'Ratnapura', 'Badulla', 'Kurunegala'
      ]
    },
    clinic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Clinic'
    },
    resort: {
      name: String,
      address: String,
      coordinates: {
        lat: Number,
        lng: Number
      }
    }
  },
  availability: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    maxParticipants: {
      type: Number,
      default: 10,
      min: 1,
      max: 50
    },
    currentParticipants: {
      type: Number,
      default: 0,
      min: 0
    },
    bookingDeadline: {
      type: Date
    }
  },
  cancellationPolicy: {
    freeCancellationDays: {
      type: Number,
      default: 7
    },
    cancellationFee: {
      type: Number,
      default: 0,
      min: 0,
      max: 100 // percentage
    },
    terms: String
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['treatment', 'accommodation', 'meals', 'location', 'general'],
      default: 'general'
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
packageSchema.index({ type: 1, isActive: 1 });
packageSchema.index({ 'location.city': 1 });
packageSchema.index({ 'price.basePriceLKR': 1 });
packageSchema.index({ 'availability.startDate': 1, 'availability.endDate': 1 });
packageSchema.index({ 'rating.average': -1 });
packageSchema.index({ isFeatured: 1, isActive: 1 });
packageSchema.index({ tags: 1 });

// Virtual for availability status
packageSchema.virtual('isAvailable').get(function() {
  const now = new Date();
  return this.availability.startDate <= now && 
         this.availability.endDate >= now &&
         this.availability.currentParticipants < this.availability.maxParticipants;
});

// Virtual for spots remaining
packageSchema.virtual('spotsRemaining').get(function() {
  return this.availability.maxParticipants - this.availability.currentParticipants;
});

// Method to check if package can be booked
packageSchema.methods.canBeBooked = function() {
  const now = new Date();
  return this.isActive && 
         this.isAvailable &&
         (!this.availability.bookingDeadline || this.availability.bookingDeadline >= now);
};

module.exports = mongoose.model('Package', packageSchema);
