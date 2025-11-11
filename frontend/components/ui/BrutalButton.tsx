'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface BrutalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const variantStyles = {
  primary: 'bg-yellow-300 hover:bg-yellow-400 text-black',
  secondary: 'bg-white hover:bg-gray-50 text-black',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  success: 'bg-green-400 hover:bg-green-500 text-black',
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm font-bold',
  md: 'px-6 py-3 text-base font-bold',
  lg: 'px-8 py-4 text-lg font-black',
}

export const BrutalButton = React.forwardRef<HTMLButtonElement, BrutalButtonProps>(
  ({ className, variant = 'secondary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'brutal-border brutal-shadow',
          'transition-all duration-100 ease-in-out',
          'hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000]',
          'active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

BrutalButton.displayName = 'BrutalButton'
