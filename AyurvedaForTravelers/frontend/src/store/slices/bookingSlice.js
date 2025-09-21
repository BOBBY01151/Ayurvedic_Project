import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currency: 'USD',
  selectedTreatment: null,
  selectedPackage: null,
  selectedTherapist: null,
  selectedDateTime: null,
  customerInfo: {
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    nationality: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  },
  medicalInfo: {
    conditions: [],
    medications: [],
    allergies: [],
    specialRequirements: ''
  },
  bookingNotes: '',
  isLoading: false,
  error: null
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload
    },
    setSelectedTreatment: (state, action) => {
      state.selectedTreatment = action.payload
      state.selectedPackage = null // Clear package if treatment is selected
    },
    setSelectedPackage: (state, action) => {
      state.selectedPackage = action.payload
      state.selectedTreatment = null // Clear treatment if package is selected
    },
    setSelectedTherapist: (state, action) => {
      state.selectedTherapist = action.payload
    },
    setSelectedDateTime: (state, action) => {
      state.selectedDateTime = action.payload
    },
    updateCustomerInfo: (state, action) => {
      state.customerInfo = { ...state.customerInfo, ...action.payload }
    },
    updateMedicalInfo: (state, action) => {
      state.medicalInfo = { ...state.medicalInfo, ...action.payload }
    },
    setBookingNotes: (state, action) => {
      state.bookingNotes = action.payload
    },
    addMedicalCondition: (state, action) => {
      state.medicalInfo.conditions.push(action.payload)
    },
    removeMedicalCondition: (state, action) => {
      state.medicalInfo.conditions = state.medicalInfo.conditions.filter(
        (condition, index) => index !== action.payload
      )
    },
    addMedication: (state, action) => {
      state.medicalInfo.medications.push(action.payload)
    },
    removeMedication: (state, action) => {
      state.medicalInfo.medications = state.medicalInfo.medications.filter(
        (medication, index) => index !== action.payload
      )
    },
    addAllergy: (state, action) => {
      state.medicalInfo.allergies.push(action.payload)
    },
    removeAllergy: (state, action) => {
      state.medicalInfo.allergies = state.medicalInfo.allergies.filter(
        (allergy, index) => index !== action.payload
      )
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    resetBooking: (state) => {
      return {
        ...initialState,
        currency: state.currency // Keep currency preference
      }
    }
  }
})

export const {
  setCurrency,
  setSelectedTreatment,
  setSelectedPackage,
  setSelectedTherapist,
  setSelectedDateTime,
  updateCustomerInfo,
  updateMedicalInfo,
  setBookingNotes,
  addMedicalCondition,
  removeMedicalCondition,
  addMedication,
  removeMedication,
  addAllergy,
  removeAllergy,
  setLoading,
  setError,
  clearError,
  resetBooking
} = bookingSlice.actions

export default bookingSlice.reducer
