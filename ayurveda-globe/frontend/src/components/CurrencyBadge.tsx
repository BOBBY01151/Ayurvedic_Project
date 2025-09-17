import { ChevronDown } from 'lucide-react'
import { useCurrency } from '@/contexts/CurrencyContext'

const currencies = [
  { code: 'LKR', symbol: 'Rs.', name: 'Sri Lankan Rupee', flag: '🇱🇰' },
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
]

export function CurrencyBadge() {
  const { currency, setCurrency } = useCurrency()

  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0]

  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
        <span className="text-sm">{currentCurrency.flag}</span>
        <span className="text-sm font-medium">{currentCurrency.code}</span>
        <ChevronDown className="h-3 w-3 text-gray-500" />
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              onClick={() => setCurrency(curr.code as 'LKR' | 'USD' | 'EUR')}
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
    </div>
  )
}
