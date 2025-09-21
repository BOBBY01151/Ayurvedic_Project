import apiClient from './apiClient'

const packageService = {
  // Get all packages with optional filters
  getPackages: async (params = {}) => {
    const response = await apiClient.get('/packages', { params })
    return response
  },

  // Get package by ID
  getPackageById: async (id) => {
    const response = await apiClient.get(`/packages/${id}`)
    return response
  },

  // Search packages
  searchPackages: async (searchParams) => {
    const response = await apiClient.get('/packages/search', { params: searchParams })
    return response
  },

  // Get featured packages
  getFeaturedPackages: async () => {
    const response = await apiClient.get('/packages/featured')
    return response
  },

  // Get packages by type
  getPackagesByType: async (type) => {
    const response = await apiClient.get(`/packages/type/${type}`)
    return response
  },

  // Get packages by city
  getPackagesByCity: async (city) => {
    const response = await apiClient.get(`/packages/city/${city}`)
    return response
  },

  // Get package types
  getTypes: async () => {
    const response = await apiClient.get('/packages/types')
    return response
  },

  // Get available cities
  getCities: async () => {
    const response = await apiClient.get('/packages/cities')
    return response
  },

  // Check package availability
  checkAvailability: async (packageId, startDate, endDate) => {
    const response = await apiClient.get(`/packages/${packageId}/availability`, {
      params: { startDate, endDate }
    })
    return response
  },

  // Get package pricing
  getPackagePricing: async (packageId, occupancy = 'single') => {
    const response = await apiClient.get(`/packages/${packageId}/pricing`, {
      params: { occupancy }
    })
    return response
  },

  // Rate package
  ratePackage: async (packageId, rating, review) => {
    const response = await apiClient.post(`/packages/${packageId}/rate`, {
      rating,
      review
    })
    return response
  },

  // Get package reviews
  getPackageReviews: async (packageId, params = {}) => {
    const response = await apiClient.get(`/packages/${packageId}/reviews`, { params })
    return response
  },

  // Get package inclusions/exclusions
  getPackageDetails: async (packageId) => {
    const response = await apiClient.get(`/packages/${packageId}/details`)
    return response
  }
}

export default packageService
