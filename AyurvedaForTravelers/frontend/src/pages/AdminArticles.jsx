import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  User,
  Globe,
  FileText,
  TrendingUp,
  X,
  Save,
  RefreshCw,
  Sparkles,
  Target,
  CheckCircle,
  AlertCircle,
  Clock,
  BookOpen,
  PenTool,
  BarChart3,
  Share2,
  Heart,
  MessageCircle,
  Tag,
  Image,
  Link,
  Settings
} from 'lucide-react'
import { AdminCard, AdminTable, AdminSidebar, AdminHeader } from '../components/admin'

export default function AdminArticles() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)
  const [saving, setSaving] = useState(false)

  // Enhanced articles data
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Understanding Ayurvedic Principles: The Foundation of Holistic Health',
      slug: 'understanding-ayurvedic-principles',
      author: 'Dr. Sarah Johnson',
      status: 'published',
      publishDate: '2024-01-15',
      views: 1250,
      category: 'Education',
      featured: true,
      excerpt: 'Discover the ancient wisdom of Ayurveda and how its fundamental principles can transform your approach to health and wellness.',
      content: 'Ayurveda, the ancient Indian system of medicine, is based on the fundamental principle that health and wellness depend on a delicate balance between mind, body, and spirit...',
      tags: ['Ayurveda', 'Health', 'Wellness', 'Ancient Medicine'],
      readTime: '8 min read',
      likes: 45,
      comments: 12,
      shares: 23,
      seoTitle: 'Ayurvedic Principles: Complete Guide to Holistic Health',
      seoDescription: 'Learn about Ayurvedic principles and how they can improve your health and wellness journey.',
      metaKeywords: ['Ayurveda', 'holistic health', 'ancient medicine', 'wellness'],
      createdAt: '2024-01-10T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z'
    },
    {
      id: 2,
      title: 'Benefits of Panchakarma Treatment: Complete Detoxification Guide',
      slug: 'benefits-panchakarma-treatment',
      author: 'Dr. Michael Chen',
      status: 'draft',
      publishDate: '2024-01-14',
      views: 890,
      category: 'Treatments',
      featured: false,
      excerpt: 'Explore the comprehensive benefits of Panchakarma treatment and how it can rejuvenate your body and mind.',
      content: 'Panchakarma is a comprehensive detoxification and rejuvenation therapy that forms the cornerstone of Ayurvedic treatment...',
      tags: ['Panchakarma', 'Detox', 'Ayurvedic Treatment', 'Rejuvenation'],
      readTime: '12 min read',
      likes: 32,
      comments: 8,
      shares: 15,
      seoTitle: 'Panchakarma Benefits: Ultimate Detox Treatment Guide',
      seoDescription: 'Discover the amazing benefits of Panchakarma treatment for complete body detoxification.',
      metaKeywords: ['Panchakarma', 'detox', 'Ayurvedic treatment', 'rejuvenation'],
      createdAt: '2024-01-12T00:00:00Z',
      updatedAt: '2024-01-14T00:00:00Z'
    },
    {
      id: 3,
      title: 'Ayurvedic Diet for Travelers: Eating Well on the Go',
      slug: 'ayurvedic-diet-travelers',
      author: 'Dr. Priya Sharma',
      status: 'published',
      publishDate: '2024-01-12',
      views: 2100,
      category: 'Lifestyle',
      featured: true,
      excerpt: 'Learn how to maintain an Ayurvedic diet while traveling and keep your digestive fire strong.',
      content: 'Traveling can disrupt your regular eating habits and digestive rhythm. Here\'s how to maintain Ayurvedic dietary principles while on the go...',
      tags: ['Ayurvedic Diet', 'Travel', 'Nutrition', 'Digestive Health'],
      readTime: '6 min read',
      likes: 78,
      comments: 24,
      shares: 41,
      seoTitle: 'Ayurvedic Diet for Travelers: Healthy Eating Guide',
      seoDescription: 'Maintain your Ayurvedic diet while traveling with these practical tips and guidelines.',
      metaKeywords: ['Ayurvedic diet', 'travel nutrition', 'healthy eating', 'digestive health'],
      createdAt: '2024-01-08T00:00:00Z',
      updatedAt: '2024-01-12T00:00:00Z'
    },
    {
      id: 4,
      title: 'Stress Management with Ayurveda: Natural Solutions for Modern Life',
      slug: 'stress-management-ayurveda',
      author: 'Dr. Robert Kumar',
      status: 'scheduled',
      publishDate: '2024-01-20',
      views: 0,
      category: 'Wellness',
      featured: false,
      excerpt: 'Discover effective Ayurvedic techniques for managing stress and achieving mental balance in today\'s fast-paced world.',
      content: 'In our modern, fast-paced world, stress has become a common companion. Ayurveda offers time-tested solutions for managing stress naturally...',
      tags: ['Stress Management', 'Mental Health', 'Ayurveda', 'Wellness'],
      readTime: '10 min read',
      likes: 0,
      comments: 0,
      shares: 0,
      seoTitle: 'Ayurvedic Stress Management: Natural Solutions for Modern Life',
      seoDescription: 'Learn effective Ayurvedic techniques for managing stress and achieving mental wellness.',
      metaKeywords: ['stress management', 'Ayurveda', 'mental health', 'wellness'],
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-18T00:00:00Z'
    },
    {
      id: 5,
      title: 'Yoga and Ayurveda: The Perfect Union for Holistic Health',
      slug: 'yoga-ayurveda-perfect-union',
      author: 'Dr. Sarah Johnson',
      status: 'published',
      publishDate: '2024-01-18',
      views: 1680,
      category: 'Wellness',
      featured: true,
      excerpt: 'Explore how Yoga and Ayurveda work together to create a comprehensive approach to health and spiritual growth.',
      content: 'Yoga and Ayurveda are sister sciences that complement each other perfectly, offering a complete system for physical, mental, and spiritual well-being...',
      tags: ['Yoga', 'Ayurveda', 'Holistic Health', 'Spiritual Wellness'],
      readTime: '9 min read',
      likes: 56,
      comments: 18,
      shares: 29,
      seoTitle: 'Yoga and Ayurveda: Complete Guide to Holistic Health',
      seoDescription: 'Discover how Yoga and Ayurveda work together for complete mind-body wellness.',
      metaKeywords: ['Yoga', 'Ayurveda', 'holistic health', 'spiritual wellness'],
      createdAt: '2024-01-14T00:00:00Z',
      updatedAt: '2024-01-18T00:00:00Z'
    },
    {
      id: 6,
      title: 'Herbal Remedies for Common Travel Ailments',
      slug: 'herbal-remedies-travel-ailments',
      author: 'Dr. Priya Sharma',
      status: 'published',
      publishDate: '2024-01-16',
      views: 1450,
      category: 'Education',
      featured: false,
      excerpt: 'Natural Ayurvedic remedies to help you stay healthy and comfortable during your travels.',
      content: 'Traveling exposes us to new environments, foods, and climates that can sometimes cause discomfort. Here are Ayurvedic herbal remedies for common travel ailments...',
      tags: ['Herbal Remedies', 'Travel Health', 'Ayurveda', 'Natural Medicine'],
      readTime: '7 min read',
      likes: 41,
      comments: 15,
      shares: 19,
      seoTitle: 'Ayurvedic Herbal Remedies for Travel Ailments',
      seoDescription: 'Natural herbal remedies to keep you healthy while traveling.',
      metaKeywords: ['herbal remedies', 'travel health', 'Ayurveda', 'natural medicine'],
      createdAt: '2024-01-13T00:00:00Z',
      updatedAt: '2024-01-16T00:00:00Z'
    }
  ])

  // Filter articles based on search, status, and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || article.status === filterStatus
    const matchesCategory = filterCategory === 'all' || article.category === filterCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  // Enhanced stats
  const stats = [
    { 
      name: 'Total Articles', 
      value: articles.length.toString(), 
      change: '+3 this week', 
      changeType: 'positive', 
      icon: FileText,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      name: 'Published', 
      value: articles.filter(a => a.status === 'published').length.toString(), 
      change: '67% published', 
      changeType: 'positive', 
      icon: CheckCircle,
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      name: 'Total Views', 
      value: articles.reduce((sum, a) => sum + a.views, 0).toLocaleString(), 
      change: '+28%', 
      changeType: 'positive', 
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      name: 'Engagement', 
      value: `${articles.reduce((sum, a) => sum + a.likes + a.comments + a.shares, 0).toLocaleString()}`, 
      change: '+35%', 
      changeType: 'positive', 
      icon: Heart,
      color: 'bg-gradient-to-br from-orange-400 to-orange-600',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ]

  const tableColumns = [
    { key: 'title', title: 'Title' },
    { key: 'author', title: 'Author' },
    { key: 'category', title: 'Category' },
    { key: 'status', title: 'Status' },
    { key: 'publishDate', title: 'Publish Date' },
    { key: 'views', title: 'Views' }
  ]

  const handleView = (article) => {
    console.log('View article:', article)
    // Navigate to article view
  }

  const handleEdit = (article) => {
    setEditingArticle(article)
    setShowCreateModal(true)
  }

  const handleDelete = (article) => {
    if (window.confirm(`Are you sure you want to delete "${article.title}"?`)) {
      setArticles(articles.filter(a => a.id !== article.id))
    }
  }

  const handleCreateNew = () => {
    setEditingArticle(null)
    setShowCreateModal(true)
  }

  const handleSubmitArticle = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const articleData = {
      title: formData.get('title'),
      author: formData.get('author'),
      category: formData.get('category'),
      status: formData.get('status'),
      publishDate: formData.get('publishDate'),
      content: formData.get('content'),
      excerpt: formData.get('excerpt'),
      tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag),
      featured: formData.get('featured') === 'on',
      seoTitle: formData.get('seoTitle'),
      seoDescription: formData.get('seoDescription'),
      metaKeywords: formData.get('metaKeywords').split(',').map(keyword => keyword.trim()).filter(keyword => keyword)
    }

    setSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      if (editingArticle) {
        // Update existing article
        const updatedArticles = articles.map(article => 
          article.id === editingArticle.id 
            ? { 
                ...article, 
                ...articleData, 
                slug: articleData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, ''),
                updatedAt: new Date().toISOString()
              }
            : article
        )
        setArticles(updatedArticles)
      } else {
        // Create new article
        const newArticle = {
          id: Date.now(),
          ...articleData,
          slug: articleData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, ''),
          views: 0,
          likes: 0,
          comments: 0,
          shares: 0,
          readTime: '5 min read',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        setArticles([newArticle, ...articles])
      }

      setShowCreateModal(false)
      setEditingArticle(null)
      setSaving(false)
    }, 1000)
  }

  const tableData = filteredArticles.map(article => ({
    ...article,
    views: article.views.toLocaleString(),
    publishDate: new Date(article.publishDate).toLocaleDateString()
  }))

  // Define categories for the filter dropdown
  const categories = ['all', 'Education', 'Treatments', 'Lifestyle', 'Wellness']

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
          title="Articles Management"
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Articles Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Content Hub</h1>
                    <p className="text-gray-600">Create, manage, and publish engaging Ayurvedic content for your wellness community</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  {[
                    { label: 'Content Quality Score', value: 92, color: 'text-green-600', bgColor: 'bg-green-100' },
                    { label: 'Reader Engagement', value: 87, color: 'text-blue-600', bgColor: 'bg-blue-100' },
                    { label: 'SEO Performance', value: 84, color: 'text-purple-600', bgColor: 'bg-purple-100' },
                    { label: 'Content Velocity', value: 78, color: 'text-orange-600', bgColor: 'bg-orange-100' }
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
                    placeholder="Search articles..."
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
                  <option value="Education">Education</option>
                  <option value="Treatments">Treatments</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Wellness">Wellness</option>
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
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Create Article Button */}
              <button
                onClick={handleCreateNew}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Article
              </button>
            </div>
          </div>

          {/* Articles Table */}
          <AdminTable
            title={`Articles (${filteredArticles.length})`}
            data={tableData}
            columns={tableColumns}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            actions={[
              {
                icon: <Plus className="h-4 w-4" />,
                title: "Create New Article",
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
                className="bg-white rounded-2xl shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingArticle ? 'Edit Article' : 'Create New Article'}
                    </h2>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Article Form */}
                  <form onSubmit={handleSubmitArticle} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Article Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter article title"
                          defaultValue={editingArticle?.title || ''}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Author *
                        </label>
                        <input
                          type="text"
                          name="author"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter author name"
                          defaultValue={editingArticle?.author || ''}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                          <option value="Education" selected={editingArticle?.category === 'Education'}>Education</option>
                          <option value="Treatments" selected={editingArticle?.category === 'Treatments'}>Treatments</option>
                          <option value="Lifestyle" selected={editingArticle?.category === 'Lifestyle'}>Lifestyle</option>
                          <option value="Wellness" selected={editingArticle?.category === 'Wellness'}>Wellness</option>
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
                          <option value="draft" selected={editingArticle?.status === 'draft'}>Draft</option>
                          <option value="published" selected={editingArticle?.status === 'published'}>Published</option>
                          <option value="scheduled" selected={editingArticle?.status === 'scheduled'}>Scheduled</option>
                          <option value="archived" selected={editingArticle?.status === 'archived'}>Archived</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Publish Date *
                        </label>
                        <input
                          type="date"
                          name="publishDate"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          defaultValue={editingArticle?.publishDate || ''}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Article Excerpt
                      </label>
                      <textarea
                        name="excerpt"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Brief description of the article..."
                        defaultValue={editingArticle?.excerpt || ''}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Article Content *
                      </label>
                      <textarea
                        name="content"
                        rows={12}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Write your article content here..."
                        defaultValue={editingArticle?.content || ''}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          name="tags"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Ayurveda, Health, Wellness"
                          defaultValue={editingArticle?.tags?.join(', ') || ''}
                        />
                      </div>

                      <div className="flex items-center space-x-4 pt-6">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="featured"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            defaultChecked={editingArticle?.featured || false}
                          />
                          <span className="ml-2 text-sm text-gray-700">Featured Article</span>
                        </label>
                      </div>
                    </div>

                    {/* SEO Section */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <Settings className="h-5 w-5 mr-2" />
                        SEO Settings
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            SEO Title
                          </label>
                          <input
                            type="text"
                            name="seoTitle"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="SEO optimized title"
                            defaultValue={editingArticle?.seoTitle || ''}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meta Keywords (comma separated)
                          </label>
                          <input
                            type="text"
                            name="metaKeywords"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="ayurveda, health, wellness"
                            defaultValue={editingArticle?.metaKeywords?.join(', ') || ''}
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Meta Description
                        </label>
                        <textarea
                          name="seoDescription"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="SEO meta description..."
                          defaultValue={editingArticle?.seoDescription || ''}
                        />
                      </div>
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
                        {editingArticle ? 'Update Article' : 'Create Article'}
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
