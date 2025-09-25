import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, Leaf, Heart, Zap, Shield, Sun, Moon, Flower, TreePine } from 'lucide-react'
import Footer from '../components/Footer'

export default function Contact() {
  const { t } = useTranslation()
  const { scrollY } = useScroll()
  const [loading, setLoading] = useState(true)

  // Parallax transforms for different elements
  const headerY = useTransform(scrollY, [0, 1000], [0, -100])
  const contactY = useTransform(scrollY, [0, 1000], [0, -120])
  const formY = useTransform(scrollY, [0, 1000], [0, -150])

  useEffect(() => {
    // Simulate loading time with Ayurvedic theme
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000) // 3 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  // Loading Component
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
              Connecting to Wellness...
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
              "Health is not merely the absence of disease, but the presence of vitality"
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
            {t('contact.title')}
          </h1>
            <p className="text-xl text-[var(--ayurveda-green)]/70 max-w-2xl mx-auto">
              Get in touch with us for your Ayurvedic wellness journey
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

          {/* Contact Information */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-transparent"
            style={{ y: contactY }}
          >
            <motion.div 
              className="text-center p-6 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Phone className="h-12 w-12 text-[var(--ayurveda-green)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Phone</h3>
              <p className="text-[var(--ayurveda-green)]/70">+94 11 234 5678</p>
              <p className="text-[var(--ayurveda-green)]/70">+94 77 123 4567</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Mail className="h-12 w-12 text-[var(--ayurveda-green)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Email</h3>
              <p className="text-[var(--ayurveda-green)]/70">info@ayurveda.com</p>
              <p className="text-[var(--ayurveda-green)]/70">bookings@ayurveda.com</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <MapPin className="h-12 w-12 text-[var(--ayurveda-green)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Address</h3>
              <p className="text-[var(--ayurveda-green)]/70">123 Ayurveda Street</p>
              <p className="text-[var(--ayurveda-green)]/70">Colombo 07, Sri Lanka</p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="max-w-2xl mx-auto bg-transparent"
            style={{ y: formY }}
          >
            <motion.div 
              className="p-8 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-[var(--ayurveda-green)] mb-6 text-center">
                Send us a Message
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--ayurveda-green)] mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)] placeholder-[var(--ayurveda-green)]/50"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--ayurveda-green)] mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)] placeholder-[var(--ayurveda-green)]/50"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--ayurveda-green)] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)] placeholder-[var(--ayurveda-green)]/50"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--ayurveda-green)] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)] placeholder-[var(--ayurveda-green)]/50"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--ayurveda-green)] mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-transparent border border-[var(--ayurveda-green)]/30 rounded-lg focus:ring-[var(--ayurveda-green)] focus:border-[var(--ayurveda-green)] text-[var(--ayurveda-green)] placeholder-[var(--ayurveda-green)]/50"
                    placeholder="Tell us about your wellness goals..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-[var(--ayurveda-green)] text-white rounded-lg hover:bg-[var(--ayurveda-sage)] transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Business Hours */}
          <motion.div 
            className="mt-12 text-center bg-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 text-[var(--ayurveda-green)]/70">
              <Clock className="h-5 w-5" />
              <span>Open Monday - Sunday: 8:00 AM - 8:00 PM</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
