import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'

// Pages
import Home from './pages/Home'
import Treatments from './pages/Treatments'
import TreatmentDetail from './pages/TreatmentDetail'
import Packages from './pages/Packages'
import PackageDetail from './pages/PackageDetail'
import Therapists from './pages/Therapists'
import Booking from './pages/Booking'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import Blog from './pages/Blog'
import Article from './pages/Article'
import FAQ from './pages/FAQ'
import AboutSriLanka from './pages/AboutSriLanka'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import AdminTreatments from './pages/AdminTreatments'
import AdminPackages from './pages/AdminPackages'
import AdminBookings from './pages/AdminBookings'
import AdminArticles from './pages/AdminArticles'
import AdminUsers from './pages/AdminUsers'
import AdminSettings from './pages/AdminSettings'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/treatments/:id" element={<TreatmentDetail />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetail />} />
          <Route path="/therapists" element={<Therapists />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about-sri-lanka" element={<AboutSriLanka />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/booking" element={<Booking />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/treatments" element={<AdminTreatments />} />
          <Route path="/admin/packages" element={<AdminPackages />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/articles" element={<AdminArticles />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* 404 Route */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-8">Page not found</p>
                <a href="/" className="text-emerald-600 hover:text-emerald-700">
                  Go back home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </main>
    </div>
  )
}

export default App
