'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import * as React from 'react'

import { cn } from '~/lib/utils'

function Progress({
  className,
  max,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const translatePercentage =
    100 - Math.min(100, ((value ?? 0) / (max ?? 100)) * 100)

  return (
    <ProgressPrimitive.Root
      max={max}
      value={value}
      className={cn(
        'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className='bg-primary h-full w-full flex-1 transition-all'
        style={{
          transform: `translateX(-${translatePercentage.toString()}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
