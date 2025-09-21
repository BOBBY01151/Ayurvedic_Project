import apiClient from './apiClient'

const bookingService = {
  // Create new booking
  createBooking: async (bookingData) => {
    const response = await apiClient.post('/bookings', bookingData)
    return response
  },

  // Get user's bookings
  getUserBookings: async (params = {}) => {
    const response = await apiClient.get('/bookings', { params })
    return response
  },

  // Get booking by ID
  getBookingById: async (id) => {
    const response = await apiClient.get(`/bookings/${id}`)
    return response
  },

  // Update booking
  updateBooking: async (id, bookingData) => {
    const response = await apiClient.put(`/bookings/${id}`, bookingData)
    return response
  },

  // Cancel booking
  cancelBooking: async (id, reason) => {
    const response = await apiClient.post(`/bookings/${id}/cancel`, { reason })
    return response
  },

  // Reschedule booking
  rescheduleBooking: async (id, newDateTime) => {
    const response = await apiClient.post(`/bookings/${id}/reschedule`, { newDateTime })
    return response
  },

  // Get booking availability
  getAvailability: async (params) => {
    const response = await apiClient.get('/bookings/availability', { params })
    return response
  },

  // Confirm booking
  confirmBooking: async (id) => {
    const response = await apiClient.post(`/bookings/${id}/confirm`)
    return response
  },

  // Get booking status
  getBookingStatus: async (id) => {
    const response = await apiClient.get(`/bookings/${id}/status`)
    return response
  },

  // Add booking notes
  addBookingNotes: async (id, notes) => {
    const response = await apiClient.post(`/bookings/${id}/notes`, { notes })
    return response
  },

  // Rate booking
  rateBooking: async (id, rating, review) => {
    const response = await apiClient.post(`/bookings/${id}/rate`, { rating, review })
    return response
  },

  // Get booking reminders
  getBookingReminders: async (id) => {
    const response = await apiClient.get(`/bookings/${id}/reminders`)
    return response
  }
}

export default bookingService
