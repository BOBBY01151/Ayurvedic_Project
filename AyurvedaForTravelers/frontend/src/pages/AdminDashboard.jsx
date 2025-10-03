import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  BarChart3,
  PieChart,
  Plus,
  Calendar,
  Users,
  Eye,
  ArrowRight,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Zap,
  Target,
  Award,
  Heart,
  Sparkles,
  Globe,
  FileText,
  Shield,
  Bell,
  Settings,
  UserPlus,
  Package,
  BookOpen
} from 'lucide-react'
import { AdminCard, AdminTable, AdminSidebar, AdminHeader } from '../components/admin'

export default function AdminDashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Enhanced stats data with better visuals
  const stats = [
    { 
      name: 'Total Revenue', 
      value: '$45,678', 
      change: '+12.5%', 
      changeType: 'positive', 
      icon: DollarSign,
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      name: 'Active Bookings', 
      value: '1,234', 
      change: '+8.2%', 
      changeType: 'positive', 
      icon: Calendar,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      name: 'Happy Customers', 
      value: '892', 
      change: '+15.3%', 
      changeType: 'positive', 
      icon: Heart,
      color: 'bg-gradient-to-br from-pink-400 to-pink-600',
      iconColor: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    { 
      name: 'Treatments Done', 
      value: '156', 
      change: '+5.7%', 
      changeType: 'positive', 
      icon: Award,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
  ]

  // Quick actions for admin
  const quickActions = [
    {
      title: 'New Booking',
      description: 'Create a new booking',
      icon: Calendar,
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => navigate('/admin/bookings')
    },
    {
      title: 'Add Treatment',
      description: 'Add new treatment',
      icon: Package,
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => navigate('/admin/treatments')
    },
    {
      title: 'Manage Users',
      description: 'User management',
      icon: UserPlus,
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => navigate('/admin/users')
    },
    {
      title: 'Write Article',
      description: 'Create new content',
      icon: BookOpen,
      color: 'bg-orange-500 hover:bg-orange-600',
      onClick: () => navigate('/admin/articles')
    }
  ]

  // Recent bookings with enhanced data
  const recentBookings = [
    { 
      id: 1, 
      customer: 'John Doe', 
      treatment: 'Ayurvedic Massage', 
      date: '2024-01-20', 
      time: '10:00 AM',
      status: 'confirmed', 
      amount: '$120',
      avatar: 'JD',
      rating: 5
    },
    { 
      id: 2, 
      customer: 'Jane Smith', 
      treatment: 'Panchakarma Therapy', 
      date: '2024-01-20', 
      time: '2:00 PM',
      status: 'pending', 
      amount: '$350',
      avatar: 'JS',
      rating: 4
    },
    { 
      id: 3, 
      customer: 'Mike Johnson', 
      treatment: 'Herbal Consultation', 
      date: '2024-01-19', 
      time: '4:30 PM',
      status: 'completed', 
      amount: '$85',
      avatar: 'MJ',
      rating: 5
    },
    { 
      id: 4, 
      customer: 'Sarah Wilson', 
      treatment: 'Yoga Session', 
      date: '2024-01-19', 
      time: '9:00 AM',
      status: 'confirmed', 
      amount: '$60',
      avatar: 'SW',
      rating: 4
    },
    { 
      id: 5, 
      customer: 'Dr. Emily Chen', 
      treatment: 'Wellness Consultation', 
      date: '2024-01-18', 
      time: '3:00 PM',
      status: 'completed', 
      amount: '$200',
      avatar: 'EC',
      rating: 5
    }
  ]

  // Activity feed with better visuals
  const recentActivity = [
    { 
      action: 'New booking received', 
      time: '2 minutes ago', 
      type: 'booking',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    { 
      action: 'Payment processed successfully', 
      time: '15 minutes ago', 
      type: 'payment',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    { 
      action: 'New user registered', 
      time: '1 hour ago', 
      type: 'user',
      icon: UserPlus,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    { 
      action: 'Treatment completed', 
      time: '2 hours ago', 
      type: 'treatment',
      icon: CheckCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    { 
      action: 'Review submitted', 
      time: '3 hours ago', 
      type: 'review',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ]

  // Performance metrics
  const performanceMetrics = [
    { label: 'Customer Satisfaction', value: 98, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Booking Success Rate', value: 94, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Treatment Completion', value: 96, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { label: 'Revenue Growth', value: 87, color: 'text-orange-600', bgColor: 'bg-orange-100' }
  ]

  const handleView = (item) => {
    console.log('View item:', item)
  }

  const handleEdit = (item) => {
    console.log('Edit item:', item)
  }

  const handleDelete = (item) => {
    console.log('Delete item:', item)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        isMobile={true}
      />
      <AdminSidebar 
        isOpen={false} 
        onClose={() => {}} 
        isMobile={false}
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <AdminHeader 
          title="Dashboard"
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, Admin!</h1>
                    <p className="text-gray-600">Here's what's happening with your Ayurvedic wellness center today</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  {performanceMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className={`p-4 rounded-xl ${metric.bgColor} border border-gray-100`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{metric.label}</p>
                          <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}%</p>
                        </div>
                        <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                          <Target className={`h-5 w-5 ${metric.color}`} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                  <div className="flex items-center space-x-1 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.name}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="h-6 w-6 text-yellow-500 mr-2" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.title}
                    onClick={action.onClick}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`p-4 rounded-xl text-white ${action.color} transition-all duration-300 hover:shadow-lg hover:scale-105 group`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <action.icon className="h-6 w-6" />
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-semibold text-left">{action.title}</h3>
                    <p className="text-sm opacity-90 text-left">{action.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Bookings - Enhanced */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Calendar className="h-6 w-6 text-blue-500 mr-2" />
                    Recent Bookings
                  </h2>
                  <button 
                    onClick={() => navigate('/admin/bookings')}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    View all <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {recentBookings.slice(0, 5).map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {booking.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{booking.customer}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{booking.treatment}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">{booking.date} at {booking.time}</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < booking.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{booking.amount}</p>
                        <button className="text-xs text-blue-600 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">
                          View details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Activity - Enhanced */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Bell className="h-6 w-6 text-orange-500 mr-2" />
                  Recent Activity
                </h2>
                
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
