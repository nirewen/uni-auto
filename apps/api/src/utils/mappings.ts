export const weekdays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
]

export const weekdaysShort = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export const mealNames = {
  1: 'Café',
  2: 'Almoço',
  3: 'Jantar',
  4: 'Marmitex almoço',
  5: 'Marmitex jantar',
  6: 'Kit distribuição café',
  7: 'Kit distribuição almoço',
  8: 'Kit distribuição jantar',
  9: 'Kit distribuição (C + A + J)',
  10: 'Kit distribuição (Almoço + Jantar)',
}

export type MealName = (typeof mealNames)[keyof typeof mealNames]

export const formatList = (list: string[]) => {
  const last = list.at(-1)

  if (list.length === 1) return last

  const result = list.slice(0, -1).join(', ') + ' e ' + last

  return result
}

export const p = (
  amount: number,
  singular: string = '',
  plural: string = 's'
) => {
  return amount === 1 ? singular : plural
}
