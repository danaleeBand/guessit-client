import * as React from 'react'
import { cn } from '@/lib/utils'

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'muted'
}

const Box = ({ className, ...props }: BoxProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50',
        className,
      )}
      {...props}
    />
  )
}

export default Box
