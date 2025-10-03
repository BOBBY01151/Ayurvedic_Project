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
  Users,
  Shield,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  UserPlus,
  UserCheck,
  UserX,
  X
} from 'lucide-react'
import { AdminCard, AdminTable, AdminSidebar, AdminHeader } from '../components/admin'

export default function AdminUsers() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  // Mock data for users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-0123',
      role: 'customer',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2024-01-20',
      totalBookings: 3,
      totalSpent: 450,
      location: 'New York, USA',
      avatar: null
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@ayurvedic.com',
      phone: '+1-555-0456',
      role: 'therapist',
      status: 'active',
      joinDate: '2024-01-10',
      lastLogin: '2024-01-20',
      totalBookings: 0,
      totalSpent: 0,
      location: 'Los Angeles, USA',
      avatar: null
    },
    {
      id: 3,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1-555-0789',
      role: 'customer',
      status: 'inactive',
      joinDate: '2024-01-05',
      lastLogin: '2024-01-10',
      totalBookings: 1,
      totalSpent: 120,
      location: 'Chicago, USA',
      avatar: null
    },
    {
      id: 4,
      name: 'Admin User',
      email: 'admin@ayurvedic.com',
      phone: '+1-555-0000',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-01',
      lastLogin: '2024-01-20',
      totalBookings: 0,
      totalSpent: 0,
      location: 'San Francisco, USA',
      avatar: null
    },
    {
      id: 5,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1-555-0321',
      role: 'customer',
      status: 'active',
      joinDate: '2024-01-18',
      lastLogin: '2024-01-19',
      totalBookings: 2,
      totalSpent: 280,
      location: 'Miami, USA',
      avatar: null
    }
  ])

  // Filter users based on search, role, and status
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  // Stats for dashboard
  const stats = [
    { name: 'Total Users', value: users.length.toString(), change: '+5 this week', changeType: 'positive', icon: Users },
    { name: 'Active Users', value: users.filter(u => u.status === 'active').length.toString(), change: '85%', changeType: 'positive', icon: UserCheck },
    { name: 'Customers', value: users.filter(u => u.role === 'customer').length.toString(), change: '70%', changeType: 'positive', icon: User },
    { name: 'Therapists', value: users.filter(u => u.role === 'therapist').length.toString(), change: '3 active', changeType: 'neutral', icon: Shield },
  ]

  const tableColumns = [
    { key: 'avatar', title: 'User' },
    { key: 'email', title: 'Email' },
    { key: 'role', title: 'Role' },
    { key: 'status', title: 'Status' },
    { key: 'joinDate', title: 'Join Date' },
    { key: 'totalBookings', title: 'Bookings' },
    { key: 'totalSpent', title: 'Total Spent' }
  ]

  const handleView = (user) => {
    console.log('View user:', user)
    // Navigate to user profile view
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setShowCreateModal(true)
  }

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete "${user.name}"?`)) {
      setUsers(users.filter(u => u.id !== user.id))
    }
  }

  const handleCreateNew = () => {
    setEditingUser(null)
    setShowCreateModal(true)
  }

  const handleSubmitUser = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      role: formData.get('role'),
      status: formData.get('status'),
      location: formData.get('location')
    }

    if (editingUser) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...userData }
          : user
      )
      setUsers(updatedUsers)
    } else {
      // Create new user
      const newUser = {
        id: Date.now(), // Simple ID generation for demo
        ...userData,
        joinDate: new Date().toISOString().split('T')[0],
        lastLogin: null,
        totalBookings: 0,
        totalSpent: 0,
        avatar: null
      }
      setUsers([newUser, ...users])
    }

    setShowCreateModal(false)
    setEditingUser(null)
  }

  const tableData = filteredUsers.map(user => ({
    ...user,
    joinDate: new Date(user.joinDate).toLocaleDateString(),
    totalSpent: `$${user.totalSpent}`
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
          title="Users Management"
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Users Content */}
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
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Role Filter */}
              <div className="sm:w-48">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Roles</option>
                  <option value="customer">Customer</option>
                  <option value="therapist">Therapist</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="sm:w-48">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              {/* Create User Button */}
              <button
                onClick={handleCreateNew}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </button>
            </div>
          </div>

          {/* Users Table */}
          <AdminTable
            title={`Users (${filteredUsers.length})`}
            data={tableData}
            columns={tableColumns}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            actions={[
              {
                icon: <Plus className="h-4 w-4" />,
                title: "Add New User",
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
                className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingUser ? 'Edit User' : 'Add New User'}
                    </h2>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {/* User Form */}
                  <form onSubmit={handleSubmitUser} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter full name"
                          defaultValue={editingUser?.name || ''}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter email address"
                          defaultValue={editingUser?.email || ''}
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
                          defaultValue={editingUser?.phone || ''}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter location"
                          defaultValue={editingUser?.location || ''}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Role
                        </label>
                        <select name="role" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                          <option value="">Select role</option>
                          <option value="customer" selected={editingUser?.role === 'customer'}>Customer</option>
                          <option value="therapist" selected={editingUser?.role === 'therapist'}>Therapist</option>
                          <option value="admin" selected={editingUser?.role === 'admin'}>Admin</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select name="status" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                          <option value="active" selected={editingUser?.status === 'active'}>Active</option>
                          <option value="inactive" selected={editingUser?.status === 'inactive'}>Inactive</option>
                          <option value="suspended" selected={editingUser?.status === 'suspended'}>Suspended</option>
                        </select>
                      </div>
                    </div>

                    {!editingUser && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter password"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Confirm password"
                            required
                          />
                        </div>
                      </div>
                    )}

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
                        {editingUser ? 'Update User' : 'Create User'}
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
