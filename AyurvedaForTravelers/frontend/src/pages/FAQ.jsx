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
  HelpCircle,
  BookOpen,
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star
} from 'lucide-react'
import Footer from '../components/Footer'

export default function FAQ() {
  const { t } = useTranslation()
  const { scrollY } = useScroll()
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedItems, setExpandedItems] = useState({})

  // Parallax transforms for different elements
  const headerY = useTransform(scrollY, [0, 1000], [0, -100])
  const searchY = useTransform(scrollY, [0, 1000], [0, -120])
  const faqY = useTransform(scrollY, [0, 1000], [0, -150])

  const faqData = [
    {
      category: 'general',
      title: 'General Information',
      icon: HelpCircle,
      questions: [
        {
          id: 1,
          question: 'What is Ayurveda and how does it work?',
          answer: 'Ayurveda is a 5,000-year-old holistic healing system from India that focuses on balancing the body, mind, and spirit. It uses natural herbs, diet, lifestyle modifications, and therapeutic treatments to restore health and prevent disease. Ayurveda identifies three doshas (Vata, Pitta, Kapha) and works to balance them for optimal wellness.'
        },
        {
          id: 2,
          question: 'How long has AyurvedaForTravelers been operating?',
          answer: 'We have been providing authentic Ayurvedic treatments in Sri Lanka for over 15 years. Our experienced practitioners and therapists have helped thousands of travelers and locals achieve better health and wellness through traditional Ayurvedic methods.'
        },
        {
          id: 3,
          question: 'Do I need to have any prior knowledge of Ayurveda?',
          answer: 'Not at all! Our team will guide you through every step of your wellness journey. We provide comprehensive consultations and explain all treatments in detail. Whether you\'re new to Ayurveda or have experience, we tailor our approach to your needs and understanding.'
        }
      ]
    },
    {
      category: 'treatments',
      title: 'Treatments & Services',
      icon: BookOpen,
      questions: [
        {
          id: 4,
          question: 'What types of Ayurvedic treatments do you offer?',
          answer: 'We offer a comprehensive range of treatments including Panchakarma (detoxification), Abhyanga (oil massage), Shirodhara (oil therapy), Udvartana (herbal powder massage), Nasya (nasal therapy), Basti (medicated enema), Marma therapy, and various herbal treatments. Each treatment is customized based on your individual constitution and health needs.'
        },
        {
          id: 5,
          question: 'How long do treatments typically take?',
          answer: 'Treatment duration varies depending on the type of therapy. Individual treatments range from 30 minutes to 2 hours. Complete wellness packages can span from 3 days to 3 weeks. During your consultation, we\'ll create a personalized treatment plan with specific timelines based on your health goals.'
        },
        {
          id: 6,
          question: 'Are the treatments safe for everyone?',
          answer: 'Our treatments are generally safe for most people. However, we conduct thorough health assessments before any treatment. Some treatments may not be suitable for pregnant women, people with certain medical conditions, or those taking specific medications. We always consult with your healthcare provider when necessary.'
        }
      ]
    },
    {
      category: 'booking',
      title: 'Booking & Reservations',
      icon: Users,
      questions: [
        {
          id: 7,
          question: 'How far in advance should I book my treatments?',
          answer: 'We recommend booking at least 2-3 weeks in advance, especially during peak season (December to March). For comprehensive wellness packages, we suggest booking 4-6 weeks ahead. However, we can often accommodate last-minute bookings based on availability.'
        },
        {
          id: 8,
          question: 'What is your cancellation policy?',
          answer: 'We offer flexible cancellation policies. Cancellations made 48 hours before your appointment receive a full refund. Cancellations within 24-48 hours receive a 50% refund. Same-day cancellations are non-refundable but can be rescheduled within 30 days.'
        },
        {
          id: 9,
          question: 'Do you offer group bookings or packages?',
          answer: 'Yes! We offer special group rates for 3 or more people and comprehensive wellness packages that combine multiple treatments. Our packages include accommodation, meals, and transportation. Contact us for custom group arrangements and special pricing.'
        }
      ]
    },
    {
      category: 'practical',
      title: 'Practical Information',
      icon: Clock,
      questions: [
        {
          id: 10,
          question: 'What should I bring to my treatment?',
          answer: 'We provide all necessary materials including oils, herbs, and equipment. We recommend bringing comfortable, loose-fitting clothing, a change of clothes, and any personal items you might need. Avoid wearing jewelry or valuable items during treatments.'
        },
        {
          id: 11,
          question: 'What are your operating hours?',
          answer: 'We are open Monday to Saturday from 8:00 AM to 6:00 PM, and Sunday from 9:00 AM to 4:00 PM. Emergency consultations are available 24/7 for existing patients. We recommend scheduling appointments during our regular hours for the best experience.'
        },
        {
          id: 12,
          question: 'Do you provide transportation services?',
          answer: 'Yes, we offer complimentary pick-up and drop-off services for guests staying in Colombo and nearby areas. For locations further away, we can arrange transportation for a nominal fee. Please inform us of your accommodation details when booking.'
        }
      ]
    }
  ]

  const categories = [
    { id: 'all', name: 'All Categories', icon: HelpCircle },
    { id: 'general', name: 'General Information', icon: HelpCircle },
    { id: 'treatments', name: 'Treatments & Services', icon: BookOpen },
    { id: 'booking', name: 'Booking & Reservations', icon: Users },
    { id: 'practical', name: 'Practical Information', icon: Clock }
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

  const toggleExpanded = (questionId) => {
    setExpandedItems(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }))
  }

  const filteredFAQs = faqData.filter(category => {
    if (selectedCategory !== 'all' && category.category !== selectedCategory) {
      return false
    }
    
    if (searchTerm) {
      const hasMatchingQuestion = category.questions.some(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
      return hasMatchingQuestion
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
              Preparing Your Answers...
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
              "Knowledge is the foundation of healing"
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
              {t('faq.title')}
            </h1>
            <p className="text-xl text-[var(--ayurveda-green)]/70 max-w-2xl mx-auto">
              Find answers to common questions about Ayurvedic treatments and our wellness services
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
                  placeholder="Search FAQs..."
                  className="w-full pl-10 pr-4 py-2 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)] placeholder-[var(--ayurveda-green)]/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <select
                className="w-full px-3 py-2 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)]"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* FAQ Categories */}
          <motion.div 
            className="space-y-8 mb-8 bg-transparent"
            style={{ y: faqY }}
          >
            {filteredFAQs.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                className="bg-transparent rounded-xl overflow-hidden border border-[var(--ayurveda-green)]/20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Category Header */}
                <div className="p-6 border-b border-[var(--ayurveda-green)]/10">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-[var(--ayurveda-green)]">
                      {category.title}
                    </h2>
                  </div>
                </div>

                {/* Questions */}
                <div className="p-6 space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <motion.div
                      key={faq.id}
                      className="bg-[var(--ayurveda-cream)]/30 rounded-lg overflow-hidden"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: faqIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <button
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-[var(--ayurveda-green)]/5 transition-colors"
                        onClick={() => toggleExpanded(faq.id)}
                      >
                        <h3 className="text-lg font-medium text-[var(--ayurveda-green)] pr-4">
                          {faq.question}
                        </h3>
                        {expandedItems[faq.id] ? (
                          <ChevronUp className="h-5 w-5 text-[var(--ayurveda-green)] flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-[var(--ayurveda-green)] flex-shrink-0" />
                        )}
                      </button>
                      
                      {expandedItems[faq.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4"
                        >
                          <p className="text-[var(--ayurveda-green)]/70 leading-relaxed">
                            {faq.answer}
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
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-semibold text-[var(--ayurveda-green)] mb-4">
              Still Have Questions?
            </h3>
            <p className="text-[var(--ayurveda-green)]/70 mb-6 max-w-2xl mx-auto">
              Our wellness experts are here to help you on your healing journey. 
              Contact us for personalized guidance and support.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-3 text-[var(--ayurveda-green)]/70">
                <Phone className="h-5 w-5" />
                <span>+94 11 123 4567</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-[var(--ayurveda-green)]/70">
                <Mail className="h-5 w-5" />
                <span>info@ayurvedafortravelers.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-[var(--ayurveda-green)]/70">
                <MapPin className="h-5 w-5" />
                <span>Colombo, Sri Lanka</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
