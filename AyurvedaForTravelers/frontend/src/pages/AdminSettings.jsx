import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Settings,
  Globe,
  DollarSign,
  Bell,
  Shield,
  Database,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  Mail,
  Phone,
  MapPin,
  Clock,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Download,
  Trash2,
  Plus,
  X
} from 'lucide-react'
import { AdminCard, AdminSidebar, AdminHeader } from '../components/admin'

export default function AdminSettings() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Ayurveda for Travelers',
      siteDescription: 'Your gateway to authentic Ayurvedic wellness experiences',
      contactEmail: 'info@ayurvedafortravelers.com',
      contactPhone: '+1-555-0123',
      address: '123 Wellness Street, Colombo, Sri Lanka',
      timezone: 'Asia/Colombo',
      language: 'en',
      currency: 'USD'
    },
    business: {
      defaultCurrency: 'USD',
      bookingAdvanceDays: 7,
      cancellationPolicy: '24 hours',
      maxBookingDays: 30,
      autoConfirmBookings: true,
      requireDeposit: true,
      depositPercentage: 20
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      bookingConfirmation: true,
      paymentReminders: true,
      cancellationAlerts: true,
      newsletterSubscriptions: true,
      adminNotifications: true
    },
    system: {
      maintenanceMode: false,
      allowRegistration: true,
      requireEmailVerification: true,
      sessionTimeout: 60,
      maxLoginAttempts: 5,
      enableTwoFactor: false,
      backupFrequency: 'daily',
      logRetentionDays: 30
    },
    integrations: {
      googleAnalytics: '',
      facebookPixel: '',
      stripePublicKey: '',
      stripeSecretKey: '',
      smsProvider: 'twilio',
      emailProvider: 'sendgrid'
    }
  })

  const [formData, setFormData] = useState(settings)

  const settingTabs = [
    { id: 'general', name: 'General', icon: Globe, description: 'Basic site information' },
    { id: 'business', name: 'Business', icon: DollarSign, description: 'Pricing and policies' },
    { id: 'notifications', name: 'Notifications', icon: Bell, description: 'Email and SMS settings' },
    { id: 'system', name: 'System', icon: Shield, description: 'Security and maintenance' },
    { id: 'integrations', name: 'Integrations', icon: Settings, description: 'Third-party services' }
  ]

  const handleInputChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }))
  }

  const handleSaveSettings = async (category) => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSettings(prev => ({
        ...prev,
        [category]: formData[category]
      }))
      
      console.log(`${category} settings saved successfully`)
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleSaveAll = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSettings(formData)
      console.log('All settings saved successfully')
    } catch (error) {
      console.error('Error saving all settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleReset = (category) => {
    setFormData(prev => ({
      ...prev,
      [category]: settings[category]
    }))
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Name
          </label>
          <input
            type="text"
            value={formData.general.siteName}
            onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email
          </label>
          <input
            type="email"
            value={formData.general.contactEmail}
            onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site Description
        </label>
        <textarea
          rows={3}
          value={formData.general.siteDescription}
          onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone
          </label>
          <input
            type="tel"
            value={formData.general.contactPhone}
            onChange={(e) => handleInputChange('general', 'contactPhone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={formData.general.timezone}
            onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Asia/Colombo">Asia/Colombo</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Europe/London">Europe/London</option>
            <option value="Asia/Tokyo">Asia/Tokyo</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address
        </label>
        <textarea
          rows={2}
          value={formData.general.address}
          onChange={(e) => handleInputChange('general', 'address', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  )

  const renderBusinessSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Currency
          </label>
          <select
            value={formData.business.defaultCurrency}
            onChange={(e) => handleInputChange('business', 'defaultCurrency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="LKR">LKR (රු)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Booking Advance Days
          </label>
          <input
            type="number"
            min="1"
            max="365"
            value={formData.business.bookingAdvanceDays}
            onChange={(e) => handleInputChange('business', 'bookingAdvanceDays', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cancellation Policy (hours)
          </label>
          <input
            type="number"
            min="1"
            max="168"
            value={formData.business.cancellationPolicy.replace(' hours', '')}
            onChange={(e) => handleInputChange('business', 'cancellationPolicy', `${e.target.value} hours`)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Booking Days
          </label>
          <input
            type="number"
            min="1"
            max="365"
            value={formData.business.maxBookingDays}
            onChange={(e) => handleInputChange('business', 'maxBookingDays', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.business.autoConfirmBookings}
            onChange={(e) => handleInputChange('business', 'autoConfirmBookings', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Auto-confirm bookings</label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.business.requireDeposit}
            onChange={(e) => handleInputChange('business', 'requireDeposit', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Require deposit for bookings</label>
        </div>

        {formData.business.requireDeposit && (
          <div className="ml-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deposit Percentage
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={formData.business.depositPercentage}
              onChange={(e) => handleInputChange('business', 'depositPercentage', parseInt(e.target.value))}
              className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="ml-2 text-sm text-gray-500">%</span>
          </div>
        )}
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700">Enable email notifications</label>
            <input
              type="checkbox"
              checked={formData.notifications.emailNotifications}
              onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700">Booking confirmations</label>
            <input
              type="checkbox"
              checked={formData.notifications.bookingConfirmation}
              onChange={(e) => handleInputChange('notifications', 'bookingConfirmation', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700">Payment reminders</label>
            <input
              type="checkbox"
              checked={formData.notifications.paymentReminders}
              onChange={(e) => handleInputChange('notifications', 'paymentReminders', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700">Cancellation alerts</label>
            <input
              type="checkbox"
              checked={formData.notifications.cancellationAlerts}
              onChange={(e) => handleInputChange('notifications', 'cancellationAlerts', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">SMS Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700">Enable SMS notifications</label>
            <input
              type="checkbox"
              checked={formData.notifications.smsNotifications}
              onChange={(e) => handleInputChange('notifications', 'smsNotifications', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Marketing</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700">Newsletter subscriptions</label>
            <input
              type="checkbox"
              checked={formData.notifications.newsletterSubscriptions}
              onChange={(e) => handleInputChange('notifications', 'newsletterSubscriptions', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700">Admin notifications</label>
            <input
              type="checkbox"
              checked={formData.notifications.adminNotifications}
              onChange={(e) => handleInputChange('notifications', 'adminNotifications', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
          <h3 className="text-sm font-medium text-yellow-800">Maintenance Mode</h3>
        </div>
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-yellow-700">Enable maintenance mode (site will be unavailable to users)</p>
            <input
              type="checkbox"
              checked={formData.system.maintenanceMode}
              onChange={(e) => handleInputChange('system', 'maintenanceMode', e.target.checked)}
              className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">User Registration</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700">Allow user registration</label>
            <input
              type="checkbox"
              checked={formData.system.allowRegistration}
              onChange={(e) => handleInputChange('system', 'allowRegistration', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-700">Require email verification</label>
            <input
              type="checkbox"
              checked={formData.system.requireEmailVerification}
              onChange={(e) => handleInputChange('system', 'requireEmailVerification', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Security</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              min="5"
              max="480"
              value={formData.system.sessionTimeout}
              onChange={(e) => handleInputChange('system', 'sessionTimeout', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Login Attempts
            </label>
            <input
              type="number"
              min="3"
              max="10"
              value={formData.system.maxLoginAttempts}
              onChange={(e) => handleInputChange('system', 'maxLoginAttempts', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.system.enableTwoFactor}
            onChange={(e) => handleInputChange('system', 'enableTwoFactor', e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Enable Two-Factor Authentication</label>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Data Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Backup Frequency
            </label>
            <select
              value={formData.system.backupFrequency}
              onChange={(e) => handleInputChange('system', 'backupFrequency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Log Retention (days)
            </label>
            <input
              type="number"
              min="7"
              max="365"
              value={formData.system.logRetentionDays}
              onChange={(e) => handleInputChange('system', 'logRetentionDays', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Google Analytics ID
          </label>
          <input
            type="text"
            value={formData.integrations.googleAnalytics}
            onChange={(e) => handleInputChange('integrations', 'googleAnalytics', e.target.value)}
            placeholder="G-XXXXXXXXXX"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Facebook Pixel ID
          </label>
          <input
            type="text"
            value={formData.integrations.facebookPixel}
            onChange={(e) => handleInputChange('integrations', 'facebookPixel', e.target.value)}
            placeholder="1234567890123456"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Payment Gateway</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stripe Public Key
          </label>
          <input
            type="text"
            value={formData.integrations.stripePublicKey}
            onChange={(e) => handleInputChange('integrations', 'stripePublicKey', e.target.value)}
            placeholder="pk_test_..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stripe Secret Key
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.integrations.stripeSecretKey}
              onChange={(e) => handleInputChange('integrations', 'stripeSecretKey', e.target.value)}
              placeholder="sk_test_..."
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Communication Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMS Provider
            </label>
            <select
              value={formData.integrations.smsProvider}
              onChange={(e) => handleInputChange('integrations', 'smsProvider', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="twilio">Twilio</option>
              <option value="aws-sns">AWS SNS</option>
              <option value="sendgrid">SendGrid</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Provider
            </label>
            <select
              value={formData.integrations.emailProvider}
              onChange={(e) => handleInputChange('integrations', 'emailProvider', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="sendgrid">SendGrid</option>
              <option value="aws-ses">AWS SES</option>
              <option value="mailgun">Mailgun</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings()
      case 'business':
        return renderBusinessSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'system':
        return renderSystemSettings()
      case 'integrations':
        return renderIntegrationSettings()
      default:
        return renderGeneralSettings()
    }
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
          title="Settings"
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Settings Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
                <nav className="space-y-2">
                  {settingTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <tab.icon className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div>{tab.name}</div>
                        <div className="text-xs text-gray-500">{tab.description}</div>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {settingTabs.find(tab => tab.id === activeTab)?.name} Settings
                      </h3>
                      <p className="text-sm text-gray-500">
                        {settingTabs.find(tab => tab.id === activeTab)?.description}
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleReset(activeTab)}
                        className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => handleSaveSettings(activeTab)}
                        disabled={saving}
                        className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 flex items-center"
                      >
                        {saving ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {renderActiveTab()}
                </div>
              </div>

              {/* Save All Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSaveAll}
                  disabled={saving}
                  className="px-6 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors duration-200 flex items-center"
                >
                  {saving ? (
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-5 w-5 mr-2" />
                  )}
                  Save All Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
