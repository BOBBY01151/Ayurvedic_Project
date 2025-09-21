import apiClient from './apiClient'

const authService = {
  // Register new user
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData)
    return response
  },

  // Login user
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password })
    return response
  },

  // Get user profile
  getProfile: async () => {
    const response = await apiClient.get('/auth/me')
    return response
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await apiClient.put('/auth/profile', profileData)
    return response
  },

  // Logout user
  logout: async () => {
    const response = await apiClient.post('/auth/logout')
    return response
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await apiClient.post('/auth/forgot-password', { email })
    return response
  },

  // Reset password
  resetPassword: async (token, password) => {
    const response = await apiClient.post('/auth/reset-password', { token, password })
    return response
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    const response = await apiClient.post('/auth/change-password', {
      currentPassword,
      newPassword
    })
    return response
  },

  // Verify email
  verifyEmail: async (token) => {
    const response = await apiClient.post('/auth/verify-email', { token })
    return response
  },

  // Resend verification email
  resendVerificationEmail: async () => {
    const response = await apiClient.post('/auth/resend-verification')
    return response
  }
}

export default authService
