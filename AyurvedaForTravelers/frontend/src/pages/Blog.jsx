import { useTranslation } from 'react-i18next'
import { BookOpen } from 'lucide-react'

export default function Blog() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-gray-600">
            Blog posts coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}
