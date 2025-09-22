import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Leaf, 
  Heart, 
  Zap, 
  Brain, 
  Flower2, 
  Shield,
  ArrowRight 
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const services = [
  {
    icon: Leaf,
    title: 'Panchakarma Therapy',
    description: 'Complete detoxification and rejuvenation through traditional five-action purification process.',
    image: 'https://images.unsplash.com/photo-1719123045765-08ca3c27991b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBzcGElMjB0cmVhdG1lbnQlMjBuYXR1cmFsJTIwaGVhbGluZ3xlbnwxfHx8fDE3NTgxMDc5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Oil Massages', 'Steam Therapy', 'Herbal Treatments']
  },
  {
    icon: Heart,
    title: 'Cardiovascular Care',
    description: 'Natural heart health solutions using time-tested Ayurvedic principles and herbs.',
    image: 'https://images.unsplash.com/photo-1529693662653-9d480530a697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHdlbGxuZXNzJTIwY2VudGVyfGVufDF8fHx8MTc1ODEwNzkzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Heart Tonics', 'Lifestyle Guidance', 'Stress Management']
  },
  {
    icon: Brain,
    title: 'Mental Wellness',
    description: 'Holistic approach to mental health through meditation, herbs, and lifestyle modifications.',
    image: 'https://images.unsplash.com/photo-1695462131544-7f3928ee9159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xpc3RpYyUyMG1lZGljaW5lJTIwZG9jdG9yJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc1ODEwNzk0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Anxiety Relief', 'Depression Support', 'Cognitive Enhancement']
  },
  {
    icon: Zap,
    title: 'Energy Restoration',
    description: 'Revitalize your life force through specialized treatments and energy balancing techniques.',
    image: 'https://images.unsplash.com/photo-1708667027894-6e9481ae1baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaGVhbGluZyUyMGhlcmJzJTIwYm90YW5pY2FsfGVufDF8fHx8MTc1ODEwNzk0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Vitality Boosters', 'Chronic Fatigue', 'Immunity Building']
  },
  {
    icon: Flower2,
    title: 'Beauty & Skincare',
    description: 'Natural beauty treatments using herbal formulations for radiant, healthy skin.',
    image: 'https://images.unsplash.com/photo-1719123045765-08ca3c27991b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBzcGElMjB0cmVhdG1lbnQlMjBuYXR1cmFsJTIwaGVhbGluZ3xlbnwxfHx8fDE3NTgxMDc5MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Herbal Facials', 'Anti-aging', 'Acne Treatment']
  },
  {
    icon: Shield,
    title: 'Immunity Support',
    description: 'Strengthen your natural defenses with Ayurvedic immunity boosting protocols.',
    image: 'https://images.unsplash.com/photo-1708667027894-6e9481ae1baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaGVhbGluZyUyMGhlcmJzJTIwYm90YW5pY2FsfGVufDF8fHx8MTc1ODEwNzk0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['Immune Tonics', 'Preventive Care', 'Seasonal Support']
  }
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="services" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--ayurveda-green) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, var(--ayurveda-sage) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
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
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] mb-6"
          >
            <Leaf className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--ayurveda-green)] mb-4">
            Our Healing Services
          </h2>
          
          <p className="text-lg text-[var(--ayurveda-green)]/70 max-w-2xl mx-auto">
            Discover comprehensive Ayurvedic treatments designed to restore balance, 
            enhance vitality, and promote natural healing from within.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="glass-card border-0 overflow-hidden h-full hover:shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden">
                  <div 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 bg-cover bg-center"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="absolute top-4 right-4 w-12 h-12 rounded-full glass-strong flex items-center justify-center"
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[var(--ayurveda-green)] mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-[var(--ayurveda-green)]/70 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--ayurveda-gold)]" />
                        <span className="text-sm text-[var(--ayurveda-green)]/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    className="group/btn w-full justify-between text-[var(--ayurveda-green)] hover:text-[var(--ayurveda-sage)] hover:bg-[var(--ayurveda-green)]/5"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-strong p-8 rounded-3xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-[var(--ayurveda-green)] mb-4">
              Not sure which treatment is right for you?
            </h3>
            <p className="text-[var(--ayurveda-green)]/70 mb-6">
              Schedule a consultation with our experienced Ayurvedic practitioners 
              to receive personalized treatment recommendations.
            </p>
            <Button 
              size="lg"
              className="bg-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-sage)] text-white px-8 py-3 rounded-full"
            >
              Schedule Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
