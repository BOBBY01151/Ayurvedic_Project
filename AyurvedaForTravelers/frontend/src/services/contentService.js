import apiClient from './apiClient'

const contentService = {
  // Blog posts
  getBlogPosts: async (params = {}) => {
    const response = await apiClient.get('/content/blog', { params })
    return response
  },

  getBlogPostBySlug: async (slug) => {
    const response = await apiClient.get(`/content/blog/${slug}`)
    return response
  },

  getFeaturedBlogPosts: async () => {
    const response = await apiClient.get('/content/blog/featured')
    return response
  },

  getBlogCategories: async () => {
    const response = await apiClient.get('/content/blog/categories')
    return response
  },

  getBlogTags: async () => {
    const response = await apiClient.get('/content/blog/tags')
    return response
  },

  // FAQ
  getFAQ: async () => {
    const response = await apiClient.get('/content/faq')
    return response
  },

  getFAQByCategory: async (category) => {
    const response = await apiClient.get(`/content/faq/category/${category}`)
    return response
  },

  getFAQCategories: async () => {
    const response = await apiClient.get('/content/faq/categories')
    return response
  },

  // Testimonials
  getTestimonials: async (params = {}) => {
    const response = await apiClient.get('/content/testimonials', { params })
    return response
  },

  getFeaturedTestimonials: async () => {
    const response = await apiClient.get('/content/testimonials/featured')
    return response
  },

  getTestimonialsByTreatment: async (treatmentId) => {
    const response = await apiClient.get(`/content/testimonials/treatment/${treatmentId}`)
    return response
  },

  getTestimonialsByPackage: async (packageId) => {
    const response = await apiClient.get(`/content/testimonials/package/${packageId}`)
    return response
  },

  // Submit testimonial
  submitTestimonial: async (testimonialData) => {
    const response = await apiClient.post('/content/testimonials', testimonialData)
    return response
  },

  // Search content
  searchContent: async (query, type = 'all') => {
    const response = await apiClient.get('/content/search', {
      params: { q: query, type }
    })
    return response
  },

  // Contact form
  submitContactForm: async (contactData) => {
    const response = await apiClient.post('/content/contact', contactData)
    return response
  },

  // Newsletter subscription
  subscribeNewsletter: async (email) => {
    const response = await apiClient.post('/content/newsletter/subscribe', { email })
    return response
  },

  unsubscribeNewsletter: async (email) => {
    const response = await apiClient.post('/content/newsletter/unsubscribe', { email })
    return response
  }
}

export default contentService
