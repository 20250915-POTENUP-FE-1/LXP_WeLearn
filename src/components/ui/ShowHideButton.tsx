import { Eye, EyeClosed } from 'lucide-react'

interface ShowHideButtonProps {
  show: boolean
  onToggle: () => void
}
export default function ShowHideButton({ show, onToggle }: ShowHideButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 transition-colors hover:text-gray-600"
    >
      {!show ? <EyeClosed size={20} /> : <Eye size={20} />}
    </button>
  )
}
