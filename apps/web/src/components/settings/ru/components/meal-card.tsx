'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'
import { Balancer } from 'react-wrap-balancer'

interface Meal {
  id: number
  name: string
  icon: string
  active?: boolean
}

export function MealCard({ name, icon, ...props }: Meal) {
  const [active, setActive] = useState(props.active)

  return (
    <div
      className={cn(
        'grid gap-2 p-2 border border-solid rounded-md place-items-center bg-neutral-700 border-neutral-600 select-none',
        {
          'outline outline-blue-400 outline-[3px] -outline-offset-2': active,
        }
      )}
      onClick={() => setActive(a => !a)}
    >
      <Image src={icon} width='56' height='56' alt={name} />
      <span className='text-xs text-center'>
        <Balancer>{name}</Balancer>
      </span>
    </div>
  )
}
