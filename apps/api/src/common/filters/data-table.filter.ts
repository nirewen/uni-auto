import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { FindOptionsWhere } from 'typeorm'

export interface SortingOptions<T> {
  id: keyof T
  desc: 'true' | 'false'
}

export interface DataTableFilter<T> {
  pagination: IPaginationOptions
  filter: FindOptionsWhere<T>
  sorting: SortingOptions<T>
}

interface NestedObject {
  [key: string]: NestedObject | string
}

export function sortToOrder(input: { id: string; desc: string }): NestedObject {
  const { id, desc } = input
  const keys = id.split('_')
  const result: NestedObject = {}

  let tempObj: NestedObject = result
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      tempObj[key] = desc === 'true' ? 'DESC' : 'ASC'
    } else {
      tempObj[key] = {}
      tempObj = tempObj[key] as NestedObject
    }
  })

  return result
}

export const paginationToPaging = (pagination: IPaginationOptions) => {
  return {
    page: pagination.page ?? 1,
    limit: pagination.limit ?? 10,
  }
}
