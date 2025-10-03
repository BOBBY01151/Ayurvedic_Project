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
  X
} from 'lucide-react'
import { AdminCard, AdminTable, AdminSidebar, AdminHeader } from '../components/admin'

export default function AdminArticles() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)

  // Mock data for articles
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Understanding Ayurvedic Principles',
      slug: 'understanding-ayurvedic-principles',
      author: 'Dr. Sarah Johnson',
      status: 'published',
      publishDate: '2024-01-15',
      views: 1250,
      category: 'Education',
      featured: true
    },
    {
      id: 2,
      title: 'Benefits of Panchakarma Treatment',
      slug: 'benefits-panchakarma-treatment',
      author: 'Dr. Michael Chen',
      status: 'draft',
      publishDate: '2024-01-14',
      views: 890,
      category: 'Treatments',
      featured: false
    },
    {
      id: 3,
      title: 'Ayurvedic Diet for Travelers',
      slug: 'ayurvedic-diet-travelers',
      author: 'Dr. Priya Sharma',
      status: 'published',
      publishDate: '2024-01-12',
      views: 2100,
      category: 'Lifestyle',
      featured: true
    },
    {
      id: 4,
      title: 'Stress Management with Ayurveda',
      slug: 'stress-management-ayurveda',
      author: 'Dr. Robert Kumar',
      status: 'scheduled',
      publishDate: '2024-01-20',
      views: 0,
      category: 'Wellness',
      featured: false
    }
  ])

  // Filter articles based on search and status
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || article.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Stats for dashboard
  const stats = [
    { name: 'Total Articles', value: articles.length.toString(), change: '+2 this week', changeType: 'positive', icon: FileText },
    { name: 'Published', value: articles.filter(a => a.status === 'published').length.toString(), change: '85%', changeType: 'positive', icon: Globe },
    { name: 'Draft Articles', value: articles.filter(a => a.status === 'draft').length.toString(), change: '3 pending', changeType: 'neutral', icon: Edit },
    { name: 'Total Views', value: articles.reduce((sum, a) => sum + a.views, 0).toLocaleString(), change: '+15%', changeType: 'positive', icon: TrendingUp },
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
      featured: formData.get('featured') === 'on'
    }

    if (editingArticle) {
      // Update existing article
      const updatedArticles = articles.map(article => 
        article.id === editingArticle.id 
          ? { ...article, ...articleData, slug: articleData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') }
          : article
      )
      setArticles(updatedArticles)
    } else {
      // Create new article
      const newArticle = {
        id: Date.now(), // Simple ID generation for demo
        ...articleData,
        slug: articleData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, ''),
        views: 0,
        createdAt: new Date().toISOString()
      }
      setArticles([newArticle, ...articles])
    }

    setShowCreateModal(false)
    setEditingArticle(null)
  }


  const tableData = filteredArticles.map(article => ({
    ...article,
    views: article.views.toLocaleString(),
    publishDate: new Date(article.publishDate).toLocaleDateString()
  }))

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
          title="Articles Management"
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Articles Content */}
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

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="sm:w-48">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Article
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
                className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingArticle ? 'Edit Article' : 'Create New Article'}
                    </h2>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Article Form */}
                  <form onSubmit={handleSubmitArticle} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Article Title
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
                          Author
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
                          Category
                        </label>
                        <select name="category" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                          <option value="">Select category</option>
                          <option value="Education" selected={editingArticle?.category === 'Education'}>Education</option>
                          <option value="Treatments" selected={editingArticle?.category === 'Treatments'}>Treatments</option>
                          <option value="Lifestyle" selected={editingArticle?.category === 'Lifestyle'}>Lifestyle</option>
                          <option value="Wellness" selected={editingArticle?.category === 'Wellness'}>Wellness</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select name="status" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                          <option value="draft" selected={editingArticle?.status === 'draft'}>Draft</option>
                          <option value="published" selected={editingArticle?.status === 'published'}>Published</option>
                          <option value="scheduled" selected={editingArticle?.status === 'scheduled'}>Scheduled</option>
                          <option value="archived" selected={editingArticle?.status === 'archived'}>Archived</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Publish Date
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
                        Article Content
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

                    <div className="flex items-center space-x-4">
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

                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
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
