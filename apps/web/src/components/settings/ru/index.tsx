import { cn } from '@/lib/utils'
import { CalendarDays } from 'lucide-react'
import { MealCard } from './components/meal-card'

const weekdays = [
  { long: 'Segunda-feira', short: 'S' },
  { long: 'Terça-feira', short: 'T' },
  { long: 'Quarta-feira', short: 'Q' },
  { long: 'Quinta-feira', short: 'Q' },
  { long: 'Sexta-feira', short: 'S' },
  { long: 'Sábado', short: 'S' },
]

const restaurantes = [
  {
    id: 1,
    name: 'Restaurante 1',
  },
  {
    id: 41,
    name: 'Restaurante 2',
  },
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
  return (
    <div className='flex border border-solid rounded-lg bg-neutral-800 border-neutral-700 max-h-80'>
      <div className='flex flex-col gap-2 p-2 border-r border-solid rounded-l-lg select-none bg-neutral-900 border-neutral-700'>
        <div className='flex items-center justify-end gap-2 p-2 whitespace-nowrap'>
          <CalendarDays className='w-4 h-4' />
        </div>
        {weekdays.map((weekday, index) => (
          <div
            key={index}
            className={cn(
              'flex gap-2 p-2 rounded-md cursor-pointer whitespace-nowrap h-8 leading-none justify-center font-bold',
              {
                'bg-neutral-800': index === 0,
              }
            )}
          >
            {weekday.short}
          </div>
        ))}
      </div>
      <div className='flex flex-col w-full gap-2 p-2'>
        <div className='flex items-center gap-2'>
          {restaurantes.map((restaurante, index) => (
            <div
              className={cn(
                'flex gap-2 px-2 py-1 text-sm rounded-md bg-neutral-800 border-neutral-700 border border-solid cursor-pointer whitespace-nowrap hover:bg-neutral-600 hover:border-neutral-500 hover:text-neutral-100 transition-colors',
                {
                  'bg-neutral-700 border-neutral-600': index === 0,
                }
              )}
            >
              {restaurante.name}
            </div>
          ))}
        </div>
        <div className='grid h-full grid-cols-2 gap-2 overflow-auto md:grid-cols-3 lg:grid-cols-5'>
          {meals.map((meal, index) => (
            <MealCard key={index} {...meal} />
          ))}
        </div>
      </div>
    </div>
  )
}

export { RUSettings }
