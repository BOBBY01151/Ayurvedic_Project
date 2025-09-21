import { useTranslation } from 'react-i18next'

export default function Checkout() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Checkout
          </h1>
          <p className="text-xl text-gray-600">
            Checkout page coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}
