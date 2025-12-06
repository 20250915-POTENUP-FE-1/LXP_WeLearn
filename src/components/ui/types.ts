export interface InputProps {
  id: string
  label?: string
  name: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  minLength?: number
  className?: string
}
