"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerUser } from "../../redux/actions/authAction"
import ProtectedRoute from "../../component/common/ProtectedRoute"
import Input from "../../component/common/Input"
import { useDispatch, useSelector } from "react-redux"
import Button from "../../component/common/Button"

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const dispatch = useDispatch()
  const router = useRouter()
  const error = useSelector((state: any) => state.error)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value })
  }

  const handleKeyDown =(e: KeyboardEvent) => {
    if(e.key === "Enter"){
      handleSubmit(e as any)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser(user, router, dispatch);
  }

  return (
    <ProtectedRoute>
      <section className="flex text-gray-600 body-font bg-gradient-to-r from-cyan-500 to-fuchsia-500" onKeyDown={(e) => handleKeyDown(e as any)}>
        <div className="w-xl my-10 align-self-center px-5 py-24 mx-auto rounded-lg bg-white">
          <h1 className="text-center text-6xl flex justify-center text-gray-700">
            <div className="font-bold">Register</div>
          </h1>
          <div className="flex flex-col text-center mb-20 mt-10 justify-self-center w-full px-10">
            <Input
              name="name"
              type="text"
              value={user.name}
              title="Name"
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    }
              error={error.errors?.name}
              onChange={handleChange}
              placeholder="Type your name"
            />
            <Input
              name="email"
              type="email"
              value={user.email}
              title="Email"
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
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
            <Input
              name="confirmPassword"
              type="password"
              value={user.confirmPassword}
              title="Confirm Password"
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    }         
              error={error.errors?.confirmPassword}
              onChange={handleChange}
              placeholder="Type your confirm password"
            />
            <Button onClick={(e:any) => handleSubmit(e)} className="bg-gradient-to-r from-cyan-400 to-fuchsia-600 text-white rounded">Register</Button>
            <p className="text-sm mt-4 text-gray-500">Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => router.push("/login")}>Login</span></p>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  )
}