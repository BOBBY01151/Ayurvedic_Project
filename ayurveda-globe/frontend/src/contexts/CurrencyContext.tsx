import { createContext, useContext, useState, ReactNode } from 'react'

type Currency = 'LKR' | 'USD' | 'EUR'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  convertPrice: (priceLKR: number, targetCurrency?: Currency) => number
  formatPrice: (priceLKR: number, targetCurrency?: Currency) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

// Mock exchange rates - TODO: Replace with real-time rates
const exchangeRates = {
  'LKR': 1,
  'USD': 0.003,
  'EUR': 0.0027
}

const currencySymbols = {
  'LKR': 'Rs.',
  'USD': '$',
  'EUR': '€'
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD')

  const convertPrice = (priceLKR: number, targetCurrency: Currency = currency): number => {
    const rate = exchangeRates[targetCurrency]
    return Math.round(priceLKR * rate * 100) / 100
  }

  const formatPrice = (priceLKR: number, targetCurrency: Currency = currency): string => {
    const convertedPrice = convertPrice(priceLKR, targetCurrency)
    const symbol = currencySymbols[targetCurrency]
    
    return `${symbol} ${convertedPrice.toLocaleString('en-US', {
      minimumFractionDigits: targetCurrency === 'LKR' ? 0 : 2,
      maximumFractionDigits: targetCurrency === 'LKR' ? 0 : 2
    })}`
  }

  const value = {
    currency,
    setCurrency,
    convertPrice,
    formatPrice
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
