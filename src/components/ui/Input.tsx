'use client'

import { forwardRef, useState } from 'react'
import ShowHideButton from './ShowHideButton'
import { InputProps } from './types'
import { cn } from '@/lib/utils'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, type = 'text', required, className, id, variant, rightButton, autoFocus, ...props },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const isSearch = variant === 'search'

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type
    const inputId = id || props.name // id 없으면 name으로 자동 연결

    // 공통 UI
    const baseClassName =
      'w-full rounded-lg border border-gray-200 px-4 text-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none'

    // 검색바 UI
    const searchClassName = 'bg-gray-100 py-2.5 pr-12 focus:ring-2 focus:ring-gray-900'

    // 기본 Input UI
    const defaultClassName = 'py-3 pr-12 focus:ring-2 focus:ring-gray-500'

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            id={inputId}
            type={inputType}
            {...props}
            className={cn(baseClassName, isSearch ? searchClassName : defaultClassName, className)}
          />

          {isPassword && (
            <ShowHideButton show={showPassword} onToggle={() => setShowPassword((p) => !p)} />
          )}
          {isSearch && rightButton && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2">{rightButton}</div>
          )}
        </div>
      </div>
    )
  },
)

Input.displayName = 'Input'
