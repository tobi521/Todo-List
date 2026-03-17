import React from 'react'

type Props = {
  className?: string,
  text?: string,
  children?: React.ReactNode,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({ onClick, className, children, }: Props) {
  return (
    <button className={`py-3 px-4 mt-4 cursor-pointer ${className || ''}`} onClick={onClick} >
      {children}
    </button>
  )
}