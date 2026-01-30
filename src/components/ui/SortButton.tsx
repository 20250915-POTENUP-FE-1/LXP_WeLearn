'use client'

import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'react-toastify'

export default function SortButton() {
  const handleSortClick = () => {
    toast.info('현재 서비스 준비중입니다')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:bg-gray-50">
          최신순
          <ChevronDown strokeWidth={1.5} size={14} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSortClick}>최신순</DropdownMenuItem>
          <DropdownMenuItem onClick={handleSortClick}>인기순</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
