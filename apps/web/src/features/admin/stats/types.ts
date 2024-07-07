export type MonthlyStats = {
  year: string
  month: string
  count: number
}

export type Stats = {
  users: MonthlyStats[]
  queue: MonthlyStats[]
}
