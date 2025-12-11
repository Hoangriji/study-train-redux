import { configureStore } from '@reduxjs/toolkit';
import personReducer from './slices/personSlice';

// Configure Redux store
const store = configureStore({
  reducer: {
    persons: personReducer,
  },
});

export default store;
