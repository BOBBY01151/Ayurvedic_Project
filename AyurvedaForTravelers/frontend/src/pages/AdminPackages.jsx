import { useState } from 'react'
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
  Crown
} from 'lucide-react'
import { AdminCard, AdminTable, AdminSidebar, AdminHeader, AdminForm } from '../components/admin'

export default function AdminPackages() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingPackage, setEditingPackage] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterDuration, setFilterDuration] = useState('all')

  // Mock data
  const stats = [
    { name: 'Total Packages', value: '12', change: '+2', changeType: 'positive', icon: Package },
    { name: 'Active Packages', value: '10', change: '+1', changeType: 'positive', icon: Award },
    { name: 'Avg. Price', value: '$450', change: '+$25', changeType: 'positive', icon: DollarSign },
    { name: 'Total Bookings', value: '156', change: '+23', changeType: 'positive', icon: Users },
  ]

  const packages = [
    { 
      id: 1, 
      name: 'Wellness Retreat', 
      category: 'Wellness', 
      duration: '7 days', 
      price: '$1,200', 
      status: 'active', 
      rating: 4.9,
      maxPeople: 8,
      location: 'Kandy, Sri Lanka',
      description: 'Complete wellness retreat with yoga, meditation, and Ayurvedic treatments',
      includes: ['Accommodation', 'All Meals', 'Daily Yoga', '3 Ayurvedic Treatments', 'Meditation Sessions'],
      highlights: ['Mountain Views', 'Organic Food', 'Expert Therapists'],
      icon: Heart
    },
    { 
      id: 2, 
      name: 'Detox & Rejuvenation', 
      category: 'Detox', 
      duration: '5 days', 
      price: '$850', 
      status: 'active', 
      rating: 4.8,
      maxPeople: 6,
      location: 'Galle, Sri Lanka',
      description: 'Intensive detox program with Panchakarma and herbal therapies',
      includes: ['Luxury Villa', 'Detox Meals', 'Daily Panchakarma', 'Herbal Consultations', 'Spa Access'],
      highlights: ['Beach Location', 'Personalized Diet', '24/7 Support'],
      icon: Leaf
    },
    { 
      id: 3, 
      name: 'Yoga & Meditation', 
      category: 'Mindfulness', 
      duration: '3 days', 
      price: '$350', 
      status: 'active', 
      rating: 4.7,
      maxPeople: 12,
      location: 'Ella, Sri Lanka',
      description: 'Focused yoga and meditation retreat in the mountains',
      includes: ['Mountain Lodge', 'Vegetarian Meals', 'Daily Yoga Classes', 'Meditation Sessions', 'Nature Walks'],
      highlights: ['Mountain Air', 'Experienced Teachers', 'Small Groups'],
      icon: Sun
    },
    { 
      id: 4, 
      name: 'Ayurvedic Healing', 
      category: 'Therapy', 
      duration: '10 days', 
      price: '$1,800', 
      status: 'active', 
      rating: 4.9,
      maxPeople: 4,
      location: 'Anuradhapura, Sri Lanka',
      description: 'Comprehensive Ayurvedic healing program with traditional treatments',
      includes: ['Heritage Hotel', 'Ayurvedic Meals', 'Daily Treatments', 'Doctor Consultations', 'Cultural Tours'],
      highlights: ['Ancient City', 'Traditional Medicine', 'Cultural Experience'],
      icon: Zap
    },
    { 
      id: 5, 
      name: 'Luxury Spa Package', 
      category: 'Luxury', 
      duration: '4 days', 
      price: '$1,500', 
      status: 'active', 
      rating: 4.8,
      maxPeople: 2,
      location: 'Bentota, Sri Lanka',
      description: 'Premium spa experience with luxury accommodations',
      includes: ['5-Star Resort', 'Gourmet Dining', 'Daily Spa Treatments', 'Private Beach', 'Butler Service'],
      highlights: ['Ocean Views', 'Premium Services', 'Exclusive Access'],
      icon: Crown
    },
    { 
      id: 6, 
      name: 'Family Wellness', 
      category: 'Family', 
      duration: '6 days', 
      price: '$950', 
      status: 'inactive', 
      rating: 4.6,
      maxPeople: 6,
      location: 'Nuwara Eliya, Sri Lanka',
      description: 'Family-friendly wellness package with activities for all ages',
      includes: ['Family Villa', 'Kid-friendly Meals', 'Family Yoga', 'Nature Activities', 'Childcare'],
      highlights: ['Cool Climate', 'Family Activities', 'Safe Environment'],
      icon: Users
    },
  ]

  const categories = ['all', 'Wellness', 'Detox', 'Mindfulness', 'Therapy', 'Luxury', 'Family']
  const durations = ['all', '3 days', '4 days', '5 days', '6 days', '7 days', '10 days']

  const tableColumns = [
    { key: 'name', title: 'Package Name' },
    { key: 'category', title: 'Category' },
    { key: 'duration', title: 'Duration' },
    { key: 'price', title: 'Price' },
    { key: 'maxPeople', title: 'Max People' },
    { key: 'rating', title: 'Rating' },
    { key: 'status', title: 'Status' }
  ]

  const formFields = [
    { name: 'name', label: 'Package Name', type: 'text', required: true, placeholder: 'Enter package name' },
    { name: 'category', label: 'Category', type: 'select', required: true, options: [
      { value: 'Wellness', label: 'Wellness' },
      { value: 'Detox', label: 'Detox' },
      { value: 'Mindfulness', label: 'Mindfulness' },
      { value: 'Therapy', label: 'Therapy' },
      { value: 'Luxury', label: 'Luxury' },
      { value: 'Family', label: 'Family' }
    ]},
    { name: 'duration', label: 'Duration', type: 'text', required: true, placeholder: 'e.g., 7 days' },
    { name: 'price', label: 'Price ($)', type: 'number', required: true, placeholder: 'Enter price' },
    { name: 'maxPeople', label: 'Maximum People', type: 'number', required: true, placeholder: 'Enter max people' },
    { name: 'location', label: 'Location', type: 'text', required: true, placeholder: 'Enter location' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]},
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter package description...', fullWidth: true },
    { name: 'includes', label: 'What\'s Included (comma separated)', type: 'textarea', placeholder: 'Enter inclusions separated by commas...', fullWidth: true },
    { name: 'highlights', label: 'Highlights (comma separated)', type: 'textarea', placeholder: 'Enter highlights separated by commas...', fullWidth: true }
  ]

  // Filter packages based on search, category, and duration
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || pkg.category === filterCategory
    const matchesDuration = filterDuration === 'all' || pkg.duration === filterDuration
    return matchesSearch && matchesCategory && matchesDuration
  })

  const handleView = (item) => {
    console.log('View package:', item)
  }

  const handleEdit = (item) => {
    setEditingPackage(item)
    setShowForm(true)
  }

  const handleDelete = (item) => {
    console.log('Delete package:', item)
  }

  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data)
    setShowForm(false)
    setEditingPackage(null)
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingPackage(null)
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
          title="Packages Management"
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Content */}
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

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="lg:w-48">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Filter */}
              <div className="lg:w-48">
                <select
                  value={filterDuration}
                  onChange={(e) => setFilterDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {durations.map(duration => (
                    <option key={duration} value={duration}>
                      {duration === 'all' ? 'All Durations' : duration}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Package
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filter
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Packages Grid View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <pkg.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                        <p className="text-sm text-gray-500">{pkg.category}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      pkg.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {pkg.status}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pkg.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {pkg.duration}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {pkg.price}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {pkg.maxPeople}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{pkg.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                        {highlight}
                      </span>
                    ))}
                    {pkg.highlights.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{pkg.highlights.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleView(pkg)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEdit(pkg)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-md"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(pkg)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Book Package
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Packages Table View */}
          <AdminTable
            title="All Packages"
            data={filteredPackages}
            columns={tableColumns}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleFormCancel}></div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                  <AdminForm
                    title={editingPackage ? 'Edit Package' : 'New Package'}
                    fields={formFields}
                    initialData={editingPackage || {}}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
