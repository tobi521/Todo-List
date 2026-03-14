import { login, logout } from "../slices/authSlice"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

export const registerUser = async (user: object, redirect: Function) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/auth/register`, user)

    if(res.data.type) {
      redirect("/login")
    }
  } catch (error) {
    console.log(error)
  }
}

export const loginUser = async (user: object, dispatch: Function) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL}/api/auth/login`, user)
    if(res.data.type) {
      const decoded = jwtDecode(res.data.result)

      dispatch(login(decoded))

      localStorage.setItem("token", res.data.result)
    }
  } catch (error) {
    console.log(error)
  }
}

export const logoutUser = (dispatch: Function) => {
  dispatch(logout())
  localStorage.removeItem("token")
}