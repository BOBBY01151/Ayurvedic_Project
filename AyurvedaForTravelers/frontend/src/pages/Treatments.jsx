import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Clock, Star, Filter, Search, Leaf } from 'lucide-react'

export default function Treatments() {
  const { t } = useTranslation()
  const [treatments, setTreatments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 500],
    duration: '',
    search: ''
  })

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTreatments([
        {
          id: 1,
          name: 'Abhyanga',
          description: 'Traditional full-body oil massage using warm herbal oils',
          category: 'Massage Therapy',
          duration: 90,
          price: 85,
          rating: 4.9,
          reviews: 127,
          image: '/images/abhyanga.jpg'
        },
        {
          id: 2,
          name: 'Shirodhara',
          description: 'Healing oil therapy for mind and body relaxation',
          category: 'Rejuvenation',
          duration: 60,
          price: 75,
          rating: 4.8,
          reviews: 89,
          image: '/images/shirodhara.jpg'
        },
        {
          id: 3,
          name: 'Udvartana',
          description: 'Herbal powder massage for detoxification',
          category: 'Detoxification',
          duration: 75,
          price: 95,
          rating: 4.7,
          reviews: 65,
          image: '/images/udvartana.jpg'
        },
        {
          id: 4,
          name: 'Nasya',
          description: 'Nasal therapy with herbal oils and medicines',
          category: 'Herbal Treatment',
          duration: 45,
          price: 65,
          rating: 4.6,
          reviews: 43,
          image: '/images/nasya.jpg'
        },
        {
          id: 5,
          name: 'Basti',
          description: 'Medicated enema therapy for internal cleansing',
          category: 'Panchakarma',
          duration: 120,
          price: 150,
          rating: 4.8,
          reviews: 78,
          image: '/images/basti.jpg'
        },
        {
          id: 6,
          name: 'Marma Therapy',
          description: 'Energy point therapy for holistic healing',
          category: 'Pain Management',
          duration: 60,
          price: 110,
          rating: 4.9,
          reviews: 92,
          image: '/images/marma.jpg'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const categories = [
    'All Categories',
    'Panchakarma',
    'Massage Therapy',
    'Herbal Treatment',
    'Rejuvenation',
    'Detoxification',
    'Pain Management'
  ]

  const filteredTreatments = treatments.filter(treatment => {
    const matchesCategory = !filters.category || treatment.category === filters.category || filters.category === 'All Categories'
    const matchesPrice = treatment.price >= filters.priceRange[0] && treatment.price <= filters.priceRange[1]
    const matchesSearch = !filters.search || 
      treatment.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      treatment.description.toLowerCase().includes(filters.search.toLowerCase())
    
    return matchesCategory && matchesPrice && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading treatments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('treatments.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('treatments.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search treatments..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>

            {/* Category Filter */}
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              {categories.map(category => (
                <option key={category} value={category === 'All Categories' ? '' : category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Price Range */}
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                value={filters.priceRange[0]}
                onChange={(e) => setFilters({ 
                  ...filters, 
                  priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]] 
                })}
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({ 
                  ...filters, 
                  priceRange: [filters.priceRange[0], parseInt(e.target.value) || 500] 
                })}
              />
            </div>

            {/* Duration Filter */}
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              value={filters.duration}
              onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
            >
              <option value="">Any Duration</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((treatment) => (
            <div key={treatment.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-emerald-200 flex items-center justify-center">
                <Leaf className="h-16 w-16 text-emerald-600" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {treatment.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">
                      {treatment.rating} ({treatment.reviews})
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {treatment.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {treatment.duration} min
                  </div>
                  <span className="text-lg font-semibold text-emerald-600">
                    ${treatment.price}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <Link
                    to={`/treatments/${treatment.id}`}
                    className="flex-1 text-center py-2 text-emerald-600 border border-emerald-600 rounded-md hover:bg-emerald-50 transition-colors"
                  >
                    Learn More
                  </Link>
                  <Link
                    to={`/booking?treatment=${treatment.id}`}
                    className="flex-1 text-center py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTreatments.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No treatments found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  )
}
