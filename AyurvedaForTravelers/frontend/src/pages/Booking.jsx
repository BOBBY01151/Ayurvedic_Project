import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Calendar, Clock, User, Phone, Mail, MapPin, Leaf, Heart, Sun, Flower, CheckCircle, Star } from 'lucide-react'
import Footer from '../components/Footer'

export default function Booking() {
  const { t } = useTranslation()
  const { scrollY } = useScroll()
  const [pageLoading, setPageLoading] = useState(true)
  const [selectedTreatment, setSelectedTreatment] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })

  // Parallax transforms for different elements
  const headerY = useTransform(scrollY, [0, 1000], [0, -100])
  const bookingY = useTransform(scrollY, [0, 1000], [0, -120])
  const formY = useTransform(scrollY, [0, 1000], [0, -150])

  useEffect(() => {
    // Simulate loading time with Ayurvedic theme
    const timer = setTimeout(() => {
      setPageLoading(false)
    }, 3000) // 3 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle booking submission
    console.log('Booking submitted:', { selectedTreatment, selectedDate, selectedTime, formData })
  }

  const treatments = [
    { id: 'abhyanga', name: 'Abhyanga', duration: '90 min', price: '$85' },
    { id: 'shirodhara', name: 'Shirodhara', duration: '60 min', price: '$75' },
    { id: 'udvartana', name: 'Udvartana', duration: '75 min', price: '$95' },
    { id: 'nasya', name: 'Nasya', duration: '45 min', price: '$65' },
    { id: 'basti', name: 'Basti', duration: '120 min', price: '$150' },
    { id: 'marma', name: 'Marma Therapy', duration: '60 min', price: '$110' }
  ]

  const timeSlots = [
    '9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM', '6:00 PM'
  ]

  // Loading Component
  if (pageLoading) {
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
              Preparing Your Booking...
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
              "The best time to plant a tree was 20 years ago. The second best time is now"
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
              {t('booking.title')}
            </h1>
            <p className="text-xl text-[var(--ayurveda-green)]/70 max-w-2xl mx-auto">
              Book your personalized Ayurvedic wellness experience
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
                  <Sun className="h-8 w-8" />
                  <span className="text-sm font-medium">Vitality</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-gold)]/80">
                  <Flower className="h-8 w-8" />
                  <span className="text-sm font-medium">Herbal Therapy</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                  <Calendar className="h-8 w-8" />
                  <span className="text-sm font-medium">Book Now</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-sage)]/80">
                  <Clock className="h-8 w-8" />
                  <span className="text-sm font-medium">Flexible Timing</span>
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
                  <Sun className="h-8 w-8" />
                  <span className="text-sm font-medium">Vitality</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-gold)]/80">
                  <Flower className="h-8 w-8" />
                  <span className="text-sm font-medium">Herbal Therapy</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                  <Calendar className="h-8 w-8" />
                  <span className="text-sm font-medium">Book Now</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-sage)]/80">
                  <Clock className="h-8 w-8" />
                  <span className="text-sm font-medium">Flexible Timing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <motion.div 
            className="max-w-4xl mx-auto bg-transparent"
            style={{ y: bookingY }}
          >
            <motion.div 
              className="p-8 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Treatment Selection */}
                <div>
                  <h3 className="text-xl font-semibold text-[var(--ayurveda-green)] mb-4 flex items-center">
                    <Leaf className="h-5 w-5 mr-2" />
                    Select Treatment
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {treatments.map((treatment) => (
                      <motion.div
                        key={treatment.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                          selectedTreatment === treatment.id
                            ? 'border-[var(--ayurveda-green)] bg-[var(--ayurveda-green)]/10'
                            : 'border-[var(--ayurveda-green)]/30 bg-transparent hover:bg-[var(--ayurveda-green)]/5'
                        }`}
                        onClick={() => setSelectedTreatment(treatment.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-[var(--ayurveda-green)]">{treatment.name}</h4>
                          {selectedTreatment === treatment.id && (
                            <CheckCircle className="h-5 w-5 text-[var(--ayurveda-green)]" />
                          )}
                        </div>
                        <div className="flex items-center justify-between text-sm text-[var(--ayurveda-green)]/70">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {treatment.duration}
                          </span>
                          <span className="font-semibold">{treatment.price}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Date and Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--ayurveda-green)] mb-2">
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Select Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)]"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--ayurveda-green)] mb-2">
                      <Clock className="h-4 w-4 inline mr-2" />
                      Select Time
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)]"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    >
                      <option value="">Choose time slot</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold text-[var(--ayurveda-green)] mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--ayurveda-green)] mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)] placeholder-[var(--ayurveda-green)]/50"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--ayurveda-green)] mb-2">
                        <Phone className="h-4 w-4 inline mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-3 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)] placeholder-[var(--ayurveda-green)]/50"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[var(--ayurveda-green)] mb-2">
                        <Mail className="h-4 w-4 inline mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)] placeholder-[var(--ayurveda-green)]/50"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[var(--ayurveda-green)] mb-2">
                        Special Notes or Requests
                      </label>
                      <textarea
                        name="notes"
                        rows={4}
                        className="w-full px-4 py-3 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)] placeholder-[var(--ayurveda-green)]/50"
                        placeholder="Any special requirements or health conditions we should know about..."
                        value={formData.notes}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full py-3 bg-[var(--ayurveda-green)] text-white rounded-lg hover:bg-[var(--ayurveda-sage)] transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="h-5 w-5" />
                  <span>Book Your Treatment</span>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Booking Benefits */}
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 bg-transparent"
            style={{ y: formY }}
          >
            <motion.div 
              className="text-center p-6 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Star className="h-12 w-12 text-[var(--ayurveda-green)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Expert Therapists</h3>
              <p className="text-[var(--ayurveda-green)]/70">Certified Ayurvedic practitioners with years of experience</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <MapPin className="h-12 w-12 text-[var(--ayurveda-green)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Prime Location</h3>
              <p className="text-[var(--ayurveda-green)]/70">Conveniently located in the heart of Sri Lanka</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Heart className="h-12 w-12 text-[var(--ayurveda-green)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Holistic Care</h3>
              <p className="text-[var(--ayurveda-green)]/70">Complete wellness approach for mind, body, and spirit</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
