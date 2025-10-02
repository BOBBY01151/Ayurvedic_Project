import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  TrendingUp,
  DollarSign,
  Activity,
  BarChart3,
  PieChart,
  Plus
} from 'lucide-react'
import { AdminCard, AdminTable, AdminSidebar, AdminHeader } from '../components/admin'

export default function AdminDashboard() {
  const { t } = useTranslation()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for dashboard
  const stats = [
    { name: 'Total Bookings', value: '1,234', change: '+12%', changeType: 'positive', icon: Calendar },
    { name: 'Revenue', value: '$45,678', change: '+8%', changeType: 'positive', icon: DollarSign },
    { name: 'Active Users', value: '892', change: '+5%', changeType: 'positive', icon: Users },
    { name: 'Treatments', value: '156', change: '+3%', changeType: 'positive', icon: Activity },
  ]

  const recentBookings = [
    { id: 1, customer: 'John Doe', treatment: 'Ayurvedic Massage', date: '2024-01-15', status: 'confirmed', amount: '$120' },
    { id: 2, customer: 'Jane Smith', treatment: 'Panchakarma', date: '2024-01-14', status: 'pending', amount: '$350' },
    { id: 3, customer: 'Mike Johnson', treatment: 'Herbal Therapy', date: '2024-01-13', status: 'completed', amount: '$85' },
    { id: 4, customer: 'Sarah Wilson', treatment: 'Yoga Session', date: '2024-01-12', status: 'confirmed', amount: '$60' },
  ]

  const tableColumns = [
    { key: 'customer', title: 'Customer' },
    { key: 'treatment', title: 'Treatment' },
    { key: 'date', title: 'Date' },
    { key: 'status', title: 'Status' },
    { key: 'amount', title: 'Amount' }
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

  return (
    <div className="min-h-screen bg-gray-50">
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
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <AdminCard
                key={stat.name}
                title={stat.name}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
                icon={stat.icon}
                delay={index * 0.1}
              />
            ))}
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <BarChart3 className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <PieChart className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Chart visualization would go here</p>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
              </div>
              <div className="space-y-4">
                {[
                  { action: 'New booking received', time: '2 minutes ago', type: 'booking' },
                  { action: 'Payment processed', time: '15 minutes ago', type: 'payment' },
                  { action: 'User registered', time: '1 hour ago', type: 'user' },
                  { action: 'Treatment completed', time: '2 hours ago', type: 'treatment' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'booking' ? 'bg-green-500' :
                      activity.type === 'payment' ? 'bg-blue-500' :
                      activity.type === 'user' ? 'bg-purple-500' : 'bg-orange-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Bookings Table */}
          <AdminTable
            title="Recent Bookings"
            data={recentBookings}
            columns={tableColumns}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            actions={[
              {
                icon: <Plus className="h-4 w-4" />,
                title: "Add New",
                onClick: () => console.log('Add new booking'),
                className: "text-green-600 hover:text-green-900"
              }
            ]}
          />
        </div>
      </div>
    </div>
  )
}
