"use client"

import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { setAuthToken } from "@/src/utils";

import { logoutUser } from "../../redux/actions/authAction";
import { login } from "../../redux/slices/authSlice"

export default function ProtectedRoute({ children }:any) {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state:any) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token")
    setAuthToken(token)
    if(token) {
      const decoded: any = jwtDecode(token)

      if(decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token")

        logoutUser(dispatch)

        router.push("/login")
      } else {
        dispatch(login(decoded))
        
        router.push("/home")
      }
    } else {
      if(pathname !== "/login" && pathname !== "/register") {
        logoutUser(dispatch)

        router.push("/login")
      }
    }

  }, [isAuthenticated, router]);

  return children;
}