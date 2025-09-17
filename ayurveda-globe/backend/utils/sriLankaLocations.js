/**
 * Sri Lanka locations data
 * Common cities, districts, and provinces for Ayurvedic clinics and treatments
 */

// Major cities and popular tourist destinations
const cities = [
  {
    name: 'Colombo',
    district: 'Colombo',
    province: 'Western',
    coordinates: [79.8612, 6.9271],
    isCapital: true,
    isPopular: true,
    description: 'Commercial capital and largest city of Sri Lanka'
  },
  {
    name: 'Kandy',
    district: 'Kandy',
    province: 'Central',
    coordinates: [80.6337, 7.2906],
    isCapital: false,
    isPopular: true,
    description: 'Cultural capital and UNESCO World Heritage Site'
  },
  {
    name: 'Galle',
    district: 'Galle',
    province: 'Southern',
    coordinates: [80.2170, 6.0329],
    isCapital: false,
    isPopular: true,
    description: 'Historic coastal city with Dutch colonial architecture'
  },
  {
    name: 'Negombo',
    district: 'Gampaha',
    province: 'Western',
    coordinates: [79.8358, 7.2084],
    isCapital: false,
    isPopular: true,
    description: 'Coastal city near Bandaranaike International Airport'
  },
  {
    name: 'Ella',
    district: 'Badulla',
    province: 'Uva',
    coordinates: [81.0461, 6.8721],
    isCapital: false,
    isPopular: true,
    description: 'Hill country town famous for scenic beauty and tea plantations'
  },
  {
    name: 'Nuwara Eliya',
    district: 'Nuwara Eliya',
    province: 'Central',
    coordinates: [80.7891, 6.9497],
    isCapital: false,
    isPopular: true,
    description: 'Hill station known as "Little England" with cool climate'
  },
  {
    name: 'Anuradhapura',
    district: 'Anuradhapura',
    province: 'North Central',
    coordinates: [80.4037, 8.3114],
    isCapital: false,
    isPopular: true,
    description: 'Ancient capital and UNESCO World Heritage Site'
  },
  {
    name: 'Polonnaruwa',
    district: 'Polonnaruwa',
    province: 'North Central',
    coordinates: [81.0014, 7.9403],
    isCapital: false,
    isPopular: true,
    description: 'Medieval capital and UNESCO World Heritage Site'
  },
  {
    name: 'Sigiriya',
    district: 'Matale',
    province: 'Central',
    coordinates: [80.7603, 7.9568],
    isCapital: false,
    isPopular: true,
    description: 'Ancient rock fortress and UNESCO World Heritage Site'
  },
  {
    name: 'Bentota',
    district: 'Galle',
    province: 'Southern',
    coordinates: [80.0021, 6.4256],
    isCapital: false,
    isPopular: true,
    description: 'Popular beach resort town on the southwest coast'
  },
  {
    name: 'Hikkaduwa',
    district: 'Galle',
    province: 'Southern',
    coordinates: [80.1037, 6.1407],
    isCapital: false,
    isPopular: true,
    description: 'Beach town famous for surfing and coral reefs'
  },
  {
    name: 'Mirissa',
    district: 'Matara',
    province: 'Southern',
    coordinates: [80.4586, 5.9486],
    isCapital: false,
    isPopular: true,
    description: 'Coastal town known for whale watching and beaches'
  },
  {
    name: 'Unawatuna',
    district: 'Galle',
    province: 'Southern',
    coordinates: [80.2492, 6.0108],
    isCapital: false,
    isPopular: true,
    description: 'Beach town with crescent-shaped bay and coral reefs'
  },
  {
    name: 'Trincomalee',
    district: 'Trincomalee',
    province: 'Eastern',
    coordinates: [81.2335, 8.5874],
    isCapital: false,
    isPopular: true,
    description: 'Port city with natural harbor and pristine beaches'
  },
  {
    name: 'Batticaloa',
    district: 'Batticaloa',
    province: 'Eastern',
    coordinates: [81.7981, 7.7172],
    isCapital: false,
    isPopular: false,
    description: 'Eastern coastal city known for lagoons and singing fish'
  },
  {
    name: 'Jaffna',
    district: 'Jaffna',
    province: 'Northern',
    coordinates: [80.0098, 9.6615],
    isCapital: false,
    isPopular: false,
    description: 'Northern city with rich Tamil culture and heritage'
  },
  {
    name: 'Matara',
    district: 'Matara',
    province: 'Southern',
    coordinates: [80.5550, 5.9485],
    isCapital: false,
    isPopular: false,
    description: 'Southern coastal city with historic fort'
  },
  {
    name: 'Ratnapura',
    district: 'Ratnapura',
    province: 'Sabaragamuwa',
    coordinates: [80.4037, 6.6828],
    isCapital: false,
    isPopular: false,
    description: 'City of gems, famous for precious stone mining'
  },
  {
    name: 'Badulla',
    district: 'Badulla',
    province: 'Uva',
    coordinates: [81.0550, 6.9934],
    isCapital: false,
    isPopular: false,
    description: 'Hill country town and administrative center of Uva Province'
  },
  {
    name: 'Kurunegala',
    district: 'Kurunegala',
    province: 'North Western',
    coordinates: [80.3647, 7.4863],
    isCapital: false,
    isPopular: false,
    description: 'Central city known for ancient rock formations'
  }
];

