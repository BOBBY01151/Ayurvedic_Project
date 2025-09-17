import { formatInTimeZone } from 'date-fns-tz'

const SRI_LANKA_TIMEZONE = 'Asia/Colombo'

// Currency formatting
export function formatPrice(amount: number, currency: 'LKR' | 'USD' | 'EUR' = 'USD'): string {
  const exchangeRates = {
    'LKR': 1,
    'USD': 0.003,
    'EUR': 0.0027
  }

  const symbols = {
    'LKR': 'Rs.',
    'USD': '$',
    'EUR': '€'
  }

  const convertedAmount = amount * exchangeRates[currency]
  const symbol = symbols[currency]

  if (currency === 'LKR') {
    return `${symbol} ${Math.round(convertedAmount).toLocaleString('en-US')}`
  } else {
    return `${symbol} ${convertedAmount.toFixed(2)}`
  }
}

// Date formatting for Sri Lanka timezone
export function formatDateColombo(date: Date | string, formatStr: string = 'PPP'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return formatInTimeZone(dateObj, SRI_LANKA_TIMEZONE, formatStr)
}

// Format date and time for booking display
export function formatBookingDateTime(date: Date | string): string {
  return formatDateColombo(date, 'PPP p')
}

// Format time only
export function formatTimeColombo(date: Date | string): string {
  return formatDateColombo(date, 'p')
}

// Format date only
export function formatDateOnly(date: Date | string): string {
  return formatDateColombo(date, 'PPP')
}

// Get current time in Sri Lanka
export function getCurrentSriLankaTime(): Date {
  return new Date(new Date().toLocaleString("en-US", {timeZone: SRI_LANKA_TIMEZONE}))
}

// Duration formatting
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`
  }
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (remainingMinutes === 0) {
    return `${hours}h`
  }
  
  return `${hours}h ${remainingMinutes}m`
}

// Phone number formatting
export function formatPhoneNumber(phone: string): string {
  // Basic Sri Lankan phone number formatting
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.startsWith('94')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
  } else if (cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
  }
  
  return phone
}

// Text truncation
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Rating display
export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

// Capitalize first letter
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Format percentage
export function formatPercentage(value: number, total: number): string {
  if (total === 0) return '0%'
  return `${Math.round((value / total) * 100)}%`
}

// Format order number
export function formatOrderNumber(orderNumber: string): string {
  // Format: AG241201001 -> AG-24-12-01-001
  if (orderNumber.length === 11 && orderNumber.startsWith('AG')) {
    return `${orderNumber.slice(0, 2)}-${orderNumber.slice(2, 4)}-${orderNumber.slice(4, 6)}-${orderNumber.slice(6, 8)}-${orderNumber.slice(8)}`
  }
  return orderNumber
}
