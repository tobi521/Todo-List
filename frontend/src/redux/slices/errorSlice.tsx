import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ErrorState {
  errors: Object
}

const initialState: ErrorState = {
  errors: {}
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<any>) => {
      state.errors = action.payload
    },
    clearErrors: (state, action: PayloadAction<any>) => {
      state.errors = {};
    }
  }
})

export const { setErrors, clearErrors } = errorSlice.actions

export default errorSlice.reducer
