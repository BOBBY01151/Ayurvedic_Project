import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TreatmentCard } from '@/components/TreatmentCard'
import { Search, Filter } from 'lucide-react'

export function Treatments() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // TODO: Replace with real data from API
  const mockTreatments = [
    {
      id: '1',
      title: 'Panchakarma Detox Program',
      description: 'Complete 7-day detoxification and rejuvenation program following traditional Ayurvedic principles',
      duration: 420, // 7 hours per day
      basePriceLKR: 75000,
      rating: { average: 4.8, count: 24 },
      category: 'Panchakarma',
      clinic: { name: 'Serenity Ayurveda Center', city: 'Kandy' }
    },
    {
      id: '2', 
      title: 'Abhyanga Full Body Massage',
      description: 'Traditional oil massage using warm herbal oils to improve circulation and relaxation',
      duration: 60,
      basePriceLKR: 3500,
      rating: { average: 4.6, count: 89 },
      category: 'Massage Therapy',
      clinic: { name: 'Wellness Spa Colombo', city: 'Colombo' }
    },
    {
      id: '3',
      title: 'Shirodhara Therapy',
      description: 'Continuous pouring of warm oil on the forehead for deep relaxation and mental clarity',
      duration: 45,
      basePriceLKR: 4500,
      rating: { average: 4.9, count: 56 },
      category: 'Stress Relief',
      clinic: { name: 'Ayur Villa', city: 'Galle' }
    }
  ]

  const categories = ['all', 'Panchakarma', 'Massage Therapy', 'Herbal Treatment', 'Stress Relief', 'Consultation']

  const filteredTreatments = mockTreatments.filter(treatment => {
    const matchesSearch = treatment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || treatment.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container section-padding py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-serif">
            {t('treatments')}
          </h1>
          <p className="text-lg text-gray-600">
            Discover authentic Ayurvedic treatments across Sri Lanka
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="container py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search treatments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container section-padding">
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTreatments.length} treatment{filteredTreatments.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filteredTreatments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTreatments.map(treatment => (
              <TreatmentCard
                key={treatment.id}
                treatment={treatment}
                onBook={(id) => {
                  // TODO: Navigate to booking page
                  console.log('Book treatment:', id)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No treatments found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
