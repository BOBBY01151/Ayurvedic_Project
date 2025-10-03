import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Calendar,
  DollarSign,
  Users,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  Phone,
  Mail,
  MapPin,
  Star,
  TrendingUp,
  X,
  Save,
  RefreshCw,
  CalendarDays,
  Timer,
  Award,
  Heart
} from 'lucide-react'
import { AdminCard, AdminTable, AdminSidebar, AdminHeader } from '../components/admin'

export default function AdminBookings() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDate, setFilterDate] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingBooking, setEditingBooking] = useState(null)
  const [saving, setSaving] = useState(false)

  // Enhanced bookings data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customer: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-0123',
      treatment: 'Ayurvedic Massage',
      date: '2024-01-20',
      time: '10:00 AM',
      duration: 90,
      status: 'confirmed',
      amount: 120,
      therapist: 'Dr. Sarah Johnson',
      therapistId: 'therapist1',
      notes: 'Customer prefers light pressure',
      rating: 5,
      createdAt: '2024-01-15T08:30:00Z',
      updatedAt: '2024-01-15T08:30:00Z'
    },
    {
      id: 2,
      customer: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1-555-0456',
      treatment: 'Panchakarma Therapy',
      date: '2024-01-20',
      time: '2:00 PM',
      duration: 180,
      status: 'pending',
      amount: 350,
      therapist: 'Dr. Michael Chen',
      therapistId: 'therapist2',
      notes: 'First-time customer, comprehensive consultation needed',
      rating: null,
      createdAt: '2024-01-19T14:20:00Z',
      updatedAt: '2024-01-19T14:20:00Z'
    },
    {
      id: 3,
      customer: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1-555-0789',
      treatment: 'Herbal Consultation',
      date: '2024-01-19',
      time: '4:30 PM',
      duration: 60,
      status: 'completed',
      amount: 85,
      therapist: 'Dr. Priya Sharma',
      therapistId: 'therapist3',
      notes: 'Follow-up consultation, patient responding well to treatment',
      rating: 5,
      createdAt: '2024-01-18T10:15:00Z',
      updatedAt: '2024-01-19T16:45:00Z'
    },
    {
      id: 4,
      customer: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '+1-555-0321',
      treatment: 'Yoga Session',
      date: '2024-01-19',
      time: '9:00 AM',
      duration: 75,
      status: 'confirmed',
      amount: 60,
      therapist: 'Dr. Robert Kumar',
      therapistId: 'therapist4',
      notes: 'Regular customer, prefers morning sessions',
      rating: 4,
      createdAt: '2024-01-17T16:30:00Z',
      updatedAt: '2024-01-17T16:30:00Z'
    },
    {
      id: 5,
      customer: 'Dr. Emily Chen',
      email: 'emily.chen@example.com',
      phone: '+1-555-0654',
      treatment: 'Wellness Consultation',
      date: '2024-01-18',
      time: '3:00 PM',
      duration: 120,
      status: 'completed',
      amount: 200,
      therapist: 'Dr. Sarah Johnson',
      therapistId: 'therapist1',
      notes: 'Comprehensive wellness assessment completed',
      rating: 5,
      createdAt: '2024-01-16T12:00:00Z',
      updatedAt: '2024-01-18T15:30:00Z'
    },
    {
      id: 6,
      customer: 'Robert Lee',
      email: 'robert.lee@example.com',
      phone: '+1-555-0987',
      treatment: 'Meditation Session',
      date: '2024-01-18',
      time: '6:00 PM',
      duration: 45,
      status: 'cancelled',
      amount: 40,
      therapist: 'Dr. Robert Kumar',
      therapistId: 'therapist4',
      notes: 'Customer cancelled due to emergency',
      rating: null,
      createdAt: '2024-01-16T09:45:00Z',
      updatedAt: '2024-01-18T17:20:00Z'
    }
  ])

  // Filter bookings based on search and filters
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.treatment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.therapist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus
    const matchesDate = filterDate === 'all' || 
                       (filterDate === 'today' && booking.date === new Date().toISOString().split('T')[0]) ||
                       (filterDate === 'tomorrow' && booking.date === new Date(Date.now() + 86400000).toISOString().split('T')[0]) ||
                       (filterDate === 'week' && new Date(booking.date) >= new Date() && new Date(booking.date) <= new Date(Date.now() + 7 * 86400000))
    return matchesSearch && matchesStatus && matchesDate
  })

  // Enhanced stats
  const stats = [
    { 
      name: 'Total Bookings', 
      value: bookings.length.toString(), 
      change: '+12.5%', 
      changeType: 'positive', 
      icon: Calendar,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      name: 'Today\'s Revenue', 
      value: `$${bookings.filter(b => b.date === new Date().toISOString().split('T')[0] && b.status !== 'cancelled').reduce((sum, b) => sum + b.amount, 0)}`, 
      change: '+8.2%', 
      changeType: 'positive', 
      icon: DollarSign,
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      name: 'Pending Bookings', 
      value: bookings.filter(b => b.status === 'pending').length.toString(), 
      change: bookings.filter(b => b.status === 'pending').length > 0 ? 'Needs attention' : 'All clear', 
      changeType: bookings.filter(b => b.status === 'pending').length > 0 ? 'warning' : 'positive', 
      icon: Clock,
      color: 'bg-gradient-to-br from-orange-400 to-orange-600',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    { 
      name: 'Avg. Rating', 
      value: (bookings.filter(b => b.rating).reduce((sum, b) => sum + b.rating, 0) / bookings.filter(b => b.rating).length).toFixed(1), 
      change: '+0.3', 
      changeType: 'positive', 
      icon: Star,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
  ]

  const tableColumns = [
    { key: 'customer', title: 'Customer' },
    { key: 'treatment', title: 'Treatment' },
    { key: 'date', title: 'Date' },
    { key: 'time', title: 'Time' },
    { key: 'therapist', title: 'Therapist' },
    { key: 'status', title: 'Status' },
    { key: 'amount', title: 'Amount' }
  ]

  const handleView = (booking) => {
    console.log('View booking:', booking)
  }

  const handleEdit = (booking) => {
    setEditingBooking(booking)
    setShowCreateModal(true)
  }

  const handleDelete = (booking) => {
    if (window.confirm(`Are you sure you want to delete booking for "${booking.customer}"?`)) {
      setBookings(bookings.filter(b => b.id !== booking.id))
    }
  }

  const handleCreateNew = () => {
    setEditingBooking(null)
    setShowCreateModal(true)
  }

  const handleSubmitBooking = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const bookingData = {
      customer: formData.get('customer'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      treatment: formData.get('treatment'),
      date: formData.get('date'),
      time: formData.get('time'),
      duration: parseInt(formData.get('duration')),
      therapist: formData.get('therapist'),
      amount: parseFloat(formData.get('amount')),
      status: formData.get('status'),
      notes: formData.get('notes')
    }

    setSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      if (editingBooking) {
        // Update existing booking
        const updatedBookings = bookings.map(booking => 
          booking.id === editingBooking.id 
            ? { ...booking, ...bookingData, updatedAt: new Date().toISOString() }
            : booking
        )
        setBookings(updatedBookings)
      } else {
        // Create new booking
        const newBooking = {
          id: Date.now(),
          ...bookingData,
          therapistId: 'therapist1', // Default therapist
          rating: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        setBookings([newBooking, ...bookings])
      }

      setShowCreateModal(false)
    setEditingBooking(null)
      setSaving(false)
    }, 1000)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case 'completed': return <CheckCircle className="h-4 w-4 text-blue-600" />
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const tableData = filteredBookings.map(booking => ({
    ...booking,
    amount: `$${booking.amount}`,
    date: new Date(booking.date).toLocaleDateString(),
    time: booking.time
  }))

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
          title="Bookings Management"
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Bookings Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats Grid */}
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
                  <div className={`flex items-center space-x-1 ${stat.changeType === 'warning' ? 'text-orange-600' : 'text-green-600'}`}>
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.name}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="lg:w-48">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Date Filter */}
              <div className="lg:w-48">
                <select
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="week">This Week</option>
                </select>
              </div>

              {/* Create Booking Button */}
              <button 
                onClick={handleCreateNew}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Booking
              </button>
            </div>
          </div>

          {/* Bookings Table */}
          <AdminTable
            title={`Bookings (${filteredBookings.length})`}
            data={tableData}
            columns={tableColumns}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            actions={[
              {
                icon: <Plus className="h-4 w-4" />,
                title: "Create New Booking",
                onClick: handleCreateNew,
                className: "text-blue-600 hover:text-blue-900"
              }
            ]}
          />

          {/* Create/Edit Modal */}
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingBooking ? 'Edit Booking' : 'Create New Booking'}
                    </h2>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Booking Form */}
                  <form onSubmit={handleSubmitBooking} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Customer Name *
                        </label>
                        <input
                          type="text"
                          name="customer"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter customer name"
                          defaultValue={editingBooking?.customer || ''}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter email address"
                          defaultValue={editingBooking?.email || ''}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter phone number"
                          defaultValue={editingBooking?.phone || ''}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Treatment *
                        </label>
                        <select
                          name="treatment"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select treatment</option>
                          <option value="Ayurvedic Massage" selected={editingBooking?.treatment === 'Ayurvedic Massage'}>Ayurvedic Massage</option>
                          <option value="Panchakarma Therapy" selected={editingBooking?.treatment === 'Panchakarma Therapy'}>Panchakarma Therapy</option>
                          <option value="Herbal Consultation" selected={editingBooking?.treatment === 'Herbal Consultation'}>Herbal Consultation</option>
                          <option value="Yoga Session" selected={editingBooking?.treatment === 'Yoga Session'}>Yoga Session</option>
                          <option value="Wellness Consultation" selected={editingBooking?.treatment === 'Wellness Consultation'}>Wellness Consultation</option>
                          <option value="Meditation Session" selected={editingBooking?.treatment === 'Meditation Session'}>Meditation Session</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date *
                        </label>
                        <input
                          type="date"
                          name="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          defaultValue={editingBooking?.date || ''}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Time *
                        </label>
                        <input
                          type="time"
                          name="time"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          defaultValue={editingBooking?.time || ''}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration (minutes) *
                        </label>
                        <input
                          type="number"
                          name="duration"
                          min="15"
                          max="480"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          defaultValue={editingBooking?.duration || 60}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Therapist *
                        </label>
                        <select
                          name="therapist"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select therapist</option>
                          <option value="Dr. Sarah Johnson" selected={editingBooking?.therapist === 'Dr. Sarah Johnson'}>Dr. Sarah Johnson</option>
                          <option value="Dr. Michael Chen" selected={editingBooking?.therapist === 'Dr. Michael Chen'}>Dr. Michael Chen</option>
                          <option value="Dr. Priya Sharma" selected={editingBooking?.therapist === 'Dr. Priya Sharma'}>Dr. Priya Sharma</option>
                          <option value="Dr. Robert Kumar" selected={editingBooking?.therapist === 'Dr. Robert Kumar'}>Dr. Robert Kumar</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amount ($) *
                        </label>
                        <input
                          type="number"
                          name="amount"
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter amount"
                          defaultValue={editingBooking?.amount || ''}
                          required
                  />
                </div>
              </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status *
                      </label>
                      <select
                        name="status"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="pending" selected={editingBooking?.status === 'pending'}>Pending</option>
                        <option value="confirmed" selected={editingBooking?.status === 'confirmed'}>Confirmed</option>
                        <option value="completed" selected={editingBooking?.status === 'completed'}>Completed</option>
                        <option value="cancelled" selected={editingBooking?.status === 'cancelled'}>Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes
                      </label>
                      <textarea
                        name="notes"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Additional notes or special requirements..."
                        defaultValue={editingBooking?.notes || ''}
                      />
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 font-medium flex items-center"
                      >
                        {saving ? (
                          <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                        ) : (
                          <Save className="h-5 w-5 mr-2" />
                        )}
                        {editingBooking ? 'Update Booking' : 'Create Booking'}
                      </button>
                    </div>
                  </form>
            </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
