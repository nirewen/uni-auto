export type APIResponse<T> = {
  error: boolean
  mensagem: string
  codigo: number
} & T

export type BeneficioResponse = APIResponse<{
  idRefeicao: number
  descRefeicao: string
}>

export type TokenResponse = APIResponse<{
  id: number
  token: string
}>