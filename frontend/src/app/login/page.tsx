"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { usePathname, useRouter } from "next/navigation"

import { loginUser } from "../../redux/actions/authAction"

import Button from "../../component/common/Button"
import Input from "../../component/common/Input"

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const dispatch = useDispatch()
  const pathname = usePathname()
  const router = useRouter()

  const auth = useSelector((state: any) => state.auth)
  const error = useSelector((state: any) => state.error)

  useEffect(() => {
    if(auth.isAuthenticated) {
      router.push("/home")
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
    // <ProtectedRoute>
      <section className="flex text-gray-600 body-font w-screen h-screen bg-taupe-200" onKeyDown={(e) => handleKeyDown(e as any)}>
        <div className="w-2xl align-self-center px-5 py-20 mx-auto rounded-md bg-white shadow-lg my-auto">
          <div className="flex flex-col text-center w-full px-10">
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
            <Button onClick={(e:any) => handleSubmit(e)} className="bg-cyan-400 text-white rounded text-xl hover:bg-cyan-500">Log In</Button>
            <p 
              className="text-sm mt-4 text-gray-500"
            >
              Don't have an account? 
              <span className="text-blue-500 cursor-pointer" onClick={() => router.push("/register")}>Register</span></p>
          </div>
        </div>
      </section>
    //  </ProtectedRoute>
  )
}