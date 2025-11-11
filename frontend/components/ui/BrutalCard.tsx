'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface BrutalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'yellow' | 'black'
  hover?: boolean
  children: React.ReactNode
}

const variantStyles = {
  white: 'bg-white text-black',
  yellow: 'bg-yellow-300 text-black',
  black: 'bg-black text-white',
}

export const BrutalCard = React.forwardRef<HTMLDivElement, BrutalCardProps>(
  ({ className, variant = 'white', hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'brutal-border brutal-shadow-lg p-6',
          'transition-all duration-100',
          hover && 'hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_#000]',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

BrutalCard.displayName = 'BrutalCard'
