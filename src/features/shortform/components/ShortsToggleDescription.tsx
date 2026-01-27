'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

interface ShortsToggleDescriptionProps {
  description: string
}

export default function ShortsToggleDescription({ description }: ShortsToggleDescriptionProps) {
  const [isToggled, setIsToggled] = useState(false)

  return (
    <div className="mt-3">
      <AnimatePresence>
        <motion.div
          key={isToggled ? 'open' : 'closed'}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: 'auto',
            opacity: 1,
          }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            duration: 0.25,
            ease: 'easeInOut',
          }}
          className="overflow-hidden"
        >
          <p className={`text-sm leading-relaxed opacity-90 ${isToggled ? '' : 'line-clamp-2'}`}>
            {description}
          </p>

          {description.length > 60 && (
            <button
              onClick={() => setIsToggled(!isToggled)}
              className="mt-1 text-sm font-medium opacity-70 transition-opacity hover:opacity-100"
            >
              {isToggled ? '접기' : '더보기'}
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
