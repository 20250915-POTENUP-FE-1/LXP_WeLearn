import { User } from 'lucide-react'

function ShortsCreateInfo() {
  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-0 rounded-lg px-4 pb-10 text-white backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
          <User strokeWidth={1.5} color="#333" />
        </div>
        <div>
          <p className="font-medium">UserName</p>
          <p className="text-sm opacity-90">lessonTitle</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed opacity-90">lessonDescription</p>
    </div>
  )
}

export default ShortsCreateInfo
