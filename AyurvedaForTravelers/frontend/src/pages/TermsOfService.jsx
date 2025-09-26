import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useScroll, useTransform, motion } from 'framer-motion'
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Filter, 
  Leaf, 
  Heart, 
  Zap, 
  Shield, 
  Sun, 
  Moon, 
  Flower, 
  TreePine,
  FileText,
  BookOpen,
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  Scale,
  Lock,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import Footer from '../components/Footer'

export default function TermsOfService() {
  const { t } = useTranslation()
  const { scrollY } = useScroll()
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSection, setSelectedSection] = useState('all')
  const [expandedItems, setExpandedItems] = useState({})

  // Parallax transforms for different elements
  const headerY = useTransform(scrollY, [0, 1000], [0, -100])
  const searchY = useTransform(scrollY, [0, 1000], [0, -120])
  const contentY = useTransform(scrollY, [0, 1000], [0, -150])

  const termsData = [
    {
      section: 'general',
      title: 'General Terms',
      icon: FileText,
      content: [
        {
          id: 1,
          title: 'Acceptance of Terms',
          content: 'By accessing and using AyurvedaForTravelers services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
        },
        {
          id: 2,
          title: 'Service Description',
          content: 'AyurvedaForTravelers provides authentic Ayurvedic treatments, wellness consultations, and holistic healing services in Sri Lanka. Our services include but are not limited to Panchakarma treatments, herbal consultations, yoga therapy, and wellness packages.'
        },
        {
          id: 3,
          title: 'User Eligibility',
          content: 'You must be at least 18 years old to use our services. By using our services, you represent and warrant that you have the legal capacity to enter into this agreement and that you will use our services in accordance with all applicable laws and regulations.'
        }
      ]
    },
    {
      section: 'bookings',
      title: 'Booking & Reservations',
      icon: BookOpen,
      content: [
        {
          id: 4,
          title: 'Reservation Policy',
          content: 'All bookings are subject to availability and confirmation. We recommend booking at least 2-3 weeks in advance, especially during peak season. Bookings can be made online, by phone, or in person at our wellness centers.'
        },
        {
          id: 5,
          title: 'Payment Terms',
          content: 'Payment is required at the time of booking for individual treatments. For wellness packages, a 50% deposit is required at booking, with the balance due upon arrival. We accept major credit cards, bank transfers, and cash payments.'
        },
        {
          id: 6,
          title: 'Cancellation & Refund Policy',
          content: 'Cancellations made 48 hours before your appointment receive a full refund. Cancellations within 24-48 hours receive a 50% refund. Same-day cancellations are non-refundable but can be rescheduled within 30 days. No-shows will be charged the full treatment fee.'
        }
      ]
    },
    {
      section: 'health',
      title: 'Health & Safety',
      icon: Shield,
      content: [
        {
          id: 7,
          title: 'Health Assessment',
          content: 'All clients must complete a comprehensive health assessment before receiving treatments. This includes disclosing any medical conditions, medications, allergies, and pregnancy status. Failure to provide accurate information may result in treatment refusal.'
        },
        {
          id: 8,
          title: 'Treatment Suitability',
          content: 'Our practitioners will assess the suitability of treatments based on your health condition. Some treatments may not be appropriate for certain medical conditions. We reserve the right to modify or refuse treatments for safety reasons.'
        },
        {
          id: 9,
          title: 'Medical Emergency',
          content: 'In case of medical emergency during treatment, we will provide immediate first aid and contact emergency medical services. Clients are responsible for their own medical insurance and emergency medical expenses.'
        }
      ]
    },
    {
      section: 'privacy',
      title: 'Privacy & Data Protection',
      icon: Lock,
      content: [
        {
          id: 10,
          title: 'Personal Information',
          content: 'We collect and process personal information necessary to provide our services, including health information, contact details, and treatment history. All information is handled in accordance with our Privacy Policy and applicable data protection laws.'
        },
        {
          id: 11,
          title: 'Health Records',
          content: 'Your health records and treatment history are maintained securely and confidentially. Access is restricted to authorized personnel only. Records may be shared with your healthcare provider with your explicit consent.'
        },
        {
          id: 12,
          title: 'Marketing Communications',
          content: 'With your consent, we may send you information about our services, wellness tips, and special offers. You can opt out of marketing communications at any time by contacting us or using the unsubscribe link in our emails.'
        }
      ]
    },
    {
      section: 'liability',
      title: 'Liability & Disclaimers',
      icon: Scale,
      content: [
        {
          id: 13,
          title: 'Service Limitations',
          content: 'While we strive to provide the highest quality Ayurvedic treatments, we cannot guarantee specific health outcomes. Ayurvedic treatments are complementary to conventional medicine and should not replace professional medical advice or treatment.'
        },
        {
          id: 14,
          title: 'Limitation of Liability',
          content: 'Our liability is limited to the cost of the treatment received. We are not liable for any indirect, incidental, or consequential damages arising from the use of our services. This limitation applies to the fullest extent permitted by law.'
        },
        {
          id: 15,
          title: 'Force Majeure',
          content: 'We are not liable for any failure to perform our obligations due to circumstances beyond our reasonable control, including but not limited to natural disasters, government actions, or other force majeure events.'
        }
      ]
    },
    {
      section: 'conduct',
      title: 'Code of Conduct',
      icon: Users,
      content: [
        {
          id: 16,
          title: 'Respectful Behavior',
          content: 'All clients are expected to treat our staff and other clients with respect and courtesy. Any form of harassment, discrimination, or inappropriate behavior will result in immediate termination of services without refund.'
        },
        {
          id: 17,
          title: 'Facility Rules',
          content: 'Clients must follow all facility rules and guidelines, including proper hygiene practices, appropriate attire, and maintaining a peaceful environment. Smoking and alcohol consumption are prohibited on our premises.'
        },
        {
          id: 18,
          title: 'Property Damage',
          content: 'Clients are responsible for any damage to our property or equipment caused by negligence or misuse. Repair or replacement costs will be charged to the client at our discretion.'
        }
      ]
    }
  ]

  const sections = [
    { id: 'all', name: 'All Sections', icon: FileText },
    { id: 'general', name: 'General Terms', icon: FileText },
    { id: 'bookings', name: 'Booking & Reservations', icon: BookOpen },
    { id: 'health', name: 'Health & Safety', icon: Shield },
    { id: 'privacy', name: 'Privacy & Data Protection', icon: Lock },
    { id: 'liability', name: 'Liability & Disclaimers', icon: Scale },
    { id: 'conduct', name: 'Code of Conduct', icon: Users }
  ]

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    // Simulate API call with Ayurvedic loading
    setTimeout(() => {
      setLoading(false)
    }, 3000) // 3 seconds for Ayurvedic loading
  }, [])

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const filteredTerms = termsData.filter(section => {
    if (selectedSection !== 'all' && section.section !== selectedSection) {
      return false
    }
    
    if (searchTerm) {
      const hasMatchingContent = section.content.some(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
      return hasMatchingContent
    }
    
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen overflow-x-hidden relative">
        {/* Fixed Background Image */}
        <div 
          className="fixed inset-0 w-full h-full z-0"
          style={{
            backgroundImage: "url('/images/untitled-design.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Loading Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            {/* Ayurvedic Loading Animation */}
            <div className="relative mb-8">
              {/* Rotating Mandala */}
              <motion.div
                className="w-24 h-24 mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full border-4 border-[var(--ayurveda-green)]/30 rounded-full relative">
                  <div className="absolute inset-2 border-2 border-[var(--ayurveda-sage)]/50 rounded-full"></div>
                  <div className="absolute inset-4 border border-[var(--ayurveda-earth)]/70 rounded-full"></div>
                </div>
              </motion.div>
              
              {/* Pulsing Center */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--ayurveda-green)] rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Floating Ayurvedic Icons */}
              <motion.div
                className="absolute -top-2 -left-2"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                <Leaf className="h-6 w-6 text-[var(--ayurveda-green)]" />
              </motion.div>
              
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Heart className="h-6 w-6 text-[var(--ayurveda-earth)]" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -left-2"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Flower className="h-6 w-6 text-[var(--ayurveda-sage)]" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -right-2"
                animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                <Sun className="h-6 w-6 text-[var(--ayurveda-gold)]" />
              </motion.div>
            </div>
            
            {/* Loading Text */}
            <motion.h2
              className="text-2xl font-bold text-[var(--ayurveda-green)] mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Preparing Legal Terms...
            </motion.h2>
            
            {/* Progress Dots */}
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 bg-[var(--ayurveda-green)] rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: index * 0.2 
                  }}
                />
              ))}
            </div>
            
            {/* Ayurvedic Quote */}
            <motion.p
              className="text-[var(--ayurveda-green)]/70 mt-6 max-w-md mx-auto text-sm italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              "Trust and transparency are the foundation of healing"
            </motion.p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/images/untitled-design.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Content with Parallax Effects */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 bg-transparent">
          {/* Header */}
          <motion.div 
            className="text-center mb-8 bg-transparent"
            style={{ y: headerY }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--ayurveda-green)] mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-[var(--ayurveda-green)]/70 max-w-2xl mx-auto">
              Please read these terms carefully before using our Ayurvedic wellness services
            </p>
          </motion.div>

          {/* Animated Ayurvedic Icons Section */}
          <div className="relative overflow-hidden mb-8 h-24">
            <div className="absolute inset-0 flex items-center">
              {/* First set of icons */}
              <div className="flex items-center space-x-8 animate-scroll-left">
                <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                  <Leaf className="h-8 w-8" />
                  <span className="text-sm font-medium">Natural Healing</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-earth)]/80">
                  <Heart className="h-8 w-8" />
                  <span className="text-sm font-medium">Holistic Wellness</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-sage)]/80">
                  <Zap className="h-8 w-8" />
                  <span className="text-sm font-medium">Energy Balance</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-gold)]/80">
                  <Shield className="h-8 w-8" />
                  <span className="text-sm font-medium">Immune Support</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                  <Sun className="h-8 w-8" />
                  <span className="text-sm font-medium">Vitality</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-sage)]/80">
                  <Moon className="h-8 w-8" />
                  <span className="text-sm font-medium">Peace & Calm</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-earth)]/80">
                  <Flower className="h-8 w-8" />
                  <span className="text-sm font-medium">Herbal Therapy</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                  <TreePine className="h-8 w-8" />
                  <span className="text-sm font-medium">Ancient Wisdom</span>
                </div>
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex items-center space-x-8 animate-scroll-left">
                <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                  <Leaf className="h-8 w-8" />
                  <span className="text-sm font-medium">Natural Healing</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-earth)]/80">
                  <Heart className="h-8 w-8" />
                  <span className="text-sm font-medium">Holistic Wellness</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-sage)]/80">
                  <Zap className="h-8 w-8" />
                  <span className="text-sm font-medium">Energy Balance</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-gold)]/80">
                  <Shield className="h-8 w-8" />
                  <span className="text-sm font-medium">Immune Support</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                  <Sun className="h-8 w-8" />
                  <span className="text-sm font-medium">Vitality</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-sage)]/80">
                  <Moon className="h-8 w-8" />
                  <span className="text-sm font-medium">Peace & Calm</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-earth)]/80">
                  <Flower className="h-8 w-8" />
                  <span className="text-sm font-medium">Herbal Therapy</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                  <TreePine className="h-8 w-8" />
                  <span className="text-sm font-medium">Ancient Wisdom</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <motion.div 
            className="p-6 mb-8 bg-transparent"
            style={{ y: searchY }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--ayurveda-green)]/60" />
                <input
                  type="text"
                  placeholder="Search terms..."
                  className="w-full pl-10 pr-4 py-2 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)] placeholder-[var(--ayurveda-green)]/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Section Filter */}
              <select
                className="w-full px-3 py-2 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)]"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                {sections.map(section => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Terms Sections */}
          <motion.div 
            className="space-y-8 mb-8 bg-transparent"
            style={{ y: contentY }}
          >
            {filteredTerms.map((section, sectionIndex) => (
              <motion.div
                key={section.section}
                className="bg-transparent rounded-xl overflow-hidden border border-[var(--ayurveda-green)]/20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Section Header */}
                <div className="p-6 border-b border-[var(--ayurveda-green)]/10">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-[var(--ayurveda-green)]">
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Terms Content */}
                <div className="p-6 space-y-4">
                  {section.content.map((term, termIndex) => (
                    <motion.div
                      key={term.id}
                      className="bg-[var(--ayurveda-cream)]/30 rounded-lg overflow-hidden"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: termIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <button
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-[var(--ayurveda-green)]/5 transition-colors"
                        onClick={() => toggleExpanded(term.id)}
                      >
                        <h3 className="text-lg font-medium text-[var(--ayurveda-green)] pr-4">
                          {term.title}
                        </h3>
                        {expandedItems[term.id] ? (
                          <ChevronUp className="h-5 w-5 text-[var(--ayurveda-green)] flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-[var(--ayurveda-green)] flex-shrink-0" />
                        )}
                      </button>
                      
                      {expandedItems[term.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4"
                        >
                          <p className="text-[var(--ayurveda-green)]/70 leading-relaxed">
                            {term.content}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Section */}
          <motion.div 
            className="glass-card p-8 rounded-2xl text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-semibold text-[var(--ayurveda-green)] mb-4">
              Questions About Our Terms?
            </h3>
            <p className="text-[var(--ayurveda-green)]/70 mb-6 max-w-2xl mx-auto">
              If you have any questions about these terms of service or need clarification 
              on any policies, please don't hesitate to contact our legal team.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-3 text-[var(--ayurveda-green)]/70">
                <Phone className="h-5 w-5" />
                <span>+94 11 123 4567</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-[var(--ayurveda-green)]/70">
                <Mail className="h-5 w-5" />
                <span>legal@ayurvedafortravelers.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-[var(--ayurveda-green)]/70">
                <MapPin className="h-5 w-5" />
                <span>Colombo, Sri Lanka</span>
              </div>
            </div>
          </motion.div>

          {/* Last Updated */}
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-[var(--ayurveda-green)]/60 text-sm">
              Last updated: January 15, 2024
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
