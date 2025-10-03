import { useState, useEffect } from 'react'
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
  Zap,
  TrendingUp,
  Users,
  Calendar,
  Award,
  Shield,
  Sparkles,
  Target,
  CheckCircle,
  AlertCircle,
  X,
  Save,
  RefreshCw,
  Package,
  Timer,
  Globe,
  Shield as ShieldIcon,
  BookOpen
} from 'lucide-react'
import { AdminCard, AdminTable, AdminSidebar, AdminHeader } from '../components/admin'

export default function AdminTreatments() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingTreatment, setEditingTreatment] = useState(null)
  const [saving, setSaving] = useState(false)

  // Enhanced treatments data
  const [treatments, setTreatments] = useState([
    { 
      id: 1, 
      name: 'Ayurvedic Massage', 
      category: 'Massage Therapy',
      duration: 90,
      price: 120,
      status: 'active', 
      rating: 4.8,
      totalBookings: 156,
      revenue: 18720,
      description: 'Traditional full-body massage using warm herbal oils to promote relaxation and healing',
      benefits: ['Stress Relief', 'Muscle Relaxation', 'Improved Circulation', 'Better Sleep'],
      contraindications: ['Pregnancy (first trimester)', 'Open wounds', 'Skin infections'],
      therapist: 'Dr. Sarah Johnson',
      maxParticipants: 1,
      equipment: ['Massage table', 'Herbal oils', 'Towels', 'Music system'],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z'
    },
    { 
      id: 2, 
      name: 'Panchakarma Therapy',
      category: 'Detoxification',
      duration: 180,
      price: 350,
      status: 'active', 
      rating: 4.9,
      totalBookings: 89,
      revenue: 31150,
      description: 'Complete detoxification and rejuvenation therapy for deep cleansing and healing',
      benefits: ['Detoxification', 'Immune Boost', 'Mental Clarity', 'Energy Restoration'],
      contraindications: ['Acute illness', 'Pregnancy', 'Severe diabetes'],
      therapist: 'Dr. Michael Chen',
      maxParticipants: 1,
      equipment: ['Specialized treatment room', 'Herbal preparations', 'Meditation space'],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-10T00:00:00Z'
    },
    { 
      id: 3, 
      name: 'Herbal Consultation',
      category: 'Wellness', 
      duration: 60,
      price: 85,
      status: 'active', 
      rating: 4.7,
      totalBookings: 234,
      revenue: 19890,
      description: 'Natural herbal treatments and consultations for various health conditions',
      benefits: ['Natural Healing', 'Digestive Health', 'Skin Care', 'Hormonal Balance'],
      contraindications: ['Allergic reactions to herbs', 'Medication interactions'],
      therapist: 'Dr. Priya Sharma',
      maxParticipants: 1,
      equipment: ['Consultation room', 'Herbal samples', 'Medical records'],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-12T00:00:00Z'
    },
    { 
      id: 4, 
      name: 'Yoga Session', 
      category: 'Mind-Body Wellness',
      duration: 75,
      price: 60,
      status: 'active', 
      rating: 4.6,
      totalBookings: 445,
      revenue: 26700,
      description: 'Guided yoga practice for mind-body wellness and spiritual growth',
      benefits: ['Flexibility', 'Strength', 'Mental Peace', 'Stress Reduction'],
      contraindications: ['Severe back problems', 'Acute injuries'],
      therapist: 'Dr. Robert Kumar',
      maxParticipants: 12,
      equipment: ['Yoga mats', 'Props', 'Meditation cushions', 'Sound system'],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-08T00:00:00Z'
    },
    { 
      id: 5, 
      name: 'Meditation Session',
      category: 'Mindfulness', 
      duration: 45,
      price: 40,
      status: 'active',
      rating: 4.5,
      totalBookings: 189,
      revenue: 7560,
      description: 'Guided meditation for stress relief, mental clarity, and inner peace',
      benefits: ['Stress Reduction', 'Focus', 'Inner Peace', 'Emotional Balance'],
      contraindications: ['Severe anxiety disorders', 'Psychotic conditions'],
      therapist: 'Dr. Robert Kumar',
      maxParticipants: 15,
      equipment: ['Meditation cushions', 'Soft lighting', 'Sound system'],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-05T00:00:00Z'
    },
    {
      id: 6,
      name: 'Wellness Consultation',
      category: 'Wellness',
      duration: 120,
      price: 200,
      status: 'active',
      rating: 4.9,
      totalBookings: 67,
      revenue: 13400,
      description: 'Comprehensive wellness assessment and personalized treatment planning',
      benefits: ['Health Assessment', 'Personalized Care', 'Preventive Medicine', 'Lifestyle Guidance'],
      contraindications: ['None'],
      therapist: 'Dr. Sarah Johnson',
      maxParticipants: 1,
      equipment: ['Consultation room', 'Health assessment tools', 'Educational materials'],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-18T00:00:00Z'
    }
  ])

  // Filter treatments based on search, category, and status
  const filteredTreatments = treatments.filter(treatment => {
    const matchesSearch = treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.therapist.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || treatment.category === filterCategory
    const matchesStatus = filterStatus === 'all' || treatment.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Enhanced stats
  const stats = [
    { 
      name: 'Total Treatments', 
      value: treatments.length.toString(), 
      change: '+2 this month', 
      changeType: 'positive', 
      icon: Package,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      name: 'Active Treatments', 
      value: treatments.filter(t => t.status === 'active').length.toString(), 
      change: '100% active', 
      changeType: 'positive', 
      icon: CheckCircle,
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      name: 'Total Revenue', 
      value: `$${treatments.reduce((sum, t) => sum + t.revenue, 0).toLocaleString()}`, 
      change: '+18.5%', 
      changeType: 'positive', 
      icon: DollarSign,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      name: 'Avg. Rating', 
      value: (treatments.reduce((sum, t) => sum + t.rating, 0) / treatments.length).toFixed(1), 
      change: '+0.2', 
      changeType: 'positive', 
      icon: Star,
      color: 'bg-gradient-to-br from-orange-400 to-orange-600',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ]

  const tableColumns = [
    { key: 'name', title: 'Treatment Name' },
    { key: 'category', title: 'Category' },
    { key: 'duration', title: 'Duration' },
    { key: 'price', title: 'Price' },
    { key: 'rating', title: 'Rating' },
    { key: 'status', title: 'Status' }
  ]

  const handleView = (treatment) => {
    console.log('View treatment:', treatment)
  }

  const handleEdit = (treatment) => {
    setEditingTreatment(treatment)
    setShowCreateModal(true)
  }

  const handleDelete = (treatment) => {
    if (window.confirm(`Are you sure you want to delete "${treatment.name}"?`)) {
      setTreatments(treatments.filter(t => t.id !== treatment.id))
    }
  }

  const handleCreateNew = () => {
    setEditingTreatment(null)
    setShowCreateModal(true)
  }

  const handleSubmitTreatment = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const treatmentData = {
      name: formData.get('name'),
      category: formData.get('category'),
      duration: parseInt(formData.get('duration')),
      price: parseFloat(formData.get('price')),
      status: formData.get('status'),
      description: formData.get('description'),
      benefits: formData.get('benefits').split(',').map(b => b.trim()).filter(b => b),
      contraindications: formData.get('contraindications').split(',').map(c => c.trim()).filter(c => c),
      therapist: formData.get('therapist'),
      maxParticipants: parseInt(formData.get('maxParticipants')),
      equipment: formData.get('equipment').split(',').map(e => e.trim()).filter(e => e)
    }

    setSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      if (editingTreatment) {
        // Update existing treatment
        const updatedTreatments = treatments.map(treatment => 
          treatment.id === editingTreatment.id 
            ? { 
                ...treatment, 
                ...treatmentData, 
                updatedAt: new Date().toISOString() 
              }
            : treatment
        )
        setTreatments(updatedTreatments)
      } else {
        // Create new treatment
        const newTreatment = {
          id: Date.now(),
          ...treatmentData,
          rating: 0,
          totalBookings: 0,
          revenue: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        setTreatments([newTreatment, ...treatments])
      }

      setShowCreateModal(false)
    setEditingTreatment(null)
      setSaving(false)
    }, 1000)
  }

  const tableData = filteredTreatments.map(treatment => ({
    ...treatment,
    duration: `${treatment.duration} min`,
    price: `$${treatment.price}`,
    rating: treatment.rating.toFixed(1)
  }))

  // Define categories for the filter dropdown
  const categories = ['all', 'Massage Therapy', 'Detoxification', 'Wellness', 'Mind-Body Wellness', 'Mindfulness']

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
          title="Treatments Management"
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Treatments Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl shadow-lg">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Treatment Portfolio</h1>
                    <p className="text-gray-600">Manage your comprehensive range of Ayurvedic wellness treatments</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  {[
                    { label: 'Treatment Success Rate', value: 96, color: 'text-green-600', bgColor: 'bg-green-100' },
                    { label: 'Customer Satisfaction', value: 94, color: 'text-blue-600', bgColor: 'bg-blue-100' },
                    { label: 'Revenue Growth', value: 87, color: 'text-purple-600', bgColor: 'bg-purple-100' },
                    { label: 'Repeat Bookings', value: 78, color: 'text-orange-600', bgColor: 'bg-orange-100' }
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
                    placeholder="Search treatments..."
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
                  <option value="Massage Therapy">Massage Therapy</option>
                  <option value="Detoxification">Detoxification</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Mind-Body Wellness">Mind-Body Wellness</option>
                  <option value="Mindfulness">Mindfulness</option>
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

              {/* Create Treatment Button */}
              <button
                onClick={handleCreateNew}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Treatment
              </button>
            </div>
          </div>

          {/* Treatments Table */}
          <AdminTable
            title={`Treatments (${filteredTreatments.length})`}
            data={tableData}
            columns={tableColumns}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            actions={[
              {
                icon: <Plus className="h-4 w-4" />,
                title: "Create New Treatment",
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
                      {editingTreatment ? 'Edit Treatment' : 'Create New Treatment'}
                    </h2>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Treatment Form */}
                  <form onSubmit={handleSubmitTreatment} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Treatment Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter treatment name"
                          defaultValue={editingTreatment?.name || ''}
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
                          <option value="Massage Therapy" selected={editingTreatment?.category === 'Massage Therapy'}>Massage Therapy</option>
                          <option value="Detoxification" selected={editingTreatment?.category === 'Detoxification'}>Detoxification</option>
                          <option value="Wellness" selected={editingTreatment?.category === 'Wellness'}>Wellness</option>
                          <option value="Mind-Body Wellness" selected={editingTreatment?.category === 'Mind-Body Wellness'}>Mind-Body Wellness</option>
                          <option value="Mindfulness" selected={editingTreatment?.category === 'Mindfulness'}>Mindfulness</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                          defaultValue={editingTreatment?.duration || 60}
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
                          defaultValue={editingTreatment?.price || ''}
                          required
                        />
                  </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Participants *
                        </label>
                        <input
                          type="number"
                          name="maxParticipants"
                          min="1"
                          max="50"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          defaultValue={editingTreatment?.maxParticipants || 1}
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
                          <option value="Dr. Sarah Johnson" selected={editingTreatment?.therapist === 'Dr. Sarah Johnson'}>Dr. Sarah Johnson</option>
                          <option value="Dr. Michael Chen" selected={editingTreatment?.therapist === 'Dr. Michael Chen'}>Dr. Michael Chen</option>
                          <option value="Dr. Priya Sharma" selected={editingTreatment?.therapist === 'Dr. Priya Sharma'}>Dr. Priya Sharma</option>
                          <option value="Dr. Robert Kumar" selected={editingTreatment?.therapist === 'Dr. Robert Kumar'}>Dr. Robert Kumar</option>
                        </select>
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
                          <option value="active" selected={editingTreatment?.status === 'active'}>Active</option>
                          <option value="inactive" selected={editingTreatment?.status === 'inactive'}>Inactive</option>
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
                        placeholder="Enter treatment description..."
                        defaultValue={editingTreatment?.description || ''}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Benefits (comma separated)
                        </label>
                        <textarea
                          name="benefits"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Stress Relief, Muscle Relaxation, Improved Circulation"
                          defaultValue={editingTreatment?.benefits?.join(', ') || ''}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contraindications (comma separated)
                        </label>
                        <textarea
                          name="contraindications"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Pregnancy, Acute illness, Open wounds"
                          defaultValue={editingTreatment?.contraindications?.join(', ') || ''}
                        />
                    </div>
                  </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Required Equipment (comma separated)
                      </label>
                      <textarea
                        name="equipment"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Massage table, Herbal oils, Towels"
                        defaultValue={editingTreatment?.equipment?.join(', ') || ''}
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
                        {editingTreatment ? 'Update Treatment' : 'Create Treatment'}
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
