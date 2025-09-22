import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  Calendar,
  User,
  MessageSquare
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Our Center',
    details: [
      '123 Wellness Avenue',
      'Ayurveda District, Kerala 695001',
      'Near Sacred Banyan Tree'
    ]
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: [
      '+91 98765 43210',
      '+91 98765 43211',
      'Emergency: +91 98765 43212'
    ]
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: [
      'info@ayurvedahospital.com',
      'appointments@ayurvedahospital.com',
      'support@ayurvedahospital.com'
    ]
  },
  {
    icon: Clock,
    title: 'Operating Hours',
    details: [
      'Monday - Saturday: 6:00 AM - 8:00 PM',
      'Sunday: 8:00 AM - 6:00 PM',
      'Emergency: 24/7 Available'
    ]
  }
];

const services = [
  'General Consultation',
  'Panchakarma Therapy',
  'Pulse Diagnosis',
  'Herbal Medicine',
  'Yoga Therapy',
  'Meditation Guidance',
  'Lifestyle Consultation',
  'Other'
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      service: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-40 h-40"
          style={{
            background: `conic-gradient(from 0deg, var(--ayurveda-green), var(--ayurveda-sage), var(--ayurveda-earth), var(--ayurveda-green))`,
            borderRadius: '50%',
            filter: 'blur(40px)'
          }}
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
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[var(--ayurveda-teal)] to-[var(--ayurveda-green)] mb-6"
          >
            <MapPin className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--ayurveda-green)] mb-4">
            Get In Touch
          </h2>
          
          <p className="text-lg text-[var(--ayurveda-green)]/70 max-w-2xl mx-auto">
            Ready to begin your healing journey? Contact us to schedule your consultation 
            with our experienced Ayurvedic practitioners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-1 space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card p-6 rounded-xl"
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] flex items-center justify-center"
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-2">
                      {item.title}
                    </h3>
                    
                    <div className="space-y-1">
                      {item.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-sm text-[var(--ayurveda-green)]/70">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass-strong p-6 rounded-xl"
            >
              <h3 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <Button 
                  className="w-full justify-start bg-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-sage)] text-white"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full justify-start border-[var(--ayurveda-green)] text-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-green)]/10"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="glass-strong border-0">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-[var(--ayurveda-green)]" />
                  <h3 className="text-xl font-semibold text-[var(--ayurveda-green)]">
                    Send us a Message
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <label className="block text-sm font-medium text-[var(--ayurveda-green)] mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="glass border-[var(--ayurveda-green)]/30 focus:border-[var(--ayurveda-green)]"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <label className="block text-sm font-medium text-[var(--ayurveda-green)] mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="glass border-[var(--ayurveda-green)]/30 focus:border-[var(--ayurveda-green)]"
                        required
                      />
                    </motion.div>
                  </div>

                  {/* Phone and Service */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <label className="block text-sm font-medium text-[var(--ayurveda-green)] mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="glass border-[var(--ayurveda-green)]/30 focus:border-[var(--ayurveda-green)]"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.9 }}
                    >
                      <label className="block text-sm font-medium text-[var(--ayurveda-green)] mb-2">
                        Service Interested In
                      </label>
                      <Select onValueChange={handleSelectChange}>
                        <SelectTrigger className="glass border-[var(--ayurveda-green)]/30 focus:border-[var(--ayurveda-green)]">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    <label className="block text-sm font-medium text-[var(--ayurveda-green)] mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your health concerns or questions..."
                      rows={4}
                      className="glass border-[var(--ayurveda-green)]/30 focus:border-[var(--ayurveda-green)] resize-none"
                      required
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-sage)] text-white font-medium py-3"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </motion.div>
                </form>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="mt-6 pt-6 border-t border-[var(--ayurveda-green)]/20"
                >
                  <p className="text-sm text-[var(--ayurveda-green)]/70 text-center">
                    We typically respond within 2-4 hours during business hours. 
                    For urgent medical concerns, please call us directly.
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
