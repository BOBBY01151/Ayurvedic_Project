import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Download,
  Leaf,
  Heart,
  Sun,
  Flower,
  Star,
  Package,
  Receipt
} from 'lucide-react'
import Footer from '../components/Footer'

export default function Orders() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // Simulate loading time with Ayurvedic theme
    const timer = setTimeout(() => {
      setOrders([
        {
          id: 'ORD-001',
          date: '2024-01-15',
          status: 'completed',
          total: 285,
          items: [
            {
              name: 'Abhyanga Massage',
              duration: 90,
              price: 85,
              therapist: 'Dr. Priya Sharma'
            },
            {
              name: 'Shirodhara Therapy',
              duration: 60,
              price: 75,
              therapist: 'Dr. Rajesh Kumar'
            },
            {
              name: 'Herbal Consultation',
              duration: 30,
              price: 50,
              therapist: 'Dr. Anjali Patel'
            }
          ],
          location: 'Wellness Center, Colombo',
          paymentMethod: 'Credit Card'
        },
        {
          id: 'ORD-002',
          date: '2024-01-10',
          status: 'pending',
          total: 150,
          items: [
            {
              name: 'Panchakarma Package',
              duration: 120,
              price: 150,
              therapist: 'Dr. Sunil Fernando'
            }
          ],
          location: 'Ayurvedic Resort, Kandy',
          paymentMethod: 'Bank Transfer'
        },
        {
          id: 'ORD-003',
          date: '2024-01-05',
          status: 'cancelled',
          total: 95,
          items: [
            {
              name: 'Udvartana Treatment',
              duration: 75,
              price: 95,
              therapist: 'Dr. Meera Singh'
            }
          ],
          location: 'Spa Center, Galle',
          paymentMethod: 'PayPal'
        }
      ])
      setLoading(false)
    }, 3000) // 3 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Loading Component
  if (loading) {
    return (
      <div className="min-h-screen overflow-x-hidden relative">
        {/* Fixed Background Image */}
        <div 
          className="fixed inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/images/untitled-design.png')",
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
              Loading Your Wellness Journey...
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
              "Your wellness journey is a sacred path to healing"
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
          backgroundImage: "url('/images/untitled-design.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] flex items-center justify-center mr-4">
                <Receipt className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--ayurveda-green)]">
                {t('profile.booking_history')}
              </h1>
            </div>
            <p className="text-xl text-[var(--ayurveda-green)]/70 max-w-2xl mx-auto">
              Track your wellness journey and manage your Ayurvedic treatments
            </p>
          </motion.div>

          {/* Orders List */}
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                className="glass-card rounded-2xl overflow-hidden border border-[var(--ayurveda-green)]/20"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Order Header */}
                <div className="p-6 border-b border-[var(--ayurveda-green)]/10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--ayurveda-green)]">
                          Order #{order.id}
                        </h3>
                        <div className="flex items-center text-sm text-[var(--ayurveda-green)]/70">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[var(--ayurveda-green)]">
                          ${order.total}
                        </div>
                        <div className="text-sm text-[var(--ayurveda-green)]/70">
                          Total Amount
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link
                          to={`/orders/${order.id}`}
                          className="p-2 text-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-green)]/10 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        <button
                          className="p-2 text-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-green)]/10 rounded-lg transition-colors"
                          title="Download Receipt"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-4 bg-[var(--ayurveda-cream)]/30 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] flex items-center justify-center">
                            <Package className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-[var(--ayurveda-green)]">
                              {item.name}
                            </h4>
                            <div className="flex items-center text-sm text-[var(--ayurveda-green)]/70">
                              <Clock className="h-4 w-4 mr-1" />
                              {item.duration} minutes
                            </div>
                            <div className="flex items-center text-sm text-[var(--ayurveda-green)]/70">
                              <User className="h-4 w-4 mr-1" />
                              {item.therapist}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-[var(--ayurveda-green)]">
                            ${item.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Details */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 text-sm text-[var(--ayurveda-green)]/70">
                      <MapPin className="h-4 w-4" />
                      <span>{order.location}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-[var(--ayurveda-green)]/70">
                      <CreditCard className="h-4 w-4" />
                      <span>{order.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {orders.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] flex items-center justify-center mx-auto mb-6">
                <Receipt className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--ayurveda-green)] mb-2">
                No Orders Yet
              </h3>
              <p className="text-[var(--ayurveda-green)]/70 mb-6">
                Start your wellness journey by booking your first Ayurvedic treatment.
              </p>
              <Link
                to="/treatments"
                className="inline-flex items-center px-6 py-3 bg-[var(--ayurveda-green)] text-white rounded-lg hover:bg-[var(--ayurveda-sage)] transition-colors"
              >
                <Leaf className="h-5 w-5 mr-2" />
                Explore Treatments
              </Link>
            </motion.div>
          )}

          {/* Quick Actions */}
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/treatments"
              className="p-6 glass-card rounded-xl border border-[var(--ayurveda-green)]/20 hover:border-[var(--ayurveda-green)]/40 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--ayurveda-green)]">
                    Book New Treatment
                  </h3>
                  <p className="text-sm text-[var(--ayurveda-green)]/70">
                    Discover our healing therapies
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/packages"
              className="p-6 glass-card rounded-xl border border-[var(--ayurveda-green)]/20 hover:border-[var(--ayurveda-green)]/40 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--ayurveda-sage)] to-[var(--ayurveda-earth)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--ayurveda-green)]">
                    Wellness Packages
                  </h3>
                  <p className="text-sm text-[var(--ayurveda-green)]/70">
                    Complete healing programs
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/contact"
              className="p-6 glass-card rounded-xl border border-[var(--ayurveda-green)]/20 hover:border-[var(--ayurveda-green)]/40 transition-colors group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--ayurveda-earth)] to-[var(--ayurveda-gold)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--ayurveda-green)]">
                    Get Support
                  </h3>
                  <p className="text-sm text-[var(--ayurveda-green)]/70">
                    Contact our wellness team
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
