import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Shield, Users, Star, Clock, MapPin } from 'lucide-react'

export default function Home() {
  const { t } = useTranslation()

  const features = [
    {
      icon: Leaf,
      title: t('home.features.authentic.title'),
      description: t('home.features.authentic.description')
    },
    {
      icon: Shield,
      title: t('home.features.modern.title'),
      description: t('home.features.modern.description')
    },
    {
      icon: Users,
      title: t('home.features.travelers.title'),
      description: t('home.features.travelers.description')
    }
  ]

  const treatments = [
    {
      id: 1,
      name: 'Abhyanga',
      description: 'Traditional full-body oil massage',
      duration: '90 min',
      price: '85',
      rating: 4.9,
      image: '/images/abhyanga.jpg'
    },
    {
      id: 2,
      name: 'Shirodhara',
      description: 'Healing oil therapy for mind and body',
      duration: '60 min',
      price: '75',
      rating: 4.8,
      image: '/images/shirodhara.jpg'
    },
    {
      id: 3,
      name: 'Panchakarma',
      description: 'Complete detoxification treatment',
      duration: '7 days',
      price: '1200',
      rating: 4.9,
      image: '/images/panchakarma.jpg'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
            <Link
              to="/treatments"
              className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t('home.hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AyurvedaForTravelers?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience authentic Ayurvedic healing in the heart of Sri Lanka
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Treatments */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Treatments
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most requested Ayurvedic treatments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {treatments.map((treatment) => (
              <div key={treatment.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-emerald-200 flex items-center justify-center">
                  <Leaf className="h-16 w-16 text-emerald-600" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {treatment.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">
                        {treatment.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {treatment.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {treatment.duration}
                    </div>
                    <div className="font-semibold text-emerald-600">
                      ${treatment.price}
                    </div>
                  </div>
                  <Link
                    to={`/treatments/${treatment.id}`}
                    className="block w-full text-center py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/treatments"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              View All Treatments
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Located in Beautiful Sri Lanka
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Experience the magic of Ayurveda in one of the world's most beautiful destinations. 
                Sri Lanka offers the perfect setting for your wellness journey with its pristine 
                beaches, lush mountains, and rich cultural heritage.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-emerald-600 mr-3" />
                  <span className="text-gray-700">Multiple locations across Sri Lanka</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-emerald-600 mr-3" />
                  <span className="text-gray-700">Flexible scheduling for travelers</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-emerald-600 mr-3" />
                  <span className="text-gray-700">Multilingual support</span>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  to="/about-sri-lanka"
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Learn About Sri Lanka
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="h-96 bg-emerald-200 rounded-lg flex items-center justify-center">
              <MapPin className="h-24 w-24 text-emerald-600" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
