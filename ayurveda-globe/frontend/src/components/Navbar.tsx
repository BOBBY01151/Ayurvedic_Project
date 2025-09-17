import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, Leaf, User, ShoppingBag } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { CurrencyBadge } from './CurrencyBadge'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()
  const { user, logout } = useAuth()

  const navigation = [
    { name: t('treatments'), href: '/treatments' },
    { name: t('practitioners'), href: '/practitioners' },
    { name: t('clinics'), href: '/clinics' },
    { name: t('about'), href: '/about' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">
                Ayurveda Globe
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Currency Badge */}
            <CurrencyBadge />

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/booking"
                  className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  <ShoppingBag className="h-5 w-5" />
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{user.name}</span>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-sm text-gray-700 hover:text-emerald-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Currency & User */}
            <div className="pt-4 pb-2 border-t border-gray-200">
              <div className="px-3 py-2">
                <CurrencyBadge />
              </div>
              
              {user ? (
                <div className="px-3 py-2">
                  <p className="text-sm text-gray-700 mb-2">Welcome, {user.name}</p>
                  <div className="space-y-1">
                    <Link
                      to="/booking"
                      onClick={() => setIsOpen(false)}
                      className="block text-sm text-gray-600 hover:text-emerald-600"
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setIsOpen(false)
                      }}
                      className="block text-sm text-gray-500 hover:text-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-2 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
