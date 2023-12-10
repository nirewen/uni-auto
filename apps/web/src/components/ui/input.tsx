import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixComponent?: React.ReactNode
  suffixComponent?: React.ReactNode
  inputClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefixComponent, suffixComponent, inputClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          className
        )}
      >
        {prefixComponent}
        <input
          type={type}
          ref={ref}
          className={cn(
            'flex-1 bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none',
            inputClassName
          )}
          {...props}
        />
        {suffixComponent}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
