import { cn } from '@/lib/utils'
import { CalendarDays } from 'lucide-react'
import { useState } from 'react'
import { Balancer } from 'react-wrap-balancer'
import { Settings } from '../../../:module_slug/modules/auto-ru'

interface RUSettingsProps {
  settings: Settings
  onSave: (settings: Settings) => void
}

const weekdays = [
  { weekday: 1, long: 'Segunda-feira', short: 'S' },
  { weekday: 2, long: 'Terça-feira', short: 'T' },
  { weekday: 3, long: 'Quarta-feira', short: 'Q' },
  { weekday: 4, long: 'Quinta-feira', short: 'Q' },
  { weekday: 5, long: 'Sexta-feira', short: 'S' },
  { weekday: 6, long: 'Sábado', short: 'S' },
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

function RUSettings({ settings, onSave }: RUSettingsProps) {
  const [restaurant, setRestaurant] = useState(restaurantes[0].id)
  const [weekday, setWeekday] = useState(1)
  const restaurantSettings = settings.days.filter(
    day => day.restaurant === restaurant && day.weekday === weekday
  )

  return (
    <div className='flex border border-solid rounded-lg bg-neutral-800 border-neutral-700 max-h-72 md:max-h-80'>
      <div className='flex flex-col gap-2 p-1 border-r border-solid rounded-l-lg select-none md:p-2 bg-neutral-900 border-neutral-700'>
        <div className='flex items-center justify-end gap-2 p-2 whitespace-nowrap'>
          <CalendarDays className='w-4 h-4' />
        </div>
        {weekdays.map((day, index) => (
          <div
            key={index}
            className={cn(
              'flex gap-2 p-2 rounded-md cursor-pointer whitespace-nowrap h-8 leading-none justify-center font-bold',
              {
                'bg-neutral-800': day.weekday === weekday,
              }
            )}
            onClick={() => setWeekday(day.weekday)}
          >
            {day.short}
          </div>
        ))}
      </div>
      <div className='flex flex-col w-full gap-2 p-2 overflow-hidden'>
        <div className='flex items-center h-8 gap-2 overflow-hidden overflow-x-auto shrink-0'>
          {restaurantes.map((restaurante, index) => (
            <div
              key={index}
              className={cn(
                'flex gap-2 px-2 py-1 text-sm rounded-md bg-neutral-800 border-neutral-700 border border-solid cursor-pointer whitespace-nowrap hover:bg-neutral-600 hover:border-neutral-500 hover:text-neutral-100 transition-colors select-none',
                {
                  'bg-neutral-700 border-neutral-600':
                    restaurante.id === restaurant,
                }
              )}
              onClick={() => setRestaurant(restaurante.id)}
            >
              {restaurante.name}
            </div>
          ))}
        </div>
        <div className='grid h-full grid-cols-2 gap-2 overflow-auto md:grid-cols-3 lg:grid-cols-5'>
          {meals.map((meal, index) => {
            const active = restaurantSettings.find(
              day => day.meals.indexOf(meal.id) !== -1
            )

            return (
              <div
                key={index}
                className={cn(
                  'grid gap-2 p-2 border border-solid rounded-md place-items-center bg-neutral-700 border-neutral-600 select-none transition-all duration-75',
                  {
                    'outline outline-blue-400 outline-[3px] -outline-offset-2':
                      !!active,
                  }
                )}
                onClick={() => {
                  if (
                    !settings.days.find(
                      day =>
                        day.weekday === weekday && day.restaurant === restaurant
                    )
                  ) {
                    settings.days.push({
                      meals: [],
                      weekday,
                      restaurant,
                    })
                  }
                  const newSettings = settings.days
                    .map(day => {
                      if (
                        day.restaurant === restaurant &&
                        day.weekday === weekday
                      ) {
                        if (day.meals.indexOf(meal.id) !== -1) {
                          day.meals = day.meals.filter(id => id !== meal.id)
                        } else {
                          day.meals.push(meal.id)
                        }
                      }

                      return day
                    })
                    .filter(day => day.meals.length > 0)

                  newSettings.sort((a, b) => a.weekday - b.weekday)

                  settings.days = newSettings

                  onSave(settings)
                }}
              >
                <img src={meal.icon} width='56' height='56' alt={meal.name} />
                <span className='text-xs text-center whitespace-pre-wrap'>
                  <Balancer>{meal.name}</Balancer>
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { RUSettings }
