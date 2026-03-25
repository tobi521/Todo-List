import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import listReducer from './slices/listSlice'
import errorReducer from './slices/errorSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    list: listReducer,
    error: errorReducer
  },
});