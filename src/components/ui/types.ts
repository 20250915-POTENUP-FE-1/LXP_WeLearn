import { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  variant?: string
  rightButton?: React.ReactNode
  autoFocus?: boolean
}
