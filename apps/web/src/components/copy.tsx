import { cn } from '@/lib/utils'
import { CheckIcon, CopyIcon, LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Show } from './util/show'

type CopyProps = {
  icon?: LucideIcon
  className?: string
  iconClassName?: string
  content: string
  hideContent?: boolean
  onCopy?: () => void
}

export function Copy({
  icon: Icon = CopyIcon,
  className,
  iconClassName,
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
        'px-2 py-1 bg-neutral-800 rounded-md border border-neutral-700 flex gap-2 items-center cursor-pointer w-min',
        className,
      )}
      onClick={copyToClipboard}
    >
      <Show when={!hideContent}>{content}</Show>
      <Show when={!copied}>
        <Icon className={cn('w-4 h-4', iconClassName)} />
      </Show>
      <Show when={copied}>
        <CheckIcon className={cn('w-4 h-4', iconClassName)} />
      </Show>
    </div>
  )
}
