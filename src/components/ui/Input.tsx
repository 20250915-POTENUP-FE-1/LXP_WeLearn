'use client'
import { useState } from 'react'
import { InputProps } from './types'
import ShowHideButton from './ShowHideButton'

export const Input = ({
  label,
  type,
  id,
  name,
  placeholder,
  required,
  minLength,
  value,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type
  return (
    <div>
      <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={inputType}
          id={id}
          name={name}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
          value={value}
          required={required}
          minLength={minLength}
        />
        {isPassword && (
          <ShowHideButton
            show={showPassword}
            onToggle={() => {
              setShowPassword((prev) => !prev)
            }}
          />
        )}
      </div>
    </div>
  )
}
