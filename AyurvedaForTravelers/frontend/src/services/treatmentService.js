import apiClient from './apiClient'

const treatmentService = {
  // Get all treatments with optional filters
  getTreatments: async (params = {}) => {
    const response = await apiClient.get('/treatments', { params })
    return response
  },

  // Get treatment by ID
  getTreatmentById: async (id) => {
    const response = await apiClient.get(`/treatments/${id}`)
    return response
  },

  // Search treatments
  searchTreatments: async (searchParams) => {
    const response = await apiClient.get('/treatments/search', { params: searchParams })
    return response
  },

  // Get featured treatments
  getFeaturedTreatments: async () => {
    const response = await apiClient.get('/treatments/featured')
    return response
  },

  // Get treatments by category
  getTreatmentsByCategory: async (category) => {
    const response = await apiClient.get(`/treatments/category/${category}`)
    return response
  },

  // Get treatment categories
  getCategories: async () => {
    const response = await apiClient.get('/treatments/categories')
    return response
  },

  // Get treatment types
  getTypes: async () => {
    const response = await apiClient.get('/treatments/types')
    return response
  },

  // Get treatment availability
  getTreatmentAvailability: async (treatmentId, therapistId, date) => {
    const response = await apiClient.get(`/treatments/${treatmentId}/availability`, {
      params: { therapistId, date }
    })
    return response
  },

  // Rate treatment
  rateTreatment: async (treatmentId, rating, review) => {
    const response = await apiClient.post(`/treatments/${treatmentId}/rate`, {
      rating,
      review
    })
    return response
  },

  // Get treatment reviews
  getTreatmentReviews: async (treatmentId, params = {}) => {
    const response = await apiClient.get(`/treatments/${treatmentId}/reviews`, { params })
    return response
  }
}

export default treatmentService
