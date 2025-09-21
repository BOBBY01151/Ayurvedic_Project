import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import treatmentSlice from './slices/treatmentSlice'
import packageSlice from './slices/packageSlice'
import bookingSlice from './slices/bookingSlice'
import contentSlice from './slices/contentSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    treatments: treatmentSlice,
    packages: packageSlice,
    booking: bookingSlice,
    content: contentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export default store
