import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Package, 
  Users, 
  DollarSign, 
  Star, 
  Plus, 
  Filter, 
  Download, 
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Leaf,
  Sun,
  Zap,
  Award,
  Crown,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  X,
  Save,
  RefreshCw,
  Sparkles,
  Target,
  BookOpen,
  Plane,
  Hotel,
  Utensils,
  Shield,
  Globe,
  Gift
} from 'lucide-react'
import { AdminCard, AdminTable, AdminSidebar, AdminHeader } from '../components/admin'

export default function AdminPackages() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterDuration, setFilterDuration] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingPackage, setEditingPackage] = useState(null)
  const [saving, setSaving] = useState(false)

  // Enhanced packages data
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Wellness Retreat',
      category: 'Wellness',
      duration: 7,
      price: 1200,
      status: 'active',
      rating: 4.9,
      totalBookings: 89,
      revenue: 106800,
      maxPeople: 8,
      location: 'Kandy, Sri Lanka',
      description: 'Complete wellness retreat with yoga, meditation, and Ayurvedic treatments in the heart of Sri Lanka',
      includes: ['Luxury Accommodation', 'All Organic Meals', 'Daily Yoga Classes', '3 Ayurvedic Treatments', 'Meditation Sessions', 'Mountain Hiking', 'Cultural Tours'],
      highlights: ['Mountain Views', 'Organic Food', 'Expert Therapists', 'Peaceful Environment'],
      amenities: ['WiFi', 'Air Conditioning', 'Spa Access', 'Gym', 'Pool'],
      transportation: 'Airport Pickup & Drop',
      insurance: 'Travel Insurance Included',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-20T00:00:00Z'
    },
    {
      id: 2,
      name: 'Detox & Rejuvenation',
      category: 'Detoxification',
      duration: 5,
      price: 850,
      status: 'active',
      rating: 4.8,
      totalBookings: 67,
      revenue: 56950,
      maxPeople: 6,
      location: 'Galle, Sri Lanka',
      description: 'Intensive detox program with Panchakarma and herbal therapies by the beautiful beaches',
      includes: ['Beach Villa', 'Detox Meals', 'Daily Panchakarma', 'Herbal Consultations', 'Spa Access', 'Beach Activities', 'Sunset Meditation'],
      highlights: ['Beach Location', 'Personalized Diet', '24/7 Support', 'Ocean Views'],
      amenities: ['Private Beach', 'WiFi', 'Air Conditioning', 'Spa', 'Garden'],
      transportation: 'Airport Transfer',
      insurance: 'Health Insurance Included',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-18T00:00:00Z'
    },
    {
      id: 3,
      name: 'Yoga & Meditation',
      category: 'Mindfulness',
      duration: 3,
      price: 350,
      status: 'active',
      rating: 4.7,
      totalBookings: 145,
      revenue: 50750,
      maxPeople: 12,
      location: 'Ella, Sri Lanka',
      description: 'Focused yoga and meditation retreat in the cool mountain air of Ella',
      includes: ['Mountain Lodge', 'Vegetarian Meals', 'Daily Yoga Classes', 'Meditation Sessions', 'Nature Walks', 'Tea Plantation Tours'],
      highlights: ['Mountain Air', 'Experienced Teachers', 'Small Groups', 'Fresh Climate'],
      amenities: ['WiFi', 'Hot Water', 'Garden', 'Library'],
      transportation: 'Railway Station Pickup',
      insurance: 'Basic Coverage',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z'
    },
    {
      id: 4,
      name: 'Ayurvedic Healing',
      category: 'Therapy',
      duration: 10,
      price: 1800,
      status: 'active',
      rating: 4.9,
      totalBookings: 34,
      revenue: 61200,
      maxPeople: 4,
      location: 'Anuradhapura, Sri Lanka',
      description: 'Comprehensive Ayurvedic healing program with traditional treatments in the ancient city',
      includes: ['Heritage Hotel', 'Ayurvedic Meals', 'Daily Treatments', 'Doctor Consultations', 'Cultural Tours', 'Ancient Site Visits'],
      highlights: ['Ancient City', 'Traditional Medicine', 'Cultural Experience', 'Historical Sites'],
      amenities: ['WiFi', 'Air Conditioning', 'Herbal Garden', 'Meditation Hall'],
      transportation: 'Airport Transfer & Local Tours',
      insurance: 'Comprehensive Health Insurance',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-22T00:00:00Z'
    },
    {
      id: 5,
      name: 'Luxury Spa Package',
      category: 'Luxury',
      duration: 4,
      price: 1500,
      status: 'active',
      rating: 4.8,
      totalBookings: 78,
      revenue: 117000,
      maxPeople: 2,
      location: 'Bentota, Sri Lanka',
      description: 'Premium spa experience with luxury accommodations and exclusive beach access',
      includes: ['5-Star Resort', 'Gourmet Dining', 'Daily Spa Treatments', 'Private Beach', 'Butler Service', 'Sunset Cruises'],
      highlights: ['Ocean Views', 'Premium Services', 'Exclusive Access', 'Luxury Amenities'],
      amenities: ['Private Pool', 'Butler Service', 'WiFi', 'Spa', 'Restaurant'],
      transportation: 'Luxury Airport Transfer',
      insurance: 'Premium Travel Insurance',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-25T00:00:00Z'
    },
    {
      id: 6,
      name: 'Family Wellness',
      category: 'Family',
      duration: 6,
      price: 950,
      status: 'inactive',
      rating: 4.6,
      totalBookings: 23,
      revenue: 21850,
      maxPeople: 6,
      location: 'Nuwara Eliya, Sri Lanka',
      description: 'Family-friendly wellness package with activities for all ages in the cool hill country',
      includes: ['Family Villa', 'Kid-friendly Meals', 'Family Yoga', 'Nature Activities', 'Childcare', 'Tea Estate Tours'],
      highlights: ['Cool Climate', 'Family Activities', 'Safe Environment', 'Child-friendly'],
      amenities: ['Playground', 'WiFi', 'Kitchen', 'Garden', 'Parking'],
      transportation: 'Family Vehicle Transfer',
      insurance: 'Family Travel Insurance',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-10T00:00:00Z'
    }
  ])

  // Filter packages based on search, category, duration, and status
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || pkg.category === filterCategory
    const matchesDuration = filterDuration === 'all' || pkg.duration.toString() === filterDuration
    const matchesStatus = filterStatus === 'all' || pkg.status === filterStatus
    return matchesSearch && matchesCategory && matchesDuration && matchesStatus
  })

  // Enhanced stats
  const stats = [
    { 
      name: 'Total Packages', 
      value: packages.length.toString(), 
      change: '+2 this month', 
      changeType: 'positive', 
      icon: Package,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      name: 'Active Packages', 
      value: packages.filter(p => p.status === 'active').length.toString(), 
      change: '83% active', 
      changeType: 'positive', 
      icon: CheckCircle,
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      name: 'Total Revenue', 
      value: `$${packages.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}`, 
      change: '+22.3%', 
      changeType: 'positive', 
      icon: DollarSign,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      name: 'Avg. Rating', 
      value: (packages.reduce((sum, p) => sum + p.rating, 0) / packages.length).toFixed(1), 
      change: '+0.3', 
      changeType: 'positive', 
      icon: Star,
      color: 'bg-gradient-to-br from-orange-400 to-orange-600',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ]

  const tableColumns = [
    { key: 'name', title: 'Package Name' },
    { key: 'category', title: 'Category' },
    { key: 'duration', title: 'Duration' },
    { key: 'price', title: 'Price' },
    { key: 'maxPeople', title: 'Max People' },
    { key: 'rating', title: 'Rating' },
    { key: 'status', title: 'Status' }
  ]

  const handleView = (packageItem) => {
    console.log('View package:', packageItem)
  }

  const handleEdit = (packageItem) => {
    setEditingPackage(packageItem)
    setShowCreateModal(true)
  }

  const handleDelete = (packageItem) => {
    if (window.confirm(`Are you sure you want to delete "${packageItem.name}"?`)) {
      setPackages(packages.filter(p => p.id !== packageItem.id))
    }
  }

  const handleCreateNew = () => {
    setEditingPackage(null)
    setShowCreateModal(true)
  }

  const handleSubmitPackage = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const packageData = {
      name: formData.get('name'),
      category: formData.get('category'),
      duration: parseInt(formData.get('duration')),
      price: parseFloat(formData.get('price')),
      maxPeople: parseInt(formData.get('maxPeople')),
      location: formData.get('location'),
      status: formData.get('status'),
      description: formData.get('description'),
      includes: formData.get('includes').split(',').map(i => i.trim()).filter(i => i),
      highlights: formData.get('highlights').split(',').map(h => h.trim()).filter(h => h),
      amenities: formData.get('amenities').split(',').map(a => a.trim()).filter(a => a),
      transportation: formData.get('transportation'),
      insurance: formData.get('insurance')
    }

    setSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      if (editingPackage) {
        // Update existing package
        const updatedPackages = packages.map(pkg => 
          pkg.id === editingPackage.id 
            ? { 
                ...pkg, 
                ...packageData, 
                updatedAt: new Date().toISOString() 
              }
            : pkg
        )
        setPackages(updatedPackages)
      } else {
        // Create new package
        const newPackage = {
          id: Date.now(),
          ...packageData,
          rating: 0,
          totalBookings: 0,
          revenue: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        setPackages([newPackage, ...packages])
      }

      setShowCreateModal(false)
      setEditingPackage(null)
      setSaving(false)
    }, 1000)
  }

  const tableData = filteredPackages.map(pkg => ({
    ...pkg,
    duration: `${pkg.duration} days`,
    price: `$${pkg.price.toLocaleString()}`,
    rating: pkg.rating.toFixed(1)
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
          title="Packages Management"
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Packages Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-green-400/20 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Wellness Packages</h1>
                    <p className="text-gray-600">Curated experiences for transformative wellness journeys across Sri Lanka</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  {[
                    { label: 'Package Success Rate', value: 94, color: 'text-green-600', bgColor: 'bg-green-100' },
                    { label: 'Customer Satisfaction', value: 96, color: 'text-blue-600', bgColor: 'bg-blue-100' },
                    { label: 'Revenue Growth', value: 89, color: 'text-purple-600', bgColor: 'bg-purple-100' },
                    { label: 'Repeat Bookings', value: 82, color: 'text-orange-600', bgColor: 'bg-orange-100' }
                  ].map((metric, index) => (
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

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search packages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="lg:w-48">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Detoxification">Detoxification</option>
                  <option value="Mindfulness">Mindfulness</option>
                  <option value="Therapy">Therapy</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Family">Family</option>
                </select>
              </div>

              {/* Duration Filter */}
              <div className="lg:w-48">
                <select
                  value={filterDuration}
                  onChange={(e) => setFilterDuration(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Durations</option>
                  <option value="3">3 days</option>
                  <option value="4">4 days</option>
                  <option value="5">5 days</option>
                  <option value="6">6 days</option>
                  <option value="7">7 days</option>
                  <option value="10">10 days</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="lg:w-48">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Create Package Button */}
              <button
                onClick={handleCreateNew}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Package
              </button>
            </div>
          </div>

          {/* Packages Table */}
          <AdminTable
            title={`Packages (${filteredPackages.length})`}
            data={tableData}
            columns={tableColumns}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            actions={[
              {
                icon: <Plus className="h-4 w-4" />,
                title: "Create New Package",
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
                      {editingPackage ? 'Edit Package' : 'Create New Package'}
                    </h2>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Package Form */}
                  <form onSubmit={handleSubmitPackage} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Package Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter package name"
                          defaultValue={editingPackage?.name || ''}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category *
                        </label>
                        <select
                          name="category"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select category</option>
                          <option value="Wellness" selected={editingPackage?.category === 'Wellness'}>Wellness</option>
                          <option value="Detoxification" selected={editingPackage?.category === 'Detoxification'}>Detoxification</option>
                          <option value="Mindfulness" selected={editingPackage?.category === 'Mindfulness'}>Mindfulness</option>
                          <option value="Therapy" selected={editingPackage?.category === 'Therapy'}>Therapy</option>
                          <option value="Luxury" selected={editingPackage?.category === 'Luxury'}>Luxury</option>
                          <option value="Family" selected={editingPackage?.category === 'Family'}>Family</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration (days) *
                        </label>
                        <input
                          type="number"
                          name="duration"
                          min="1"
                          max="30"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          defaultValue={editingPackage?.duration || ''}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price ($) *
                        </label>
                        <input
                          type="number"
                          name="price"
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter price"
                          defaultValue={editingPackage?.price || ''}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max People *
                        </label>
                        <input
                          type="number"
                          name="maxPeople"
                          min="1"
                          max="50"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          defaultValue={editingPackage?.maxPeople || 1}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location *
                        </label>
                        <input
                          type="text"
                          name="location"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter location"
                          defaultValue={editingPackage?.location || ''}
                          required
                        />
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
                          <option value="active" selected={editingPackage?.status === 'active'}>Active</option>
                          <option value="inactive" selected={editingPackage?.status === 'inactive'}>Inactive</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter package description..."
                        defaultValue={editingPackage?.description || ''}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          What's Included (comma separated)
                        </label>
                        <textarea
                          name="includes"
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Accommodation, All Meals, Daily Yoga, Treatments"
                          defaultValue={editingPackage?.includes?.join(', ') || ''}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Highlights (comma separated)
                        </label>
                        <textarea
                          name="highlights"
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Mountain Views, Organic Food, Expert Therapists"
                          defaultValue={editingPackage?.highlights?.join(', ') || ''}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amenities (comma separated)
                        </label>
                        <textarea
                          name="amenities"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="WiFi, Air Conditioning, Spa Access, Pool"
                          defaultValue={editingPackage?.amenities?.join(', ') || ''}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Transportation
                        </label>
                        <input
                          type="text"
                          name="transportation"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Airport Pickup & Drop"
                          defaultValue={editingPackage?.transportation || ''}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Insurance
                      </label>
                      <input
                        type="text"
                        name="insurance"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Travel Insurance Included"
                        defaultValue={editingPackage?.insurance || ''}
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
                        {editingPackage ? 'Update Package' : 'Create Package'}
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
