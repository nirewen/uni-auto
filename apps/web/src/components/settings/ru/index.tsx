import { cn } from '@/lib/utils'
import { ArrowLeftToLine } from 'lucide-react'
import { MealCard } from './components/meal-card'

const weekdays = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
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
    name: 'Marmitex almoço',
    icon: 'https://img.icons8.com/fluency/56/plastic-food-container.png',
  },
  {
    id: 5,
    name: 'Marmitex jantar',
    icon: 'https://img.icons8.com/fluency/56/plastic-food-container.png',
  },
  {
    id: 6,
    name: 'Kit distribuição café',
    icon: 'https://img.icons8.com/fluency/56/cafe.png',
  },
  {
    id: 7,
    name: 'Kit distribuição almoço',
    icon: 'https://img.icons8.com/fluency/56/food.png',
  },
  {
    id: 8,
    name: 'Kit distribuição jantar',
    icon: 'https://img.icons8.com/fluency/56/cutlery.png',
  },
  {
    id: 9,
    name: 'Kit distribuição (C + A + J)',
    icon: 'https://img.icons8.com/fluency/56/halal-food.png',
  },
  {
    id: 9,
    name: 'Kit distribuição (Almoço + Jantar)',
    icon: 'https://img.icons8.com/fluency/56/halal-food.png',
  },
]

function RUSettings() {
  return (
    <div className='flex gap-2 border border-solid rounded-lg bg-neutral-800 border-neutral-700'>
      <div className='flex flex-col gap-2 p-2 border-r border-solid rounded-l-lg bg-neutral-900 border-neutral-700'>
        <div className='flex items-center gap-2 p-2'>
          <ArrowLeftToLine className='w-4 h-4' />
          Diminuir
        </div>
        {weekdays.map((weekday, index) => (
          <div
            key={index}
            className={cn('flex gap-2 p-2 rounded-md w-44 cursor-pointer', {
              'bg-neutral-800': index === 0,
            })}
          >
            {weekday}
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
