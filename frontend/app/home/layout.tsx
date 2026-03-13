import React from 'react'
import Siderbar from '../layout/Siderbar'
import Header from "../layout/Header"
import Footer from "../layout/Footer"

export default function layout({ children }: any) {
  return (
    <div><Header />
      <div className="flex">
        <Siderbar />
        {children}
      </div>
      <Footer />
    </div>
  )
}