import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import ParallaxHero from '../components/ParallaxHero';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--ayurveda-cream)] via-white/70 to-[var(--ayurveda-sage)]/10">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--ayurveda-green)] via-[var(--ayurveda-sage)] to-[var(--ayurveda-earth)] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Main Content */}
      <main className="relative">
        {/* Parallax Hero Section */}
        <ParallaxHero />

        {/* Content Sections - These will scroll over the fixed background */}
        <div className="relative z-20 bg-gradient-to-br from-[var(--ayurveda-cream)] via-white/70 to-[var(--ayurveda-sage)]/10">
          {/* Services Section */}
          <ServicesSection />

          {/* About Section */}
          <AboutSection />

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* Contact Section */}
          <ContactSection />
        </div>
      </main>

      {/* Floating Elements for Extra Polish */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed top-1/4 left-4 w-16 h-16 rounded-full glass pointer-events-none"
        style={{
          background: `radial-gradient(circle, var(--ayurveda-sage)/20, transparent)`
        }}
      />

      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="fixed top-3/4 right-8 w-12 h-12 rounded-full glass pointer-events-none"
        style={{
          background: `radial-gradient(circle, var(--ayurveda-earth)/20, transparent)`
        }}
      />

      <motion.div
        animate={{
          x: [0, 10, 0],
          y: [0, -10, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="fixed top-1/2 right-4 w-20 h-20 rounded-full glass pointer-events-none"
        style={{
          background: `radial-gradient(circle, var(--ayurveda-teal)/15, transparent)`
        }}
      />
    </div>
  )
}
