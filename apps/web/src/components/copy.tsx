import { cn } from '@/lib/utils'
import { CheckIcon, CopyIcon, LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Show } from './util/show'

type CopyProps = {
  icon?: LucideIcon
  className?: string
  iconClassName?: string
  spanClassName?: string
  content: string
  hideContent?: boolean
  onCopy?: () => void
}

export function Copy({
  icon: Icon = CopyIcon,
  className,
  iconClassName,
  spanClassName,
  content,
  hideContent,
  onCopy,
}: CopyProps) {
  const [copied, setCopied] = useState(false)

  function copyToClipboard() {
    navigator.clipboard.writeText(content).then(() => {
      if (onCopy) {
        onCopy()
      }

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    })
  }

  return (
    <div
      className={cn(
        'px-2 py-1 bg-neutral-800 rounded-md border text-nowrap border-neutral-700 flex gap-2 items-center cursor-pointer',
        className,
      )}
      onClick={copyToClipboard}
    >
      <Show when={!hideContent}>
        <span className={cn(spanClassName)}>{content}</span>
      </Show>
      <Show when={!copied}>
        <Icon className={cn('w-4 h-4 shrink-0', iconClassName)} />
      </Show>
      <Show when={copied}>
        <CheckIcon className={cn('w-4 h-4 shrink-0', iconClassName)} />
      </Show>
    </div>
  )
}
