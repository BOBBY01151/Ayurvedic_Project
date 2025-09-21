const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Therapist name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  title: {
    type: String,
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
    default: 'Ayurvedic Therapist'
  },
  specialties: [{
    type: String,
    enum: [
      'Panchakarma',
      'Abhyanga',
      'Shirodhara',
      'Udvartana',
      'Nasya',
      'Basti',
      'Virechana',
      'Vamana',
      'Raktamokshana',
      'Marma Therapy',
      'Yoga Therapy',
      'Meditation',
      'Herbal Medicine',
      'Pulse Diagnosis',
      'Lifestyle Counseling'
    ],
    required: true
  }],
  qualifications: [{
    degree: {
      type: String,
      required: true,
      trim: true
    },
    institution: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: Number,
      min: 1950,
      max: new Date().getFullYear()
    },
    verified: {
      type: Boolean,
      default: false
    }
  }],
  experience: {
    years: {
      type: Number,
      required: [true, 'Years of experience is required'],
      min: [0, 'Experience cannot be negative'],
      max: [70, 'Experience seems unrealistic']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Experience description cannot exceed 1000 characters']
    }
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [2000, 'Bio cannot exceed 2000 characters']
  },
  languages: [{
    type: String,
    enum: ['English', 'Sinhala', 'Tamil', 'Hindi', 'German', 'Russian'],
    default: ['English', 'Sinhala']
  }],
  availability: {
    monday: { start: String, end: String, available: { type: Boolean, default: true } },
    tuesday: { start: String, end: String, available: { type: Boolean, default: true } },
    wednesday: { start: String, end: String, available: { type: Boolean, default: true } },
    thursday: { start: String, end: String, available: { type: Boolean, default: true } },
    friday: { start: String, end: String, available: { type: Boolean, default: true } },
    saturday: { start: String, end: String, available: { type: Boolean, default: true } },
    sunday: { start: String, end: String, available: { type: Boolean, default: false } }
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
  consultationFee: {
    amount: {
      type: Number,
      required: [true, 'Consultation fee is required'],
      min: [0, 'Consultation fee cannot be negative']
    },
    currency: {
      type: String,
      enum: ['LKR', 'USD', 'EUR'],
      default: 'LKR'
    }
  },
  contact: {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address'
      ]
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return this.hasLoginAccess;
    }
  },
  hasLoginAccess: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  profileImage: {
    type: String, // URL to image
    default: null
  },
  certificates: [{
    name: String,
    url: String, // URL to certificate image/PDF
    issueDate: Date,
    verified: { type: Boolean, default: false }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
therapistSchema.index({ specialties: 1 });
therapistSchema.index({ 'rating.average': -1 });
therapistSchema.index({ isActive: 1, isVerified: 1 });
therapistSchema.index({ languages: 1 });

// Virtual for average rating display
therapistSchema.virtual('displayRating').get(function() {
  return this.rating.count > 0 ? this.rating.average.toFixed(1) : 'No ratings yet';
});

// Method to check availability for a specific day
therapistSchema.methods.isAvailableOn = function(dayName) {
  const day = dayName.toLowerCase();
  return this.availability[day] && this.availability[day].available;
};

// Method to get consultation fee in different currencies
therapistSchema.methods.getConsultationFeeIn = function(targetCurrency) {
  const rates = {
    'LKR': { 'USD': 0.003, 'EUR': 0.0027 },
    'USD': { 'LKR': 330, 'EUR': 0.9 },
    'EUR': { 'LKR': 370, 'USD': 1.1 }
  };
  
  const rate = rates[this.consultationFee.currency]?.[targetCurrency] || 1;
  return Math.round(this.consultationFee.amount * rate * 100) / 100;
};

module.exports = mongoose.model('Therapist', therapistSchema);
