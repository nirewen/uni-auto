'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react'
import { useState } from 'react'
import { MealCard } from './components/meal-card'

const weekdays = [
  { long: 'Segunda-feira', short: 'S' },
  { long: 'Terça-feira', short: 'T' },
  { long: 'Quarta-feira', short: 'Q' },
  { long: 'Quinta-feira', short: 'Q' },
  { long: 'Sexta-feira', short: 'S' },
  { long: 'Sábado', short: 'S' },
]

const meals = [
  {
    id: 1,
    name: 'Café',
    icon: 'https://img.icons8.com/fluency/56/breakfast.png',
    active: true,
  },
  {
    id: 2,
    name: 'Almoço',
    icon: 'https://img.icons8.com/fluency/56/lunch.png',
  },
  {
    id: 3,
    name: 'Jantar',
    icon: 'https://img.icons8.com/fluency/56/dinner.png',
  },
  {
    id: 4,
    name: 'Marmitex\nalmoço',
    icon: 'https://img.icons8.com/fluency/56/plastic-food-container.png',
  },
  {
    id: 5,
    name: 'Marmitex\njantar',
    icon: 'https://img.icons8.com/fluency/56/plastic-food-container.png',
  },
  {
    id: 6,
    name: 'Kit distribuição\ncafé',
    icon: 'https://img.icons8.com/fluency/56/cafe.png',
  },
  {
    id: 7,
    name: 'Kit distribuição\nalmoço',
    icon: 'https://img.icons8.com/fluency/56/food.png',
  },
  {
    id: 8,
    name: 'Kit distribuição\njantar',
    icon: 'https://img.icons8.com/fluency/56/cutlery.png',
  },
  {
    id: 9,
    name: 'Kit distribuição\n(C + A + J)',
    icon: 'https://img.icons8.com/fluency/56/halal-food.png',
  },
  {
    id: 9,
    name: 'Kit distribuição\n(Almoço + Jantar)',
    icon: 'https://img.icons8.com/fluency/56/halal-food.png',
  },
]

function RUSettings() {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className='flex gap-2 border border-solid rounded-lg bg-neutral-800 border-neutral-700'>
      <div
        className={cn(
          'flex flex-col gap-2 p-2 border-r border-solid rounded-l-lg bg-neutral-900 border-neutral-700 select-none w-16 transition-[width]',
          {
            'w-56': expanded,
          }
        )}
      >
        <div
          className={cn(
            'flex items-center justify-end h-10 gap-2 p-2 whitespace-nowrap',
            {
              'justify-center': !expanded,
            }
          )}
          onClick={() => setExpanded(value => !value)}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {expanded ? (
                  <ArrowLeftToLine className='w-5 h-5' />
                ) : (
                  <ArrowRightToLine className='w-5 h-5' />
                )}
              </TooltipTrigger>
              <TooltipContent side='right'>
                <p>{expanded ? 'Fechar' : 'Abrir'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {weekdays.map((weekday, index) => (
          <div
            key={index}
            className={cn(
              'flex gap-2 p-2 rounded-md cursor-pointer whitespace-nowrap transition-[padding-left,padding-right]',
              {
                'bg-neutral-800': index === 0,
                'px-4': !expanded,
              }
            )}
          >
            {expanded ? weekday.long : weekday.short}
          </div>
        ))}
      </div>
      <div className='flex flex-col w-full gap-2 p-2 pl-0'>
        <div className='flex items-center gap-2'>
          <div className='flex gap-2 p-2 text-sm rounded-md bg-neutral-700'>
            Restaurante 1
          </div>
          <div className='flex gap-2 p-2 text-sm rounded-md blur-[1px]'>
            Restaurante 2
          </div>
          <span className='text-sm text-muted-foreground'>
            Refeições sujeitas a benefício do usuário
          </span>
        </div>
        <div className='grid h-full grid-rows-2 gap-2'>
          <div className='grid grid-cols-5 gap-2'>
            {meals.slice(0, 5).map((meal, index) => (
              <MealCard key={index} {...meal} />
            ))}
          </div>
          <div className='grid grid-cols-5 gap-2'>
            {meals.slice(5).map((meal, index) => (
              <MealCard key={index} {...meal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { RUSettings }
