import { Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { Treatments } from '@/pages/Treatments'
import { Practitioners } from '@/pages/Practitioners'
import { Clinics } from '@/pages/Clinics'
import { Booking } from '@/pages/Booking'
import { Checkout } from '@/pages/Checkout'
import { About } from '@/pages/About'
import { AdminDashboard } from '@/pages/AdminDashboard'

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/treatments" element={<Treatments />} />
      <Route path="/practitioners" element={<Practitioners />} />
      <Route path="/clinics" element={<Clinics />} />
      <Route path="/about" element={<About />} />
      
      {/* Protected Routes - TODO: Add route protection */}
      <Route path="/booking" element={<Booking />} />
      <Route path="/checkout" element={<Checkout />} />
      
      {/* Admin Routes - TODO: Add admin protection */}
      <Route path="/admin/*" element={<AdminDashboard />} />
      
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
  )
}
