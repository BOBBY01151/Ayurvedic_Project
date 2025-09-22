import { motion } from 'motion/react';
import { 
  Leaf, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Heart,
  ArrowUp
} from 'lucide-react';
import { Button } from './ui/button';

const footerLinks = {
  services: [
    'Panchakarma Therapy',
    'Pulse Diagnosis',
    'Herbal Medicine',
    'Yoga Therapy',
    'Meditation',
    'Lifestyle Consultation'
  ],
  quickLinks: [
    'About Us',
    'Our Doctors',
    'Testimonials',
    'Blog',
    'FAQ',
    'Privacy Policy'
  ],
  conditions: [
    'Digestive Disorders',
    'Stress & Anxiety',
    'Joint Pain',
    'Skin Conditions',
    'Respiratory Issues',
    'Women\'s Health'
  ]
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' }
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[var(--ayurveda-cream)] to-[var(--ayurveda-green)]/5 pt-20 pb-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234a7c59' fill-opacity='0.1'%3E%3Cpath d='M30 30h30v30H30zm15 15h15v15H45z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--ayurveda-green)]">
                  Ayurveda Hospital
                </h3>
                <p className="text-sm text-[var(--ayurveda-green)]/60">
                  Healing Naturally
                </p>
              </div>
            </div>

            <p className="text-[var(--ayurveda-green)]/70 mb-6 leading-relaxed">
              Experience authentic Ayurvedic healing with our time-tested treatments 
              and personalized care approach for complete wellness.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-[var(--ayurveda-green)]/70">
                <MapPin className="w-4 h-4" />
                <span>123 Wellness Avenue, Kerala 695001</span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-[var(--ayurveda-green)]/70">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-[var(--ayurveda-green)]/70">
                <Mail className="w-4 h-4" />
                <span>info@ayurvedahospital.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[var(--ayurveda-green)] hover:text-[var(--ayurveda-sage)] transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-6">
              Our Services
            </h4>
            
            <ul className="space-y-3">
              {footerLinks.services.map((service) => (
                <li key={service}>
                  <a 
                    href="#services"
                    className="text-[var(--ayurveda-green)]/70 hover:text-[var(--ayurveda-green)] transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-6">
              Quick Links
            </h4>
            
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link}>
                  <a 
                    href="#"
                    className="text-[var(--ayurveda-green)]/70 hover:text-[var(--ayurveda-green)] transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Conditions Treated */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-[var(--ayurveda-green)] mb-6">
              Conditions Treated
            </h4>
            
            <ul className="space-y-3">
              {footerLinks.conditions.map((condition) => (
                <li key={condition}>
                  <a 
                    href="#services"
                    className="text-[var(--ayurveda-green)]/70 hover:text-[var(--ayurveda-green)] transition-colors text-sm"
                  >
                    {condition}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-8 rounded-2xl mb-12"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-[var(--ayurveda-green)] mb-2">
              Stay Connected with Wellness
            </h3>
            <p className="text-[var(--ayurveda-green)]/70">
              Subscribe to receive Ayurvedic wellness tips, seasonal health advice, and special offers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-full glass border border-[var(--ayurveda-green)]/30 focus:border-[var(--ayurveda-green)] focus:outline-none text-[var(--ayurveda-green)]"
            />
            <Button className="px-8 py-3 bg-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-sage)] text-white rounded-full">
              Subscribe
            </Button>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[var(--ayurveda-green)]/20"
        >
          <div className="flex items-center space-x-2 text-sm text-[var(--ayurveda-green)]/70 mb-4 md:mb-0">
            <span>© 2024 Ayurveda Hospital. All rights reserved.</span>
            <span>•</span>
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for your wellness</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="text-sm text-[var(--ayurveda-green)]/70 hover:text-[var(--ayurveda-green)] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-[var(--ayurveda-green)]/70 hover:text-[var(--ayurveda-green)] transition-colors">
              Privacy Policy
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[var(--ayurveda-green)] text-white shadow-lg glass flex items-center justify-center z-50"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}