import { motion } from 'framer-motion';
import { ChevronDown, Heart, Leaf, Shield } from 'lucide-react';
import { Button } from './ui/button';

export default function HeroSection() {
  const scrollToNext = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 parallax-back">
        <div 
          className="w-full h-full object-cover bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1717657337702-0cf65be367a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBoZXJicyUyMG1lZGl0YXRpb24lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NTgxMDc5Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--ayurveda-green)]/30 via-[var(--ayurveda-sage)]/20 to-[var(--ayurveda-teal)]/40"></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 glass-card p-4 rounded-full"
      >
        <Leaf className="w-8 h-8 text-[var(--ayurveda-green)]" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-40 right-20 glass-card p-4 rounded-full"
      >
        <Heart className="w-6 h-6 text-[var(--ayurveda-earth)]" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-40 left-20 glass-card p-4 rounded-full"
      >
        <Shield className="w-7 h-7 text-[var(--ayurveda-teal)]" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="glass-strong p-8 md:p-12 rounded-3xl backdrop-blur-xl"
        >
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[var(--ayurveda-earth)] mb-4 font-medium"
          >
            Ancient Wisdom • Modern Care
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Heal Naturally with
            <span className="block text-[var(--ayurveda-gold)] mt-2">
              Ayurveda
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the transformative power of 5000-year-old Ayurvedic healing. 
            Our expert practitioners combine traditional wisdom with modern techniques 
            to restore your body's natural balance and vitality.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-sage)] text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-[var(--ayurveda-green)] px-8 py-4 text-lg font-medium rounded-full backdrop-blur-md"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-6 mt-12 text-white/80"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[var(--ayurveda-gold)] rounded-full"></div>
              <span>Certified Practitioners</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[var(--ayurveda-gold)] rounded-full"></div>
              <span>Natural Remedies</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[var(--ayurveda-gold)] rounded-full"></div>
              <span>Holistic Approach</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glass-card p-3 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </motion.div>
      </motion.button>
    </section>
  );
}
