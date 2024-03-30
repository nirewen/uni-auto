import { cn } from '@/lib/utils'
import { Settings } from '@/routes/_protected/connections/$connectionId/$moduleSlug/modules/-auto-ru'
import { CalendarDays, InfoIcon } from 'lucide-react'
import { useState } from 'react'
import { Balancer } from 'react-wrap-balancer'

import {
  iconBreakfast,
  iconCafe,
  iconCutlery,
  iconDinner,
  iconFood,
  iconHalalFood,
  iconLunch,
  iconPlasticFoodContainer,
} from '@/assets/icons'
import { For } from '@/components/flow/for'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

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
    icon: iconBreakfast,
  },
  {
    id: 2,
    name: 'Almoço',
    icon: iconLunch,
  },
  {
    id: 3,
    name: 'Jantar',
    icon: iconDinner,
  },
  {
    id: 4,
    name: 'Marmitex\nalmoço',
    icon: iconPlasticFoodContainer,
  },
  {
    id: 5,
    name: 'Marmitex\njantar',
    icon: iconPlasticFoodContainer,
  },
  {
    id: 6,
    name: 'Kit distribuição\ncafé',
    icon: iconCafe,
  },
  {
    id: 7,
    name: 'Kit distribuição\nalmoço',
    icon: iconFood,
  },
  {
    id: 8,
    name: 'Kit distribuição\njantar',
    icon: iconCutlery,
  },
  {
    id: 9,
    name: 'Kit distribuição\n(C + A + J)',
    icon: iconHalalFood,
  },
  {
    id: 9,
    name: 'Kit distribuição\n(Almoço + Jantar)',
    icon: iconHalalFood,
  },
]

function RUSettings({ settings, onSave }: RUSettingsProps) {
  const [restaurant, setRestaurant] = useState(restaurantes[0].id)
  const [weekday, setWeekday] = useState(1)
  const restaurantSettings = settings.days.filter(
    (day) => day.restaurant === restaurant && day.weekday === weekday,
  )

  const onSelectMeal = (meal: (typeof meals)[number]) => {
    const otherRestaurantDay = settings.days.find(
      (day) =>
        day.meals.includes(meal.id) &&
        day.restaurant !== restaurant &&
        day.weekday === weekday,
    )

    if (otherRestaurantDay) {
      otherRestaurantDay?.meals.splice(
        otherRestaurantDay?.meals.indexOf(meal.id)!,
        1,
      )
    }
    if (
      !settings.days.find(
        (day) => day.weekday === weekday && day.restaurant === restaurant,
      )
    ) {
      settings.days.push({
        meals: [],
        weekday,
        restaurant,
      })
    }
    const newSettings = settings.days
      .map((day) => {
        if (day.restaurant === restaurant && day.weekday === weekday) {
          if (day.meals.indexOf(meal.id) !== -1) {
            day.meals = day.meals.filter((id) => id !== meal.id)
          } else {
            day.meals.push(meal.id)
          }
        }

        return day
      })
      .filter((day) => day.meals.length > 0)

    newSettings.sort((a, b) => a.weekday - b.weekday)

    settings.days = newSettings

    onSave(settings)
  }

  const onChangeVegan = (vegan: boolean) => {
    settings.vegan = vegan

    onSave(settings)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex max-h-72 rounded-lg border border-solid border-neutral-700 bg-neutral-800 md:max-h-80">
        <div className="flex select-none flex-col gap-2 rounded-l-lg border-r border-solid border-neutral-700 bg-neutral-900 p-1 md:p-2">
          <div className="flex items-center justify-end gap-2 whitespace-nowrap p-2">
            <CalendarDays className="h-4 w-4" />
          </div>
          <TooltipProvider>
            {weekdays.map((day, index) => (
              <Tooltip delayDuration={50} key={index}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      'flex gap-2 p-2 rounded-md cursor-pointer whitespace-nowrap h-8 leading-none justify-center font-bold',
                      {
                        'bg-neutral-800': day.weekday === weekday,
                      },
                    )}
                    onClick={() => setWeekday(day.weekday)}
                  >
                    {day.short}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{day.long}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
        <div className="flex w-full flex-col gap-2 overflow-hidden p-2">
          <div className="flex flex-row gap-2">
            <ScrollArea>
              <div className="flex h-8 w-full flex-1 shrink-0 items-center gap-2">
                {restaurantes.map((restaurante, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex gap-2 px-2 py-1 text-sm rounded-md bg-neutral-800 border-neutral-700 border border-solid cursor-pointer whitespace-nowrap hover:bg-neutral-600 hover:border-neutral-500 hover:text-neutral-100 transition-colors select-none',
                      {
                        'bg-neutral-700 border-neutral-600':
                          restaurante.id === restaurant,
                      },
                    )}
                    onClick={() => setRestaurant(restaurante.id)}
                  >
                    {restaurante.name}
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="ml-auto h-8 w-8 border border-neutral-700 bg-neutral-800"
                  variant="outline"
                  size="icon"
                >
                  <InfoIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="left">
                <div className="flex max-w-64 flex-col text-sm md:max-w-96">
                  <p>
                    Agendamentos no dia dependem da disponibilidade no
                    restaurante.
                  </p>
                  <p>
                    O módulo não se responsabiliza por agendamentos não
                    efetuados por falta de benefício ou indisponibilidade de
                    refeição.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <ScrollArea>
            <div className="grid h-full grid-cols-2 gap-2 p-[1px] md:grid-cols-3 lg:grid-cols-5">
              <For each={meals}>
                {(meal) => {
                  const active = restaurantSettings.find(
                    (day) => day.meals.indexOf(meal.id) !== -1,
                  )
                  return (
                    <div
                      key={weekday + '_' + meal.id}
                      className={cn(
                        'grid gap-2 p-2 border border-solid rounded-md place-items-center bg-neutral-700 border-neutral-600 select-none transition-all duration-75',
                        {
                          'outline outline-blue-400 outline-[3px] -outline-offset-2':
                            !!active,
                        },
                      )}
                      onClick={() => onSelectMeal(meal)}
                    >
                      <img
                        src={meal.icon}
                        width="56"
                        height="56"
                        alt={meal.name}
                      />
                      <span className="whitespace-pre-wrap text-center text-xs">
                        <Balancer>{meal.name}</Balancer>
                      </span>
                    </div>
                  )
                }}
              </For>
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div className="flex items-center rounded-lg border border-solid border-neutral-700 bg-neutral-800 p-2 md:max-h-80">
          <Label htmlFor=":vegan:" className="flex-1">
            Opção vegetariana
          </Label>
          <Switch
            className="data-[state=unchecked]:bg-neutral-700"
            id=":vegan:"
            onCheckedChange={onChangeVegan}
            checked={settings.vegan}
          ></Switch>
        </div>
        <div className="hidden items-center rounded-lg border border-solid border-neutral-700 bg-neutral-800 p-2 md:flex md:max-h-80"></div>
        <div className="hidden items-center rounded-lg border border-solid border-neutral-700 bg-neutral-800 p-2 md:flex md:max-h-80"></div>
      </div>
    </div>
  )
}

export { RUSettings }
