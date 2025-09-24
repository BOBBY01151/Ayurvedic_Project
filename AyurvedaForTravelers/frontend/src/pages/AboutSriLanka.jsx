import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { MapPin, Clock, Users, Star, Heart, Leaf, Sun, Moon, Flower, TreePine, Zap, Shield } from 'lucide-react'
import Footer from '../components/Footer'

export default function AboutSriLanka() {
  const { t } = useTranslation()
  const { scrollY } = useScroll()
  
  // Parallax transforms for different elements
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200])
  const headerY = useTransform(scrollY, [0, 1000], [0, -100])
  const featuresY = useTransform(scrollY, [0, 1000], [0, -150])
  const treatmentsY = useTransform(scrollY, [0, 1000], [0, -120])
  const whyChooseY = useTransform(scrollY, [0, 1000], [0, -80])

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const features = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Strategic Location",
      description: "Located in the heart of the Indian Ocean, Sri Lanka serves as a perfect gateway for travelers seeking authentic Ayurvedic experiences."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Ancient Heritage",
      description: "Over 3,000 years of documented Ayurvedic tradition, making it one of the world's oldest and most authentic healing systems."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Practitioners",
      description: "Highly trained Ayurvedic doctors and therapists with generations of knowledge passed down through traditional lineages."
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Natural Environment",
      description: "Tropical climate, pristine beaches, and lush mountains create the perfect environment for healing and rejuvenation."
    }
  ]

  const treatments = [
    {
      name: "Panchakarma",
      description: "Complete detoxification and rejuvenation therapy",
      duration: "7-21 days",
      benefits: "Deep cleansing, energy restoration, mental clarity"
    },
    {
      name: "Abhyanga",
      description: "Traditional full-body oil massage therapy",
      duration: "60-90 minutes",
      benefits: "Stress relief, improved circulation, skin nourishment"
    },
    {
      name: "Shirodhara",
      description: "Healing oil therapy for mind and body",
      duration: "45-60 minutes",
      benefits: "Mental relaxation, better sleep, anxiety relief"
    },
    {
      name: "Herbal Steam",
      description: "Medicated steam therapy for detoxification",
      duration: "30-45 minutes",
      benefits: "Skin purification, respiratory health, toxin removal"
    }
  ]

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/images/png22.png')",
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
            About Sri Lanka
          </h1>
          <p className="text-xl text-[var(--ayurveda-green)]/70 max-w-2xl mx-auto">
            Discover the ancient land where Ayurvedic wisdom meets tropical paradise
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

        {/* Introduction Section */}
        <div className="mb-12 bg-transparent">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--ayurveda-green)] mb-4">
              The Pearl of the Indian Ocean
            </h2>
            <p className="text-lg text-[var(--ayurveda-green)]/70 max-w-4xl mx-auto leading-relaxed">
              Sri Lanka, known as the "Pearl of the Indian Ocean," is not just a tropical paradise but also the birthplace of authentic Ayurvedic medicine. 
              For over 3,000 years, this island nation has been perfecting the art of natural healing, making it the ultimate destination for those seeking 
              genuine Ayurvedic treatments and holistic wellness experiences.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 bg-transparent"
          style={{ y: featuresY }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-transparent rounded-xl p-6 border border-[var(--ayurveda-green)]/20 hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-[var(--ayurveda-green)] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[var(--ayurveda-green)] mb-2">
                {feature.title}
              </h3>
              <p className="text-[var(--ayurveda-green)]/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Popular Treatments Section */}
        <motion.div 
          className="mb-12 bg-transparent"
          style={{ y: treatmentsY }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--ayurveda-green)] mb-4">
              Popular Ayurvedic Treatments
            </h2>
            <p className="text-lg text-[var(--ayurveda-green)]/70 max-w-2xl mx-auto">
              Experience the most sought-after Ayurvedic treatments in their authentic setting
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {treatments.map((treatment, index) => (
              <motion.div 
                key={index} 
                className="bg-transparent rounded-xl p-6 border border-[var(--ayurveda-green)]/20 hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-[var(--ayurveda-green)] mb-2">
                  {treatment.name}
                </h3>
                <p className="text-[var(--ayurveda-green)]/70 mb-4">
                  {treatment.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-[var(--ayurveda-green)]/60">
                    <Clock className="h-4 w-4 mr-2" />
                    Duration: {treatment.duration}
                  </div>
                  <div className="text-sm text-[var(--ayurveda-green)]/60">
                    <strong>Benefits:</strong> {treatment.benefits}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Sri Lanka Section */}
        <motion.div 
          className="mb-12 bg-transparent"
          style={{ y: whyChooseY }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--ayurveda-green)] mb-4">
              Why Choose Sri Lanka for Ayurveda?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-[var(--ayurveda-green)] mb-4">
                <Leaf className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--ayurveda-green)] mb-2">
                Authentic Tradition
              </h3>
              <p className="text-[var(--ayurveda-green)]/70">
                Learn from practitioners who have inherited knowledge through generations of traditional Ayurvedic families.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-[var(--ayurveda-green)] mb-4">
                <Heart className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--ayurveda-green)] mb-2">
                Natural Environment
              </h3>
              <p className="text-[var(--ayurveda-green)]/70">
                Heal in a tropical paradise with pristine beaches, lush mountains, and a climate perfect for wellness.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-[var(--ayurveda-green)] mb-4">
                <Star className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--ayurveda-green)] mb-2">
                Holistic Experience
              </h3>
              <p className="text-[var(--ayurveda-green)]/70">
                Combine your healing journey with cultural exploration, wildlife encounters, and unforgettable memories.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center bg-transparent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-[var(--ayurveda-green)] mb-4">
            Begin Your Healing Journey
          </h2>
          <p className="text-lg text-[var(--ayurveda-green)]/70 mb-8 max-w-2xl mx-auto">
            Discover the authentic Ayurvedic experience in the land where it all began. 
            Let Sri Lanka's natural beauty and ancient wisdom guide you to complete wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-[var(--ayurveda-green)] text-white rounded-lg hover:bg-[var(--ayurveda-sage)] transition-colors">
              Explore Treatments
            </button>
            <button className="px-8 py-3 text-[var(--ayurveda-green)] border border-[var(--ayurveda-green)] rounded-lg hover:bg-[var(--ayurveda-green)]/10 transition-colors">
              View Packages
            </button>
          </div>
        </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
