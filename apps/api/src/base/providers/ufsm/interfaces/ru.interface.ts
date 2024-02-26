export type APIResponse<T> = {
  error: boolean
  mensagem: string
  codigo: number
} & T

export type BeneficioResponse = {
  idRefeicao: number
  descRefeicao: string
}

export type TokenResponse = {
  id: number
  token: string
}

export type UserSettings = {
  days: {
    restaurant: number
    weekday: number
    meals: number[]
  }[]
  vegan: boolean
}
