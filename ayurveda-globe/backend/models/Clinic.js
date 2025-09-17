const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Clinic name is required'],
    trim: true,
    maxlength: [200, 'Clinic name cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    enum: [
      'Colombo',
      'Kandy',
      'Galle',
      'Negombo',
      'Ella',
      'Nuwara Eliya',
      'Anuradhapura',
      'Polonnaruwa',
      'Sigiriya',
      'Bentota',
      'Hikkaduwa',
      'Mirissa',
      'Unawatuna',
      'Trincomalee',
      'Batticaloa',
      'Jaffna',
      'Matara',
      'Ratnapura',
      'Badulla',
      'Kurunegala'
    ]
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true,
      maxlength: [200, 'Street address cannot exceed 200 characters']
    },
    district: {
      type: String,
      required: [true, 'District is required'],
      trim: true
    },
    province: {
      type: String,
      required: [true, 'Province is required'],
      enum: [
        'Western',
        'Central',
        'Southern',
        'Northern',
        'Eastern',
        'North Western',
        'North Central',
        'Uva',
        'Sabaragamuwa'
      ]
    },
    postalCode: {
      type: String,
      trim: true,
      match: [/^\d{5}$/, 'Please enter a valid 5-digit postal code']
    }
  },
  geo: {
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: [true, 'Coordinates are required'],
      validate: {
        validator: function(coords) {
          return coords.length === 2 && 
                 coords[0] >= 79.5 && coords[0] <= 81.9 && // Longitude range for Sri Lanka
                 coords[1] >= 5.9 && coords[1] <= 9.9;     // Latitude range for Sri Lanka
        },
        message: 'Invalid coordinates for Sri Lanka'
      }
    },
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    }
  },
  contact: {
    phone: [{
      type: String,
      required: [true, 'At least one phone number is required'],
      trim: true,
      match: [/^\+94\d{9}$/, 'Please enter a valid Sri Lankan phone number (+94xxxxxxxxx)']
    }],
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address'
      ]
    },
    website: {
      type: String,
      trim: true,
      match: [
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
        'Please enter a valid website URL'
      ]
    },
    whatsapp: {
      type: String,
      trim: true,
      match: [/^\+94\d{9}$/, 'Please enter a valid WhatsApp number (+94xxxxxxxxx)']
    }
  },
  operatingHours: {
    monday: { start: String, end: String, closed: { type: Boolean, default: false } },
    tuesday: { start: String, end: String, closed: { type: Boolean, default: false } },
    wednesday: { start: String, end: String, closed: { type: Boolean, default: false } },
    thursday: { start: String, end: String, closed: { type: Boolean, default: false } },
    friday: { start: String, end: String, closed: { type: Boolean, default: false } },
    saturday: { start: String, end: String, closed: { type: Boolean, default: false } },
    sunday: { start: String, end: String, closed: { type: Boolean, default: true } }
  },
  facilities: [{
    type: String,
    enum: [
      'Parking',
      'WiFi',
      'Air Conditioning',
      'Herbal Garden',
      'Yoga Hall',
      'Meditation Room',
      'Steam Bath',
      'Jacuzzi',
      'Swimming Pool',
      'Restaurant',
      'Accommodation',
      'Pharmacy',
      'Laboratory',
      'Wheelchair Accessible',
      'Emergency Services',
      'Ambulance Service'
    ]
  }],
  specializations: [{
    type: String,
    enum: [
      'Panchakarma',
      'Chronic Disease Treatment',
      'Pain Management',
      'Stress Management',
      'Weight Management',
      'Skin Disorders',
      'Digestive Disorders',
      'Respiratory Disorders',
      'Neurological Disorders',
      'Gynecological Disorders',
      'Pediatric Care',
      'Geriatric Care',
      'Sports Medicine',
      'Beauty & Wellness',
      'Detoxification'
    ]
  }],
  accreditations: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    issuedBy: {
      type: String,
      required: true,
      trim: true
    },
    validUntil: Date,
    certificateUrl: String,
    verified: {
      type: Boolean,
      default: false
    }
  }],
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
      enum: ['exterior', 'interior', 'treatment_room', 'facility', 'garden', 'accommodation'],
      default: 'interior'
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
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
  priceRange: {
    min: {
      type: Number,
      required: [true, 'Minimum price is required'],
      min: 0
    },
    max: {
      type: Number,
      required: [true, 'Maximum price is required'],
      min: 0
    },
    currency: {
      type: String,
      enum: ['LKR', 'USD', 'EUR'],
      default: 'LKR'
    }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  establishedYear: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear()
  },
  languages: [{
    type: String,
    enum: ['English', 'Sinhala', 'Tamil', 'Hindi'],
    default: ['English', 'Sinhala']
  }],
  paymentMethods: [{
    type: String,
    enum: ['Cash', 'Credit Card', 'Bank Transfer', 'Mobile Payment', 'Cryptocurrency'],
    default: ['Cash', 'Credit Card']
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Geospatial index for location-based queries
clinicSchema.index({ 'geo.coordinates': '2dsphere' });

// Other indexes for performance
clinicSchema.index({ city: 1, isActive: 1 });
clinicSchema.index({ specializations: 1 });
clinicSchema.index({ 'rating.average': -1 });
clinicSchema.index({ isFeatured: 1, isVerified: 1 });
clinicSchema.index({ priceRange: 1 });

// Virtual for full address
clinicSchema.virtual('fullAddress').get(function() {
  return `${this.address.street}, ${this.city}, ${this.address.district}, ${this.address.province}${this.address.postalCode ? ` ${this.address.postalCode}` : ''}`;
});

// Virtual for coordinates in lat, lng format
clinicSchema.virtual('coordinates').get(function() {
  return {
    lng: this.geo.coordinates[0],
    lat: this.geo.coordinates[1]
  };
});

// Method to check if clinic is open on a specific day
clinicSchema.methods.isOpenOn = function(dayName) {
  const day = dayName.toLowerCase();
  return this.operatingHours[day] && !this.operatingHours[day].closed;
};

// Method to get operating hours for a specific day
clinicSchema.methods.getHoursFor = function(dayName) {
  const day = dayName.toLowerCase();
  const hours = this.operatingHours[day];
  
  if (!hours || hours.closed) {
    return 'Closed';
  }
  
  return `${hours.start} - ${hours.end}`;
};

// Static method to find clinics near a location
clinicSchema.statics.findNearby = function(longitude, latitude, maxDistance = 50000) {
  return this.find({
    'geo.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: maxDistance // in meters
      }
    },
    isActive: true
  });
};

// Static method to find clinics by city
clinicSchema.statics.findByCity = function(city) {
  return this.find({ 
    city: new RegExp(city, 'i'), 
    isActive: true 
  }).sort({ 'rating.average': -1 });
};

module.exports = mongoose.model('Clinic', clinicSchema);
