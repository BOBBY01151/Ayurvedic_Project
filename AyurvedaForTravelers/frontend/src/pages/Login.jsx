import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Leaf, Heart, Sun, Flower } from 'lucide-react'
import { login } from '../store/slices/authSlice'
import toast from 'react-hot-toast'
import Footer from '../components/Footer'

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { scrollY } = useScroll()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

  // Parallax transforms for different elements
  const headerY = useTransform(scrollY, [0, 1000], [0, -100])
  const formY = useTransform(scrollY, [0, 1000], [0, -120])

  useEffect(() => {
    // Simulate loading time with Ayurvedic theme
    const timer = setTimeout(() => {
      setPageLoading(false)
    }, 3000) // 3 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await dispatch(login(formData)).unwrap()
      toast.success('Login successful!')
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  // Loading Component
  if (pageLoading) {
    return (
      <div className="min-h-screen overflow-x-hidden relative">
        {/* Fixed Background Image */}
        <div 
          className="fixed inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/images/png22.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Loading Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            {/* Ayurvedic Loading Animation */}
            <div className="relative mb-8">
              {/* Rotating Mandala */}
              <motion.div
                className="w-24 h-24 mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full border-4 border-[var(--ayurveda-green)]/30 rounded-full relative">
                  <div className="absolute inset-2 border-2 border-[var(--ayurveda-sage)]/50 rounded-full"></div>
                  <div className="absolute inset-4 border border-[var(--ayurveda-earth)]/70 rounded-full"></div>
                </div>
              </motion.div>
              
              {/* Pulsing Center */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--ayurveda-green)] rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Floating Ayurvedic Icons */}
              <motion.div
                className="absolute -top-2 -left-2"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                <Leaf className="h-6 w-6 text-[var(--ayurveda-green)]" />
              </motion.div>
              
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Heart className="h-6 w-6 text-[var(--ayurveda-earth)]" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -left-2"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Flower className="h-6 w-6 text-[var(--ayurveda-sage)]" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -right-2"
                animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                <Sun className="h-6 w-6 text-[var(--ayurveda-gold)]" />
              </motion.div>
            </div>
            
            {/* Loading Text */}
            <motion.h2
              className="text-2xl font-bold text-[var(--ayurveda-green)] mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Preparing Your Journey...
            </motion.h2>
            
            {/* Progress Dots */}
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 bg-[var(--ayurveda-green)] rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: index * 0.2 
                  }}
                />
              ))}
            </div>
            
            {/* Ayurvedic Quote */}
            <motion.p
              className="text-[var(--ayurveda-green)]/70 mt-6 max-w-md mx-auto text-sm italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              "The journey of a thousand miles begins with a single step"
            </motion.p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/images/png22.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Content with Parallax Effects */}
      <div className="relative z-10">
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div 
            className="sm:mx-auto sm:w-full sm:max-w-md"
            style={{ y: headerY }}
          >
            <div className="flex justify-center">
              <Leaf className="h-12 w-12 text-[var(--ayurveda-green)]" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold text-[var(--ayurveda-green)]">
              {t('auth.login.title')}
            </h2>
            <p className="mt-2 text-center text-sm text-[var(--ayurveda-green)]/70">
              {t('auth.login.subtitle')}
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div 
            className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
            style={{ y: formY }}
          >
            <motion.div 
              className="bg-transparent border border-[var(--ayurveda-green)]/20 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--ayurveda-green)]">
                    {t('auth.login.email')}
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-[var(--ayurveda-green)]/60" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full pl-10 pr-3 py-2 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-md placeholder-[var(--ayurveda-green)]/50 focus:outline-none focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] sm:text-sm text-[var(--ayurveda-green)]"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[var(--ayurveda-green)]">
                    {t('auth.login.password')}
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-[var(--ayurveda-green)]/60" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full pl-10 pr-10 py-2 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-md placeholder-[var(--ayurveda-green)]/50 focus:outline-none focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] sm:text-sm text-[var(--ayurveda-green)]"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        className="text-[var(--ayurveda-green)]/60 hover:text-[var(--ayurveda-green)]"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[var(--ayurveda-green)] focus:ring-[var(--ayurveda-green)] border-[var(--ayurveda-green)]/30 rounded bg-transparent"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-[var(--ayurveda-green)]">
                      {t('auth.login.remember_me')}
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-[var(--ayurveda-green)] hover:text-[var(--ayurveda-green)]/80">
                      {t('auth.login.forgot_password')}
                    </a>
                  </div>
                </div>

                <div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-sage)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ayurveda-green)] disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      t('auth.login.sign_in')
                    )}
                  </motion.button>
                </div>

                <div className="text-center">
                  <span className="text-sm text-[var(--ayurveda-green)]/70">
                    {t('auth.login.no_account')}{' '}
                    <Link to="/register" className="font-medium text-[var(--ayurveda-green)] hover:text-[var(--ayurveda-green)]/80">
                      {t('auth.login.sign_up')}
                    </Link>
                  </span>
                </div>

                {/* Admin Login Button */}
                <div className="mt-6 pt-6 border-t border-[var(--ayurveda-green)]/20">
                  <div className="text-center space-y-3">
                    <p className="text-xs text-[var(--ayurveda-green)]/60 mb-3">
                      Admin Access
                    </p>
                    <div className="space-y-2">
                      <Link 
                        to="/admin/login" 
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-[var(--ayurveda-green)] bg-transparent border border-[var(--ayurveda-green)]/30 rounded-md hover:bg-[var(--ayurveda-green)]/10 hover:border-[var(--ayurveda-green)]/50 transition-all duration-200"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Admin Login
                      </Link>
                      <Link 
                        to="/admin" 
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-[var(--ayurveda-gold)] bg-transparent border border-[var(--ayurveda-gold)]/30 rounded-md hover:bg-[var(--ayurveda-gold)]/10 hover:border-[var(--ayurveda-gold)]/50 transition-all duration-200"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Quick Admin Access
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
