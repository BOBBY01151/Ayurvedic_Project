import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import packageService from '../../services/packageService'

// Async thunks
export const fetchPackages = createAsyncThunk(
  'packages/fetchPackages',
  async (params, { rejectWithValue }) => {
    try {
      const response = await packageService.getPackages(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const fetchPackageById = createAsyncThunk(
  'packages/fetchPackageById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await packageService.getPackageById(id)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const searchPackages = createAsyncThunk(
  'packages/searchPackages',
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await packageService.searchPackages(searchParams)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

const initialState = {
  packages: [],
  featuredPackages: [],
  package: null,
  isLoading: false,
  isDetailLoading: false,
  error: null,
  filters: {
    type: '',
    city: '',
    priceRange: [0, 50000],
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

const packageSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
      state.pagination.currentPage = 1
    },
    clearFilters: (state) => {
      state.filters = {
        type: '',
        city: '',
        priceRange: [0, 50000],
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
    setType: (state, action) => {
      state.filters.type = action.payload
      state.pagination.currentPage = 1
    },
    setCity: (state, action) => {
      state.filters.city = action.payload
      state.pagination.currentPage = 1
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload
    },
    clearPackage: (state) => {
      state.package = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Packages
      .addCase(fetchPackages.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.isLoading = false
        state.packages = action.payload.packages || action.payload
        state.pagination = {
          currentPage: action.payload.pagination?.currentPage || 1,
          totalPages: action.payload.pagination?.totalPages || 1,
          totalItems: action.payload.pagination?.totalItems || action.payload.length,
          itemsPerPage: action.payload.pagination?.itemsPerPage || 12
        }
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Fetch Package by ID
      .addCase(fetchPackageById.pending, (state) => {
        state.isDetailLoading = true
        state.error = null
      })
      .addCase(fetchPackageById.fulfilled, (state, action) => {
        state.isDetailLoading = false
        state.package = action.payload
      })
      .addCase(fetchPackageById.rejected, (state, action) => {
        state.isDetailLoading = false
        state.error = action.payload
      })
      
      // Search Packages
      .addCase(searchPackages.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(searchPackages.fulfilled, (state, action) => {
        state.isLoading = false
        state.packages = action.payload.packages || action.payload
        state.pagination = {
          currentPage: action.payload.pagination?.currentPage || 1,
          totalPages: action.payload.pagination?.totalPages || 1,
          totalItems: action.payload.pagination?.totalItems || action.payload.length,
          itemsPerPage: action.payload.pagination?.itemsPerPage || 12
        }
      })
      .addCase(searchPackages.rejected, (state, action) => {
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
  setType,
  setCity,
  setCurrentPage,
  clearPackage,
  clearError
} = packageSlice.actions

export default packageSlice.reducer
