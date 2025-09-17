const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Treatment title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Treatment description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  category: {
    type: String,
    required: [true, 'Treatment category is required'],
    enum: [
      'Panchakarma',
      'Massage Therapy',
      'Herbal Treatment',
      'Yoga & Meditation',
      'Consultation',
      'Detoxification',
      'Rejuvenation',
      'Pain Management',
      'Stress Relief',
      'Beauty & Wellness'
    ]
  },
  type: {
    type: String,
    required: [true, 'Treatment type is required'],
    enum: [
      'Abhyanga',
      'Shirodhara',
      'Udvartana',
      'Nasya',
      'Basti',
      'Virechana',
      'Vamana',
      'Raktamokshana',
      'Marma Therapy',
      'Consultation',
      'Custom Treatment'
    ]
  },
  durationMinutes: {
    type: Number,
    required: [true, 'Treatment duration is required'],
    min: [15, 'Treatment duration must be at least 15 minutes'],
    max: [480, 'Treatment duration cannot exceed 8 hours']
  },
  basePriceLKR: {
    type: Number,
    required: [true, 'Base price in LKR is required'],
    min: [0, 'Price cannot be negative']
  },
  benefits: [{
    type: String,
    trim: true,
    maxlength: [200, 'Each benefit cannot exceed 200 characters']
  }],
  contraindications: [{
    type: String,
    trim: true,
    maxlength: [200, 'Each contraindication cannot exceed 200 characters']
  }],
  preparationInstructions: {
    type: String,
    trim: true,
    maxlength: [1000, 'Preparation instructions cannot exceed 1000 characters']
  },
  aftercareInstructions: {
    type: String,
    trim: true,
    maxlength: [1000, 'Aftercare instructions cannot exceed 1000 characters']
  },
  ingredients: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    benefits: [{
      type: String,
      trim: true
    }]
  }],
  suitableFor: {
    conditions: [{
      type: String,
      enum: [
        'Stress',
        'Anxiety',
        'Insomnia',
        'Joint Pain',
        'Muscle Pain',
        'Digestive Issues',
        'Skin Problems',
        'Fatigue',
        'Headaches',
        'Back Pain',
        'Arthritis',
        'High Blood Pressure',
        'Diabetes',
        'Weight Management'
      ]
    }],
    ageGroups: [{
      type: String,
      enum: ['Children', 'Adults', 'Elderly', 'Pregnant Women']
    }],
    bodyTypes: [{
      type: String,
      enum: ['Vata', 'Pitta', 'Kapha', 'All Types']
    }]
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
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  availability: {
    clinics: [{
      clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic',
        required: true
      },
      practitioners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Practitioner'
      }],
      price: {
        amount: Number,
        currency: {
          type: String,
          enum: ['LKR', 'USD', 'EUR'],
          default: 'LKR'
        }
      },
      isAvailable: {
        type: Boolean,
        default: true
      }
    }]
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
  popularityScore: {
    type: Number,
    default: 0,
    min: 0
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  seasonalAvailability: [{
    season: {
      type: String,
      enum: ['Spring', 'Summer', 'Monsoon', 'Winter', 'All Year']
    },
    recommended: {
      type: Boolean,
      default: true
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
treatmentSchema.index({ category: 1, type: 1 });
treatmentSchema.index({ basePriceLKR: 1 });
treatmentSchema.index({ 'rating.average': -1 });
treatmentSchema.index({ popularityScore: -1 });
treatmentSchema.index({ isActive: 1, isFeatured: 1 });
treatmentSchema.index({ tags: 1 });
treatmentSchema.index({ 'suitableFor.conditions': 1 });

// Virtual for duration display
treatmentSchema.virtual('durationDisplay').get(function() {
  const hours = Math.floor(this.durationMinutes / 60);
  const minutes = this.durationMinutes % 60;
  
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}m`;
  }
});

// Virtual for price in different currencies
treatmentSchema.virtual('priceUSD').get(function() {
  // TODO: Implement real currency conversion
  return Math.round(this.basePriceLKR * 0.003 * 100) / 100;
});

treatmentSchema.virtual('priceEUR').get(function() {
  // TODO: Implement real currency conversion
  return Math.round(this.basePriceLKR * 0.0027 * 100) / 100;
});

// Method to get price in specific currency
treatmentSchema.methods.getPriceIn = function(currency) {
  const rates = {
    'LKR': 1,
    'USD': 0.003,
    'EUR': 0.0027
  };
  
  const rate = rates[currency] || 1;
  return Math.round(this.basePriceLKR * rate * 100) / 100;
};

// Method to check if treatment is suitable for a condition
treatmentSchema.methods.isSuitableFor = function(condition) {
  return this.suitableFor.conditions.includes(condition);
};

// Static method to find treatments by category
treatmentSchema.statics.findByCategory = function(category) {
  return this.find({ category, isActive: true }).sort({ popularityScore: -1 });
};

module.exports = mongoose.model('Treatment', treatmentSchema);
