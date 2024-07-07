import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { MonthlyStats } from '../types'

export type MonthlyChartProps = {
  data?: MonthlyStats[]
}

const months = [
  ,
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export function MonthlyChart({ data }: MonthlyChartProps) {
  if (!data) return null

  return (
    <ChartContainer
      config={
        {
          count: {
            label: 'Quantidade',
          },
        } satisfies ChartConfig
      }
    >
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => months[Number(value)]?.slice(0, 3)!}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
          labelFormatter={(value) => months[Number(value)]}
        />
        <Area dataKey="count" type="natural" fillOpacity={0.4} />
      </AreaChart>
    </ChartContainer>
  )
}
