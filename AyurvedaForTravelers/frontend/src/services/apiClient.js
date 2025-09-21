import axios from 'axios'
import toast from 'react-hot-toast'

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
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

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { response } = error
    
    if (response) {
      const { status, data } = response
      
      // Handle different error status codes
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token')
          if (window.location.pathname !== '/login') {
            toast.error('Session expired. Please login again.')
            window.location.href = '/login'
          }
          break
          
        case 403:
          toast.error('Access denied. You don\'t have permission to perform this action.')
          break
          
        case 404:
          toast.error('Resource not found.')
          break
          
        case 422:
          // Validation errors
          if (data.errors) {
            Object.values(data.errors).forEach(error => {
              toast.error(error)
            })
          } else {
            toast.error(data.message || 'Validation failed.')
          }
          break
          
        case 429:
          toast.error('Too many requests. Please try again later.')
          break
          
        case 500:
          toast.error('Server error. Please try again later.')
          break
          
        default:
          toast.error(data?.message || 'An unexpected error occurred.')
      }
    } else if (error.request) {
      // Network error
      toast.error('Network error. Please check your connection.')
    } else {
      // Other errors
      toast.error('An unexpected error occurred.')
    }
    
    return Promise.reject(error)
  }
)

export default apiClient
