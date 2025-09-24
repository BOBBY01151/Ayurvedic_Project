import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Clock, Star, Filter, Search, Leaf, Heart, Zap, Shield, Sun, Moon, Flower, TreePine } from 'lucide-react'
import Footer from '../components/Footer'

export default function Treatments() {
  const { t } = useTranslation()
  const { scrollY } = useScroll()
  const [treatments, setTreatments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 500],
    duration: '',
    search: ''
  })

  // Parallax transforms for different elements
  const headerY = useTransform(scrollY, [0, 1000], [0, -100])
  const filtersY = useTransform(scrollY, [0, 1000], [0, -120])
  const treatmentsY = useTransform(scrollY, [0, 1000], [0, -150])

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

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
      <div className="min-h-screen overflow-x-hidden relative">
        {/* Fixed Background Image */}
        <div 
          className="fixed inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/images/untitled-design.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Loading Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--ayurveda-green)] mx-auto mb-4"></div>
            <p className="text-[var(--ayurveda-green)]">Loading treatments...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/images/untitled-design.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Content with Parallax Effects */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 bg-transparent">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 bg-transparent"
          style={{ y: headerY }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--ayurveda-green)] mb-4">
            {t('treatments.title')}
          </h1>
          <p className="text-xl text-[var(--ayurveda-green)]/70 max-w-2xl mx-auto">
            {t('treatments.subtitle')}
          </p>
        </motion.div>

        {/* Animated Ayurvedic Icons Section */}
        <div className="relative overflow-hidden mb-8 h-24">
          <div className="absolute inset-0 flex items-center">
            {/* First set of icons */}
            <div className="flex items-center space-x-8 animate-scroll-left">
              <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                <Leaf className="h-8 w-8" />
                <span className="text-sm font-medium">Natural Healing</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--ayurveda-earth)]/80">
                <Heart className="h-8 w-8" />
                <span className="text-sm font-medium">Holistic Wellness</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--ayurveda-sage)]/80">
                <Zap className="h-8 w-8" />
                <span className="text-sm font-medium">Energy Balance</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--ayurveda-gold)]/80">
                <Shield className="h-8 w-8" />
                <span className="text-sm font-medium">Immune Support</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                <Sun className="h-8 w-8" />
                <span className="text-sm font-medium">Vitality</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--ayurveda-sage)]/80">
                <Moon className="h-8 w-8" />
                <span className="text-sm font-medium">Peace & Calm</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--ayurveda-earth)]/80">
                <Flower className="h-8 w-8" />
                <span className="text-sm font-medium">Herbal Therapy</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                <TreePine className="h-8 w-8" />
                <span className="text-sm font-medium">Ancient Wisdom</span>
              </div>
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center space-x-8 animate-scroll-left">
              <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                <Leaf className="h-8 w-8" />
                <span className="text-sm font-medium">Natural Healing</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--ayurveda-earth)]/80">
                <Heart className="h-8 w-8" />
                <span className="text-sm font-medium">Holistic Wellness</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--ayurveda-sage)]/80">
                <Zap className="h-8 w-8" />
                <span className="text-sm font-medium">Energy Balance</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--ayurveda-gold)]/80">
                <Shield className="h-8 w-8" />
                <span className="text-sm font-medium">Immune Support</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                <Sun className="h-8 w-8" />
                <span className="text-sm font-medium">Vitality</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--ayurveda-sage)]/80">
                <Moon className="h-8 w-8" />
                <span className="text-sm font-medium">Peace & Calm</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--ayurveda-earth)]/80">
                <Flower className="h-8 w-8" />
                <span className="text-sm font-medium">Herbal Therapy</span>
              </div>
              <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                <TreePine className="h-8 w-8" />
                <span className="text-sm font-medium">Ancient Wisdom</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <motion.div 
          className="p-6 mb-8 bg-transparent"
          style={{ y: filtersY }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--ayurveda-green)]/60" />
              <input
                type="text"
                placeholder="Search treatments..."
                className="w-full pl-10 pr-4 py-2 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)] placeholder-[var(--ayurveda-green)]/50"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>

            {/* Category Filter */}
            <select
              className="w-full px-3 py-2 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)]"
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
                className="w-full px-3 py-2 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)] placeholder-[var(--ayurveda-green)]/50"
                value={filters.priceRange[0]}
                onChange={(e) => setFilters({ 
                  ...filters, 
                  priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]] 
                })}
              />
              <span className="text-[var(--ayurveda-green)]/60">-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full px-3 py-2 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)] placeholder-[var(--ayurveda-green)]/50"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({ 
                  ...filters, 
                  priceRange: [filters.priceRange[0], parseInt(e.target.value) || 500] 
                })}
              />
            </div>

            {/* Duration Filter */}
            <select
              className="w-full px-3 py-2 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)]"
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
        </motion.div>

        {/* Treatments Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 bg-transparent"
          style={{ y: treatmentsY }}
        >
          {filteredTreatments.map((treatment, index) => (
            <motion.div 
              key={treatment.id} 
              className="bg-transparent rounded-xl overflow-hidden transition-all duration-300 border border-[var(--ayurveda-green)]/20 hover:scale-105 w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-48 bg-transparent flex items-center justify-center">
                <Leaf className="h-16 w-16 text-[var(--ayurveda-green)]" />
              </div>
              <div className="p-6 bg-transparent">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-[var(--ayurveda-green)]">
                    {treatment.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-[var(--ayurveda-gold)] fill-current" />
                    <span className="ml-1 text-sm text-[var(--ayurveda-green)]/70">
                      {treatment.rating} ({treatment.reviews})
                    </span>
                  </div>
                </div>
                
                <p className="text-[var(--ayurveda-green)]/70 mb-4 line-clamp-2">
                  {treatment.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-[var(--ayurveda-green)]/60 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {treatment.duration} min
                  </div>
                  <span className="text-lg font-semibold text-[var(--ayurveda-green)]">
                    ${treatment.price}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <Link
                    to={`/treatments/${treatment.id}`}
                    className="flex-1 text-center py-2 text-[var(--ayurveda-green)] border border-[var(--ayurveda-green)] rounded-lg hover:bg-[var(--ayurveda-green)]/10 transition-colors"
                  >
                    Learn More
                  </Link>
                  <Link
                    to={`/booking?treatment=${treatment.id}`}
                    className="flex-1 text-center py-2 bg-[var(--ayurveda-green)] text-white rounded-lg hover:bg-[var(--ayurveda-sage)] transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredTreatments.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Leaf className="h-16 w-16 text-[var(--ayurveda-green)]/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[var(--ayurveda-green)] mb-2">No treatments found</h3>
            <p className="text-[var(--ayurveda-green)]/70">Try adjusting your filters to see more results.</p>
          </motion.div>
        )}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
