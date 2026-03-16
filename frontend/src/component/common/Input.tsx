import React from 'react'

type InputProps = {
  name?: string,
  type?: string,
  value?: string,
  error?: string,
  title?: string,
  placeholder?: string,
  icon?: React.ReactNode,
  others?: React.InputHTMLAttributes<HTMLInputElement>,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ name, type, value, error, title, placeholder, icon, onChange, ...other }: InputProps) {
  return (
    <div className='align-start my-4'>
      <label className="block text-sm font-medium text-gray-700 text-left mt-1">
        {title}
      </label>
      <div className="flex items-center border-b-2 border-gray-300 bg-white px-2 rounded">
        <span className='self-center'>
          {icon}
        </span>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-white rounded-t-lgtext-base outline-none text-gray-700 py-3 leading-8 transition-colors duration-200 ease-in-out pl-2 text-lg"
          {...other}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1 text-left">{error}</p>}
    </div>
  )
}