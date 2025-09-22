import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Leaf, User, ShoppingBag, Phone } from 'lucide-react'
import { Button } from './ui/button'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Treatments', href: '/treatments' },
    { name: 'About', href: '/about-sri-lanka' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-[var(--ayurveda-green)]/10' 
          : 'glass backdrop-blur-xl bg-white/10 border-b border-white/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className={`text-xl font-semibold transition-colors duration-500 ${
                scrolled ? 'text-[var(--ayurveda-green)]' : 'text-white'
              }`}>
                AyurvedaForTravelers
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  to={item.href}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? scrolled 
                        ? 'text-[var(--ayurveda-green)] bg-[var(--ayurveda-cream)] shadow-sm' 
                        : 'text-[var(--ayurveda-gold)] bg-white/20 shadow-sm'
                      : scrolled 
                        ? 'text-[var(--ayurveda-green)] hover:text-[var(--ayurveda-sage)] hover:bg-[var(--ayurveda-cream)]/50' 
                        : 'text-white hover:text-[var(--ayurveda-gold)] hover:bg-white/10'
                  }`}
                >
                  {item.name}
                  {/* Active tab indicator */}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        scrolled 
                          ? 'bg-[var(--ayurveda-green)]' 
                          : 'bg-[var(--ayurveda-gold)]'
                      }`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Contact Info */}
            <div className={`flex items-center space-x-2 text-sm transition-colors duration-500 ${
              scrolled ? 'text-[var(--ayurveda-green)]' : 'text-white'
            }`}>
              <Phone className="w-4 h-4" />
              <span>+94 11 123 4567</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <Link
                to="/orders"
                className={`p-2 transition-colors ${
                  scrolled ? 'text-[var(--ayurveda-green)] hover:text-[var(--ayurveda-sage)]' : 'text-white hover:text-[var(--ayurveda-gold)]'
                }`}
              >
                <ShoppingBag className="h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className={`flex items-center space-x-1 transition-colors ${
                  scrolled ? 'text-[var(--ayurveda-green)] hover:text-[var(--ayurveda-sage)]' : 'text-white hover:text-[var(--ayurveda-gold)]'
                }`}
              >
                <User className="h-5 w-5" />
                <span className="text-sm">Login</span>
              </Link>
              <Button className={`transition-colors duration-500 text-white ${
                scrolled 
                  ? 'bg-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-sage)]' 
                  : 'bg-[var(--ayurveda-gold)] hover:bg-[var(--ayurveda-earth)]'
              }`}>
                <Link to="/register">Sign Up</Link>
              </Button>
              <Button className={`transition-colors duration-500 text-white ${
                scrolled 
                  ? 'bg-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-sage)]' 
                  : 'bg-[var(--ayurveda-gold)] hover:bg-[var(--ayurveda-earth)]'
              }`}>
                <Link to="/booking">Book Appointment</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors duration-500 ${
                scrolled ? 'text-[var(--ayurveda-green)]' : 'text-white'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0,
        }}
        className={`md:hidden border-t transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md border-[var(--ayurveda-green)]/20' 
            : 'glass-strong backdrop-blur-xl bg-white/20 border-white/30'
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          {navigation.map((item) => (
            <motion.div
              key={item.href}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? scrolled 
                      ? 'text-[var(--ayurveda-green)] bg-[var(--ayurveda-cream)] shadow-sm' 
                      : 'text-[var(--ayurveda-gold)] bg-white/20 shadow-sm'
                    : scrolled 
                      ? 'text-[var(--ayurveda-green)] hover:text-[var(--ayurveda-sage)] hover:bg-[var(--ayurveda-cream)]/50' 
                      : 'text-white hover:text-[var(--ayurveda-gold)] hover:bg-white/10'
                }`}
              >
                {item.name}
                {/* Active tab indicator for mobile */}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTabMobile"
                    className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full ${
                      scrolled 
                        ? 'bg-[var(--ayurveda-green)]' 
                        : 'bg-[var(--ayurveda-gold)]'
                    }`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
          
          <div className="pt-4 border-t border-white/20">
            {/* Mobile Contact Info */}
            <div className={`flex items-center space-x-2 text-sm mb-3 transition-colors duration-500 ${
              scrolled ? 'text-[var(--ayurveda-green)]' : 'text-white'
            }`}>
              <Phone className="w-4 h-4" />
              <span>+94 11 123 4567</span>
            </div>
            
            {/* Mobile User Actions */}
            <div className="px-3 py-2 space-y-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className={`block w-full text-center py-2 text-sm border rounded-md transition-colors ${
                  scrolled 
                    ? 'text-[var(--ayurveda-green)] border-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-cream)]' 
                    : 'text-white border-white/30 hover:bg-white/10'
                }`}
              >
                Login
              </Link>
              <Button className={`w-full text-white transition-colors duration-500 ${
                scrolled 
                  ? 'bg-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-sage)]' 
                  : 'bg-[var(--ayurveda-gold)] hover:bg-[var(--ayurveda-earth)]'
              }`}>
                <Link to="/register" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </Button>
              <Button className={`w-full text-white transition-colors duration-500 ${
                scrolled 
                  ? 'bg-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-sage)]' 
                  : 'bg-[var(--ayurveda-gold)] hover:bg-[var(--ayurveda-earth)]'
              }`}>
                <Link to="/booking" onClick={() => setIsOpen(false)}>Book Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  )
}
