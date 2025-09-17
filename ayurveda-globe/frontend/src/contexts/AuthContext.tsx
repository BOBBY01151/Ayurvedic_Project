import { createContext, useState, useEffect, ReactNode } from 'react'
import { api } from '@/utils/api'
import toast from 'react-hot-toast'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin' | 'practitioner'
  preferences: {
    currency: 'LKR' | 'USD' | 'EUR'
    language: string
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
  country?: string
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchProfile()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get('/auth/me')
      setUser(response.data.data.user)
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token, user: userData } = response.data.data
      
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(userData)
      
      toast.success('Welcome back!')
    } catch (error: any) {
      const message = error.response?.data?.error?.message || 'Login failed'
      toast.error(message)
      throw error
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      const response = await api.post('/auth/register', userData)
      const { token, user: newUser } = response.data.data
      
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(newUser)
      
      toast.success('Account created successfully!')
    } catch (error: any) {
      const message = error.response?.data?.error?.message || 'Registration failed'
      toast.error(message)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    toast.success('Logged out successfully')
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await api.put('/auth/profile', data)
      setUser(response.data.data.user)
      toast.success('Profile updated successfully')
    } catch (error: any) {
      const message = error.response?.data?.error?.message || 'Update failed'
      toast.error(message)
      throw error
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

