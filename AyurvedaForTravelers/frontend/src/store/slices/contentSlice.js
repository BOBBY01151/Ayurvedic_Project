import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import contentService from '../services/contentService'

// Async thunks
export const fetchBlogPosts = createAsyncThunk(
  'content/fetchBlogPosts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await contentService.getBlogPosts(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const fetchBlogPostBySlug = createAsyncThunk(
  'content/fetchBlogPostBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await contentService.getBlogPostBySlug(slug)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const fetchFAQ = createAsyncThunk(
  'content/fetchFAQ',
  async (_, { rejectWithValue }) => {
    try {
      const response = await contentService.getFAQ()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const fetchTestimonials = createAsyncThunk(
  'content/fetchTestimonials',
  async (params, { rejectWithValue }) => {
    try {
      const response = await contentService.getTestimonials(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const initialState = {
  blogPosts: [],
  featuredBlogPosts: [],
  blogPost: null,
  faq: [],
  testimonials: [],
  isLoading: false,
  isDetailLoading: false,
  error: null,
  blogFilters: {
    category: '',
    tags: [],
    search: '',
    sortBy: 'publishedAt'
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  }
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setBlogFilters: (state, action) => {
      state.blogFilters = { ...state.blogFilters, ...action.payload }
      state.pagination.currentPage = 1
    },
    clearBlogFilters: (state) => {
      state.blogFilters = {
        category: '',
        tags: [],
        search: '',
        sortBy: 'publishedAt'
      }
      state.pagination.currentPage = 1
    },
    setBlogSortBy: (state, action) => {
      state.blogFilters.sortBy = action.payload
    },
    setBlogCategory: (state, action) => {
      state.blogFilters.category = action.payload
      state.pagination.currentPage = 1
    },
    setBlogSearch: (state, action) => {
      state.blogFilters.search = action.payload
      state.pagination.currentPage = 1
    },
    addBlogTag: (state, action) => {
      if (!state.blogFilters.tags.includes(action.payload)) {
        state.blogFilters.tags.push(action.payload)
        state.pagination.currentPage = 1
      }
    },
    removeBlogTag: (state, action) => {
      state.blogFilters.tags = state.blogFilters.tags.filter(
        tag => tag !== action.payload
      )
      state.pagination.currentPage = 1
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload
    },
    clearBlogPost: (state) => {
      state.blogPost = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Blog Posts
      .addCase(fetchBlogPosts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.blogPosts = action.payload.posts || action.payload
        state.pagination = {
          currentPage: action.payload.pagination?.currentPage || 1,
          totalPages: action.payload.pagination?.totalPages || 1,
          totalItems: action.payload.pagination?.totalItems || action.payload.length,
          itemsPerPage: action.payload.pagination?.itemsPerPage || 12
        }
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Fetch Blog Post by Slug
      .addCase(fetchBlogPostBySlug.pending, (state) => {
        state.isDetailLoading = true
        state.error = null
      })
      .addCase(fetchBlogPostBySlug.fulfilled, (state, action) => {
        state.isDetailLoading = false
        state.blogPost = action.payload
      })
      .addCase(fetchBlogPostBySlug.rejected, (state, action) => {
        state.isDetailLoading = false
        state.error = action.payload
      })
      
      // Fetch FAQ
      .addCase(fetchFAQ.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchFAQ.fulfilled, (state, action) => {
        state.isLoading = false
        state.faq = action.payload
      })
      .addCase(fetchFAQ.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Fetch Testimonials
      .addCase(fetchTestimonials.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.isLoading = false
        state.testimonials = action.payload
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const {
  setBlogFilters,
  clearBlogFilters,
  setBlogSortBy,
  setBlogCategory,
  setBlogSearch,
  addBlogTag,
  removeBlogTag,
  setCurrentPage,
  clearBlogPost,
  clearError
} = contentSlice.actions

export default contentSlice.reducer
