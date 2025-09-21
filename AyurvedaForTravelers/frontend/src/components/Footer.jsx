import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold">AyurvedaForTravelers</span>
            </div>
            <p className="text-gray-300 mb-4">
              Authentic Ayurvedic wellness experiences in Sri Lanka, designed for international travelers seeking traditional healing and rejuvenation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/treatments" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  {t('treatments')}
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  {t('packages')}
                </Link>
              </li>
              <li>
                <Link to="/therapists" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  {t('therapists')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link to="/about-sri-lanka" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  {t('about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300">Panchakarma Treatment</span>
              </li>
              <li>
                <span className="text-gray-300">Wellness Retreats</span>
              </li>
              <li>
                <span className="text-gray-300">Ayurvedic Consultation</span>
              </li>
              <li>
                <span className="text-gray-300">Yoga & Meditation</span>
              </li>
              <li>
                <span className="text-gray-300">Herbal Medicine</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-300">
                  Colombo, Sri Lanka
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-300">
                  +94 11 123 4567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-300">
                  info@ayurveda-for-travelers.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 AyurvedaForTravelers. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
