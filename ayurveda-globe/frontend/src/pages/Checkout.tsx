import { useCurrency } from '@/contexts/CurrencyContext'

export function Checkout() {
  const { currency, formatPrice } = useCurrency()
  
  // Mock data for demonstration
  const mockBooking = {
    treatment: 'Panchakarma Detox Program',
    practitioner: 'Dr. Kumara Perera',
    clinic: 'Serenity Ayurveda Center, Kandy',
    dateTime: '2024-01-15T10:00:00',
    duration: 420, // 7 hours
    priceLKR: 75000
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container section-padding">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 font-serif">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600">Treatment:</span>
                <span className="ml-2 font-medium">{mockBooking.treatment}</span>
              </div>
              <div>
                <span className="text-gray-600">Practitioner:</span>
                <span className="ml-2 font-medium">{mockBooking.practitioner}</span>
              </div>
              <div>
                <span className="text-gray-600">Location:</span>
                <span className="ml-2 font-medium">{mockBooking.clinic}</span>
              </div>
              <div>
                <span className="text-gray-600">Date & Time:</span>
                <span className="ml-2 font-medium">Jan 15, 2024 at 10:00 AM</span>
              </div>
            </div>
            
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-600">
                    {formatPrice(mockBooking.priceLKR)}
                  </div>
                  {currency !== 'LKR' && (
                    <div className="text-sm text-gray-500">
                      (Rs. {mockBooking.priceLKR.toLocaleString()})
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <p className="text-gray-600">
              TODO: Implement Stripe payment form with currency conversion display
            </p>
            <div className="mt-6">
              <button className="btn-primary w-full justify-center py-3">
                Pay {formatPrice(mockBooking.priceLKR)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
