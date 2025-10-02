import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Calendar, DollarSign, Users, Clock, Plus, Filter, Download } from 'lucide-react'
import { AdminCard, AdminTable, AdminSidebar, AdminHeader, AdminForm } from '../components/admin'

export default function AdminBookings() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingBooking, setEditingBooking] = useState(null)

  // Mock data
  const stats = [
    { name: 'Total Bookings', value: '1,234', change: '+12%', changeType: 'positive', icon: Calendar },
    { name: 'Revenue', value: '$45,678', change: '+8%', changeType: 'positive', icon: DollarSign },
    { name: 'Active Users', value: '892', change: '+5%', changeType: 'positive', icon: Users },
    { name: 'Avg. Duration', value: '2.5 hrs', change: '+3%', changeType: 'positive', icon: Clock },
  ]

  const bookings = [
    { id: 1, customer: 'John Doe', treatment: 'Ayurvedic Massage', date: '2024-01-15', time: '10:00 AM', status: 'confirmed', amount: '$120', therapist: 'Dr. Smith' },
    { id: 2, customer: 'Jane Smith', treatment: 'Panchakarma', date: '2024-01-14', time: '2:00 PM', status: 'pending', amount: '$350', therapist: 'Dr. Johnson' },
    { id: 3, customer: 'Mike Johnson', treatment: 'Herbal Therapy', date: '2024-01-13', time: '11:30 AM', status: 'completed', amount: '$85', therapist: 'Dr. Brown' },
    { id: 4, customer: 'Sarah Wilson', treatment: 'Yoga Session', date: '2024-01-12', time: '9:00 AM', status: 'confirmed', amount: '$60', therapist: 'Dr. Davis' },
    { id: 5, customer: 'Robert Lee', treatment: 'Meditation', date: '2024-01-11', time: '3:00 PM', status: 'cancelled', amount: '$40', therapist: 'Dr. Wilson' },
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

  const formFields = [
    { name: 'customer', label: 'Customer Name', type: 'text', required: true, placeholder: 'Enter customer name' },
    { name: 'treatment', label: 'Treatment', type: 'select', required: true, options: [
      { value: 'massage', label: 'Ayurvedic Massage' },
      { value: 'panchakarma', label: 'Panchakarma' },
      { value: 'herbal', label: 'Herbal Therapy' },
      { value: 'yoga', label: 'Yoga Session' },
      { value: 'meditation', label: 'Meditation' }
    ]},
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'time', label: 'Time', type: 'time', required: true },
    { name: 'therapist', label: 'Therapist', type: 'select', required: true, options: [
      { value: 'smith', label: 'Dr. Smith' },
      { value: 'johnson', label: 'Dr. Johnson' },
      { value: 'brown', label: 'Dr. Brown' },
      { value: 'davis', label: 'Dr. Davis' },
      { value: 'wilson', label: 'Dr. Wilson' }
    ]},
    { name: 'amount', label: 'Amount', type: 'number', required: true, placeholder: 'Enter amount' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [
      { value: 'pending', label: 'Pending' },
      { value: 'confirmed', label: 'Confirmed' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' }
    ]},
    { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Additional notes...', fullWidth: true }
  ]

  const handleView = (item) => {
    console.log('View booking:', item)
  }

  const handleEdit = (item) => {
    setEditingBooking(item)
    setShowForm(true)
  }

  const handleDelete = (item) => {
    console.log('Delete booking:', item)
  }

  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data)
    setShowForm(false)
    setEditingBooking(null)
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingBooking(null)
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
          title="Bookings Management"
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

          {/* Action Buttons */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Booking
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Bookings Table */}
          <AdminTable
            title="All Bookings"
            data={bookings}
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
                    title={editingBooking ? 'Edit Booking' : 'New Booking'}
                    fields={formFields}
                    initialData={editingBooking || {}}
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
