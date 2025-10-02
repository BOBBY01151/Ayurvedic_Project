import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Shield, ArrowLeft, Settings, Users, BarChart3 } from 'lucide-react'
import { login } from '../store/slices/authSlice'
import toast from 'react-hot-toast'

export default function AdminLogin() {
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
    // Simulate loading time with admin theme
    const timer = setTimeout(() => {
      setPageLoading(false)
    }, 2000)

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
      // Simulate admin login - in real app, you'd check admin credentials
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Admin login successful!')
      navigate('/admin')
    } catch (error) {
      toast.error(error.message || 'Admin login failed')
    } finally {
      setLoading(false)
    }
  }

  // Loading Component
  if (pageLoading) {
    return (
      <div className="min-h-screen overflow-x-hidden relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Loading Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            {/* Admin Loading Animation */}
            <div className="relative mb-8">
              {/* Rotating Shield */}
              <motion.div
                className="w-24 h-24 mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full border-4 border-blue-400/30 rounded-full relative">
                  <div className="absolute inset-2 border-2 border-indigo-400/50 rounded-full"></div>
                  <div className="absolute inset-4 border border-cyan-400/70 rounded-full"></div>
                </div>
              </motion.div>
              
              {/* Pulsing Center */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Floating Admin Icons */}
              <motion.div
                className="absolute -top-2 -left-2"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                <Shield className="h-6 w-6 text-blue-400" />
              </motion.div>
              
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Settings className="h-6 w-6 text-indigo-400" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -left-2"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Users className="h-6 w-6 text-cyan-400" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -right-2"
                animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                <BarChart3 className="h-6 w-6 text-blue-300" />
              </motion.div>
            </div>
            
            {/* Loading Text */}
            <motion.h2
              className="text-2xl font-bold text-white mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Initializing Admin Panel...
            </motion.h2>
            
            {/* Progress Dots */}
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 bg-blue-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: index * 0.2 
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Content with Parallax Effects */}
      <div className="relative z-10">
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          
          {/* Back to Regular Login */}
          <div className="absolute top-4 left-4">
            <Link 
              to="/login" 
              className="inline-flex items-center text-blue-300 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Link>
          </div>

          {/* Header */}
          <motion.div 
            className="sm:mx-auto sm:w-full sm:max-w-md"
            style={{ y: headerY }}
          >
            <div className="flex justify-center">
              <div className="relative">
                <Shield className="h-16 w-16 text-blue-400" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold text-white">
              Admin Access
            </h2>
            <p className="mt-2 text-center text-sm text-blue-200">
              Secure administrative login portal
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div 
            className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
            style={{ y: formY }}
          >
            <motion.div 
              className="bg-white/10 backdrop-blur-lg border border-white/20 py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Admin Email
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full pl-10 pr-3 py-2 bg-white/10 border border-white/30 rounded-md placeholder-blue-200/50 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm text-white backdrop-blur-sm"
                      placeholder="admin@ayurveda.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white">
                    Admin Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full pl-10 pr-10 py-2 bg-white/10 border border-white/30 rounded-md placeholder-blue-200/50 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm text-white backdrop-blur-sm"
                      placeholder="Enter admin password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        className="text-blue-300 hover:text-white"
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
                      className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-white/30 rounded bg-white/10"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-300 hover:text-white">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Authenticating...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Access Admin Panel
                      </div>
                    )}
                  </motion.button>

                  {/* Direct Access Button */}
                  <motion.button
                    type="button"
                    onClick={() => navigate('/admin')}
                    className="group relative w-full flex justify-center py-3 px-4 border border-white/30 text-sm font-medium rounded-md text-white bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Quick Access (Skip Login)
                    </div>
                  </motion.button>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
                  <div className="flex">
                    <Shield className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-yellow-300">Security Notice</h3>
                      <p className="text-xs text-yellow-200 mt-1">
                        This is a secure administrative area. All activities are logged and monitored.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
