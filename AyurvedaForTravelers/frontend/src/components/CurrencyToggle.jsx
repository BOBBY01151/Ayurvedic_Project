import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrency } from '../store/slices/bookingSlice'

const currencies = [
  { code: 'LKR', symbol: 'Rs.', name: 'Sri Lankan Rupee', flag: '🇱🇰' },
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
]

export default function CurrencyToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const currency = useSelector(state => state.booking.currency)

  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0]

  const handleCurrencyChange = (newCurrency) => {
    dispatch(setCurrency(newCurrency))
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <span className="text-sm">{currentCurrency.flag}</span>
        <span className="text-sm font-medium">{currentCurrency.code}</span>
        <ChevronDown className="h-3 w-3 text-gray-500" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => handleCurrencyChange(curr.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                  curr.code === currency ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                }`}
              >
                <span>{curr.flag}</span>
                <span className="font-medium">{curr.code}</span>
                <span className="text-gray-500">- {curr.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
