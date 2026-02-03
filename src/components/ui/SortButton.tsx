'use client'

import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type SortOption = 'latest' | 'popular'

interface SortButtonProps {
  currentSort: SortOption
  onSortChange: (sort: SortOption) => void
  disabled?: boolean
}

const SORT_LABELS: Record<SortOption, string> = {
  latest: '최신순',
  popular: '인기순',
}

export default function SortButton({ currentSort, onSortChange, disabled }: SortButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <button
          className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled}
        >
          {SORT_LABELS[currentSort]}
          <ChevronDown strokeWidth={1.5} size={14} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => onSortChange('latest')}
            className={currentSort === 'latest' ? 'bg-gray-100' : ''}
          >
            최신순
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onSortChange('popular')}
            className={currentSort === 'popular' ? 'bg-gray-100' : ''}
          >
            인기순
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
