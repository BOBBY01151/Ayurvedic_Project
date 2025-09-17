import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Leaf, Star, MapPin, Clock, Users } from 'lucide-react'

export function Home() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-responsive-xl font-bold mb-6 font-serif">
              {t('hero_title')}
            </h1>
            <p className="text-responsive-base mb-8 text-emerald-100">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/treatments"
                className="btn-primary text-lg px-8 py-3"
              >
                {t('book_now')}
              </Link>
              <Link
                to="/about"
                className="btn border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-3"
              >
                {t('learn_more')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">
              Why Choose Ayurveda Globe?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We connect you with authentic Ayurvedic experiences across Sri Lanka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Certified Practitioners</h3>
              <p className="text-gray-600">
                All practitioners are verified and certified with years of experience in traditional Ayurveda
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Island-wide Coverage</h3>
              <p className="text-gray-600">
                From Colombo to Kandy, Galle to Ella - find authentic treatments across Sri Lanka
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Treatments</h3>
              <p className="text-gray-600">
                Traditional Panchakarma, Abhyanga, Shirodhara and more - all following ancient practices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Treatments */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif">
              Popular Treatments
            </h2>
            <p className="text-lg text-gray-600">
              Discover our most sought-after Ayurvedic therapies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Treatment cards - TODO: Replace with real data */}
            {[
              { name: 'Panchakarma', description: 'Complete detoxification therapy', duration: '7-21 days', price: 'Rs. 25,000' },
              { name: 'Abhyanga', description: 'Full body oil massage', duration: '60 min', price: 'Rs. 3,500' },
              { name: 'Shirodhara', description: 'Continuous oil pouring therapy', duration: '45 min', price: 'Rs. 4,500' },
            ].map((treatment, index) => (
              <div key={index} className="card-hover p-6">
                <div className="h-40 bg-gradient-emerald rounded-lg mb-4 flex items-center justify-center">
                  <Leaf className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{treatment.name}</h3>
                <p className="text-gray-600 mb-4">{treatment.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {treatment.duration}
                  </div>
                  <div className="text-lg font-bold text-emerald-600">
                    {treatment.price}
                  </div>
                </div>
                <Link
                  to="/treatments"
                  className="btn-primary w-full justify-center"
                >
                  {t('book_now')}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/treatments"
              className="btn-outline"
            >
              View All Treatments
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-emerald-600 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 font-serif">
              Ready to Begin Your Wellness Journey?
            </h2>
            <p className="text-xl mb-8 text-emerald-100">
              Book your authentic Ayurvedic experience in Sri Lanka today
            </p>
            <Link
              to="/treatments"
              className="btn bg-white text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-3"
            >
              {t('get_started')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
