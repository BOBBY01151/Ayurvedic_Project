import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change to white background even on small scroll
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-[var(--ayurveda-green)]/10' 
          : 'glass'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--ayurveda-green)] to-[var(--ayurveda-sage)] flex items-center justify-center">
              <span className="text-white text-sm font-bold">AH</span>
            </div>
            <span className={`text-xl font-semibold transition-colors duration-500 ${
              scrolled ? 'text-[var(--ayurveda-green)]' : 'text-white'
            }`}>
              Ayurveda Hospital
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`transition-colors duration-500 font-medium ${
                  scrolled 
                    ? 'text-[var(--ayurveda-green)] hover:text-[var(--ayurveda-sage)]' 
                    : 'text-white hover:text-[var(--ayurveda-gold)]'
                }`}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className={`flex items-center space-x-2 text-sm transition-colors duration-500 ${
              scrolled ? 'text-[var(--ayurveda-green)]' : 'text-white'
            }`}>
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </div>
            <Button className={`transition-colors duration-500 text-white ${
              scrolled 
                ? 'bg-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-sage)]' 
                : 'bg-[var(--ayurveda-gold)] hover:bg-[var(--ayurveda-earth)]'
            }`}>
              Book Appointment
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors duration-500 ${
                scrolled ? 'text-[var(--ayurveda-green)]' : 'text-white'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0,
        }}
        className={`md:hidden border-t transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md border-[var(--ayurveda-green)]/20' 
            : 'glass-strong border-white/20'
        }`}
      >
        <div className="px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(false)}
              className={`block py-2 transition-colors duration-500 ${
                scrolled 
                  ? 'text-[var(--ayurveda-green)] hover:text-[var(--ayurveda-sage)]' 
                  : 'text-white hover:text-[var(--ayurveda-gold)]'
              }`}
            >
              {item.label}
            </motion.a>
          ))}
          <div className="pt-4 border-t border-white/20">
            <div className={`flex items-center space-x-2 text-sm mb-3 transition-colors duration-500 ${
              scrolled ? 'text-[var(--ayurveda-green)]' : 'text-white'
            }`}>
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </div>
            <Button className={`w-full text-white transition-colors duration-500 ${
              scrolled 
                ? 'bg-[var(--ayurveda-green)] hover:bg-[var(--ayurveda-sage)]' 
                : 'bg-[var(--ayurveda-gold)] hover:bg-[var(--ayurveda-earth)]'
            }`}>
              Book Appointment
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}