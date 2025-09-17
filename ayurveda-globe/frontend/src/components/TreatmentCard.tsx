import { Clock, Star, MapPin } from 'lucide-react'
import { useCurrency } from '@/contexts/CurrencyContext'
import { formatPrice } from '@/utils/format'

interface Treatment {
  id: string
  title: string
  description: string
  duration: number
  basePriceLKR: number
  rating: { average: number; count: number }
  category: string
  image?: string
  clinic?: {
    name: string
    city: string
  }
}

interface TreatmentCardProps {
  treatment: Treatment
  onBook?: (treatmentId: string) => void
}

export function TreatmentCard({ treatment, onBook }: TreatmentCardProps) {
  const { currency } = useCurrency()

  const handleBookNow = () => {
    if (onBook) {
      onBook(treatment.id)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="h-48 bg-gradient-to-r from-emerald-400 to-emerald-600 relative">
        {treatment.image ? (
          <img
            src={treatment.image}
            alt={treatment.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-lg font-medium">
              {treatment.title}
            </span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-white/90 text-emerald-700 text-xs font-medium rounded-full">
            {treatment.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {treatment.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {treatment.description}
        </p>

        {/* Details */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{treatment.duration} min</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span>{treatment.rating.average.toFixed(1)}</span>
            <span>({treatment.rating.count})</span>
          </div>
        </div>

        {/* Clinic Info */}
        {treatment.clinic && (
          <div className="flex items-center space-x-1 text-sm text-gray-500 mb-3">
            <MapPin className="h-4 w-4" />
            <span>{treatment.clinic.name}, {treatment.clinic.city}</span>
          </div>
        )}

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-emerald-600">
              {formatPrice(treatment.basePriceLKR, currency)}
            </span>
            <span className="text-sm text-gray-500 ml-1">
              / session
            </span>
          </div>
          
          <button
            onClick={handleBookNow}
            className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}
