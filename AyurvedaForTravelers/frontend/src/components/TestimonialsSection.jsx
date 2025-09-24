import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const testimonials = [
  {
    name: 'Priya Sharma',
    age: 34,
    condition: 'Chronic Anxiety',
    image: 'https://images.unsplash.com/photo-1529693662653-9d480530a697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHdlbGxuZXNzJTIwY2VudGVyfGVufDF8fHx8MTc1ODEwNzkzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 5,
    testimonial: 'After years of struggling with anxiety and sleepless nights, I found peace through Ayurvedic treatment here. The personalized herb combinations and meditation guidance have transformed my life completely. I wake up feeling refreshed and calm.',
    treatment_duration: '6 months'
  },
  {
    name: 'Rajesh Kumar',
    age: 45,
    condition: 'Digestive Issues',
    image: 'https://images.unsplash.com/photo-1695462131544-7f3928ee9159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xpc3RpYyUyMG1lZGljaW5lJTIwZG9jdG9yJTIwY29uc3VsdGF0aW9ufGVufDF8fHx8MTc1ODEwNzk0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 5,
    testimonial: 'The panchakarma therapy here saved my digestive health. For 10 years, I suffered from severe bloating and discomfort. The doctors here identified my exact dosha imbalance and created a perfect treatment plan. Now I can enjoy food again!',
    treatment_duration: '4 months'
  },
  {
    name: 'Anita Verma',
    age: 52,
    condition: 'Joint Pain',
    image: 'https://images.unsplash.com/photo-1717657337702-0cf65be367a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBoZXJicyUyMG1lZGl0YXRpb24lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NTgxMDc5Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 5,
    testimonial: 'Arthritis had made my daily activities impossible. The oil treatments and herbal medicines here have given me my mobility back. The staff is incredibly caring, and the natural approach has no side effects. I feel 20 years younger!',
    treatment_duration: '8 months'
  },
  {
    name: 'Dr. Vikram Singh',
    age: 38,
    condition: 'Stress & Fatigue',
    image: 'https://images.unsplash.com/photo-1708667027894-6e9481ae1baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwaGVhbGluZyUyMGhlcmJzJTIwYm90YW5pY2FsfGVufDF8fHx8MTc1ODEwNzk0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 5,
    testimonial: 'As a modern medicine doctor, I was skeptical about Ayurveda. But chronic fatigue forced me to try it. The rejuvenation therapy and lifestyle changes recommended here have restored my energy levels completely. I now recommend this place to my patients.',
    treatment_duration: '3 months'
  }
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" ref={ref} className="py-20 relative overflow-hidden">

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
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[var(--ayurveda-gold)] to-[var(--ayurveda-earth)] mb-6"
          >
            <Quote className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--ayurveda-green)] mb-4">
            Patient Success Stories
          </h2>
          
          <p className="text-lg text-[var(--ayurveda-green)]/70 max-w-2xl mx-auto">
            Real healing journeys from our patients who found renewed health 
            and vitality through authentic Ayurvedic care.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="glass-strong border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 lg:h-auto">
                  <div 
                    className="w-full h-full object-cover bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentTestimonial.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Rating */}
                  <div className="absolute top-4 left-4 flex items-center space-x-1 glass-card px-3 py-1 rounded-full">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[var(--ayurveda-gold)] text-[var(--ayurveda-gold)]" />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Quote Icon */}
                    <Quote className="w-12 h-12 text-[var(--ayurveda-gold)] mb-6" />
                    
                    {/* Testimonial Text */}
                    <blockquote className="text-lg text-[var(--ayurveda-green)] mb-6 leading-relaxed italic">
                      "{currentTestimonial.testimonial}"
                    </blockquote>

                    {/* Patient Info */}
                    <div className="border-t border-[var(--ayurveda-green)]/20 pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-semibold text-[var(--ayurveda-green)]">
                          {currentTestimonial.name}
                        </h4>
                        <span className="text-sm text-[var(--ayurveda-green)]/60">
                          Age {currentTestimonial.age}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--ayurveda-earth)] font-medium">
                          Treated for: {currentTestimonial.condition}
                        </span>
                        <span className="text-[var(--ayurveda-green)]/60">
                          Duration: {currentTestimonial.treatment_duration}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center space-x-4 mb-12"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            className="glass-card border-[var(--ayurveda-green)]/30 text-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-green)]/10"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Dots */}
          <div className="flex items-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-[var(--ayurveda-green)] scale-125' 
                    : 'bg-[var(--ayurveda-green)]/30 hover:bg-[var(--ayurveda-green)]/60'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="glass-card border-[var(--ayurveda-green)]/30 text-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-green)]/10"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold text-[var(--ayurveda-green)] mb-2">98%</div>
            <div className="text-sm text-[var(--ayurveda-green)]/70">Patient Satisfaction Rate</div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold text-[var(--ayurveda-green)] mb-2">500+</div>
            <div className="text-sm text-[var(--ayurveda-green)]/70">5-Star Reviews</div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold text-[var(--ayurveda-green)] mb-2">85%</div>
            <div className="text-sm text-[var(--ayurveda-green)]/70">Patients Refer Others</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
