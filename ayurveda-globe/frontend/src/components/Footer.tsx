import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold">Ayurveda Globe</span>
            </div>
            <p className="text-gray-300 mb-4">
              Discover authentic Ayurvedic treatments and wellness experiences 
              in the beautiful island of Sri Lanka.
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
                <Link to="/practitioners" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  {t('practitioners')}
                </Link>
              </li>
              <li>
                <Link to="/clinics" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  {t('clinics')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  {t('about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Panchakarma</li>
              <li className="text-gray-300">Abhyanga</li>
              <li className="text-gray-300">Shirodhara</li>
              <li className="text-gray-300">Yoga & Meditation</li>
              <li className="text-gray-300">Herbal Medicine</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">+94 11 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">info@ayurveda-globe.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-emerald-400 mt-1" />
                <span className="text-gray-300">
                  Colombo, Sri Lanka<br />
                  Asia/Colombo Timezone
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Ayurveda Globe. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/support" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
