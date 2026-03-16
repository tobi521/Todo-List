"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { redirect, usePathname } from "next/navigation"
import Button from "../../component/common/Button"

import Input from "../../component/common/Input"

import { loginUser } from "../../redux/actions/authAction"
import ProtectedRoute from "../../component/common/ProtectedRoute"

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const dispatch = useDispatch()
  const pathname = usePathname()

  const auth = useSelector((state: any) => state.auth)
  const error = useSelector((state: any) => state.error)

  useEffect(() => {
    if(auth.isAuthenticated) {
      redirect("/home")
    }
  }, [auth.isAuthenticated, pathname, dispatch])

  const handleKeyDown =(e: KeyboardEvent) => {
    if(e.key === "Enter"){
      handleSubmit(e as any)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginUser(user, dispatch)
  }

  return (
    <ProtectedRoute>
      <section className="flex text-gray-600 body-font bg-gradient-to-r from-cyan-500 to-fuchsia-500" onKeyDown={(e) => handleKeyDown(e as any)}>
        <div className="w-xl mt-20 mb-30 align-self-center px-5 py-30 mx-auto rounded-lg bg-white">
          <h1 className="text-center text-6xl flex justify-center text-gray-700">
            <div className="font-bold">Login</div>
          </h1>
          <div className="flex flex-col text-center mb-20 mt-10 justify-self-center w-full px-10">
            <Input
              name="email"
              type="email"
              value={user.email}
              title="Email"
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    }
              error={error.errors?.email}
              onChange={handleChange}
              placeholder="Type your email"
            />
            <Input
              name="password"
              type="password"
              value={user.password}
              title="Password"
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    }
              error={error.errors?.password}
              onChange={handleChange}
              placeholder="Type your password"
            />
            <Button onClick={(e:any) => handleSubmit(e)} className="bg-gradient-to-r from-cyan-400 to-fuchsia-600 text-white rounded">Log In</Button>
            <p className="text-sm mt-4 text-gray-500">Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => redirect("/register")}>Register</span></p>
          </div>
        </div>
      </section>
    </ProtectedRoute>
    
  )
}