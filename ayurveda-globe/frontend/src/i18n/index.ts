import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en', // Default language
    fallbackLng: 'en',
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    resources: {
      en: {
        translation: {
          // Navigation
          treatments: 'Treatments',
          practitioners: 'Practitioners', 
          clinics: 'Clinics',
          about: 'About',
          
          // Common actions
          book_now: 'Book Now',
          learn_more: 'Learn More',
          contact_us: 'Contact Us',
          get_started: 'Get Started',
          
          // Home page
          hero_title: 'Discover Authentic Ayurvedic Wellness in Sri Lanka',
          hero_subtitle: 'Experience traditional healing with certified practitioners at verified clinics across the beautiful island of Sri Lanka.',
          
          // Treatment categories
          panchakarma: 'Panchakarma',
          massage_therapy: 'Massage Therapy',
          herbal_treatment: 'Herbal Treatment',
          yoga_meditation: 'Yoga & Meditation',
          consultation: 'Consultation',
          
          // Locations
          colombo: 'Colombo',
          kandy: 'Kandy',
          galle: 'Galle',
          negombo: 'Negombo',
          ella: 'Ella',
          nuwara_eliya: 'Nuwara Eliya',
          
          // Booking
          select_treatment: 'Select Treatment',
          select_practitioner: 'Select Practitioner',
          select_date_time: 'Select Date & Time',
          confirm_booking: 'Confirm Booking',
          
          // Forms
          name: 'Name',
          email: 'Email',
          phone: 'Phone',
          message: 'Message',
          submit: 'Submit',
          cancel: 'Cancel',
          
          // Status
          loading: 'Loading...',
          error: 'Error',
          success: 'Success',
          
          // Footer
          footer_description: 'Discover authentic Ayurvedic treatments and wellness experiences in the beautiful island of Sri Lanka.',
          quick_links: 'Quick Links',
          services: 'Services',
          contact: 'Contact',
          
          // Currencies
          lkr: 'Sri Lankan Rupee',
          usd: 'US Dollar',
          eur: 'Euro',
        }
      }
    }
  })

export default i18n
