import { useState, useEffect } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, UserCheck, FileText, AlertTriangle, CheckCircle, Leaf, Heart, Sun, Flower } from 'lucide-react'
import Footer from '../components/Footer'

export default function PrivacyPolicy() {
  const { scrollY } = useScroll()
  const [pageLoading, setPageLoading] = useState(true)

  // Parallax transforms for different elements
  const headerY = useTransform(scrollY, [0, 1000], [0, -100])
  const contentY = useTransform(scrollY, [0, 1000], [0, -120])
  const sectionsY = useTransform(scrollY, [0, 1000], [0, -150])

  useEffect(() => {
    // Simulate loading time with Ayurvedic theme
    const timer = setTimeout(() => {
      setPageLoading(false)
    }, 3000) // 3 seconds loading time

    return () => clearTimeout(timer)
  }, [])

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
                <Shield className="h-6 w-6 text-[var(--ayurveda-green)]" />
              </motion.div>
              
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Lock className="h-6 w-6 text-[var(--ayurveda-earth)]" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -left-2"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Eye className="h-6 w-6 text-[var(--ayurveda-sage)]" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -right-2"
                animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                <Database className="h-6 w-6 text-[var(--ayurveda-gold)]" />
              </motion.div>
            </div>
            
            {/* Loading Text */}
            <motion.h2
              className="text-2xl font-bold text-[var(--ayurveda-green)] mb-4"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading Privacy Policy...
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
              "Trust is the foundation of all relationships"
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
              Privacy Policy
            </h1>
            <p className="text-xl text-[var(--ayurveda-green)]/70 max-w-2xl mx-auto">
              Your privacy and data protection are our top priorities
            </p>
          </motion.div>

          {/* Animated Privacy Icons Section */}
          <div className="relative overflow-hidden mb-8 h-24">
            <div className="absolute inset-0 flex items-center">
              {/* First set of icons */}
              <div className="flex items-center space-x-8 animate-scroll-left">
                <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                  <Shield className="h-8 w-8" />
                  <span className="text-sm font-medium">Data Protection</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-earth)]/80">
                  <Lock className="h-8 w-8" />
                  <span className="text-sm font-medium">Secure Storage</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-sage)]/80">
                  <Eye className="h-8 w-8" />
                  <span className="text-sm font-medium">Transparency</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-gold)]/80">
                  <UserCheck className="h-8 w-8" />
                  <span className="text-sm font-medium">User Control</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                  <Database className="h-8 w-8" />
                  <span className="text-sm font-medium">Safe Processing</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-sage)]/80">
                  <FileText className="h-8 w-8" />
                  <span className="text-sm font-medium">Clear Policies</span>
                </div>
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex items-center space-x-8 animate-scroll-left">
                <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                  <Shield className="h-8 w-8" />
                  <span className="text-sm font-medium">Data Protection</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-earth)]/80">
                  <Lock className="h-8 w-8" />
                  <span className="text-sm font-medium">Secure Storage</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-sage)]/80">
                  <Eye className="h-8 w-8" />
                  <span className="text-sm font-medium">Transparency</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-gold)]/80">
                  <UserCheck className="h-8 w-8" />
                  <span className="text-sm font-medium">User Control</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-green)]/80">
                  <Database className="h-8 w-8" />
                  <span className="text-sm font-medium">Safe Processing</span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--ayurveda-sage)]/80">
                  <FileText className="h-8 w-8" />
                  <span className="text-sm font-medium">Clear Policies</span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Policy Content */}
          <motion.div 
            className="max-w-4xl mx-auto bg-transparent"
            style={{ y: contentY }}
          >
            <motion.div 
              className="p-8 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              
              {/* Introduction */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--ayurveda-green)] mb-4 flex items-center">
                  <Shield className="h-6 w-6 mr-3" />
                  Introduction
                </h2>
                <p className="text-[var(--ayurveda-green)]/80 leading-relaxed">
                  At AyurvedaForTravelers, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--ayurveda-green)] mb-4 flex items-center">
                  <Database className="h-6 w-6 mr-3" />
                  Information We Collect
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-lg">
                    <h3 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Personal Information</h3>
                    <ul className="text-[var(--ayurveda-green)]/80 space-y-1">
                      <li>• Name and contact information</li>
                      <li>• Email address and phone number</li>
                      <li>• Booking and treatment preferences</li>
                      <li>• Health information relevant to treatments</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-lg">
                    <h3 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Technical Information</h3>
                    <ul className="text-[var(--ayurveda-green)]/80 space-y-1">
                      <li>• IP address and browser information</li>
                      <li>• Device type and operating system</li>
                      <li>• Website usage patterns and preferences</li>
                      <li>• Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--ayurveda-green)] mb-4 flex items-center">
                  <Eye className="h-6 w-6 mr-3" />
                  How We Use Your Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-lg">
                    <h3 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-2 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Service Delivery
                    </h3>
                    <ul className="text-[var(--ayurveda-green)]/80 space-y-1 text-sm">
                      <li>• Process bookings and appointments</li>
                      <li>• Provide personalized treatments</li>
                      <li>• Send booking confirmations</li>
                      <li>• Handle customer support</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-lg">
                    <h3 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-2 flex items-center">
                      <Heart className="h-5 w-5 mr-2" />
                      Communication
                    </h3>
                    <ul className="text-[var(--ayurveda-green)]/80 space-y-1 text-sm">
                      <li>• Send wellness tips and updates</li>
                      <li>• Notify about new treatments</li>
                      <li>• Share Ayurvedic knowledge</li>
                      <li>• Respond to inquiries</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--ayurveda-green)] mb-4 flex items-center">
                  <Lock className="h-6 w-6 mr-3" />
                  Data Security
                </h2>
                <div className="p-6 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-lg">
                  <p className="text-[var(--ayurveda-green)]/80 leading-relaxed mb-4">
                    We implement industry-standard security measures to protect your personal information:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[var(--ayurveda-green)]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Shield className="h-6 w-6 text-[var(--ayurveda-green)]" />
                      </div>
                      <h4 className="font-semibold text-[var(--ayurveda-green)] mb-1">Encryption</h4>
                      <p className="text-sm text-[var(--ayurveda-green)]/70">SSL/TLS encryption for data transmission</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[var(--ayurveda-green)]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Database className="h-6 w-6 text-[var(--ayurveda-green)]" />
                      </div>
                      <h4 className="font-semibold text-[var(--ayurveda-green)] mb-1">Secure Storage</h4>
                      <p className="text-sm text-[var(--ayurveda-green)]/70">Protected databases with access controls</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[var(--ayurveda-green)]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <UserCheck className="h-6 w-6 text-[var(--ayurveda-green)]" />
                      </div>
                      <h4 className="font-semibold text-[var(--ayurveda-green)] mb-1">Access Control</h4>
                      <p className="text-sm text-[var(--ayurveda-green)]/70">Limited access to authorized personnel only</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Rights */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--ayurveda-green)] mb-4 flex items-center">
                  <UserCheck className="h-6 w-6 mr-3" />
                  Your Rights
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-[var(--ayurveda-green)] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[var(--ayurveda-green)]">Access Your Data</h4>
                      <p className="text-sm text-[var(--ayurveda-green)]/70">Request a copy of your personal information</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-[var(--ayurveda-green)] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[var(--ayurveda-green)]">Update Information</h4>
                      <p className="text-sm text-[var(--ayurveda-green)]/70">Correct or update your personal details</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-[var(--ayurveda-green)] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[var(--ayurveda-green)]">Delete Data</h4>
                      <p className="text-sm text-[var(--ayurveda-green)]/70">Request deletion of your personal information</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-[var(--ayurveda-green)] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[var(--ayurveda-green)]">Opt-out</h4>
                      <p className="text-sm text-[var(--ayurveda-green)]/70">Unsubscribe from marketing communications</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--ayurveda-green)] mb-4 flex items-center">
                  <FileText className="h-6 w-6 mr-3" />
                  Contact Us
                </h2>
                <div className="p-6 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-lg">
                  <p className="text-[var(--ayurveda-green)]/80 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="space-y-2 text-[var(--ayurveda-green)]/80">
                    <p><strong>Email:</strong> privacy@ayurvedafortravelers.com</p>
                    <p><strong>Phone:</strong> +94 11 123 4567</p>
                    <p><strong>Address:</strong> Ayurveda Wellness Center, Colombo, Sri Lanka</p>
                  </div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="text-center p-4 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-lg">
                <p className="text-[var(--ayurveda-green)]/70 text-sm">
                  <strong>Last Updated:</strong> December 2024
                </p>
                <p className="text-[var(--ayurveda-green)]/70 text-sm mt-2">
                  This Privacy Policy may be updated from time to time. We will notify you of any significant changes.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Privacy Benefits */}
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 bg-transparent"
            style={{ y: sectionsY }}
          >
            <motion.div 
              className="text-center p-6 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Shield className="h-12 w-12 text-[var(--ayurveda-green)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Complete Protection</h3>
              <p className="text-[var(--ayurveda-green)]/70">Your personal and health information is fully protected</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Lock className="h-12 w-12 text-[var(--ayurveda-green)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Secure Processing</h3>
              <p className="text-[var(--ayurveda-green)]/70">All data processing follows strict security protocols</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 bg-transparent border border-[var(--ayurveda-green)]/20 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Eye className="h-12 w-12 text-[var(--ayurveda-green)] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">Full Transparency</h3>
              <p className="text-[var(--ayurveda-green)]/70">Clear information about how we use your data</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
