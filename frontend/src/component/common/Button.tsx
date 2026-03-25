import React, {useState } from 'react'

type Props = {
  className?: string,
  text?: string,
  children?: React.ReactNode,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button(props: Props) {
  const { className, children, onClick } = props
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    await onClick?.(e);
    setLoading(false);
  }

  return (
    <button 
      className={`py-2 px-3 mt-3 cursor-pointer ${className || ''}`} 
      onClick={handleSubmit} 
      disabled={loading}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}