export interface ScheduleOptions {
  dateStart: string
  meals: number[]
  restaurant: number
}

export interface AllowancesOptions {
  day: string
  restaurant: number
}

export interface MenuOptions {
  dateStart: string
  dateEnd: string
}

export interface GroupedMeal {
  meals: number[]
  dateStart: string
  dateEnd: string
  restaurant: number
  vegan: boolean
}

export type ScheduleResponse = {
  error: boolean
  codigo: number
  mensagem: string
  id: number
  impedimento: string
  dataRefAgendada: string
  tipoRefeicao: string
  sucesso: boolean
}
