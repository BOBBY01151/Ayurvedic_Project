import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Activity, 
  Clock, 
  DollarSign, 
  Star, 
  Plus, 
  Filter, 
  Download, 
  Search,
  Edit,
  Trash2,
  Eye,
  Heart,
  Leaf,
  Sun,
  Zap
} from 'lucide-react'
import { AdminCard, AdminTable, AdminSidebar, AdminHeader, AdminForm } from '../components/admin'

export default function AdminTreatments() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingTreatment, setEditingTreatment] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  // Mock data
  const stats = [
    { name: 'Total Treatments', value: '24', change: '+3', changeType: 'positive', icon: Activity },
    { name: 'Active Treatments', value: '18', change: '+2', changeType: 'positive', icon: Heart },
    { name: 'Avg. Duration', value: '2.5 hrs', change: '+0.3 hrs', changeType: 'positive', icon: Clock },
    { name: 'Avg. Price', value: '$125', change: '+$15', changeType: 'positive', icon: DollarSign },
  ]

  const treatments = [
    { 
      id: 1, 
      name: 'Ayurvedic Massage', 
      category: 'Massage', 
      duration: '90 min', 
      price: '$120', 
      status: 'active', 
      rating: 4.8,
      description: 'Traditional full-body massage using warm herbal oils',
      benefits: ['Stress Relief', 'Muscle Relaxation', 'Improved Circulation'],
      icon: Heart
    },
    { 
      id: 2, 
      name: 'Panchakarma', 
      category: 'Detox', 
      duration: '3 hours', 
      price: '$350', 
      status: 'active', 
      rating: 4.9,
      description: 'Complete detoxification and rejuvenation therapy',
      benefits: ['Detoxification', 'Immune Boost', 'Mental Clarity'],
      icon: Leaf
    },
    { 
      id: 3, 
      name: 'Herbal Therapy', 
      category: 'Wellness', 
      duration: '60 min', 
      price: '$85', 
      status: 'active', 
      rating: 4.7,
      description: 'Natural herbal treatments for various health conditions',
      benefits: ['Natural Healing', 'Digestive Health', 'Skin Care'],
      icon: Sun
    },
    { 
      id: 4, 
      name: 'Yoga Session', 
      category: 'Exercise', 
      duration: '75 min', 
      price: '$60', 
      status: 'active', 
      rating: 4.6,
      description: 'Guided yoga practice for mind-body wellness',
      benefits: ['Flexibility', 'Strength', 'Mental Peace'],
      icon: Zap
    },
    { 
      id: 5, 
      name: 'Meditation', 
      category: 'Mindfulness', 
      duration: '45 min', 
      price: '$40', 
      status: 'inactive', 
      rating: 4.5,
      description: 'Guided meditation for stress relief and mental clarity',
      benefits: ['Stress Reduction', 'Focus', 'Inner Peace'],
      icon: Heart
    },
  ]

  const categories = ['all', 'Massage', 'Detox', 'Wellness', 'Exercise', 'Mindfulness']

  const tableColumns = [
    { key: 'name', title: 'Treatment Name' },
    { key: 'category', title: 'Category' },
    { key: 'duration', title: 'Duration' },
    { key: 'price', title: 'Price' },
    { key: 'rating', title: 'Rating' },
    { key: 'status', title: 'Status' }
  ]

  const formFields = [
    { name: 'name', label: 'Treatment Name', type: 'text', required: true, placeholder: 'Enter treatment name' },
    { name: 'category', label: 'Category', type: 'select', required: true, options: [
      { value: 'Massage', label: 'Massage' },
      { value: 'Detox', label: 'Detox' },
      { value: 'Wellness', label: 'Wellness' },
      { value: 'Exercise', label: 'Exercise' },
      { value: 'Mindfulness', label: 'Mindfulness' }
    ]},
    { name: 'duration', label: 'Duration (minutes)', type: 'number', required: true, placeholder: 'Enter duration in minutes' },
    { name: 'price', label: 'Price ($)', type: 'number', required: true, placeholder: 'Enter price' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]},
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter treatment description...', fullWidth: true },
    { name: 'benefits', label: 'Benefits (comma separated)', type: 'textarea', placeholder: 'Enter benefits separated by commas...', fullWidth: true }
  ]

  // Filter treatments based on search and category
  const filteredTreatments = treatments.filter(treatment => {
    const matchesSearch = treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || treatment.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleView = (item) => {
    console.log('View treatment:', item)
  }

  const handleEdit = (item) => {
    setEditingTreatment(item)
    setShowForm(true)
  }

  const handleDelete = (item) => {
    console.log('Delete treatment:', item)
  }

  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data)
    setShowForm(false)
    setEditingTreatment(null)
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingTreatment(null)
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
          title="Treatments Management"
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
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search treatments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="md:w-48">
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

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Treatment
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

          {/* Treatments Grid View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredTreatments.map((treatment, index) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <treatment.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-900">{treatment.name}</h3>
                        <p className="text-sm text-gray-500">{treatment.category}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      treatment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {treatment.status}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{treatment.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {treatment.duration}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {treatment.price}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{treatment.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {treatment.benefits.slice(0, 2).map((benefit, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {benefit}
                      </span>
                    ))}
                    {treatment.benefits.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{treatment.benefits.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleView(treatment)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEdit(treatment)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-md"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(treatment)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Treatments Table View */}
          <AdminTable
            title="All Treatments"
            data={filteredTreatments}
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
                    title={editingTreatment ? 'Edit Treatment' : 'New Treatment'}
                    fields={formFields}
                    initialData={editingTreatment || {}}
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
