import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import treatmentService from '../../services/treatmentService'

// Async thunks
export const fetchTreatments = createAsyncThunk(
  'treatments/fetchTreatments',
  async (params, { rejectWithValue }) => {
    try {
      const response = await treatmentService.getTreatments(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const fetchTreatmentById = createAsyncThunk(
  'treatments/fetchTreatmentById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await treatmentService.getTreatmentById(id)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const searchTreatments = createAsyncThunk(
  'treatments/searchTreatments',
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await treatmentService.searchTreatments(searchParams)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const initialState = {
  treatments: [],
  featuredTreatments: [],
  treatment: null,
  isLoading: false,
  isDetailLoading: false,
  error: null,
  filters: {
    category: '',
    type: '',
    priceRange: [0, 10000],
    duration: '',
    sortBy: 'popularity'
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  }
}

const treatmentSlice = createSlice({
  name: 'treatments',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
      state.pagination.currentPage = 1 // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        type: '',
        priceRange: [0, 10000],
        duration: '',
        sortBy: 'popularity'
      }
      state.pagination.currentPage = 1
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload
    },
    setCategory: (state, action) => {
      state.filters.category = action.payload
      state.pagination.currentPage = 1
    },
    setType: (state, action) => {
      state.filters.type = action.payload
      state.pagination.currentPage = 1
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload
    },
    clearTreatment: (state) => {
      state.treatment = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Treatments
      .addCase(fetchTreatments.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTreatments.fulfilled, (state, action) => {
        state.isLoading = false
        state.treatments = action.payload.treatments || action.payload
        state.pagination = {
          currentPage: action.payload.pagination?.currentPage || 1,
          totalPages: action.payload.pagination?.totalPages || 1,
          totalItems: action.payload.pagination?.totalItems || action.payload.length,
          itemsPerPage: action.payload.pagination?.itemsPerPage || 12
        }
      })
      .addCase(fetchTreatments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Fetch Treatment by ID
      .addCase(fetchTreatmentById.pending, (state) => {
        state.isDetailLoading = true
        state.error = null
      })
      .addCase(fetchTreatmentById.fulfilled, (state, action) => {
        state.isDetailLoading = false
        state.treatment = action.payload
      })
      .addCase(fetchTreatmentById.rejected, (state, action) => {
        state.isDetailLoading = false
        state.error = action.payload
      })
      
      // Search Treatments
      .addCase(searchTreatments.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(searchTreatments.fulfilled, (state, action) => {
        state.isLoading = false
        state.treatments = action.payload.treatments || action.payload
        state.pagination = {
          currentPage: action.payload.pagination?.currentPage || 1,
          totalPages: action.payload.pagination?.totalPages || 1,
          totalItems: action.payload.pagination?.totalItems || action.payload.length,
          itemsPerPage: action.payload.pagination?.itemsPerPage || 12
        }
      })
      .addCase(searchTreatments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const {
  setFilters,
  clearFilters,
  setSortBy,
  setPriceRange,
  setCategory,
  setType,
  setCurrentPage,
  clearTreatment,
  clearError
} = treatmentSlice.actions

export default treatmentSlice.reducer
