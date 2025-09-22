import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Award, 
  Users, 
  Clock, 
  Star,
  CheckCircle,
  BookOpen
} from 'lucide-react';
import { Card, CardContent } from './ui/card';

const stats = [
  { icon: Users, number: '10,000+', label: 'Patients Healed' },
  { icon: Award, number: '25+', label: 'Years Experience' },
  { icon: Clock, number: '24/7', label: 'Support Available' },
  { icon: Star, number: '4.9/5', label: 'Patient Rating' },
];

const principles = [
  {
    title: 'Holistic Approach',
    description: 'We treat the whole person, not just symptoms, addressing root causes for lasting wellness.'
  },
  {
    title: 'Natural Healing',
    description: 'Using pure herbs and natural therapies to stimulate your body\'s innate healing abilities.'
  },
  {
    title: 'Personalized Care',
    description: 'Each treatment plan is customized based on your unique constitution and health needs.'
  },
  {
    title: 'Ancient Wisdom',
    description: 'Applying 5000-year-old Ayurvedic knowledge with modern scientific understanding.'
  }
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 right-10 w-32 h-32 border border-[var(--ayurveda-sage)] rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-10 w-24 h-24 border border-[var(--ayurveda-earth)] rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[var(--ayurveda-earth)] to-[var(--ayurveda-gold)] mb-6"
          >
            <BookOpen className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--ayurveda-green)] mb-4">
            About Our Practice
          </h2>
          
          <p className="text-lg text-[var(--ayurveda-green)]/70 max-w-2xl mx-auto">
            Dedicated to preserving and practicing the ancient science of Ayurveda 
            with modern excellence and compassionate care.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="glass-card p-4 rounded-3xl">
              <div 
                className="w-full h-96 object-cover rounded-2xl bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1695462131544-7f3928ee9159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xpc3RpYyUyMG1lZGljaW5lJTIwZG9jdG9yJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc1ODEwNzk0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')"
                }}
              />
            </div>
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -right-6 glass-strong p-6 rounded-2xl text-center"
            >
              <div className="text-2xl font-bold text-[var(--ayurveda-green)]">25+</div>
              <div className="text-sm text-[var(--ayurveda-green)]/70">Years of Excellence</div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-semibold text-[var(--ayurveda-green)]">
              Bridging Ancient Wisdom with Modern Wellness
            </h3>
            
            <p className="text-lg text-[var(--ayurveda-green)]/80 leading-relaxed">
              Our hospital stands as a beacon of authentic Ayurvedic healing, where time-honored 
              traditions meet contemporary healthcare standards. Founded by renowned practitioners 
              who have dedicated their lives to this sacred science, we offer a sanctuary for 
              those seeking natural, holistic healing.
            </p>

            <p className="text-[var(--ayurveda-green)]/70 leading-relaxed">
              Every treatment is rooted in the fundamental Ayurvedic principle that true health 
              comes from balance - between mind, body, and spirit. Our team of certified 
              practitioners brings decades of experience in diagnosing through pulse reading, 
              constitutional analysis, and creating personalized healing protocols.
            </p>

            {/* Principles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="flex items-start space-x-3 p-4 glass-card rounded-xl"
                >
                  <CheckCircle className="w-5 h-5 text-[var(--ayurveda-green)] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[var(--ayurveda-green)] mb-1">
                      {principle.title}
                    </h4>
                    <p className="text-sm text-[var(--ayurveda-green)]/70">
                      {principle.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="glass-strong p-8 rounded-3xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] mb-4"
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 1.2 + index * 0.1 }}
                  className="text-2xl md:text-3xl font-bold text-[var(--ayurveda-green)] mb-2"
                >
                  {stat.number}
                </motion.div>
                
                <div className="text-sm text-[var(--ayurveda-green)]/70 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
