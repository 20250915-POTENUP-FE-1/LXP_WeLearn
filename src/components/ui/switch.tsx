'use client'

import * as React from 'react'
import { Switch as SwitchPrimitive } from 'radix-ui'
import { cn } from '@/utils/cnUtils'

function Switch({
  className,
  size = 'xs',
  checked,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: 'xs' | 'sm' | 'default'
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      checked={checked}
      className={cn(
        'peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-400',

        // Root sizes
        'data-[size=default]:h-9 data-[size=default]:w-20',
        'data-[size=sm]:h-7 data-[size=sm]:w-17',
        'data-[size=xs]:h-6 data-[size=xs]:w-14',

        className,
      )}
      {...props}
    >
      {/* 배경 텍스트 */}
      <span className="pointer-events-none absolute left-1 text-xs font-bold text-white">OFF</span>
      <span className="pointer-events-none absolute right-1 text-xs font-bold text-white">ON</span>

      {/* Thumb */}
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block rounded-full bg-white ring-0 transition-transform',

          // Thumb sizes
          'group-data-[size=default]/switch:h-7 group-data-[size=default]/switch:w-10',
          'group-data-[size=sm]/switch:h-6 group-data-[size=sm]/switch:w-[34px]',
          'group-data-[size=xs]/switch:h-5 group-data-[size=xs]/switch:w-7',

          // 이동
          'data-[state=checked]:translate-x-[calc(100%-4px)] data-[state=unchecked]:translate-x-0',
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
