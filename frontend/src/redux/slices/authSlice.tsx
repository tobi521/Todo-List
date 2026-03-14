import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  isAuthenticated: boolean,
  user: any
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {}
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{}>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    }
  }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
