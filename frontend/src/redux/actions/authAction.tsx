import axios from "axios"
import { jwtDecode } from "jwt-decode"

import { login, logout } from "../slices/authSlice"
import { setErrors, clearErrors } from "../slices/errorSlice"

import { setAuthToken } from "../../utils"

export const registerUser = async (user: any, router: any, dispatch: Function) => {
  try {
    dispatch(clearErrors({}))

    const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/auth/register`, user)

    if(res.data.type) {
      loginUser({email: user.email, password: user.password}, dispatch)
    }
  } catch (err: any) {
    dispatch(setErrors(err.response.data))
  }
}

export const loginUser = async (user: object, dispatch: Function) => {
  try {
    dispatch(clearErrors({}))

    const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/auth/login`, user)
    if(res.data.type) {
      const decoded = jwtDecode(res.data.result)

      dispatch(login(decoded))

      localStorage.setItem("token", res.data.result)

      setAuthToken(res.data.result)
      
    }
  } catch (err: any) {
    dispatch(setErrors(err.response.data))
  }
}

export const logoutUser = (dispatch: Function) => {
  dispatch(logout())
  setAuthToken(null)
  localStorage.removeItem("token")
}
