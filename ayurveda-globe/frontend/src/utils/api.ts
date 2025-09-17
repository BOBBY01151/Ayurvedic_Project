import axios from 'axios'
import toast from 'react-hot-toast'

// Create axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token')
          delete api.defaults.headers.common['Authorization']
          
          if (window.location.pathname !== '/login') {
            toast.error('Session expired. Please login again.')
            window.location.href = '/login'
          }
          break
          
        case 403:
          toast.error('Access denied. You do not have permission.')
          break
          
        case 404:
          toast.error('Resource not found.')
          break
          
        case 429:
          toast.error('Too many requests. Please try again later.')
          break
          
        case 500:
          toast.error('Server error. Please try again later.')
          break
          
        default:
          if (data?.error?.message) {
            toast.error(data.error.message)
          } else {
            toast.error('An unexpected error occurred.')
          }
      }
    } else if (error.request) {
      // Network error
      toast.error('Network error. Please check your connection.')
    } else {
      // Other error
      toast.error('An unexpected error occurred.')
    }
    
    return Promise.reject(error)
  }
)

export default api