// Provinces of Sri Lanka
const provinces = [
  {
    name: 'Western',
    capital: 'Colombo',
    districts: ['Colombo', 'Gampaha', 'Kalutara'],
    description: 'Most populous province with the commercial capital'
  },
  {
    name: 'Central',
    capital: 'Kandy',
    districts: ['Kandy', 'Matale', 'Nuwara Eliya'],
    description: 'Hill country province with tea plantations and cultural sites'
  },
  {
    name: 'Southern',
    capital: 'Galle',
    districts: ['Galle', 'Matara', 'Hambantota'],
    description: 'Coastal province popular with tourists'
  },
  {
    name: 'Northern',
    capital: 'Jaffna',
    districts: ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'],
    description: 'Northernmost province with Tamil cultural heritage'
  },
  {
    name: 'Eastern',
    capital: 'Trincomalee',
    districts: ['Trincomalee', 'Batticaloa', 'Ampara'],
    description: 'Eastern coastal province with pristine beaches'
  },
  {
    name: 'North Western',
    capital: 'Kurunegala',
    districts: ['Kurunegala', 'Puttalam'],
    description: 'Province with coconut plantations and fishing communities'
  },
  {
    name: 'North Central',
    capital: 'Anuradhapura',
    districts: ['Anuradhapura', 'Polonnaruwa'],
    description: 'Ancient kingdom region with UNESCO World Heritage Sites'
  },
  {
    name: 'Uva',
    capital: 'Badulla',
    districts: ['Badulla', 'Monaragala'],
    description: 'Mountainous province with tea estates and waterfalls'
  },
  {
    name: 'Sabaragamuwa',
    capital: 'Ratnapura',
    districts: ['Ratnapura', 'Kegalle'],
    description: 'Province known for gem mining and rubber plantations'
  }
];

// Districts of Sri Lanka
const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
  'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
  'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
  'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
  'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

// Popular tourist areas for Ayurvedic treatments
const ayurvedicHotspots = [
  {
    name: 'Colombo',
    type: 'Urban',
    specialties: ['Modern Ayurvedic Centers', 'Luxury Spas', 'Medical Tourism'],
    description: 'Urban ayurvedic centers with modern facilities'
  },
  {
    name: 'Kandy',
    type: 'Cultural',
    specialties: ['Traditional Treatments', 'Herbal Medicine', 'Cultural Immersion'],
    description: 'Traditional ayurvedic treatments in cultural setting'
  },
  {
    name: 'Bentota',
    type: 'Beach Resort',
    specialties: ['Wellness Retreats', 'Detox Programs', 'Luxury Treatments'],
    description: 'Beachside ayurvedic resorts and wellness centers'
  },
  {
    name: 'Nuwara Eliya',
    type: 'Hill Station',
    specialties: ['Cool Climate Treatments', 'Herbal Gardens', 'Meditation'],
    description: 'Cool climate ayurvedic treatments in hill country'
  },
  {
    name: 'Galle',
    type: 'Historic Coastal',
    specialties: ['Heritage Wellness', 'Coastal Therapies', 'Boutique Clinics'],
    description: 'Historic coastal town with boutique ayurvedic centers'
  },
  {
    name: 'Negombo',
    type: 'Airport Gateway',
    specialties: ['Transit Wellness', 'Quick Treatments', 'Beach Therapy'],
    description: 'Convenient location for travelers with airport proximity'
  }
];

// Common postal codes for major cities
const postalCodes = {
  'Colombo': ['00100', '00200', '00300', '00400', '00500', '00600', '00700', '00800'],
  'Kandy': ['20000'],
  'Galle': ['80000'],
  'Negombo': ['11500'],
  'Nuwara Eliya': ['22200'],
  'Anuradhapura': ['50000'],
  'Polonnaruwa': ['51000'],
  'Trincomalee': ['31000'],
  'Batticaloa': ['30000'],
  'Jaffna': ['40000'],
  'Matara': ['81000'],
  'Ratnapura': ['70000'],
  'Badulla': ['90000'],
  'Kurunegala': ['60000']
};

// Helper functions
const getCitiesByProvince = (provinceName) => {
  return cities.filter(city => city.province === provinceName);
};

const getPopularCities = () => {
  return cities.filter(city => city.isPopular);
};

const getCityByName = (cityName) => {
  return cities.find(city => city.name.toLowerCase() === cityName.toLowerCase());
};

const getDistrictsByProvince = (provinceName) => {
  const province = provinces.find(p => p.name === provinceName);
  return province ? province.districts : [];
};

const getProvinceByDistrict = (districtName) => {
  return provinces.find(province => province.districts.includes(districtName));
};

const getAyurvedicHotspotsByType = (type) => {
  return ayurvedicHotspots.filter(hotspot => hotspot.type === type);
};

// Validate if coordinates are within Sri Lanka bounds
const isValidSriLankanCoordinates = (longitude, latitude) => {
  return longitude >= 79.5 && longitude <= 81.9 && 
         latitude >= 5.9 && latitude <= 9.9;
};

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
};

// Find nearest cities to given coordinates
const findNearestCities = (longitude, latitude, limit = 5) => {
  return cities
    .map(city => ({
      ...city,
      distance: calculateDistance(latitude, longitude, city.coordinates[1], city.coordinates[0])
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
};

module.exports = {
  cities,
  provinces,
  districts,
  ayurvedicHotspots,
  postalCodes,
  getCitiesByProvince,
  getPopularCities,
  getCityByName,
  getDistrictsByProvince,
  getProvinceByDistrict,
  getAyurvedicHotspotsByType,
  isValidSriLankanCoordinates,
  calculateDistance,
  findNearestCities
};
